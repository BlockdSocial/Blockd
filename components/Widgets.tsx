import React from 'react'

function Widgets() {
  return (
    <div className='h-full px-2 col-span-2 hidden lg:inline md:p-4'>
      {/* Search */}
      <div className='flex items-center space-x-2 bg-gray-100 p-3 rounded-full'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search Blockd" 
          className='flex-1 outline-none bg-transparent'/>
      </div>

    </div>
  )
}

export default Widgets