import Image from 'next/image'
import React from 'react'
import Picture from './Picture'
import TimeAgo from 'react-timeago'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
    CheckBadgeIcon,
} from '@heroicons/react/24/outline'

function Post() {
    return (
        <div className='flex flex-col space-x-3 mt-1 border-y p-4 md:dark:border dark:border-white md:dark:rounded'>
            <div className='w-full'>
                <div className='flex space-x-3'>
                    <Picture path="/images/pfp2.jpg" level={5} pwidth="w-12" pheight="w-12" ltop="top-12" />
                    <div>
                        <div className='flex items-center space-x-1 mt-7'>
                            <p className='mr-1 font-semibold text-l'>@Egoist</p>
                            <CheckBadgeIcon className='h-7 w-7 text-blockd' />
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <Image
                        src="/images/post1.jpg"
                        alt='Post'
                        className='m-5 ml-0 mb-1 rounded-lg w-full max-h-80 shadow-sm'
                        width={2000}
                        height={2000} />
                    <p className='pt-4 ml-3 font-semibold'>This is a Demo Post</p>
                </div>
            </div>
            <div className='flex justify-between mt-5'>
                <div className='flex'>
                    <div className='flex cursor-pointer items-center space-x-1 text-gray-400'>
                        <p className='text-xs'>15</p>
                        <ArrowUpIcon className='text-green-700 h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                    </div>
                    <div className='flex cursor-pointer items-center space-x-1 text-gray-400'>
                        <ArrowDownIcon className='text-red-700 h-5 w-5  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                        <p className='text-xs'>10</p>
                    </div>
                    <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400'>
                        <ChatBubbleBottomCenterTextIcon className='h-5 w-5  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                        <p className='text-xs'>10</p>
                    </div>
                    <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400'>
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

            <div className='my-2 mt-5 max-h-44 space-y-5 overflow-scroll border-t border-gray-100 p-5 scrollbar-hide'>
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
            </div>
        </div>
    )
}

export default Post