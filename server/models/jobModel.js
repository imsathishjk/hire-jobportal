import mongoose from 'mongoose';


const jobSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'company' },
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    subtitle: { type: String, required: true },
    points1: { type: Array, required: true },
    subtitle2: { type: String, required: true },
    points2: { type: Array, required: true },
    category: { type: String, required: true, enum: ['Programming', 'Data Science', 'Designing', 'Networking', 'Management', 'Marketing', 'Cybersecurity'] },
    location: { type: String, required: true, enum: ['Bangalore', 'Chennai', , 'Hyderabad', 'Washington', 'Mumbai', 'California', 'NewYork'] },
    level: { type: String, required: true, enum: ['Intermediate', 'Beginner', 'Senior'] },
    type: { type: String, required: true, enum: ['Full-time', 'Part-time', 'Freelancer'] },
    salary: { type: String, required: true, },
    visible: { type: Boolean, default: true },
    companyData: { type: Object, default: {} },
    createdAt: { type: Date, default: Date.now(), required: true }
});


const job = mongoose.model.job || mongoose.model('job', jobSchema);
export default job;