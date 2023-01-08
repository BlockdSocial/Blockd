import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { HomeIcon } from '@heroicons/react/24/solid'
import TweetBox from './TweetBox'
import Post from './Post'
import toast from 'react-hot-toast'
import PostTest from './PostTest'

function Feed() {

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreaching...');
    await new Promise(f => setTimeout(f, 1000));
    toast.success('Feed Updated!', {
      id: refreshToast,
    })
  }

  return (
    <div className='max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x pb-4'>
      <div className='flex items-center z-[1] justify-between sticky top-0 p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <HomeIcon className='w-6 h-6' />
        <ArrowPathIcon
          onClick={handleRefresh}
          className='flex items-center justify-end h-6 w-6 cursor-pointer text-black dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale'
        />
      </div>

      <div>
        <TweetBox />
        <div className='p-4'>
          {Array.from({ length: 10 }, (_, i) =>
            <PostTest key={i} />
          )}
        </div>
      </div>
    </div>
  )
}

export default Feed