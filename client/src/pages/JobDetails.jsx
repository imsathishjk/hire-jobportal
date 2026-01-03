import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../context/AppContext';
import axios from 'axios';

import Loader from '../components/Loader';
import RelatedJobs from '../components/RelatedJobs';
import JobDesc from '../components/JobDesc';

const JobDetails = () => {
    const { backendUrl, userData } = useContext(AppContext);
    const { id } = useParams();
    const [jobDetail, setJobDetail] = useState([]);
    const [relatedJobs, setRelatedJobs] = useState([]);

    const handleJobDetails = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/user/job/job-details/${id}`)
            setJobDetail(data.data);
        } catch (err) {
            console.log(err)
        }


    };

    const handleRelatedJobs = async () => {
        const { data } = await axios.get(`${backendUrl}/user/job/related-jobs/${id}`);
        setRelatedJobs(data.data);
    };




    useEffect(() => {
        handleJobDetails();
        handleRelatedJobs();
    }, [id]);

    return (
        <div className='mt-12 flex flex-row max-lg:flex-col justify-between gap-20 mb-5 overflow-hidden'>
            {/* Job Details */}
            {
                jobDetail ? <div className='max-md:basis-full lg:basis-[55%] basis-[65%]'>
                    <JobDesc jobDetail={jobDetail} />
                </div> : <Loader />
            }
            {/* Related Jobs */}
            <div className='lg:basis-[45%] max-md:basis-full basis-[35%] h-[90vh] overflow-y-scroll scrollbar overflow-x-hidden'>
                {
                    relatedJobs ? <RelatedJobs relatedJobs={relatedJobs} /> : <Loader />
                }
            </div>
        </div>
    )
}

export default JobDetails
