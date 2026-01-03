import React from 'react';
import { companyIcons } from '../assets/assets.js'
const CompanyLoader = () => {



    return (
        <div className='mt-20 overflow-hidden'>
            <h1 className='text-center font-bold text-xl'>Our Patners</h1>
            <div className='flex gap-8 justify-between items-center mt-8 no-scroll overflow-x-scroll'>
                {
                    companyIcons.map((item, index) => {
                        return <img src={item} alt="image" key={index} className='w-20 md:w-32' />
                    })
                }

            </div>
        </div>
    )
}

export default CompanyLoader
