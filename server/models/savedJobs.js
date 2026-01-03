import mongoose from "mongoose";

const savedJobSchema = new mongoose.Schema({
    companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'company' },
    jobId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'job' },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'user' },
    jobs: { type: Array, default: [], required: true }
});

const savedJobs = mongoose.model.savedJobs || mongoose.model('savedJobs', savedJobSchema);

export default savedJobs;