import React from 'react'

const History = () => {
    return (
        <div className='my-12'>
            <h1 className='text-xl font-bold text-center'>What we provides</h1>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 gap-5'>
                <div className='flex flex-col items-center gap-3  text-center p-3 rounded-md border border-blue-300 bg-gradient-to-b from-blue-50 to-blue-100'>
                    <h1 className='font-extrabold text-xl md:text-2xl lg:text-3xl text-blue-600'>100+</h1>
                    <p className='font-semibold text-lg'>Current Jobs</p>
                    <p className='font-semibold text-sm text-gray-600'>We always provide verfied jobs, which helps to find right place </p>
                </div>
                <div className='flex flex-col items-center gap-3  text-center p-3 rounded-md border border-blue-300 bg-gradient-to-b from-blue-50 to-blue-100'>
                    <h1 className='font-extrabold text-xlmd:text-2xl lg:text-3xl text-blue-600'>1000+</h1>
                    <p className='font-semibold text-lg'>Candidates Placed</p>
                    <p className='font-semibold text-sm text-gray-600'>We are happily sharing 1000+ candidates were placed till now</p>
                </div>
                <div className='flex flex-col items-center gap-3 text-center p-3 rounded-md border border-blue-300 bg-gradient-to-b from-blue-50 to-blue-100'>
                    <h1 className='font-extrabold text-xlmd:text-2xl lg:text-3xl text-blue-600'>500+</h1>
                    <p className='font-semibold text-lg'>Happy Clients</p>
                    <p className='font-semibold text-sm text-gray-600'>We are helping our clients to filtered right candidates based on their needs</p>
                </div>
                <div className='flex flex-col items-center gap-3 text-center p-3 rounded-md border border-blue-300 bg-gradient-to-b from-blue-50 to-blue-100'>
                    <h1 className='font-extrabold text-xlmd:text-2xl lg:text-3xl text-blue-600'>24 hrs</h1>
                    <p className='font-semibold text-lg'>Response within 24 Hours</p>
                    <p className='font-semibold text-sm text-gray-600'>Basically the candidates may expect response from our clients within 24 Hours</p>
                </div>
            </div>
        </div>
    )
}

export default History
