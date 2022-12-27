import React from 'react'
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'

function Widgets() {
  return (
    <div className='h-full px-2 col-span-2 hidden md:inline md:p-4'>
      {/* Search */}
      <div className='flex items-center space-x-2 bg-gray-100 dark:bg-darkgray p-3 rounded-full dark:border-white dark:hover:border-blockd border group'>
        <MagnifyingGlassIcon  className="w-4 h-4 text-gray-400 dark:text-white dark:group-hover:text-blockd" />
        <input 
          type="text" 
          placeholder="Search Blockd" 
          className='flex-1 outline-none bg-transparent'/>
      </div>

    </div>
  )
}

export default Widgets