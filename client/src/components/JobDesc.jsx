import React, { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import { FaLocationArrow } from "react-icons/fa6";
import { PiSuitcaseSimple } from "react-icons/pi";
import AppContext from '../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';
import {LuIndianRupee} from 'react-icons/lu'

const JobDesc = ({ jobDetail }) => {

    const { backendUrl, userData } = useContext(AppContext);
    const [userAppliedJobs, setUserAppliedJobs] = useState([]);
    const [alreadyApplied, setAleadyApplied] = useState(null);

    const handleUserAppliedJobs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/user/applied-jobs`, { withCredentials: true });
            if (data.success) {
                setUserAppliedJobs(data.data);
                handleAlreadyAppliedJob();
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleAlreadyAppliedJob = () => {
        try {
            const job = userAppliedJobs.map((user) => user.applicantId).includes(userData?._id) && userAppliedJobs.map((user) => user.companyId).includes(jobDetail.companyId) && 
            userAppliedJobs.map((user) => user.jobId).includes(jobDetail?._id);
            if (job) {
                setAleadyApplied(true)
            } else {
                setAleadyApplied(false);
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleApplyJob = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/user/job/apply-job/${jobDetail._id}/${jobDetail.companyId}`, {}, { withCredentials: true });
            if (data.success) {
                toast.success(data.msg);
                console.log(data.data);
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        handleUserAppliedJobs()
    }, [alreadyApplied]);

    return (
        <>
            <div className='bg-blue-50 border rounded-md p-5 border-blue-400 flex flex-col gap-3'>
                <div className='flex max-md:flex-col-reverse max-md:items-start items-center max-md:gap-3 justify-between'>
                    <div className='flex items-start gap-2'>
                        <h1 className='text-xl md:text-2xl font-semibold text-blue-600'>{jobDetail?.jobTitle}</h1>
                        <p className='text-sm font-semibold text-red-700'>{jobDetail?.category}</p>
                    </div>
                    <img src={jobDetail?.companyData?.image} alt={jobDetail?.title} className='w-24' />
                </div>
                <div className='flex items-center gap-5'>
                    <p className='max-sm:text-sm font-semibold text-gray-700 flex items-center gap-1'><PiSuitcaseSimple className='text-pink-600' /> {jobDetail?.level}</p>
                    <p className='max-sm:text-sm font-semibold text-gray-700 flex items-center gap-1'><FaLocationArrow className='text-blue-600' /> {jobDetail?.location}</p>
                </div>
                <div className='flex flex-col gap-3'>
                    <p className='max-sm:text-sm font-semibold flex items-center gap-1'><LuIndianRupee />{jobDetail?.salary + 'LPA'}</p>
                    <p className='max-sm:text-sm font-semibold'>Posted on: {moment(jobDetail?.createdAt).format('DD-MMMM-YYYY')}</p>
                </div>

            </div>
            <div className='mt-5'>
                <h1 className='text-[16px] font-bold'>Job Description:</h1>
                <div className='tracking-wide flex flex-col gap-3'>
                    <p className='font-medium my-1.5'>{jobDetail?.jobDescription}</p>
                    <h3 className='text-[16px] font-bold'>{jobDetail?.subtitle}</h3>
                    <ul className=''>
                        {
                            jobDetail?.points1?.map((point, i) => {
                                return <p key={i} className='font-medium text-gray-700'><span className='font-medium'>{i + 1}.</span> {point}</p>
                            })
                        }
                    </ul>
                    <h3 className='text-[16px] font-bold'>{jobDetail?.subtitle2}</h3>
                    <ul className=''>
                        {
                            jobDetail?.points2?.map((point, i) => {
                                return <p key={i} className='font-medium text-gray-700'><span className='font-medium'>{i + 1}.</span> {point}</p>
                            })
                        }
                    </ul>
                </div>
            </div>
            <button onClick={handleApplyJob}
                disabled={alreadyApplied}
                className={`cursor-pointer rounded-md p-1.5 px-5 mt-5 font-medium w-fit ${alreadyApplied ? 'bg-100 text-blue-300 border border-blue-300 select-none' : 'bg-blue-500 text-white'}`}>{alreadyApplied ? 'Applied' : 'Apply Now'}</button>
        </>
    )
}

export default JobDesc
