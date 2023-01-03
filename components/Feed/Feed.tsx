import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import TweetBox from './TweetBox'
import PostFeed from '../Post/Post'
import toast from 'react-hot-toast'

function Feed() {

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreaching...');
    await new Promise(f => setTimeout(f, 1000));
    toast.success('Feed Updated!', {
      id: refreshToast,
    })
  }
  
  return (
    <div className='max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x '>
      <div className='flex items-center justify-end p-4'>
        <ArrowPathIcon
          onClick={handleRefresh}
          className='flex items-center justify-end h-6 w-6 cursor-pointer text-blockd dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale' 
        />
      </div>

      <div>
        <TweetBox />
        <PostFeed />
      </div>

    </div>
  )
}

export default Feed