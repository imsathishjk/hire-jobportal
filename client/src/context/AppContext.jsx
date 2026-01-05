import { createContext, use, useEffect, useState } from "react";
import axios from 'axios';
import { jobsData } from "../assets/assets";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const AppContext = createContext();



export const AppContextProvider = ({ children }) => {


    const [categoryLocation, setCategoryLocation] = useState('');
    const [category, setCategory] = useState('');
    const [jobs, setJobs] = useState([]);
    const [searchHistory, setSearchHistory] = useState({ title: '', location: '' });
    const [login, setLogin] = useState('Signup');
    const [showLogin, setShowLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchedJobs, setSearchedJobs] = useState([]);
    const [loginType, setLoginType] = useState('');



    axios.defaults.withCredentials = true;
    const backendUrl = import.meta.env.VITE_API_URL;

    const handleSearchHistory = async (jobTitle, location, setLocation, setJobTitle) => {

        if (location !== '' || jobTitle !== '') {
            setSearchHistory({ location: location, title: jobTitle });
            const { data } = await axios.get(`${backendUrl}/user/job/search?query=${jobTitle}&location=${location}`)
            if (data.success) {
                setSearchedJobs(data.data);
                setLocation('');
                setJobTitle('');
            }
        }

    }


    const handleFetchJobs = async () => {
         setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/user/all-jobs`)
            let tempData = data.data;
            setJobs(tempData.filter((job) => job.visible === true))
            setLoading(false);
        } catch (err) {
            console.log(err)
        }

    }

    const handleUserAuth = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/user/is-auth`);
            if (data.success && data.isAuth) {
                setUserLoggedIn(true);
            } else {
                setUserLoggedIn(false);
            }
        } catch (err) {
            console.log(err);
        }
    }


    const handleFetchSavedJobs = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/user/job/saved-jobs`)
            if (data.success) {
                setSavedJobs(data.data);
            }
        } catch (err) {
            console.log(err)
        }
    };

    const fetchUserData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/user/data`);
            if (data.data) {
                setUserData(data.data);
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    const value = {
        categoryLocation, setCategoryLocation,
        category, setCategory, login, setLogin, showLogin, setShowLogin, savedJobs, setUserLoggedIn, setUserData, userLoggedIn, searchedJobs, setSearchedJobs,
        jobs, searchHistory, setSearchHistory, handleSearchHistory, backendUrl, userData, fetchUserData, handleFetchSavedJobs, loading, setLoading, error, setError,
        loginType, setLoginType
    };

    useEffect(() => {
        fetchUserData();
    }, []);


    useEffect(() => {
        handleFetchSavedJobs();
        handleUserAuth();
    }, [userLoggedIn, userData]);
    useEffect(() => {
        handleFetchJobs();
    }, [searchHistory])

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

};

export default AppContext;