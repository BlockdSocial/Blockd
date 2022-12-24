import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import {
    BellIcon,
    ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline'
import IconGroup from './IconGroup';

const Navbar = () => {

    let [open, setOpen] = useState(false);
    return (
        <div className='w-full shadow-md top-0 left-0'>
            <div className='md:flex items-center justify-between bg-bgcolor md:px-5 h-20'>
                <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] text-white'>
                        <Image
                            src="/images/logo.png"
                            alt="Blockd Logo"
                            className="m-6 ml-4 md:ml-8"
                            width={60}
                            height={40}
                        />
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-4 md:right-8 top-6 cursor-pointer md:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white" name={open ? 'close' : 'menu'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>

                <ul className={`bg-bgcolor md:flex absolute items-center md:static md:z-auto right-0 w-1/3 md:w-auto md:pl-0 transition-all ease-in ${open ? 'top-20 h-full' : 'top-[-490px] h-20 '}`}>
                    <li className='flex flex-col items-center text-l my-1'>
                        <Link href="">
                            <IconGroup Icon={ChatBubbleBottomCenterTextIcon} notif="10" name='Messages'></IconGroup>
                        </Link>
                    </li>
                    <li className='flex flex-col items-center text-l my-1'>
                        <Link href="">
                            <IconGroup Icon={BellIcon} notif="3" name='Notifications'></IconGroup>
                        </Link>
                    </li>
                    <li className='flex flex-col items-center text-l my-1 md:ml-3'>
                        <Link href="/auth/signup" className='text-white hover:text-gray-300 font-semibold'>Sign Up</Link>
                    </li>
                    <li className='flex flex-col items-center text-l my-4'>
                    <hr className='w-1/2'></hr>
                    </li>     
                    <li className='md:ml-4 flex flex-col items-center text-l my-4'>
                        <button className="animate-pulse bg-transparent hover:bg-blockd text-white font-semibold hover:text-white py-2 px-4 border rounded-full border-white hover:border-blockd">
                            Connect Wallet
                        </button>
                    </li>              
                </ul>
            </div>
        </div>
    )
}

export default Navbar