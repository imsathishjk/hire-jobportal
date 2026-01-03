import express, { urlencoded } from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv/config'
import { userRoute } from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import companyRoute from './routes/companyRoute.js';
import cors from 'cors';



const app = express();

const PORT = 9000;


const allowedOrigins = ['https://hire-jobportal-client.vercel.app', 'https://hire-jobportal-admin.vercel.app']
// Middlewares
// app.use((req) => console.log(req));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));
// API endpoints

app.use('/user', userRoute);
app.use('/company', companyRoute);

app.get('/', (req, res) => {
    res.send('API Working');
})

await connectDB();

app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});