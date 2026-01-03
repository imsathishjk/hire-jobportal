import React from 'react'
import Loader from './Loader'
import { Link } from 'react-router-dom'
import Card from './Card'

const RelatedJobs = ({ relatedJobs }) => {
    return (
        <div className='mr-3'>
            <h1 className='font-semibold text-lg sticky top-0 bg-white underline'>Related Jobs</h1>
            <div className='my-5 flex flex-col gap-5'>
                {
                    relatedJobs ? relatedJobs.map((job) => {
                        return (
                            <Card key={job._id} title={job.jobTitle} category={job.category} salary={job.salary} level={job.level} companyImage = {job.companyData.image}
                                location={job.location} description={job.jobDescription} id={job._id}
                            />
                        )
                    }) : <Loader />
                }
                <Link to={'/'} className='text-blue-500 hover:text-blue-700 transition-colors duration-300 ease-in-out font-medium underline cursor-pointer self-center'>Explore All Jobs</Link>
            </div>
        </div>
    )
}

export default RelatedJobs
