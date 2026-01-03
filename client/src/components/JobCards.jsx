import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext.jsx';
import Card from './Card.jsx';
import axios from 'axios';
const JobCards = () => {
    const { jobs, category, categoryLocation, setSearchHistory, setLoading, backendUrl, setError, searchedJobs } = useContext(AppContext);


    const [filteredJobs, setFilteredJobs] = useState([]);

    const handleCategorySearch = async () => {
        try {
            if (category == '' && category || categoryLocation == '') {
                setFilteredJobs([]);
            }
            else {
                setSearchHistory({ title: category, location: categoryLocation });
                setLoading(true);
                const { data } = await axios.get(`${backendUrl}/user/job/category-search?category=${category}&location=${categoryLocation}`)
                if (data.success) {
                    console.log(data);
                    setFilteredJobs(data.data);
                    setLoading(false);
                    setError('')
                } else {
                    setError(data.msg);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleCategorySearch();
    }, [category, categoryLocation]);


    return (
        <div className='mt-20'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    filteredJobs.length > 0 ? filteredJobs.map((job) => {
                        return (<Card key={job._id} title={job.jobTitle} category={job.category} salary={job.salary} level={job.level} companyImage={job.companyData.image}
                            location={job.location} description={job.jobDescription} id={job._id} companyId={job.companyId}
                        />)
                    }) : ''
                }
                {
                    searchedJobs.length > 0 ? searchedJobs.map((job) => {
                        return (
                            <Card key={job._id} title={job.jobTitle} category={job.category} salary={job.salary} level={job.level} companyImage={job.companyData.image}
                                location={job.location} description={job.jobDescription} id={job._id} companyId={job.companyId}
                            />
                        )
                    }) : ''
                }
                {
                    filteredJobs.length == 0 && searchedJobs.length == 0 && (
                        jobs.map((job) => {
                            return (
                                <Card key={job._id} title={job.jobTitle} category={job.category} salary={job.salary} level={job.level} companyImage={job.companyData.image}
                                    location={job.location} description={job.jobDescription} id={job._id} companyId={job.companyId}
                                />
                            )
                        })
                    )
                }

            </div>
        </div>
    )
}

export default JobCards
