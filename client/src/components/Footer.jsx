import React from 'react'
import { FaHireAHelper } from 'react-icons/fa'
import appstore from '../assets/app-store.png'
import android from '../assets/android.png';

const Footer = () => {
    return (
        <div className='border-t border-t-gray-200 py-3'>
            <div className='flex max-sm:flex-col md:items-center md:justify-between max-sm:gap-3'>
                <div>
                    <h1 className='flex items-center text-2xl md:text-3xl lg:text-4xl font-bold font-[Playfair]  select-none cursor-pointer
                             bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-blue-500 
                            '><FaHireAHelper className='text-blue-500 md:text-2xl lg:text-3xl' /> ire</h1>
                    <p className='text-sm text-gray-700 font-semibold'>Search thousands of openings, apply instantly, and grow your career with ease.</p>
                </div>
                <div>
                    <h1 className='max-sm:text-sm font-semibold'>Download App</h1>
                    {/* <p>Now you can apply jobs easily with smartphones anywhere and anytime.</p> */}
                    <div className='flex items-center gap-5 mt-3'>
                        <img src={appstore} alt="app-store" />
                        <img src={android} alt="android-store" />
                    </div>
                </div>
            </div>

            <div className='flex max-sm:flex-col flex-row max-sm:gap-3 md:justify-between mt-5'>
                <h1 className='font-semibold text-sm'>Copyright &copy; {new Date().getFullYear()}. <span>All Rights Reserved</span></h1>
                <ul className='flex justify-between gap-12 font-semibold text-sm text-gray-600'>
                    <li>Privacy Policy</li>
                    <li>Terms & Conditions</li>
                    <li>Security</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer
