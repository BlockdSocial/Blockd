import React from 'react'
import {ArrowPathIcon} from '@heroicons/react/24/outline'
import TweetBox from './TweetBox'

function Feed() {
  return (
    <div className='h-full col-span-8 lg:col-span-5 md:p-4 border-x'>
      <div className='flex flex-col items-end'>
        <ArrowPathIcon className='mr-5 mt-6 md:mt-3 h-6 w-6 cursor-pointer text-blockd transition-all duration-500 ease-out hover:rotate-180 active-scale'/>
      </div>

      {/* TweetBox */}

      <div>
        <TweetBox />
      </div>
    </div>
  )
}

export default Feed