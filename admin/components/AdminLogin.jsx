import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { FaHireAHelper } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { MdClose } from "react-icons/md";


const AdminLogin = ({ login, setLogin, setShowLogin, setUserLoggedIn, setCompanyData }) => {

    const backendUrl = import.meta.env.VITE_API_URL;

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

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
                const { data } = await axios.post(`${backendUrl}/company/register`, formData, { withCredentials: true });
                if (data.success) {
                    setUserLoggedIn(true);
                    setCompanyData(data.data)
                    navigate('/add-job');
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
                const { data } = await axios.post(`${backendUrl}/company/login`, { email, password }, { withCredentials: true });
                if (data.success) {
                    setCompanyData(data.data);
                    navigate('/add-job');
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
        <div className='max-w-lg  w-full mx-auto my-auto mt-12'>
            <h1 className='flex items-center justify-center text-4xl font-bold font-[Playfair]  select-none cursor-pointer
                                 bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-blue-500 
                                '><FaHireAHelper className='text-blue-500 text-3xl' /> ire</h1>
            <div>
                <h1 className='text-center my-3 text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 to-blue-600'>{login}</h1>
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
                                            <img src={URL.createObjectURL(image)} alt="user-profile" className='w-12 h-12 object-cover' />
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

export default AdminLogin
