import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import { FiDownload } from "react-icons/fi";

const JobApplicants = () => {
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showApplicantStatus, setShowApplicantstatus] = useState(null);

    const backendUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const handleApplicatioStatus = (id) => {
        setShowApplicantstatus((prev) => prev === id ? null : id)
    }
    const handleChangeApplicationStatus = async (status, userId, jobId) => {

        try {
            const { data } = await axios.put(`${backendUrl}/company/job/update-status/${userId}/${jobId}`, { status: status, userId: userId }, { withCredentials: true });
            if (data.success) {
                toast.success(data.msg);
                setShowApplicantstatus(false)
                handleApplicants()
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }
    const handleApplicants = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/company/applicants`, { withCredentials: true });
            if (data.success) {
                setApplicants(data.data);
                setLoading(false)
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const handleIsAuth = async () => {
        const { data } = await axios.get(`${backendUrl}/company/is-auth`, { withCredentials: true });
        if (data.success) {
            handleApplicants();
        } else {
            navigate('/');
        }
    }

    useEffect(() => {
        handleIsAuth();
    }, []);

    return (
        <div className='mt-5'>
            {
                loading ? <Loader /> :
                    <table className='text-left mt-5 border border-blue-400 shadow w-full' >
                        <thead className='bg-blue-100  border border-blue-400 text-blue-600'>
                            <tr className='max-sm:text-sm'>
                                <th className='max-md:hidden block px-2 py-2'>#</th>
                                <th className='px-2 py-2'>Applicant</th>
                                <th className='px-2 py-2'>Job Title</th>
                                <th className='max-md:hidden block px-2 py-2'>Location</th>
                                <th className='px-2 py-2'>Resume</th>
                                <th className='max-md:hidden block px-2 py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='max-sm:text-sm font-medium text-left'>
                            {
                                applicants.length > 0 ? applicants.map((job, i) => {
                                    return <tr key={job._id}>
                                        <td className='max-md:hidden block font-medium py-2 px-2'>{i + 1}</td>
                                        <td className='px-2 font-medium py-2 '>{job.user[0].username}</td>
                                        <td className='px-2 font-medium py-2'>{job.job[0].jobTitle}</td>
                                        <td className='max-md:hidden block px-2 font-medium py-2 '>{job.job[0].location}</td>
                                        <td className='px-2 font-medium py-2'><a href={`${job.user[0].resume}`} download={job.user[0].resume} target='_blank' className='flex items-center gap-1.5 font-medium text-green-600 cursor-pointer'><FiDownload />Resume</a></td>

                                        <td onClick={() => handleApplicatioStatus(job.applicantId)} className={`max-md:hidden block px-2 font-medium pl-1.5 font-semibold py-2 z-0 cursor-pointer
                                    ${job.status == 'Pending' ? 'text-yellow-600' : job.status == 'Accept' ? 'text-green-600' : 'text-red-500'}
                                    `} >
                                            {job.status}
                                        </td>
                                        {
                                            showApplicantStatus == job.applicantId && (
                                                <td className='absolute top-32 right-32 flex flex-col gap-3 items-start bg-gray-100 p-1.5 rounded-md border border-blue-300'>
                                                    <span className='font-medium text-blue-600 cursor-pointer' onClick={() => handleChangeApplicationStatus('Pending', job.applicantId, job.jobId)}>Pending</span>
                                                    <span className='font-medium text-blue-600 cursor-pointer' onClick={() => handleChangeApplicationStatus('Accept', job.applicantId, job.jobId)}>Accept</span>
                                                    <span className='font-medium text-blue-600 cursor-pointer' onClick={() => handleChangeApplicationStatus('Reject', job.applicantId, job.jobId)}>Reject</span>
                                                </td>
                                            )
                                        }

                                    </tr>
                                }) : <p className='text-center p-3 text-blue-600 font-semibold'>No Applicants</p>
                            }

                        </tbody>
                    </table>
            }
        </div >
    )
}

export default JobApplicants
