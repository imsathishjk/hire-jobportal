import express from 'express';
import { upload } from '../config/multer.js';
import { fetchAllJobs, fetchAllSavedJobs, fetchSingleJob, filteredJobsByQuery, filteredRelatedJobs, filterJobsByCategories, handleApplyJob, handleLogin, handleLogout, handleSaveJob, handleUpdateUsertype, handleUserData, isAuth, uploadResume, userAppliedJobs, userRegister } from '../controllers/userControllers.js';
import { userAuth } from '../middleware/auth.js';


export const userRoute = express.Router();


userRoute.post('/register', upload.single('image'), userRegister);
userRoute.post('/login', handleLogin);
userRoute.post('/logout', handleLogout);
userRoute.get('/is-auth', userAuth, isAuth);
userRoute.post('/upload-resume', userAuth, upload.single('resume'), uploadResume);
userRoute.get('/data', userAuth, handleUserData);
userRoute.post('/update-type',userAuth, handleUpdateUsertype)

userRoute.get('/job/search', filteredJobsByQuery);
userRoute.get('/job/category-search', filterJobsByCategories);

userRoute.get('/job/job-details/:id', fetchSingleJob);
userRoute.get('/job/related-jobs/:id', filteredRelatedJobs);
userRoute.get('/applied-jobs', userAuth, userAppliedJobs);
userRoute.post('/job/apply-job/:jobId/:companyId', userAuth, handleApplyJob);
userRoute.get('/all-jobs', fetchAllJobs);
userRoute.get('/job/saved-jobs', userAuth, fetchAllSavedJobs);
userRoute.put('/job/saved/:jobId/:companyId', userAuth, handleSaveJob);
