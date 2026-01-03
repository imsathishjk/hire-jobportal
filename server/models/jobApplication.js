import mongoose from 'mongoose';

const jobApplication = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'company' },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'job' },
    applicantId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    status: { type: String, default: 'Pending', enum: ['Pending', 'Accept', 'Reject'] },
    userResume: { type: String, default: '' },
    job: { type: Array, required: true, default: [] },
    user: { type: Array, required: true, default: [] },
    count: { type: Object, required: true, default: {} },
    createdAt: { type: Date, default: Date.now(), required: true }
});


const applications = mongoose.model.applications || mongoose.model('applications', jobApplication)
export default applications;