import React from 'react'
import {
  FolderIcon,
  MicrophoneIcon,
  PhotoIcon,
  GifIcon,
  VideoCameraIcon,
  ClipboardIcon,
} from '@heroicons/react/24/outline'

function Info() {
    return (
        <div className='flex flex-col items-center py-2 bg-white dark:bg-darkgray border-b dark:border-lightgray'>
            <div className='flex items-center justify-start p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <FolderIcon className='w-5 h-5' />
                <span>14 files</span>
            </div>
            <div className='flex items-center justify-start p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <MicrophoneIcon className='w-5 h-5' />
                <span>100 voice messages</span>
            </div>
            <div className='flex items-center justify-start p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <PhotoIcon className='w-5 h-5' />
                <span>137 pictures</span>
            </div>
            <div className='flex items-center justify-start p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <GifIcon className='w-5 h-5' />
                <span>1205 gifs</span>
            </div>
            <div className='flex items-center justify-start p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <VideoCameraIcon className='w-5 h-5' />
                <span>3 videos</span>
            </div>
            <div className='flex items-center justify-start p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer'>
                <ClipboardIcon className='w-5 h-5' />
                <span>32 shared links</span>
            </div>
        </div>
    )
}

export default Info