import React, { useContext } from 'react';
import { JobCategories, JobLocations } from '../assets/assets';
import AppContext from '../context/AppContext';
import { IoCloseSharp } from "react-icons/io5";
import { PiSuitcaseSimple } from "react-icons/pi";
import { FaLocationArrow } from "react-icons/fa6";


const Filters = () => {
    const { setCategoryLocation, setCategory, searchHistory, setSearchHistory, error, setError, setSearchedJobs } = useContext(AppContext);

    return (
        <div className='mt-8 lg:mt-14 xl:mt-20'>
            <h1 className='text-center font-bold text-xl'>Latest jobs for you</h1>
            {/* Categories */}
            <div className='flex max-sm:flex-wrap gap-20 mt-5 md:mt-12 mb-5'>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                    <h1 className='max-sm:text-sm font-semibold'>Categories:</h1>
                    <select onChange={(e) => setCategory(e.target.value)} className='text-blue-600 font-semibold max-sm:text-sm cursor-pointer border border-blue-400 p-1.5 rounded'>
                        {
                            JobCategories.map((c, i) => {
                                return (

                                    <option key={i} value={c}>{c}</option>

                                )
                            })
                        }
                    </select>
                </div>
                {/* Locations */}
                <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
                    <h1 className='max-sm:text-sm font-semibold'>Locations:</h1>
                    <select onChange={(e) => setCategoryLocation(e.target.value)} className='text-blue-600 font-semibold max-sm:text-sm cursor-pointer border border-blue-400 p-1.5 rounded'>
                        {
                            JobLocations.map((l, i) => {
                                return (
                                    <option key={i} value={l}>{l}</option>
                                )
                            })
                        }
                    </select>
                </div>

            </div>
            {/* Search History */}
            {

                searchHistory.title && searchHistory.location && (
                    <div className='flex items-center gap-1.5'>
                        <h1 className='font-semibold max-sm:text-sm'>Last Search:</h1>
                        <span className='text-sm font-medium border border-gray-200 p-1.5 rounded-md flex items-center gap-0.5 text-blue-500'><PiSuitcaseSimple className='text-sm' /> {searchHistory.location}</span>
                        <span className='text-sm font-medium border border-gray-200 p-1.5 rounded-md flex items-center gap-0.5 text-violet-500'><FaLocationArrow className='text-sm' /> {searchHistory.title}</span>
                        <span className='cursor-pointer' onClick={() => { setSearchHistory({ title: '', location: '' }), setError(''), setCategory(''), setCategoryLocation(''), setSearchedJobs([]) }}><IoCloseSharp /></span>
                    </div>
                )
            }
            {
                error && (<p className='text-sm font-semibold text-red-500'>{error}</p>)
            }
        </div>
    )
}

export default Filters
