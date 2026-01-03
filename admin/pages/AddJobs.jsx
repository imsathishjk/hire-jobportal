import React, { useState } from 'react'
import { TbCircleDashedPlus } from "react-icons/tb";
import { JobCategories, JobLocations } from '../src/assets/assets.js';
import { FaXmark } from 'react-icons/fa6'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'



const AddJobs = () => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [subtitle2, setSubtitle2] = useState('');
    const [points1, setPoints1] = useState(['']);
    const [points2, setPoints2] = useState(['']);
    const [level, setLevel] = useState('');
    const [category, setCategory] = useState('')
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('1-3');
    const [type, setType] = useState('');

    const backendUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();


    const handleAddJob = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/company/add-job`, { jobTitle, jobDescription, category, level, salary, points1, points2, subtitle, subtitle2, type, location }, { withCredentials: true })
            if (data.success) {
                toast.success(data.msg);
                setJobTitle('');
                setJobDescription('');
                setLevel('');
                setSubtitle('');
                setSubtitle2('');
                setSalary('');
                setType('');
                setLocation('');
                setPoints1(['']);
                setPoints2(['']);
                setCategory('');
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message)
        }
    }
    const handlePoint1Change = (value, index) => {
        let updatePoints = [...points1]
        updatePoints[index] = value;
        setPoints1(updatePoints);
    }
    const handlePoint2Change = (index, value) => {
        let updatePoints = [...points2]
        updatePoints[index] = value;
        setPoints2(updatePoints);
    }


    const handleIsAuth = async () => {
        const { data } = await axios.get(`${backendUrl}/company/is-auth`, { withCredentials: true });
        if (data.success) {
            return;
        } else {
            navigate('/');
        }
    }

    useEffect(() => {
        handleIsAuth();
    }, []);
    return (
        <div className='my-5'>
            <div className='flex flex-col gap-6 max-w-4xl'>
                <div className=''>
                    <h1 className='font-semibold max-sm:text-sm'>Job Title</h1>
                    <input required onChange={(e) => setJobTitle(e.target.value)} value={jobTitle} type="text" placeholder='Enter Title' className='w-full border border-blue-300 p-2.5 placeholder:font-medium text-sm mt-2 rounded-md font-medium' />
                </div>
                <div className=''>
                    <h1 className='font-semibold max-sm:text-sm'>Job Description</h1>
                    <textarea required onChange={(e) => setJobDescription(e.target.value)} value={jobDescription} name="" id="" placeholder='About this job' className='w-full border border-blue-300 p-2.5 placeholder:font-medium text-sm mt-2 rounded-md font-medium'></textarea>
                </div>
                <div className=''>
                    <h1 className='font-semibold max-sm:text-sm'>Subtitle 1</h1>
                    <input required onChange={(e) => setSubtitle(e.target.value)} value={subtitle} type="text" placeholder='Responsiblities/ Requirements' className='w-full border border-blue-300 p-2.5 placeholder:font-medium text-sm mt-2 rounded-md font-medium' />
                    <div className='flex max-lg:flex-col flex-row gap-3 flex-wrap max-lg:items-start items-end mt-5'>
                        {
                            points1.map((point1, i) => {
                                return (
                                    <div key={i} className='flex-1'>
                                        <p className='font-semibold max-sm:text-sm'>Points {i + 1}</p>
                                        <input required onChange={(e) => handlePoint1Change(e.target.value, i)} value={point1} type="text" placeholder='Enter Text' className='w-full border border-blue-300 p-2.5 placeholder:font-medium text-sm mt-2 rounded-md font-medium' />
                                    </div>
                                )
                            })
                        }
                        <button onClick={() => setPoints1([...points1, ''])} className='text-2xl font-bold text-blue-500 cursor-pointer pb-2'><TbCircleDashedPlus /></button>

                    </div>
                </div>
                <div className=''>
                    <h1 className='font-semibold max-sm:text-sm'>Subtitle 2</h1>
                    <input required onChange={(e) => setSubtitle2(e.target.value)} value={subtitle2} type="text" placeholder='Key Skills' className='w-full border border-blue-300 p-2.5 font-medium placeholder:font-medium text-sm mt-2 rounded-md' />
                    <div className='flex max-lg:flex-col flex-row gap-3 flex-wrap items-end max-lg:items-start mt-5'>
                        {
                            points2.map((point2, i) => {
                                return (
                                    <div key={i} className='flex-1'>
                                        <p className='font-semibold max-sm:text-sm'>Points {i + 1}</p>
                                        <input required onChange={(e) => handlePoint2Change(i, e.target.value)} value={point2} type="text" placeholder='Enter Text' className='font-medium w-full border border-blue-300 p-2.5 placeholder:font-medium text-sm mt-2 rounded-md' />
                                    </div>
                                )
                            })
                        }
                        <button onClick={() => setPoints2([...points2, ''])} className='text-2xl font-bold text-blue-500 cursor-pointer pb-2'><TbCircleDashedPlus /></button>

                    </div>
                </div>
                <div className='flex flex-wrap items-start gap-5 md:gap-8 lg:gap-16 w-full '>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-semibold max-sm:text-sm'>Job Category</h1>
                        <select className='border border-blue-300 p-1.5 rounded-md font-medium text-blue-600 cursor-pointer' value={category} required onChange={(e) => setCategory(e.target.value)}>
                            {
                                JobCategories.map((c, i) => {
                                    return <option value={c} key={i}>{c}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-semibold max-sm:text-sm'>Job Location</h1>
                        <select className='border border-blue-300 p-1.5 rounded-md font-medium text-blue-600 cursor-pointer' value={location} required onChange={(e) => setLocation(e.target.value)} >
                            {
                                JobLocations.map((l, i) => {
                                    return <option value={l} key={i}>{l}</option>
                                })
                            }
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-semibold max-sm:text-sm'>Job Level</h1>
                        <select className='border border-blue-300 p-1.5 rounded-md font-medium text-blue-600 cursor-pointer' value={level} required onChange={(e) => setLevel(e.target.value)}>
                            <option value=""></option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-semibold max-sm:text-sm'>Job Type</h1>
                        <select className='border border-blue-300 p-1.5 rounded-md font-medium text-blue-600 cursor-pointer' value={type} required onChange={(e) => setType(e.target.value)}>
                            <option value=""></option>
                            <option value="Full-time">Full-time</option>
                            <option value="Part-time">Part-time</option>
                            <option value="Freelancer">Freelancer</option>
                        </select>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='font-semibold max-sm:text-sm'>Job Salary</h1>
                        <select className='border border-blue-300 p-1.5 rounded-md font-medium text-blue-600 cursor-pointer' required onChange={(e) => setSalary(e.target.value)} name="" value={salary} id="">
                            <option value="1-3">1-3</option>
                            <option value="3-5">3-5</option>
                            <option value="5-8">5-8</option>
                            <option value="8-10">8-10</option>
                            <option value="10-12">10-12</option>
                            <option value="12-14">12-14</option>
                        </select>
                    </div>
                </div>
                <button onClick={handleAddJob} className='border border-blue-500 rounded-md p-2 max-w-32 font-semibold hover:bg-blue-500 hover:text-white cursor-pointer transition-colors duration-300 ease-in-out'>Add</button>
            </div>
        </div>
    )
}

export default AddJobs
