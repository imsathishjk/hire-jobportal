import React, { useContext } from 'react'
import { FaHireAHelper } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import AppContext from '../context/AppContext';
import { RiHome6Line } from "react-icons/ri";
import { RiStarSmileFill } from "react-icons/ri";
import { RiSendPlaneFill } from "react-icons/ri";
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RiDownloadCloud2Line } from "react-icons/ri";


const Navbar = () => {

    const navigate = useNavigate();
    const { showLogin, setShowLogin, userData, backendUrl, handleUserData, setUserLoggedIn, setUserData, userLoggedIn, loginType } = useContext(AppContext);

    const [userOptions, setUserOptions] = useState(false);
    const [resume, setResume] = useState('');


    const handleLogout = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/user/logout`, {}, { withCredentials: true });
            console.log(data)
            if (data.success) {
                toast.success(data.msg);
                setUserData(null);
                setUserLoggedIn(false);
                setUserOptions(false);
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const handleUploadResume = async () => {
        try {
            const formData = new FormData();
            formData.append('resume', resume);
            const { data } = await axios.post(`${backendUrl}/user/upload-resume`, formData, { withCredentials: true });
            if (data.success) {
                setResume('');
                handleUserData();
                setUserOptions(false);
                toast.success(data.msg);
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className='flex items-center justify-between py-3 z-50 bg-white sticky top-0 sm:px-6 w-full'>
            <h1 onClick={() => navigate('/')} className='flex items-center text-2xl md:text-3xl lg:text-4xl font-bold font-[Playfair]  select-none cursor-pointer
             bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-blue-500 
            '><FaHireAHelper className='text-blue-500 text-xl md:text-2xl lg:text-3xl' /> ire</h1>
            <div className='flex items-center justify-between gap-12 relative'>
                <ul className='max-md:hidden md:inline-flex gap-8'>
                    <li onClick={() => navigate('/')} className='max-sm:text-sm font-semibold text-[16px] cursor-pointer flex items-center gap-1'><RiHome6Line className='text-lg text-blue-400' /> Home</li>
                    <li onClick={() => navigate('/saved-jobs', scrollTo(0, 0))} className='max-sm:text-sm font-semibold text-[16px] cursor-pointer flex items-center gap-1'><RiStarSmileFill className='text-lg text-blue-400' /> Saved Jobs</li>
                    <li onClick={() => (navigate('/applied-jobs'))} className='max-sm:text-sm font-semibold text-[16px] cursor-pointer flex items-center gap-1'><RiSendPlaneFill className='text-lg text-blue-400' /> Applied Jobs</li>
                </ul>
                {
                    userData && userLoggedIn && (
                        <div className='flex items-center gap-5'>
                            <h1 className={`max-sm:text-sm font-semibold text-blue-600`}>Hi, {userData?.username}</h1>
                            {
                                userLoggedIn && userData ? <img onClick={() => setUserOptions(!userOptions)} src={userData.image} className='w-10 h-10 rounded-full object-cover cursor-pointer' /> :
                                    <FaUser onClick={() => setUserOptions(true)} className='w-10 h-10 rounded-full object-cover cursor-pointer' />
                            }
                        </div>
                    )
                }
                {
                    !userLoggedIn && (
                        <button onClick={() => { setShowLogin(true), navigate('/', scrollTo(0, 0)) }} className='bg-gradient-to-br from-blue-500 to-blue-600 text-white py-2 px-4 font-bold rounded-full cursor-pointer'>Login</button>
                    )
                }
                {
                    userOptions && userData && (
                        <ul className='flex flex-col gap-3 items-start absolute top-11 bg-gradient-to-t from-blue-100 to-right-200 border border-blue-300 rounded-md right-5 p-3 z-30 backdrop-blur-lg'>
                            <li className='font-semibold text-blue-600 max-sm:block hidden cursor-pointer max-sm:text-sm'>Applied Jobs</li>
                            <li className='font-semibold text-blue-600 max-sm:block hidden cursor-pointer max-sm:text-sm'>Saved Jobs</li>
                            {userData.isUser && userData.resume && !resume && (<a href={userData.resume} download={`${userData.username}_resume.pdf`} rel='noopener noreferrer' target='_blank'
                                className='flex items-center gap-1 font-semibold'
                            >Download Resume <RiDownloadCloud2Line /></a>)}
                            {
                                !userData.isAdmin && (
                                    <li className='font-semibold text-blue-600 cursor-pointer max-sm:text-sm flex flex-col gap-1.5'>
                                        {resume ? <span className='text-sm'>{resume?.name}</span> : ''}
                                        {
                                            !resume ? <span><input onChange={(e) => setResume(e.target.files[0])} type="file" accept='/pdf*' hidden id='input' />
                                                <label className='cursor-pointer' htmlFor="input">{userData.resume ? 'Edit Resume' : 'Upload Resume'}</label></span> : ""
                                        }
                                    </li>
                                )
                            }
                            {resume ? <li onClick={handleUploadResume} className='max-sm:text-sm font-semibold cursor-pointer text-blue-600'>Upload Resume</li> : ""}
                            {userData.isAdmin && (<li onClick={() => navigate('/admin/add-job', scrollTo(0, 0))} className='cursor-pointer max-sm:text-sm text-blue-600'>Admin Panel</li>)}
                            <li onClick={handleLogout} className='font-semibold text-blue-600 cursor-pointer max-sm:text-sm'>Logout</li>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar
