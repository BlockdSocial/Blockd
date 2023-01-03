import React from 'react'
import dynamic from 'next/dynamic'
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Slider from './Slider'

function Widgets() {

  const TrendingChatrooms = dynamic(() => import('./TrendingChatrooms'), { ssr: false })
  const TrendingStreams = dynamic(() => import('./TrendingStreams'), { ssr: false })

  return (
    <div className='col-span-2 hidden md:inline max-h-screen scrollbar-hide overflow-scroll '>
      {/* Search */}
      <div className='sticky p-2 top-0 backdrop-blur-md bg-white/30 dark:bg-darkgray/30 z-[1]'>
        <div className='flex items-center space-x-2 bg-gray-100 p-2 dark:bg-darkgray rounded-full dark:border-white dark:hover:border-blockd border group'>
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-white dark:group-hover:text-blockd" />
          <input 
            type="text" 
            placeholder="Search Blockd" 
            className='flex-1 outline-none bg-transparent'/>
        </div>
      </div> 
      <Slider />
      <TrendingChatrooms />
      <TrendingStreams />
    </div>
  )
}

export default Widgets