import mongoose from "mongoose";

export const connectDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI).then(() => console.log('Connect to DB')).catch((err) => console.log('error in connecting db', err));
};