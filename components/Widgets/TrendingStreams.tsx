import React, {memo} from 'react'
import {
    ComputerDesktopIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export const TrendingStreams  = React.memo(() => {
    return (
        <div className='p-2'>
            <div className='flex items-center justify-start rounded-md space-x-2 p-2 mt-2'>
                <ComputerDesktopIcon className='w-4 h-4 lg:w-5 lg:h-5' />
                <p className='font-semibold text-xs lg:text-base'>
                    Trending Streamers
                </p>
            </div>
            <Link href="#" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-2'>
                    <img src="/images/pfp/pfp1.jpg" className='rounded-full w-6 h-6 bg-blockd' />
                    <p className='font-semibold text-sm'>
                        @Crypto_punk
                    </p>
                </div>
            </Link>
            <Link href="#" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-2'>
                    <img src="/images/pfp/pfp2.jpg" className='rounded-full w-6 h-6 bg-blockd' />
                    <p className='font-semibold text-sm'>
                        @Egoist
                    </p>
                </div>
            </Link>
            <Link href="#" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-2'>
                    <img src="/images/pfp/pfp3.jpg" className='rounded-full w-6 h-6 bg-blockd' />
                    <p className='font-semibold text-sm'>
                        @Crypto_crazy
                    </p>
                </div>
            </Link>
            <Link href="#" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-2'>
                    <img src="/images/pfp/pfp1.jpg" className='rounded-full w-6 h-6 bg-blockd' />
                    <p className='font-semibold text-sm'>
                        @Crypto_queen
                    </p>
                </div>
            </Link>
            <Link href="#" className='grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1'>
                <div className='flex items-center justify-start col-span-8 lg:col-span-5 space-x-2'>
                    <img src="/images/pfp/pfp3.jpg" className='rounded-full w-6 h-6 bg-blockd' />
                    <p className='font-semibold text-sm'>
                        @Shiba_king
                    </p>
                </div>
            </Link>
            <div className='flex items-center justify-start'>
                <Link href="#" className='flex items-center justify-start bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md w-fit p-2 mt-1'>
                    <p className='font-semibold text-sm'>
                        See all streamers
                    </p>
                </Link>
            </div>

        </div>
    )
})

//export default TrendingStreams