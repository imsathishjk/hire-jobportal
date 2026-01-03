import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    isAdmin: { type: Boolean, default: true }
});

const company = mongoose.model.company || mongoose.model('company', companySchema);

export default company;

