import React, { useState } from 'react'
import {
    ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Achievements from './Achievements'
import Missions from './Missions'

function AchievementPage() {

    let [showAchievement, setShowAchievement] = useState<boolean>(true)
    let [showMissions, setShowMissions] = useState<boolean>(false)

    const handleToggle1 = () => {
        if (showAchievement == false) {
            setShowAchievement(!showAchievement)
            showMissions = false
            setShowMissions(showMissions)
        }
    };

    const handleToggle2 = () => {
        if (showMissions == false) {
            setShowMissions(!showMissions)
            showAchievement = false
            setShowAchievement(showAchievement)
        }
    };

    return (
        <div className='relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x p-2 sm:px-16 md:px-10 lg:px-20 xl:px-36'>
            <div className="flex flex-col items-center justify-center p-4 border dark:border-lightgray rounded-lg shadow-lg">
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
                                8
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        <p className='text-sm font-semibold mb-2'>Total</p>
                        <p className='text-2xl font-semibold text-gray-500 dark:text-gray-300'>1500</p>
                        <p className='text-l font-semibold text-gray-500 dark:text-gray-300'>Experience</p>
                    </div>
                </div>
                <div className='flex items-center justify-center space-x-8 mb-6'>
                    <p onClick={() => handleToggle1()} className={`font-semibold cursor-pointer ${showAchievement === true ? 'border-b-2 border-blockd text-blockd :' : ''}`}>Achievements</p>
                    <p onClick={() => handleToggle2()} className={`font-semibold cursor-pointer ${showMissions === true ? 'border-b-2 border-blockd text-blockd :' : ''}`}>Missions</p>
                </div>
                {showAchievement &&
                    <Achievements />
                }
                {showMissions &&
                    <Missions />
                }
            </div>
        </div>
    )
}

export default AchievementPage