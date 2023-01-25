import React from 'react'
import {
    ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'

function AchievementPage() {
    return (
        <div className='relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x p-2 lg:px-36'>
            <div className="flex flex-col items-center justify-center p-4 border dark:border-lightgray rounded-lg shadow-lg bg-[url('/images/bg/achievement.png')] bg-contain">
                <div className='flex items-center justify-center w-full space-x-6 mb-10 bg-transparent'>
                    <div className={`relative h-24 w-24 border-2 border-white rounded-md p-1 animate-colorChange`}>
                        <Image
                            src="/images/pfp/pfp1.jpg"
                            alt='pfp'
                            className='w-fill h-fill rounded-md shadow-sm border-2 border-white'
                            width={2000}
                            height={2000} />
                        <div className={`absolute -bottom-3 -left-4 flex p-1 w-9 h-9 border-2 border-white animate-colorChange rounded-lg`}>
                            <div className='flex items-center justify-center border-2 border-white text-black font-semibold rounded-md w-full h-full text-sm bg-white'>
                                31
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        <p className='text-sm font-semibold mb-2'>Total</p>
                        <p className='text-2xl font-semibold text-gray-600 dark:text-gray-300'>3500</p>
                        <p className='text-l font-semibold text-gray-600 dark:text-gray-300'>Experience</p>
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center w-full space-y-4 px-6 bg-transparent'>
                    <div className='flex items-center justify-start w-4/5 space-x-4 p-4 px-6 cursor-pointer border dark:border-lightgray rounded-lg shadow-lg transition hover:scale-[1.1]'>
                        <div className='flex items-center justify-center'>
                            <img src='/images/badges/badge1.png' className='flex w-14 max-w-full h-auto' />
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <h1 className='text-l font-semibold'>Level 1</h1>
                            <h3 className='text-sm text-gray-500 mb-2'>Earn 150 XP</h3>
                            <button type="button" className="text-white w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-1 text-center">Claim Reward</button>
                        </div>
                    </div>
                    <div className='flex items-center justify-start w-4/5 space-x-4 p-4 px-6 cursor-pointer border dark:border-lightgray rounded-lg shadow-lg transition hover:scale-[1.1]'>
                        <div className='flex items-center justify-center'>
                            <img src='/images/badges/badge2.png' className='flex w-14 max-w-full h-auto' />
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <h1 className='text-l font-semibold'>Level 2</h1>
                            <h3 className='text-sm text-gray-500 mb-2'>Reach 10K followers</h3>
                            <button type="button" className="text-white w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-1 text-center">Claim Reward</button>
                        </div>
                    </div>
                    <div className='flex items-center justify-start w-4/5 space-x-4 p-4 px-6 cursor-pointer border dark:border-lightgray rounded-lg opacity-70'>
                        <div className='flex items-center justify-center'>
                            <img src='/images/badges/badge3.png' className='flex w-14 max-w-full h-auto' />
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <h1 className='text-l font-semibold'>Level 3</h1>
                            <h3 className='text-sm text-gray-500 mb-2'>Have 10K stream views</h3>
                            <div className="flex items-center justify-start w-full h-2 rounded bg-gray-200 mb-2 relative group">
                                <div className="flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-1 h-2 rounded w-3/4">
                                    {/*<span className='text-xs font-semibold cursor-pointer text-white inline'>120 XP</span>*/}
                                </div>
                                <div className="flex items-center justify-center w-1/4">
                                    {/*<span className='text-xs font-semibold cursor-pointer text-black'>60 XP</span>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AchievementPage