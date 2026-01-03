import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center'>
        <div className='w-6 h-6 rounded-full border-2 border-blue-300 border-t-3 border-t-blue-500 animate-spin ease'></div>
    </div>
  )
}

export default Loader
