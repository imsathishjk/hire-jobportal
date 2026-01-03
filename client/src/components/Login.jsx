import React, { useContext, useRef, useState } from 'react'
import AppContext from '../context/AppContext'
import { FaHireAHelper } from 'react-icons/fa'
import { MdClose } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const { login, setLogin, setShowLogin, backendUrl, fetchUserData, loginType, setLoginType, setUserLoggedIn } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const imageRef = useRef();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (login == 'Signup') {
                const formData = new FormData();
                formData.append('username', username);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('image', image);
                const { data } = await axios.post(`${backendUrl}/user/register`, formData, { withCredentials: true });
                if (data.success) {
                    fetchUserData()
                    setUserLoggedIn(true);
                    toast.success(data.msg);
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setImage('');
                    setShowLogin(false);
                } else {
                    toast.error(data.msg);
                }
            }
            if (login == 'Login') {
                const { data } = await axios.post(`${backendUrl}/user/login`, { email, password }, { withCredentials: true });
                if (data.success) {
                    fetchUserData()
                    setUserLoggedIn(true);
                    toast.success(data.msg);
                    setEmail('');
                    setPassword('');
                    setShowLogin(false);
                } else {
                    toast.error(data.msg);
                }

            }
        } catch (err) {
            toast.error(err.message);
        }
    }


    const handleImage = () => {
        setImage('');
        imageRef.current.value = '';
    }


    return (
        <div className='absolute top-12 left-1/2 transform -translate-x-1/2 -transtalte-y-1/2 z-50 mx-auto bg-gradient-to-b from-blue-50 to-blue-200 max-w-lg shadow border border-blue-200 rounded-md w-full'>
            <div className='flex justify-between px-5 py-3'>
                <span></span>
                <MdClose onClick={() => setShowLogin(false)} className='text-2xl font-extrabold text-blue-600 cursor-pointer' />
            </div>
            <h1 className='flex items-center justify-center text-4xl font-bold font-[Playfair]  select-none cursor-pointer
                         bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-blue-500 
                        '><FaHireAHelper className='text-blue-500 text-3xl' /> ire</h1>
            <div>
                <h1 className='text-center my-3 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-blue-600'><span onClick={() => setLoginType((prev) => prev == 'company' ? 'user' : 'company')} className='uppercase cursor-pointer line-through'>{loginType}</span> {login}</h1>
                <form onSubmit={handleSubmit} className='p-6 flex flex-col items-start gap-3'>
                    {
                        login == 'Signup' && (<div className='w-full'>
                            <p className='font-medium max-sm:text-sm text-blue-600'>Username</p>
                            <input value={username} onChange={(e) => setUsername(e.target.value)} required type="text" placeholder='eg:johndoe' className='w-full py-2 px-2 border border-blue-400 rounded-md my-2 outline-blue-400 placeholder:text-gray-400' />
                        </div>)
                    }
                    <div className='w-full'>
                        <p className='font-medium max-sm:text-sm text-blue-600'>E-mail Address</p>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder='eg:johndoe@gmail.com' className='w-full py-2 px-2 border border-blue-400 rounded-md my-2 outline-blue-400 placeholder:text-gray-400' />
                    </div>
                    <div className='w-full'>
                        <p className='font-medium max-sm:text-sm text-blue-600'>Password</p>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder='eg:password@123' className='w-full py-2 px-2 border border-blue-400 rounded-md my-2 outline-blue-400 placeholder:text-gray-400' />
                    </div>
                    {
                        login == 'Signup' && (
                            <div>
                                <p className='font-medium max-sm:text-sm text-blue-600'>Upload Logo</p>
                                <input ref={imageRef} type="file" accept='/image*' required onChange={(e) => setImage(e.target.files[0])} />
                                {
                                    image && (
                                        <div className='flex items-center gap-1.5'>
                                            <img src={URL.createObjectURL(image)} alt="user-profile" className='w-10 h-10 object-contain' />
                                            <MdClose onClick={handleImage} className='text-lg text-gray-600 cursor-pointer' />
                                        </div>
                                    )
                                }
                            </div>
                        )
                    }
                    <button type='submit' className='self-center bg-blue-500 text-white rounded-md cursor-pointer w-full p-2 font-semibold max-w-fit'>{login}</button>
                    <span className='flex items-center gap-2 font-medium text-sm text-blue-600'> <input type="checkbox" className='scale-[0.9]' required />
                        <p>Accpet terms & conditions</p>
                    </span>
                    {
                        login == 'Signup' ? <p className='self-center font-semibold text-sm'>Already have an account? <span className='font-semibold text-blue-500 cursor-pointer text-[16px]' onClick={() => setLogin('Login')}>Login</span></p> :
                            <p className='self-center font-semibold text-sm'>Don't have an account <span onClick={() => setLogin('Signup')} className='font-semibold text-blue-500 cursor-pointer text-[16px]'>Signup</span></p>
                    }
                </form>
            </div>
        </div>
    )
}

export default Login;
