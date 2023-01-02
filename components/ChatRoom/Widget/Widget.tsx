import React, { useState } from 'react'
import Info from './Info'
import Members from './Members'
import {
  InformationCircleIcon
} from '@heroicons/react/24/outline'

function Widget() {



  return (
    <div className='hidden md:flex md:flex-col md:col-span-3 dark:bg-darkray scrollbar-hide overflow-scroll pb-20'>
      <div className='flex items-center justify-start p-2 z-[1] sticky top-0 backdrop-blur-md border-b dark:border-lightgray bg-white/30 dark:bg-darkgray/30'>
        <div className='flex items-center justify-start space-x-2 p-1'>
          <InformationCircleIcon className='w-5 h-5' />
          <p className='font-semibold'>Group Info</p>
        </div>
      </div>

      <Info />
      <Members />

    </div >
  )
}

export default Widget