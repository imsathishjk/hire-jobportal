import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import AppContext from '../context/AppContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsBookmarkXFill } from "react-icons/bs";
import { LuIndianRupee } from "react-icons/lu";
import { IoAlertOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
    const { backendUrl, userData, userLoggedIn } = useContext(AppContext);
    const [savedJobs, setSavedJobs] = useState([]);
    const navigate = useNavigate()
    const handleFetchSavedJobs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/user/job/saved-jobs`, { withCredentials: true })
            if (data.success) {
                let temp = data.data;
                setSavedJobs(temp.filter((job) => job.jobs[0].visible === true));
            }
        } catch (err) {
            console.log(err)
        }
    };

    const removedFromSavedJobs = async (jobId, companyId) => {
        try {
            const { data } = await axios.put(`${backendUrl}/user/job/saved/${jobId}/${companyId}`, { withCredentials: true })
            if (!data.isSaved) {
                toast.success(data.msg);
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!userData && !userLoggedIn) {
            navigate('/')
            toast.error('Please Login')
        }
    })

    useEffect(() => {
        handleFetchSavedJobs();
    }, [savedJobs]);

    return (
        <div className='h-[70vh] mt-12'>
            <div className='flex flex-col gap-3'>
                {
                    savedJobs.length ? savedJobs.map((job, i) => {
                        return (
                            <div key={job._id} className='flex items-center  rounded-md p-3 justify-between border border-blue-300'>
                                <img src={job.jobs[0].companyData.image} alt="" className='w-12 max-md:hidden' />
                                <h1 className='font-semibold'>{job.jobs[0].companyData.name}</h1>
                                <p className='font-medium'>{job.jobs[0].location}</p>
                                <p className='font-medium max-md:hidden'>{job.jobs[0].category}</p>
                                <p className='font-semibold flex items-center gap-1 max-sm:hidden'><LuIndianRupee className='text-sm' /> {job.jobs[0].salary} {'LPA'}</p>
                                <button className='font-bold text-blue-600 cursor-pointer' onClick={() => removedFromSavedJobs(job.jobId, job.companyId)} ><BsBookmarkXFill /></button>
                            </div>
                        )
                    })

                        : <p className='font-semibold text-blue-600 text-lg md:text-xl self-center flex items-center'>No Jobs Saved <IoAlertOutline /></p>}
            </div>
        </div>
    )
}

export default SavedJobs
