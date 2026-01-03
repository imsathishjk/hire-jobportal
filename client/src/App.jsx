import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'
import JobDetails from './pages/JobDetails';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AppliedJobs from './pages/AppliedJobs';
import Footer from './components/Footer.jsx';
import { Toaster } from 'react-hot-toast';
import SavedJobs from './pages/SavedJob.jsx';
import axios from 'axios'

const App = () => {
  const location = useLocation();
  axios.defaults.withCredentials = true;
  return (
    <div className='min-h-screen px-4 sm:px-6'>
      {!location.pathname.includes('/admin') && <Navbar />}
      <Toaster />
      <div className='sm:px-6'>
        <Routes>
          <Route path='*' element={<Home />} />
          <Route path='/' element={<Home />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/applied-jobs' element={<AppliedJobs />} />
          <Route path='/saved-jobs' element={<SavedJobs />} />
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App
