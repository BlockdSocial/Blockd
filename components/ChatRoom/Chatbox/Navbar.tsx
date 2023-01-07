import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
    EllipsisHorizontalIcon,
    SpeakerWaveIcon,
    EyeDropperIcon,
    ArrowRightOnRectangleIcon,
    InformationCircleIcon,
} from '@heroicons/react/24/outline'
import Info from '../Widget/Info';
import Members from '../Widget/Members';

function Navbar() {

    let [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const dropdown = useRef<any>(null);

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!isDropdownVisible) return;
        function handleClick(event:any) {
            if(isDropdownVisible === true) {
                if (dropdown.current && !dropdown.current.contains(event.target)) {
                  setIsDropdownVisible(false);
                }
            }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
      }, [isDropdownVisible]);

    return (
        <div className="flex items-center justify-between absolute top-0 h-[8vh] w-full dark:bg-darkgray border-b dark:border-lightgray p-4">
            <div className='flex items-center space-x-2'>
                <img onClick={() => setIsModalVisible(!isModalVisible)} src='/images/chatLogo/Bitcoin.png' className='h-8 w-8 cursor-pointer rounded-full lg:hidden' />
                <img src='/images/chatLogo/Bitcoin.png' className='h-8 w-8 rounded-full hidden lg:flex' />
                <div className={`absolute left-2 top-14 ml-auto mr-auto w-96 z-50 ${isModalVisible ? '' : 'hidden'}`}>
                    <div className="relative w-full h-96 overflow-scroll scrollbar-hide rounded-lg max-w-md dark:border dark:border-white bg-white shadow dark:bg-lightgray">
                        <div className="relative">
                            <div className='flex items-center justify-start h-[8vh] p-2 z-[1] sticky top-0 backdrop-blur-md border-b dark:border-lightgray bg-white/30 dark:bg-darkgray/30'>
                                <div className='flex items-center justify-bteween space-x-2 p-1'>
                                    <div className='flex items-center justify-start'>
                                        <InformationCircleIcon className='w-5 h-5' />
                                        <p className='font-semibold'>Group Info</p>
                                    </div>
                                    <button type="button" onClick={() => setIsModalVisible(!isModalVisible)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-darkgray dark:hover:text-white">
                                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                            </div>

                            <Info />
                            <Members />

                        </div >
                    </div>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <p className='font-semibold'>BTC Official Chat</p>
                    <p className='text-xs'>480 members, 26 online</p>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div ref={dropdown} className='flex flex-col items-center justify-center'>
                    <EllipsisHorizontalIcon onClick={() => setIsDropdownVisible(b => !b)} className='cursor-pointer w-8 h-8' />
                    <div className='relative z-10 flex ite'>
                        <ul className={`absolute top-0 -right-3 w-36 cursor-pointer bg-white dark:bg-lightgray rounded-lg shadow-xl ${isDropdownVisible ? '' : 'hidden'}`}>
                            <Link type='button' href="" className="flex items-center justify-start  p-3 hover:bg-gray-200 hover:font-semibold hover:rounded-t-md dark:hover:bg-darkgray/50"><SpeakerWaveIcon className='w-5 h-5 mr-2' />Mute</Link>
                            <Link type='button' href="" className="flex items-center justify-start  p-3 hover:bg-gray-200 hover:font-semibold dark:hover:bg-darkgray/50"><EyeDropperIcon className='w-5 h-5 mr-2' />Pin Group</Link>
                            <Link type='button' href="" className="flex items-center justify-start  p-3 hover:bg-gray-200 hover:font-semibold hover:rounded-b-md dark:hover:bg-darkgray/50"><ArrowRightOnRectangleIcon className='w-5 h-5 mr-2' />Leave Group</Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar