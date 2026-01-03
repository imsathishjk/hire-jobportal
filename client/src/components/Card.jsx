import React, { useContext, useEffect, useState } from 'react';
import { MdBookmarkBorder } from "react-icons/md";
import { MdBookmark } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa6";
import { PiSuitcaseSimple } from "react-icons/pi";
import AppContext from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Card = ({ title, location, level, description, id, companyImage, companyId }) => {
    const navigate = useNavigate();
    const { backendUrl, savedJobs, handleFetchSavedJobs, userData, userLoggedIn } = useContext(AppContext);

    const handleSaveBookMark = async () => {
        try {
            const { data } = await axios.put(`${backendUrl}/user/job/saved/${id}/${companyId}`, { withCredentials: true })
            if (data.isSaved == true || data.isSaved == false) {
                handleFetchSavedJobs();
                toast.success(data.msg);
            } else {
                toast.error(data.msg);
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err)
        }
    }



    return (
        <div className='cursor-pointer border border-gray-100 group
        bg-gradient-to-b from-blue-50 to-blue-100
        flex flex-col gap-3 rounded-md shadow p-3 transform hover:scale-[1.03] transition-all ease-in-out duration-300'>
            <div className='flex items-center gap-3 justify-between'>
                <img src={companyImage} alt={title} className='w-14' />
                {
                    savedJobs.length > 0 && userLoggedIn && savedJobs.some((job) => job.jobId == id && job.companyId == companyId && job.userId == userData?._id)
                        ? <MdBookmark onClick={handleSaveBookMark} className='text-blue-600 cursor-pointer' /> : <p><MdBookmarkBorder onClick={handleSaveBookMark} className='text-lg text-blue-400 cursor-pointer' /></p>

                }

            </div>

            <div className='flex flex-wrap justify-between gap-1.5 px-3'>
                <h1 className='font-bold text-blue-600 text-lg'>{title}</h1>
                <p className={`flex text-nowrap items-center gap-1 ${level == 'Beginner Level' ? 'text-yellow-600 border border-yellow-400 bg-yellow-100' : level == 'Intermediate Level' ? 'text-pink-600 border border-pink-200 bg-pink-50' : 'text-violet-600 border border-violet-200 bg-violet-50'} text-[12px] font-medium  p-1 rounded-md`}>
                    <PiSuitcaseSimple />
                    {level}</p>
                <p className='text-[12px] text-nowrap font-medium text-blue-600 border border-blue-200 bg-blue-50 p-1 rounded-md flex items-center gap-1.5'><FaLocationArrow /> {location}</p>
            </div>
            <div className='text-sm font-medium tracking-wide px-3'>
                <p>{description?.slice(0, 200)}...</p>
            </div>
            <button onClick={() => navigate(`/job/${id}`, scrollTo(0, 0))} className='font-semibold text-sm cursor-pointer border border-blue-300 bg-blue-50 text-blue-600 p-1.5 rounded-md self-end group-hover:bg-blue-600 group-hover:text-white'>Show Details</button>
            {/* <div className='flex items-center p-2'>

                <button className='font-semibold text-sm cursor-pointer bg-blue-700 text-white rounded-md p-1.5'>Apply Now</button>
            </div> */}
        </div>
    )
}

export default Card;
