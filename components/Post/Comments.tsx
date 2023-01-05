import React from 'react'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Timeago from 'react-timeago'

function Comments() {
    return (
        <Link href="/post/comment" className='relative flex space-x-2 hover:bg-gray-100 dark:hover:bg-lightgray rounded-lg'>
            <hr className='absolute left-5 top-11 h-16 border-x border-blockd/30 dark:border-gray-500' />
            <img src="/images/pfp/pfp1.jpg" className='mt-2 h-7 w-7 object-cover rounded-full' alt="" />
            <div >
                <div className='flex items-center space-x-1'>
                    <p className='mr-1 font-semibold'>
                        @IsmailBzz
                    </p>
                    <Timeago
                        date='Dec 23, 2022'
                        className='text-sm text-gray-500'
                    />
                </div>
                <div className='flex flex-col items-start justify-start p-2'>
                    <p>
                        This is my first Comment
                    </p>
                    <div className='flex justify-between mt-2'>
                        <div className='flex'>
                            <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white'>
                                <p className='text-xs'>15K</p>
                                <ArrowUpIcon className='h-4 w-4 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                            </div>
                            <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white'>
                                <ArrowDownIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                <p className='text-xs'>1K</p>
                            </div>
                            <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                                <ChatBubbleBottomCenterTextIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                <p className='text-xs'>16</p>
                            </div>
                            <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                                <ShareIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                <p className='text-xs'>1</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Comments