import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { MdDelete } from "react-icons/md";
import AppContext from '../context/AppContext';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const { backendUrl, userData, userLoggedIn } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleAppliedJobs = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/user/applied-jobs`, { withCredentials: true });
            if (data.success) {
                setLoading(false);
                setAppliedJobs(data.data);
            }
        } catch (err) {
            console.log(err);
        }

    };


    console.log(appliedJobs);

    // console.log(appliedJobs)
    useEffect(() => {
        if (!userData && !userLoggedIn) {
            navigate('/');
            toast.error('Please Login')
        }
    }, [])
    useEffect(() => {
        handleAppliedJobs();
    }, []);

    return (
        <div className='mt-12 h-[75vh]'>
            <h1 className='text-xl font-bold text-blue-600 md:text-2xl'>Applied Jobs</h1>
            {
                loading ? <Loader /> :
                    <table className='w-full text-left mt-5 border border-blue-400 shadow'>
                        <thead className='bg-blue-100  border border-blue-400 text-blue-600'>
                            <tr className='max-sm:text-sm'>
                                <th className='p-2 max-lg:hidden block'>S.No</th>
                                <th className='p-2  max-lg:hidden'>Company</th>
                                <th className='p-2 '>Job Title</th>
                                <th className='max-md:hidden p-2 '>Location</th>
                                <th className='p-2 '>Status</th>
                                <th className='max-lg:hidden p-2 '>Applied On</th>
                            </tr>
                        </thead>
                        <tbody className='max-sm:text-sm font-medium text-left'>
                            {

                                appliedJobs.map((job, i) => {
                                    return <tr key={job._id} className='max-sm:text-sm'>
                                        <td className=' my-3 px-3 max-lg:hidden block'>{i + 1}</td>
                                        <td className=' max-lg:hidden '>{job.job[0].companyData.name}</td>
                                        <td className=' max-sm:text-wrap'>{job.job[0].jobTitle}</td>
                                        <td className=' max-md:hidden'>{job.job[0].location}</td>
                                        <td className={`${job.status == 'Pending' ? 'text-blue-500' : job.status == 'Accept' ? 'text-green-600' : 'text-red-500'}  font-semibold`}>{job.status == 'Accept' ? 'Accpeted' : job.status == 'Reject' ? 'Rejected' : job.status}</td>
                                        <td className=' max-lg:hidden px-3'>{moment(job.createdAt).format('DD-MMM-YY')}</td>
                                    </tr>

                                })
                            }
                        </tbody>
                    </table>
            }
            {
                appliedJobs.length == 0 ? <p className='text-xl font-semibold text-center text-blue-600'>You have not applied any jobs</p> : ''
            }
        </div>
    )
}

export default AppliedJobs
