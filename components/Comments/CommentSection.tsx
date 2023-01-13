import React from 'react'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
} from '@heroicons/react/24/outline'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import Image from 'next/image'

function CommentSection() {
    return (
        <Link href="/post/comment" className='relative border-b flex flex-col space-x-2 hover:bg-gray-100 dark:hover:bg-lightgray p-4'>
            <div className='flex space-x-2'>
                <Link href="profile" className='flex flex-col w-fit h-fit group'>
                    <div className='relative flex flex-col items-center justify-center p-1 animate-colorChange rounded-lg'>
                        <Image
                            src="/images/pfp/pfp2.jpg"
                            alt='pfp'
                            className='w-14 h-14 rounded-md shadow-sm'
                            width={60}
                            height={60} />
                        <div className='absolute -bottom-3 -left-2 flex p-1 w-7 h-7 animate-colorChange rounded-lg'>
                            <div className='flex items-center justify-center text-black font-semibold rounded-md w-full h-full text-xs bg-white '>
                                15
                            </div>
                        </div>
                    </div>
                </Link>
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