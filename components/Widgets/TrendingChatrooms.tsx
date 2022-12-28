import React from 'react'
import {
    ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

function TrendingChatrooms() {
    return (
        <div className='p-2'>
            <div className='flex items-center justify-start rounded-md space-x-2 p-2 mt-1'>
                <ArrowTrendingUpIcon className='w-4 h-4 lg:w-5 lg:h-5' />
                <p className='font-semibold text-xs lg:text-base'>
                    Trending Chatrooms
                </p>
            </div>
            <Link href="/chatroom" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-1'>
                    <div className='rounded-full w-3 h-3 bg-blockd'>
                    </div>
                    <p className='font-semibold text-sm'>
                        EGO Official
                    </p>
                </div>
                <div className='lg:flex items-center justify-end lg:col-span-3 hidden'>
                    <p className='font-semibold text-green-800 dark:text-white'>
                        +1200%
                    </p>
                </div>
            </Link>
            <Link href="/chatroom" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-1'>
                    <div className='rounded-full w-3 h-3 bg-blockd'>
                    </div>
                    <p className='font-semibold text-sm'>
                        Shiba Inu
                    </p>
                </div>
                <div className='lg:flex items-center justify-end lg:col-span-3 hidden'>
                    <p className='font-semibold text-green-800 dark:text-white'>
                        +700%
                    </p>
                </div>
            </Link>
            <Link href="/chatroom" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-1'>
                    <div className='rounded-full w-3 h-3 bg-blockd'>
                    </div>
                    <p className='font-semibold text-sm'>
                        BTC
                    </p>
                </div>
                <div className='lg:flex items-center justify-end lg:col-span-3 hidden'>
                    <p className='font-semibold text-green-800 dark:text-white'>
                        +100%
                    </p>
                </div>
            </Link>
            <Link href="/chatroom" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-1'>
                    <div className='rounded-full w-3 h-3 bg-blockd'>
                    </div>
                    <p className='font-semibold text-sm'>
                        TRT Token
                    </p>
                </div>
                <div className='lg:flex items-center justify-end lg:col-span-3 hidden'>
                    <p className='font-semibold text-green-800 dark:text-white'>
                        +25%
                    </p>
                </div>
            </Link>
            <Link href="/chatroom" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-1'>
                    <div className='rounded-full w-3 h-3 bg-blockd'>
                    </div>
                    <p className='font-semibold text-sm'>
                        Solar Official
                    </p>
                </div>
                <div className='lg:flex items-center justify-end lg:col-span-3 hidden'>
                    <p className='font-semibold text-green-800 dark:text-white'>
                        +20%
                    </p>
                </div>
            </Link>
            <div className='flex items-center justify-start'>
                <Link href="/trending" className='flex items-center justify-start bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md w-fit p-2 mt-1'>
                    <p className='font-semibold text-sm'>
                        Show more
                    </p>
                </Link>
            </div>

        </div>
    )
}

export default TrendingChatrooms