import { generateToken } from "../config/token.js";
import { uploadFile } from "../middleware/stream.js";
import company from "../models/companyModel.js";
import bcrypt from 'bcrypt';
import job from "../models/jobModel.js";
import applications from "../models/jobApplication.js";

export const handleRegisterCompany = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const image = req.file;
        console.log(image);
        if (!username || !email || !password || !image) {
            return res.json({ success: false, msg: 'All fields are required' });
        };
        const isCompanyExists = await company.findOne({ email });
        if (isCompanyExists) {
            return res.json({ success: false, msg: 'Account registered already, Please login' })
        };
        const hashedPassword = await bcrypt.hash(password, 10);

        const imageUrl = await uploadFile(image, 'images');

        const newCompany = await company.create({
            username, email, password: hashedPassword, image: imageUrl
        });

        const token = generateToken(newCompany._id);
        res.cookie('companyToken', token, {
            httpOnly: true,      // safe from JS
            secure: true,        // requires https
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, msg: 'Account created successfully', data: newCompany , token})
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
};



export const handleCompanyLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, msg: 'Invalid Credentials' });
    }
    const isValidCompany = await company.findOne({ email });
    if (!isValidCompany) {
        return res.json({ success: false, msg: 'User not found' })
    }
    const isMatch = await bcrypt.compare(password, isValidCompany.password);

    if (!isMatch) {
        return res.json({ success: false, msg: 'Incorrect Password' });
    }
    const token = generateToken(isValidCompany._id);

    res.cookie('companyToken', token, {
        httpOnly: true,      // safe from JS
        secure: true,        // requires https
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.json({ success: true, msg: 'Logged In', data: isValidCompany ,token})
}


export const addJob = async (req, res) => {
    try {
        const { jobTitle, jobDescription, subtitle, points1, subtitle2, points2, category, location, level, type, salary } = req.body;
        const userId = req.companyId;

        if (!jobTitle || !jobDescription || !subtitle || !points1 || !points2 || !category || !location || !level || !type || !salary || !subtitle2) {
            return res.json({ success: false, msg: 'All fields are required' })
        }

        if (!userId) {
            return res.json({ success: false, msg: 'Not Authorized, Login again' })
        }

        const isExisting = await company.findById(userId);
        if (!isExisting) {
            return res.json({ success: false, msg: 'Company Not Found' });
        }

        const newJob = await job.create({
            companyId: userId, jobTitle, jobDescription, subtitle, subtitle2, points1, points2, category, location, level, type, salary,
            companyData: { name: isExisting.username, image: isExisting.image, email: isExisting.email }
        });

        if (!newJob) {
            return res.json({ success: false, msg: 'Error in adding a job' });
        };

        return res.json({ success: true, msg: 'Job added successfully', data: newJob });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }


};

export const setJobVisibility = async (req, res) => {
    try {
        const companyId = req.companyId;
        const { jobId } = req.params;
        if (!companyId) {
            return res.json({ success: false, msg: 'Not Authorized Login Again' });
        }

        const companyData = await company.findOne({ _id: companyId });

        if (!companyData) {
            return res.json({ success: false, msg: 'Company Not Found' });
        }
        const jobData = await job.findById(jobId);
        if (!jobData) {
            return res.json({ success: false, msg: 'Job Not Found' });
        }

        if (!jobData.companyId.toString() === companyId) {
            return res.json({ success: false, msg: 'You are not a authorized person to update status' });
        } else {
            jobData.visible = !jobData.visible;
            await jobData.save();
            return res.json({ success: true, msg: 'Status updated', data: jobData });
        }

    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}


export const fetchCompanyJobs = async (req, res) => {
    try {
        const companyId = req.companyId;
        if (!companyId) {
            return res.json({ success: false, msg: 'Not Authorized, Please login' });
        }
        const companyJobs = await job.find({ companyId: companyId });
        if (companyJobs.length == 0) {
            return res.json({ success: false, msg: 'No Jobs added yet' });
        }

        return res.json({ success: true, msg: 'Company Jobs Fetched', data: companyJobs });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const fetchJobApplicants = async (req, res) => {
    try {
        const companyId = req.companyId;
        if (!companyId) {
            return res.json({ success: false, msg: 'Not Authorized, Please login' });
        }
        const applicants = await applications.find({ companyId });
        if (!applicants) {
            return res.json({ success: false, msg: 'No Applicants' });
        }
        return res.json({ success: true, msg: 'Applicants fetched', data: applicants });

    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}

export const handleJobStatus = async (req, res) => {
    try {
        const companyId = req.companyId;
        const { jobId, userId } = req.params;

        const { status } = req.body;
        if (!userId) {
            return res.json({ success: false, msg: 'Not Authorized, Please Login' });
        }
        const userApplication = await applications.findOne({ companyId, applicantId: userId, jobId });

        if (!userApplication) {
            return res.json({ success: false, msg: 'No applicants' });
        } else {
            userApplication.status = status;
            await userApplication.save();
            return res.json({ success: true, msg: 'Status updated', data: userApplication });
        }
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }

}

export const updateCompanyProfile = async (req, res) => {
    try {
        const companyId = req.companyId;
        const image = req.file;

        if (!image) {
            return res.json({ success: false, msg: 'The image field is should not be empty' });
        }
        const imageUrl = await uploadFile(image, 'images');

        const updatedProfile = await company.findByIdAndUpdate({ _id: companyId }, { image: imageUrl });
        const existingCompanyJob = await job.findOne({ companyId: companyId });
        existingCompanyJob.companyData.image = imageUrl;
        await existingCompanyJob.save();
        return res.json({ success: true, msg: 'Profile Updated Successfully', data: updatedProfile })
    } catch (err) {
        console.log(err);
        return res.json({ success: false, msg: err.message })
    }

}

export const handleCompanyLogout = async (req, res) => {
    await res.clearCookie('companyToken', {
        httpOnly: true,      // safe from JS
        secure: true,        // requires https
        sameSite: "none",
    });
    return res.json({ success: true, msg: 'Logged Out' })
}

export const handleCompanyType = async (req, res) => {
    try {
        const companyId = req.companyId;
        if (!companyId) {
            return res.json({ success: false, msg: 'Not authorized, please login' });
        }
        const isCompanyExists = await company.findOne({ _id: companyId });
        if (!isCompanyExists) {
            return res.json({ success: false, msg: 'Company Not found' });
        }
        isCompanyExists.isAdmin = true;
        await isCompanyExists.save();
        return res.json({ success: true, msg: 'updated successfully' })
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}

export const isAuth = async (req, res) => {
    try {
        const id = req.companyId;
        if (id) {
            return res.json({ success: true, isAuth: true });
        }
        return res.json({ success: false, msg: 'Not Authorized, Login Again' });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const handleCompanyData = async (req, res) => {
    try {
        const companyId = req.companyId;
        if (!companyId) {
            return res.json({ success: false, msg: 'Not Authorized, Please Login' });
        }
        const userDetails = await company.findOne({ _id: companyId });
        if (!userDetails) {
            return res.json({ success: false, msg: 'User Not Found' });
        }
        return res.json({ success: true, msg: 'User details fetched', data: userDetails });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}
