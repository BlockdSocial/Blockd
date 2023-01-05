import React from 'react'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
} from '@heroicons/react/24/outline'
import TimeAgo from 'react-timeago'
import Link from 'next/link'

function CommentSection() {
    return (
        <Link href="/post/comment" className='relative border-b flex flex-col space-x-2 hover:bg-gray-100 dark:hover:bg-lightgray rounded-lg p-4'>
            <div className='flex space-x-2'>
                <img src="/images/pfp/pfp2.jpg" className='mt-2 h-12 w-12 object-cover rounded-full' alt="" />
                <div >
                    <div className='flex items-center space-x-1'>
                        <p className='mr-1 font-semibold'>
                            @IsmailBzz
                        </p>
                        <TimeAgo
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
            </div>
        </Link>
        
    )
}

export default CommentSection