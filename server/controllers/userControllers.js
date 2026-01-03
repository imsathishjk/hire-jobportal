import { generateToken } from "../config/token.js";
import { uploadFile } from "../middleware/stream.js";
import applications from "../models/jobApplication.js";
import job from "../models/jobModel.js";
import savedJobs from "../models/savedJobs.js";
import { user } from "../models/userModal.js";
import bcrypt from 'bcrypt';

export const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const image = req.file;

        if (!username || !email || !password || !image) {
            return res.json({ success: false, msg: 'Fields Missing' });
        }
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, msg: 'user already exists, please login' });
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const imageUrl = await uploadFile(image, 'images')

        const newUser = await user.create({
            username, email, password: hashPassword, image: imageUrl
        });

        const token = generateToken(newUser._id);
        res.cookie('userToken', token, {
            httpOnly: true,      // safe from JS
            secure: true,        // requires https
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.json({ success: true, msg: 'user created successfully', data: newUser });

    } catch (err) {
        console.log(err);
    }

};
export const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, msg: 'Invalid Credentials' })
        }
        const isValidUser = await user.findOne({ email })
        if (!isValidUser) {
            return res.json({ success: false, msg: 'User Not Found' })
        }
        const isMatch = await bcrypt.compare(password, isValidUser.password)

        if (!isMatch) {
            return res.json({ success: false, msg: 'Incorrect Password' })
        }
        const token = generateToken(isValidUser._id);
        res.cookie('userToken', token, {
            httpOnly: true,      // safe from JS
            secure: true,        // requires https
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.json({ success: true, msg: 'Logged in successfully', data: isValidUser })
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}

export const handleUserData = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.json({ success: false, msg: 'Not Authorized, Please Login' });
        }
        const userDetails = await user.findOne({ _id: userId });
        if (!userDetails) {
            return res.json({ success: false, msg: 'User Not Found' });
        }
        return res.json({ success: true, msg: 'User details fetched', data: userDetails });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const uploadResume = async (req, res) => {
    try {
        const id = await req.userId;
        if (!id) {
            return res.json({ success: false, msg: 'Not Authorized, Login Again' })
        }

        const resume = req.file;
        const resumePath = await uploadFile(resume, 'resumes')

        const userData = await user.findByIdAndUpdate(id, { resume: resumePath });
        if (userData) {
            return res.json({ success: true, msg: 'User updated successfully', data: userData });
        }

    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}

export const handleSaveJob = async (req, res) => {
    try {
        const userId = req.userId;

        const { jobId, companyId } = req.params;
        if (!userId) {
            return res.json({ success: false, msg: "Not Authorized Login Again" });
        }
        const isValid = await job.findById(jobId);
        if (!isValid) {
            return res.json({ success: false, msg: 'Job Not Found' });
        }

        const isAlreadySaved = await savedJobs.findOne({ jobId, companyId, userId });
        if (isAlreadySaved) {
            const isTrue = await savedJobs.findByIdAndDelete({ _id: isAlreadySaved._id });
            if (isTrue) {
                return res.json({ success: true, msg: 'Job unsaved', isSaved: false });
            }
        }
        const newSavedJob = await savedJobs.create({ userId, companyId, jobId, jobs: isValid });
        if (!newSavedJob) {
            return res.json({ success: false, msg: 'Error in saving job' });
        }
        return res.json({ success: true, msg: 'Job saved', data: newSavedJob, isSaved: true })

    }

    catch (err) {
        console.log(err)
        return res.json({ success: false, msg: err.message });

    }
}

export const fetchAllSavedJobs = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.json({ success: false, msg: 'Not Authorized, Please Login' })
        }
        const userSavedJobs = await savedJobs.find({ userId });
        if (!userSavedJobs) {
            return res.json({ success: false, msg: 'No Jobs saved yet' })
        }
        return res.json({ success: true, msg: 'Saved Jobs Fetched', data: userSavedJobs });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const handleApplyJob = async (req, res) => {
    try {
        const userId = req.userId;
        const { jobId, companyId } = req.params;

        if (!userId) {
            return res.json({ success: false, msg: 'Not Authorized, Please Login' });
        }
        const isValidUser = await user.findById({ _id: userId });
        if (!isValidUser) {
            return res.json({ success: false, msg: 'User Not found!' });
        }
        const isJobExists = await job.findOne({ _id: jobId, companyId });
        if (!isJobExists) {
            return res.json({ success: false, msg: 'Job Not found' });
        }
        const hasResume = isValidUser.resume;
        if (!hasResume) {
            return res.json({ success: false, msg: 'Please upload resume to apply this job' })
        }
        const isAlreadyApplied = await applications.findOne({ applicantId: userId, jobId, companyId });
        if (isAlreadyApplied) {
            return res.json({ success: false, msg: 'Already applied to this job' });
        }

        const newApplicant = await applications.create({ applicantId: userId, companyId, jobId, userResume: isValidUser.resume, job: isJobExists, user: isValidUser });
        return res.json({ success: true, msg: 'Job Applied successfully', data: newApplicant });


    } catch (err) {
        console.log(err)
        return res.json({ success: false, msg: err.message });
    }

}
export const userAppliedJobs = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.json({ success: false, msg: 'Not authorized, Please Login' });
        }
        const userAppliedJobs = await applications.find({ applicantId: userId });
        if (userAppliedJobs) {
            return res.json({ success: true, msg: 'Applied Jobs Fetched', data: userAppliedJobs });
        }
        return res.json({ success: false, msg: 'No jobs applied yet' })
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}
export const fetchAllJobs = async (req, res) => {
    try {
        const allJobs = await job.find({});
        return res.json({ success: true, msg: 'Jobs Fetched', data: allJobs });
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}
export const fetchSingleJob = async (req, res) => {
    try {
        const { id } = await req.params;
        const jobDetails = await job.findById({ _id: id });
        if (!job) {
            return res.json({ success: false, msg: 'Job Not found' });
        }
        return res.json({ success: true, msg: 'Job fetched', data: jobDetails });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const filteredRelatedJobs = async (req, res) => {
    try {
        const { id } = req.params;
        const allJobs = await job.find({});
        const existedJob = await job.findById({ _id: id });
        if (!existedJob) {
            return res.json({ success: false, msg: 'Job not found' });
        }
        const filteredJobs = allJobs.filter((job) => job.category == existedJob.category && job._id !== id);
        if (!filteredJobs) {
            return res.json({ success: false, msg: 'There is no matches with current job category' });
        }
        return res.json({ success: true, msg: 'Releated Jobs fetched', data: filteredJobs });

    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}

export const filteredJobsByQuery = async (req, res) => {
    try {
        const { query, location } = req.query;
        console.log(query, location)
        if (!query) {
            return res.json({ success: false, msg: 'Type atleast 3 letters to search' });
        }
        const allJobs = await job.find({});
        const filteredJobs = await allJobs.filter((job) => job.jobTitle.toLowerCase().trim().includes(query.trim().toLowerCase()) ||
            job.location.toLowerCase().trim().includes(location.trim().toLowerCase())
        )
        if (!filteredJobs.length) {
            return res.json({ success: false, msg: 'There is no job match with your search' });
        }
        return res.json({ success: true, msg: 'Jobs fetched', data: filteredJobs });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const filterJobsByCategories = async (req, res) => {
    try {
        const { category, location } = req.query;
        const allJobs = await job.find({});
        const filteredJobs = await allJobs.filter((job) => job.category.toLowerCase().trim().includes(category.trim().toLowerCase()) &&
            job.location.toLowerCase().trim().includes(location.trim().toLowerCase())
        )
        if (!filteredJobs.length) {
            return res.json({ success: false, msg: 'There is no job match with your search' });
        }
        return res.json({ success: true, msg: 'Jobs fetched', data: filteredJobs });
    } catch (err) {
        return res.json({ success: false, msg: err.message });
    }
}

export const handleLogout = async (req, res) => {
    res.clearCookie('userToken', {
        httpOnly: true,      // safe from JS
        secure: true,        // requires https
        sameSite: "none",
    })
    return res.json({ success: true, msg: 'Logged Out!' })
}

export const isAuth = async (req, res) => {
    const id = req.userId;
    if (id) {
        return res.json({ success: true, isAuth: true });
    }
    return res.json({ success: false, msg: 'Not Authorized, Login Again' });
}


export const handleUpdateUsertype = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.json({ success: false, msg: 'Not Authorized, Please login' });
        }
        const isUserExists = await user.findOne({ _id: userId });
        if (!isUserExists) {
            return res.json({ success: false, msg: 'User not found' });
        }
        isUserExists.isUser = true;
        await isUserExists.save();
        return res.json({ success: true, msg: 'User Updated Successfully' });
    } catch (err) {
        return res.json({ success: false, msg: err.message })
    }
}