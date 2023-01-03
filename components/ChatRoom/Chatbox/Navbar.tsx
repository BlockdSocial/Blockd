import Link from 'next/link'
import React, { useState } from 'react'
import {
    EllipsisHorizontalIcon,
    SpeakerWaveIcon,
    EyeDropperIcon,
    ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline'

function Navbar() {

    let [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownVisible(!isDropdownVisible);
    }
    return (
        <div className="flex items-center justify-between sticky top-0 h-[8vh] w-full dark:bg-darkgray border-b dark:border-lightgray p-4">
            <div className='flex items-center space-x-2'>
                <img src='/images/chatLogo/Bitcoin.png' className='h-8 w-8 rounded-full' />
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-semibold'>BTC Official Chat</p>
                    <p className='text-xs'>480 members, 26 online</p>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <EllipsisHorizontalIcon onClick={() => toggleDropdown()} className='cursor-pointer w-8 h-8' />
                <ul className={`absolute top-12 right-3 cursor-pointer bg-white dark:bg-lightgray rounded-lg shadow-xl ${isDropdownVisible ? '' : 'hidden'}`}>
                    <Link type='button' href="" className="flex items-center justify-start p-3 hover:bg-gray-200 hover:font-semibold hover:rounded-t-md dark:hover:bg-darkgray/50"><SpeakerWaveIcon className='w-5 h-5 mr-2' />Mute</Link>
                    <Link type='button' href="" className="flex items-center justify-start p-3 hover:bg-gray-200 hover:font-semibold dark:hover:bg-darkgray/50"><EyeDropperIcon className='w-5 h-5 mr-2' />Pin Group</Link>
                    <Link type='button' href="" className="flex items-center justify-start p-3 hover:bg-gray-200 hover:font-semibold hover:rounded-b-md dark:hover:bg-darkgray/50"><ArrowRightOnRectangleIcon className='w-5 h-5 mr-2' />Leave Group</Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar