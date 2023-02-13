import Link from 'next/link'
import React from 'react'
import PostTest from '../Feed/PostTest'
import { useAppSelector } from '../../stores/hooks'

interface Post {
    id: number;
    content: string;
    createdAt: string;
    likes: number;
    comments: number;
}

function SearchPage() {

    return (
        <div className="relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x bg-gray-100 dark:bg-lightgray">
            <div className='flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-white rounded-lg space-y-3'>
                <h3 className='text-xl font-semibold w-full mb-4'>People</h3>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center justify-center space-x-3'>
                        <div className='flex items-center justify-center'>
                            <img src="/images/pfp/pfp1.jpg" className='rounded-md w-16 h-16 bg-blockd' />
                        </div>
                        <div className='flex flex-col items-start justify-center space-y-2'>
                            <div className='flex flex-col items-start justify-center'>
                                <Link href="/dashboard/profile" className='text-l font-bold cursor-pointer hover:underline'>@IsmailBzz</Link>
                                <span className='text-l text-gray-700 dark:text-gray-300'>10K followers</span>
                            </div>
                            <span className='text-l text-gray-700 dark:text-gray-300'>20 Friends in common</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='cursor-pointer p-2 px-6 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold'>Follow</p>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center justify-center space-x-3'>
                        <div className='flex items-center justify-center'>
                            <img src="/images/pfp/pfp3.jpg" className='rounded-md w-16 h-16 bg-blockd' />
                        </div>
                        <div className='flex flex-col items-start justify-center space-y-2'>
                            <div className='flex flex-col items-start justify-center'>
                                <Link href="/dashboard/profile" className='text-l font-bold cursor-pointer hover:underline'>@Crypto_Monkey</Link>
                                <span className='text-l text-gray-700 dark:text-gray-300'>123 followers</span>
                            </div>
                            <span className='text-l text-gray-700 dark:text-gray-300'>1 Friend in common</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='cursor-pointer p-2 px-6 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold'>Follow</p>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center justify-center space-x-3'>
                        <div className='flex items-center justify-center'>
                            <img src="/images/pfp/pfp2.jpg" className='rounded-md w-16 h-16 bg-blockd' />
                        </div>
                        <div className='flex flex-col items-start justify-center space-y-2'>
                            <div className='flex flex-col items-start justify-center'>
                                <Link href="/dashboard/profile" className='text-l font-bold cursor-pointer hover:underline'>@Egoist</Link>
                                <span className='text-l text-gray-700 dark:text-gray-300'>234K followers</span>
                            </div>
                            <span className='text-l text-gray-700 dark:text-gray-300'>123 Friends in common</span>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <p className='cursor-pointer p-2 px-4 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold'>Following</p>
                    </div>
                </div>
                <Link href="/people" className='flex items-center justify-center cursor-pointer p-2 w-full rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold'>View all</Link>
            </div>
            <div className='flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-white rounded-lg space-y-3'>
                <h3 className='text-xl font-semibold w-full mb-4'>Posts</h3>
                {/** @ts-ignore */}
                <PostTest
                />
            </div>
        </div>
    )
}

export default SearchPage
