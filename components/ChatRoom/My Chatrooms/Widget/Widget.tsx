import React, { useState } from 'react'
import {
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'
import Friends from './Friends'

function Widget() {



  return (
    <div className='hidden md:flex md:flex-col md:col-span-3 min-h-screen dark:bg-darkray pb-14 border-r dark:border-lightgray'>
      <div className='flex items-center justify-start h-14 p-4 z-[1] sticky top-0 backdrop-blur-md border-b dark:border-lightgray bg-white/30 dark:bg-darkgray/30'>
        <div className='flex items-center justify-start space-x-2'>
          <ChatBubbleLeftRightIcon className='w-5 h-5' />
          <p className='font-semibold'>Private DMs</p>
        </div>
      </div>
      <Friends />

    </div >
  )
}

export default Widget