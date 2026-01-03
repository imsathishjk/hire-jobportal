import React, { useContext } from 'react'
import Hero from '../components/Hero'
import Filters from '../components/Filters'
import CompanyLoader from '../components/CompanyLoader'
import JobCards from '../components/JobCards'
import AppContext from '../context/AppContext'
import Login from '../components/Login'
import History from '../components/History'

const Home = () => {
    const { showLogin } = useContext(AppContext);
    return (
        <div className='relative'>
            {showLogin && <Login />}
            <Hero />
            <Filters />
            <JobCards />
            <CompanyLoader />
            <History />
        </div>
    )
}

export default Home
