import React from 'react'
import {
    ChevronRightIcon,
} from '@heroicons/react/24/outline'

function AchievementPage() {
    return (
        <div className='relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x p-2'>
            <div className='grid grid-cols-4 lg:grid-cols-8 place-items-center p-4 space-y-8 lg:space-y-0 lg:space-x-8 bg-gray-100 rounded-md'>
                <div className='flex flex-col items-start col-span-4 lg:col-span-3 justify-self-center justify-center bg-gray-50 rounded-3xl space-y-3 p-6'>
                    <div className='flex flex-col mb-5'>
                        <p className='text-sm font-semibold mb-2'>Total</p>
                        <p className='text-2xl font-semibold'>3500</p>
                        <p className='text-xl font-semibold'>Experience</p>
                    </div>
                    <div className='flex items-center justify-start space-x-6 p-2 px-3 cursor-pointer bg-transparent hover:bg-white rounded-lg hover:shadow-lg hover:transition hover:scale-[1.3]'>
                        <div className='flex items-center justify-center'>
                            <img src='/images/badges/badge1.png' className='flex w-10 h-12' />
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <h1 className='text-l font-semibold'>Level 1</h1>
                            <h3 className='text-sm text-gray-500'>Earn 150 XP</h3>
                        </div>
                        <ChevronRightIcon className='w-3 h-3' />
                    </div>
                    <div className='flex items-center justify-start space-x-6 p-2 px-3 cursor-pointer bg-transparent hover:bg-white rounded-lg hover:shadow-lg hover:transition hover:scale-[1.3]'>
                        <div className='flex items-center justify-center'>
                            <img src='/images/badges/badge2.png' className='flex w-10 h-12' />
                        </div>
                        <div className='flex flex-col items-start justify-start'>
                            <h1 className='text-l font-semibold'>Level 2</h1>
                            <h3 className='text-sm text-gray-500'>Earn 300 XP</h3>
                        </div>
                        <ChevronRightIcon className='w-3 h-3' />
                    </div>
                    <div className='flex items-center justify-start space-x-6 p-2 px-3 cursor-pointer bg-transparent opacity-70'>
                        <div className='flex items-center justify-center'>
                            <img src='/images/badges/badge3.png' className='flex w-10 h-12' />
                        </div> 
                        <div className='flex flex-col items-start justify-start'>
                            <h1 className='text-l font-semibold'>Level 3</h1>
                            <h3 className='text-sm text-gray-500'>Earn 400 XP</h3>
                        </div>
                        <ChevronRightIcon className='w-3 h-3' />
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center col-span-4 lg:col-span-5 bg-gray-300/20 rounded-3xl pt-24'>
                    <div className='relative flex flex-col items-center justify-center pt-20 space-y-4 rounded-3xl p-5 px-7 bg-white'>
                        <img src='/images/badges/badge1.png' className='w-30 h-36 absolute -top-16 mx-auto' />
                        <p className='text-3xl font-semibold'>Congrats !</p>
                        <p className='text-sm px-8 font-semibold text-gray-600 text-center'>You earned 150 xp and unlocked a brand new frame color</p>
                        <p className='p-2 px-4 bg-blockd hover:bg-orange-400 cursor-pointer rounded-lg text-white font-semibold text-sm'>Unlock</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AchievementPage