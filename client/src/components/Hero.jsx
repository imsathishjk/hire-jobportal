import React, { useContext, useRef, useState } from 'react'
import AppContext from '../context/AppContext';
import { FiSearch } from "react-icons/fi";
import { FaLocationArrow } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import profiles from '../assets/profile card.webp';
import { GoVerified } from "react-icons/go";
import { IoIosMail } from "react-icons/io";

const Hero = () => {
    const { handleSearchHistory } = useContext(AppContext);
    const [jobTitle, setJobTitle] = useState('');
    const [location, setLocation] = useState('');

    return (
        <div className='md:p-5 flex flex-col gap-12 mt-6 md:mt-8 lg:mt-14 xl:mt-20'>

            {/* Hero Content */}
            <div className='flex flex-col gap-2 text-center'>
                <h1 className='font-bold  text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-blue-500 '>Discover Jobs That Fit You</h1>
                <p className='max-sm:text-sm font-semibold'>Search thousands of openings, apply instantly, and grow your career with ease.</p>
            </div>

            {/* Cards */}
            <div className='flex flex-wrap justify-around gap-5'>
                <div className='flex items-center  md:justify-center gap-5 bg-white p-3 rounded shadow grow text-black border border-yellow-300'>
                    <div className='w-8 h-8 bg-yellow-100 flex items-center justify-center rounded border border-yellow-300'>
                        <FiUpload className='text-xl text-yellow-500' />
                    </div>
                    <div>
                        <h1 className='max-sm:text-sm font-semibold'>Upload Your CV</h1>
                        <p className='max-sm:text-sm font-medium'>It only takes a few seconds</p>
                    </div>
                </div>
                <div className='bg-white p-3 rounded grow flex flex-col md:items-center shadow text-black border border-violet-300'>
                    <h1 className='max-sm:text-sm font-semibold text-violet-500'>10K+ Candidates</h1>
                    <img src={profiles} alt="profilescard" className='w-32' />
                </div>
                <div className='flex items-center  md:justify-center gap-5 bg-white p-3 rounded shadow grow text-black border border-green-300'>
                    <div className='w-8 h-8 bg-green-100 flex items-center justify-center rounded border border-green-300'>
                        <GoVerified className='text-2xl text-green-500' />
                    </div>
                    <div>
                        <h1 className='max-sm:text-sm font-semibold'>Global Level Patners</h1>
                        <p className='max-sm:text-sm font-medium'>100% verified</p>
                    </div>
                </div>
                <div className='flex items-center  md:justify-center gap-5 bg-white p-3 rounded shadow grow text-black border border-red-300'>
                    <div className='w-8 h-8 bg-red-100 flex items-center justify-center rounded border border-red-300'>
                        <IoIosMail className='text-2xl text-red-500' />
                    </div>
                    <div>
                        <h1 className='max-sm:text-sm font-semibold'>Faster Response</h1>
                        <p className='max-sm:text-sm font-medium'>Get response within 24 Hours</p>
                    </div>
                </div>
            </div>

            {/* Search Content */}
            <div className='flex flex-wrap justify-between gap-3 md:border md:border-blue-300 rounded-ee-full rounded-se-full max-w-2xl mx-auto w-full'>
                <div className='flex items-center max-md:flex-1 max-md:border max-md:border-blue-400 pl-2'>
                    <FiSearch className='text-blue-500 text-lg' />
                    <input required value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} type="text" placeholder='Job Title or keywords or company' className=' flex-1 bg-transparent outline-none p-3 placeholder:text-gray-500 placeholder:text-sm text-purple-500 font-medium md:border-none' />
                </div>
                <div className='flex items-center max-md:flex-1 max-md:border max-md:border-blue-400 pl-2'>
                    <FaLocationArrow className='text-blue-500 text-lg' />
                    <input required value={location} onChange={(e) => setLocation(e.target.value)} type="text" placeholder='Search By City' className='bg-transparent p-3 flex-1  outline-none placeholder:text-gray-500 placeholder:text-sm text-purple-500 font-medium md:border-none' />
                </div>
                <button onClick={() => handleSearchHistory(jobTitle, location, setJobTitle, setLocation)} className='cursor-pointer max-sm:text-sm font-bold px-5 rounded-ee-full rounded-se-full border-none bg-blue-500 text-white max-md:p-2 max-md:w-full'>Search</button>
            </div>

        </div>
    )
}

export default Hero
