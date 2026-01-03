import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaHireAHelper } from 'react-icons/fa';
import { LuSquarePlus } from "react-icons/lu";
import { RiAddBoxFill } from "react-icons/ri";
import { RiHomeSmile2Line } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { RiImageEditLine } from "react-icons/ri";
import AdminLogin from '../components/AdminLogin';
import axios from 'axios';
import toast from 'react-hot-toast';
import Loader from '../components/Loader';
const Admin = () => {


    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [login, setLogin] = useState('Signup');
    const [showOptions, setShowOpions] = useState(false);
    const [showUpload, setShowUpload] = useState(false);
    const [image, setImage] = useState('');
    const [companyData, setCompanyData] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();
    const backendUrl = import.meta.env.VITE_API_URL;



    const handleUserData = async () => {
        const { data } = await axios.get(`${backendUrl}/company/data`, { withCredentials: true });
        if (data.success) {
            setCompanyData(data.data);
        }
    }


    const handleIsAuth = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${backendUrl}/company/is-auth`, { withCredentials: true });
            if (data.success) {
                await handleUserData();
                setUserLoggedIn(true);
                navigate('/add-job');
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err)
        }
    }
    const handleChangeProfile = async () => {
        try {
            const formData = new FormData()
            formData.append('image', image)
            const { data } = await axios.put(`${backendUrl}/company/update-profile`, formData, { withCredentials: true })
            if (data.success) {
                toast.success(data.msg);
                showOptions(false);
                handleUserData();
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    const handleLogout = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/company/logout`)
            if (data.success) {
                toast.success(data.msg);
                setShowOpions(false);
                setCompanyData(null);
                setUserLoggedIn(false);
                navigate('/');
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        handleIsAuth();
    }, []);

    return (
        <div className='relative px-4 sm:px-8 md:px-12'>
            <div className='flex items-center justify-between border-b border-b-gray-200 py-2 sticky top-0 bg-white z-50'>
                <h1 className='flex items-center text-2xl md:text-3xl lg:text-4xl font-bold font-[Playfair]  select-none cursor-pointer
             bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-blue-500 '>
                    <FaHireAHelper className='text-blue-500 text-xl md:text-2xl lg:text-3xl' /> ire</h1>
                <div className='flex items-center gap-5 relative'>
                    {loading ? <Loader /> : <h1 className={`max-sm:text-sm font-semibold text-blue-600`}>Hi, {companyData?.username || 'Admin'}</h1>}
                    {
                        companyData ? <img onClick={() => setShowOpions(!showOptions)} src={companyData?.image} className='w-10 h-10 rounded-full object-cover cursor-pointer' /> :
                            ""
                    }
                    {
                        showOptions && (
                            <div className='absolute top-12 right-5 flex flex-col items-start bg-gray-50 p-3 rounded-md gap-2 w-40'>
                                {showUpload && (
                                    <div>
                                        <input type="file" accept='/image*' onChange={(e) => setImage(e.target.files[0])} className='text-sm font-medium' />
                                        {image && (<img src={URL.createObjectURL(image)} className='w-8 h-8' />)}
                                        <button onClick={handleChangeProfile} className='cursor-pointer font-medium text-violet-500 flex items-center gap-1'>Update Logo</button>
                                    </div>
                                )}
                                {!showUpload && (<button onClick={() => setShowUpload(true)} className='cursor-pointer font-medium text-blue-600 flex items-center gap-1'><RiImageEditLine className='text-xl' /> Change Logo</button>)}
                                <button onClick={handleLogout} className='cursor-pointer font-medium text-blue-600 flex items-center gap-1'><MdLogout className='text-xl' /> Logout</button>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='flex items-start gap-3 lg:gap-12'>
                <div className='flex flex-col gap-5 pt-5 border-r border-r-blue-300 h-screen'>
                    <NavLink to={'/add-job'} className={({ isActive }) => `flex items-center gap-2 font-semibold p-1 py-3 pr-4  max-sm:text-sm transition-colors duration-300 ease-linear ${isActive ? ' border-r-4 border-r-blue-500 bg-blue-100 text-blue-500' : ''}`}><span><LuSquarePlus className='text-lg' /></span><span className='max-lg:hidden'>Add Job</span></NavLink>
                    <NavLink to={'/manage-jobs'} className={({ isActive }) => `flex items-center gap-2 font-semibold p-1 py-3 pr-4  max-sm:text-sm transition-colors duration-300 ease-linear ${isActive ? ' border-r-4 border-r-blue-500 bg-blue-100 text-blue-500' : ''}`}><span><RiHomeSmile2Line className='text-lg' /></span><span className='max-lg:hidden'>Manage Jobs</span></NavLink>
                    <NavLink to={'/view-applicants'} className={({ isActive }) => `flex items-center gap-2 font-semibold p-1 py-3 pr-4  max-sm:text-sm transition-colors duration-300 ease-linear ${isActive ? ' border-r-4 border-r-blue-500 bg-blue-100 text-blue-500' : ''}`}><span><RiUserFollowLine className='text-lg' /></span><span className='max-lg:hidden'>View Applications</span></NavLink>
                </div>
                <div className='flex-1 h-screen overflow-y-scroll no-scroll'>

                    {
                        !userLoggedIn && location.pathname == '/' && (<AdminLogin login={login} setLogin={setLogin} showLogin={showLogin} setShowLogin={setShowLogin} setCompanyData={setCompanyData} setUserLoggedIn={setUserLoggedIn} />)

                    }
                    <Outlet />

                </div>
            </div>
        </div >
        // border-r-4 border-r-blue-500 bg-blue-100
    )
}

export default Admin;
