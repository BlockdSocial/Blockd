import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Picture from './Picture'
import TimeAgo from 'react-timeago'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

function PostFeed() {

    const [commentBoxVisible, setCommentBoxVisible ] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
    }

    return (
        <div className='flex flex-col space-x-3 mt-1 border-y p-6 dark:border-white'>
            <div className='w-full'>
                <Link href="profile" className='flex space-x-3 w-fit group'>
                    <Picture path="/images/pfp2.jpg" level={5} pictureCSS="w-12" levelCSS="top-12" />
                    <div>
                        <div className='flex items-center space-x-1 mt-7'>
                            <p className='mr-1 font-semibold text-l group-hover:underline'>@Egoist</p>
                            <CheckBadgeIcon className='h-7 w-7 fill-blockd' />
                        </div>
                    </div>
                </Link>
                <div className='w-full'>
                    <Link href="post">
                        <Image
                            src="/images/post1.jpg"
                            alt='Post'
                            className='m-5 ml-0 mb-1 rounded-lg w-full max-h-80 shadow-sm'
                            width={2000}
                            height={2000} />
                    </Link>
                    <p className='pt-4 ml-3 font-semibold'>This is a Demo Post</p>
                </div>
            </div>
            <div className='flex justify-between mt-5'>
                <div className='flex'>
                    <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black'>
                        <p className='text-xs'>150K</p>
                        <ArrowUpIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                    </div>
                    <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black'>
                        <ArrowDownIcon className='h-5 w-5  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                        <p className='text-xs'>10K</p>
                    </div>
                    <div onClick={() => setCommentBoxVisible(!commentBoxVisible) } className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black'>
                        <ChatBubbleBottomCenterTextIcon className='h-5 w-5  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                        <p className='text-xs'>168</p>
                    </div>
                    <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black'>
                        <ShareIcon className='h-5 w-5  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                        <p className='text-xs'>10</p>
                    </div>
                </div>
                <div>
                    <TimeAgo
                        date='Aug 29, 2022'
                        className='text-sm text-gray-500'
                    />
                </div>
            </div>

            {commentBoxVisible && (
                <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
                    <input  
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className='flex-1 rounded-lg bg-gray-100 p-2 outline-none'
                        type="text" 
                        placeholder='Write a comment...' 
                    />
                    <button 
                        disabled={!input}
                        type="submit"
                        className='text-blockd disabled:text-gray-200'>Post
                    </button>
                </form>
            )}

            <Link href="post" className='my-2 mt-5 max-h-44 space-y-5 overflow-scroll border-t border-gray-100 p-5 scrollbar-hide'>
                <div className='relative flex space-x-2'>
                    <hr className='absolute left-5 top-10 h-8 border-x border-blockd/30 dark:border-gray-500' />
                    <img src="/images/pfp1.jpg" className='mt-2 h-7 w-7 object-cover rounded-full' alt="" />
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
                        <p>
                            This is my first Comment
                        </p>
                    </div>
                </div>
                <div className='relative flex space-x-2'>
                    <hr className='absolute left-5 top-10 h-8 border-x border-blockd/30 dark:border-gray-500' />
                    <img src="/images/pfp2.jpg" className='mt-2 h-7 w-7 object-cover rounded-full' alt="" />
                    <div >
                        <div className='flex items-center space-x-1'>
                            <p className='mr-1 font-semibold'>
                                @EGOist
                            </p>
                            <TimeAgo
                                date='Dec 25, 2022'
                                className='text-sm text-gray-500'
                            />
                        </div>
                        <p>
                            This is my Second Comment
                        </p>
                    </div>
                </div>
                <div className='relative flex space-x-2'>
                    <hr className='absolute left-5 top-10 h-8 border-x border-transparent' />
                    <img src="/images/pfp3.jpg" className='mt-2 h-7 w-7 object-cover rounded-full' alt="" />
                    <div >
                        <div className='flex items-center space-x-1'>
                            <p className='mr-1 font-semibold'>
                                @Crypto_Crazy
                            </p>
                            <TimeAgo
                                date='Dec 23, 2022'
                                className='text-sm text-gray-500'
                            />
                        </div>
                        <p>
                            Intresting Blog !
                        </p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PostFeed