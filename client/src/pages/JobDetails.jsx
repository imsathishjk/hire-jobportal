import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AppContext from '../context/AppContext';
import axios from 'axios';

import Loader from '../components/Loader';
import RelatedJobs from '../components/RelatedJobs';
import JobDesc from '../components/JobDesc';
import toast from 'react-hot-toast';

const JobDetails = () => {
    const { backendUrl, userData } = useContext(AppContext);
    const { id } = useParams();
    const [jobDetail, setJobDetail] = useState([]);
    const [relatedJobs, setRelatedJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleJobDetails = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/user/job/job-details/${id}`)
            if (data.success) {
                setJobDetail(data.data);
                setLoading(false);
            } else {
                toast.error(data.msg)
                setLoading(false);
            }
        } catch (err) {
            console.log(err)
        }


    };

    const handleRelatedJobs = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${backendUrl}/user/job/related-jobs/${id}`);
            if (data.success) {
                setRelatedJobs(data.data);
                setLoading(false);
            } else {
                toast.error(data.msg)
                setLoading(false);
            }
        } catch (err) {

            toast.error(err.message);
        }
    };




    useEffect(() => {
        handleJobDetails();
        handleRelatedJobs();
    }, [id]);

    return (
        <div className='mt-12 flex flex-row max-lg:flex-col justify-between gap-20 mb-5 overflow-hidden'>
            {/* Job Details */}
            {

                loading ? <Loader /> : <div className='max-md:basis-full lg:basis-[55%] basis-[65%]'>
                    <JobDesc jobDetail={jobDetail} />
                </div>

            }
            {/* Related Jobs */}
            <div className='lg:basis-[45%] max-md:basis-full basis-[35%] h-[90vh] overflow-y-scroll scrollbar overflow-x-hidden'>
                {
                    loading ? <Loader /> : <RelatedJobs relatedJobs={relatedJobs} />
                }
            </div>
        </div>
    )
}

export default JobDetails
