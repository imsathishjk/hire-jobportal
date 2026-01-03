import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { FaLocationArrow } from "react-icons/fa6";
import { TiUserOutline } from "react-icons/ti";
import axios from 'axios'
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';


const ManageJobs = () => {

    const [manageJobsData, setManageJobsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userApplications, setUserApplications] = useState([]);
    const [category, setCategory] = useState('');
    const [categoryFilteredJobs, setCategoryFilteredJobs] = useState([]);
    const [locationFilteredJobs, setLocationFilteredJobs] = useState([]);
    const [activeJobs, setActiveJobs] = useState([]);
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('');
    const backendUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const fetchAllCompanyJobs = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/company/company-jobs`, { withCredentials: true })
            if (data.success) {
                setManageJobsData(data.data);
                setLoading(false);
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    const filteredByCategory = () => {
        if (category == 'All') {
            setCategoryFilteredJobs(manageJobsData);
        }
        const data = manageJobsData.filter((job) => job.category == category);
        setCategoryFilteredJobs(data);
    }

    const filteredByLocation = () => {
        if (location == 'All') {
            setLocationFilteredJobs(manageJobsData);
        }
        const data = manageJobsData.filter((job) => job.location == location);
        setLocationFilteredJobs(data);
    }

    const handleActiveJobs = () => {
        if (status == 'All') {
            setActiveJobs(manageJobsData)
        }
        if (status == 'Active') {
            const data = manageJobsData.filter((job) => job.visible == true)
            setActiveJobs(data)
        }
        if (status == 'InActive') {
            const data = manageJobsData.filter((job) => job.visible == false)
            setActiveJobs(data);
        }
    }


    const handleApplicants = async () => {
        const { data } = await axios.get(`${backendUrl}/company/applicants`, { withCredentials: true });
        if (data.success) {
            setUserApplications(data.data);
        }
    }
    const handleApplicantCount = (id) => {
        return userApplications.filter((job) => job.jobId == id).length
    }

    const handleIsAuth = async () => {
        const { data } = await axios.get(`${backendUrl}/company/is-auth`, { withCredentials: true });
        if (data.success) {
            fetchAllCompanyJobs();
        } else {
            navigate('/');
        }
    }
    const handleShowActive = async (id) => {
        try {
            const { data } = await axios.put(`${backendUrl}/company/job/visibility/${id}`, {}, { withCredentials: true })
            if (data.success) {
                fetchAllCompanyJobs();
                toast.success(data.msg)
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        handleIsAuth();
        handleApplicants();
    }, [])
    useEffect(() => {
        filteredByCategory();
        filteredByLocation();
        handleActiveJobs();
    }, [category, location, status]);

    return (
        <div className='my-5'>
            {/* Filters */}
            <div className='flex max-lg:flex-wrap justify-between gap-4 md:gap-8 lg:gap-12'>
                <h1 className='font-semibold'>Filters:</h1>
                <select onChange={(e) => setCategory(e.target.value)} className='max-sm:text-sm font-medium border border-gray-200 p-2 rounded'>
                    <option value="All">All</option>
                    {
                        manageJobsData.map((job, i) => {
                            return <option value={job.category} key={i}>{job.category}</option>
                        })
                    }
                </select>
                <select onChange={(e) => setLocation(e.target.value)} className='max-sm:text-sm font-medium border border-gray-200 p-2 rounded'>
                    <option value="All">All</option>
                    {
                        manageJobsData.map((job, i) => {
                            return <option value={job.location} key={i}>{job.location}</option>
                        })
                    }
                </select>
                <select onChange={(e) => setStatus(e.target.value)} className='max-sm:text-sm font-medium border border-gray-200 p-2 rounded'>
                    <option value="All">All</option>
                    <option value="Active">Active</option>
                    <option value="InActive">InActive</option>

                </select>
            </div>
            {/* Contents */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 mt-12'>
                {
                    loading ? <Loader /> : categoryFilteredJobs.length == 0 && locationFilteredJobs.length == 0 && activeJobs.length == 0 && manageJobsData?.map((job, i) => {
                        return <div key={i} className='border-2 border-gray-300 rounded-lg'>
                            <div className='flex flex-col items-start gap-3 bg-gray-50 font-semibold p-3 rounded-ss-lg rounded-se-lg'>
                                <h1 className='text-blue-600'> {job.jobTitle}</h1>
                                <p className='text-red-600  text-sm'><span className='text-black'>Posted On:</span> {moment(job.createdAt).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className='flex flex-wrap items-center justify-between py-5 px-3 gap-4'>
                                <div className='flex flex-row max-lg:flex-col gap-5 lg:items-center'>
                                    <p className='flex items-center gap-1 text-sm font-medium'><FaLocationArrow className='text-blue-500' /> {job.location}</p>
                                    <p className='flex items-center gap-1 text-sm font-medium'><TiUserOutline className='text-blue-500 text-lg' /> No.of.Applications: <span className='font-semibold text-lg'>
                                    </span> {handleApplicantCount(job._id)}</p>
                                </div>
                                <p onClick={() => handleShowActive(job._id)} className={`${job.visible ? 'text-green-600' : 'text-red-600'} font-semibold cursor-pointer max-md:mt-5  p-1.5 px-3 rounded-md border border-blue-400`}>{job.visible ? 'Active' : 'InActive'}</p>
                            </div>
                        </div>
                    })
                }
                {
                    loading ? <Loader /> : categoryFilteredJobs.map((job, i) => {
                        return <div key={i} className='border-2 border-gray-300 rounded-lg'>
                            <div className='flex flex-col items-start gap-3 bg-gray-50 font-semibold p-3 rounded-ss-lg rounded-se-lg'>
                                <h1 className='text-blue-600'> {job.jobTitle}</h1>
                                <p className='text-red-600  text-sm'><span className='text-black'>Posted On:</span> {moment(job.createdAt).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className='flex flex-wrap items-center justify-between py-5 px-3 gap-4'>
                                <div className='flex flex-row max-lg:flex-col gap-5 lg:items-center'>
                                    <p className='flex items-center gap-1 text-sm font-medium'><FaLocationArrow className='text-blue-500' /> {job.location}</p>
                                    <p className='flex items-center gap-1 text-sm font-medium'><TiUserOutline className='text-blue-500 text-lg' /> No.of.Applications: <span className='font-semibold text-lg'>
                                    </span> {handleApplicantCount(job._id)}</p>
                                </div>
                                <p onClick={() => handleShowActive(job._id)} className={`${job.visible ? 'text-green-600' : 'text-red-600'} font-semibold cursor-pointer max-md:mt-5  p-1.5 px-3 rounded-md border border-blue-400`}>{job.visible ? 'Active' : 'InActive'}</p>
                            </div>
                        </div>
                    })
                }
                {
                    loading ? <Loader /> : locationFilteredJobs.map((job, i) => {
                        return <div key={i} className='border-2 border-gray-300 rounded-lg'>
                            <div className='flex flex-col items-start gap-3 bg-gray-50 font-semibold p-3 rounded-ss-lg rounded-se-lg'>
                                <h1 className='text-blue-600'> {job.jobTitle}</h1>
                                <p className='text-red-600  text-sm'><span className='text-black'>Posted On:</span> {moment(job.createdAt).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className='flex flex-wrap items-center justify-between py-5 px-3 gap-4'>
                                <div className='flex flex-row max-lg:flex-col gap-5 lg:items-center'>
                                    <p className='flex items-center gap-1 text-sm font-medium'><FaLocationArrow className='text-blue-500' /> {job.location}</p>
                                    <p className='flex items-center gap-1 text-sm font-medium'><TiUserOutline className='text-blue-500 text-lg' /> No.of.Applications: <span className='font-semibold text-lg'>
                                    </span> {handleApplicantCount(job._id)}</p>
                                </div>
                                <p onClick={() => handleShowActive(job._id)} className={`${job.visible ? 'text-green-600' : 'text-red-600'} font-semibold cursor-pointer max-md:mt-5  p-1.5 px-3 rounded-md border border-blue-400`}>{job.visible ? 'Active' : 'InActive'}</p>
                            </div>
                        </div>
                    })
                }
                {
                    loading ? <Loader /> : activeJobs.map((job, i) => {
                        return <div key={i} className='border-2 border-gray-300 rounded-lg'>
                            <div className='flex flex-col items-start gap-3 bg-gray-50 font-semibold p-3 rounded-ss-lg rounded-se-lg'>
                                <h1 className='text-blue-600'> {job.jobTitle}</h1>
                                <p className='text-red-600  text-sm'><span className='text-black'>Posted On:</span> {moment(job.createdAt).format('DD-MMM-YYYY')}</p>
                            </div>
                            <div className='flex flex-wrap items-center justify-between py-5 px-3 gap-4'>
                                <div className='flex flex-row max-lg:flex-col gap-5 lg:items-center'>
                                    <p className='flex items-center gap-1 text-sm font-medium'><FaLocationArrow className='text-blue-500' /> {job.location}</p>
                                    <p className='flex items-center gap-1 text-sm font-medium'><TiUserOutline className='text-blue-500 text-lg' /> No.of.Applications: <span>{handleApplicantCount(job._id)}</span></p>
                                </div>
                                <p onClick={() => handleShowActive(job._id)} className={`${job.visible ? 'text-green-600' : 'text-red-600'} font-semibold cursor-pointer max-md:mt-5  p-1.5 px-3 rounded-md border border-blue-400`}>{job.visible ? 'Active' : 'InActive'}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default ManageJobs
