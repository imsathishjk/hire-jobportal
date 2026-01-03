import express from 'express';
import { addJob, fetchCompanyJobs, fetchJobApplicants, handleCompanyData, handleCompanyLogin, handleCompanyLogout, handleCompanyType, handleJobStatus, handleRegisterCompany, isAuth, setJobVisibility, updateCompanyProfile } from '../controllers/companyController.js';

import { upload } from '../config/multer.js';
import { companyAuth } from '../middleware/companyAuth.js';


const companyRoute = express.Router();


companyRoute.post('/register', upload.single('image'), handleRegisterCompany);
companyRoute.post('/login', handleCompanyLogin);
companyRoute.get('/is-auth', companyAuth, isAuth);
companyRoute.post('/logout', handleCompanyLogout);
companyRoute.put('/update-profile', companyAuth, upload.single('image'), updateCompanyProfile);

companyRoute.get('/data', companyAuth, handleCompanyData);
companyRoute.post('/update-type', companyAuth, handleCompanyType);

companyRoute.put('/job/update-status/:userId/:jobId', companyAuth, handleJobStatus);
companyRoute.get('/applicants', companyAuth, fetchJobApplicants);
companyRoute.get('/company-jobs', companyAuth, fetchCompanyJobs);
companyRoute.post('/add-job', companyAuth, addJob);
companyRoute.put('/job/visibility/:jobId', companyAuth, setJobVisibility);

export default companyRoute;