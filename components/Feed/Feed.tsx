import React from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import TweetBox from './TweetBox'
import Post from './Post'
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
    <div className='max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x pb-4'>
      <div className='flex items-center z-[1] justify-between sticky top-0 p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <p className='text-xl font-semibold'>Main Page</p>
        <ArrowPathIcon
          onClick={handleRefresh}
          className='flex items-center justify-end h-6 w-6 cursor-pointer text-black dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale' 
        />
      </div>

      <div>
        <TweetBox />
        {Array.from({ length: 10 }, (_, i) =>
          <Post key={i} />
        )}
      </div>

    </div>
  )
}

export default Feed