import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from '../pages/Admin';
import AddJobs from '../pages/AddJobs';
import ManageJobs from '../pages/ManageJobs';
import JobApplicants from '../pages/JobApplicants';
import axios from 'axios'


const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Admin />} >
            <Route path='/add-job' element={<AddJobs />} />
            <Route path='/manage-jobs' element={<ManageJobs />} />
            <Route path='/view-applicants' element={<JobApplicants />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
