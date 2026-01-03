import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    resume: { type: String, default: '' },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
    isUser: { type: Boolean, default: true }
});


export const user = mongoose.model.user || mongoose.model('user', userSchema);