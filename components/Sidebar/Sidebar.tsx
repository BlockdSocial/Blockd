import React, { useState } from 'react'
import SidebarRow from './SidebarRow';
import {
    MicrophoneIcon,
    ComputerDesktopIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    HomeIcon,
    PlusCircleIcon,
    LightBulbIcon,
    FireIcon,
    ChatBubbleLeftIcon,
    ChatBubbleLeftRightIcon,
    ChevronDownIcon,
    ChevronRightIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRouter } from 'next/router'

function Sidebar() {

    let location = useRouter();
    const [isOpen, setOpen] = useState(false);

    return (
        <div className='flex items-start justify-center lg:justify-start col-span-1 md:col-span-2 px-2 scrollbar-hide overflow-scroll h-full'>
            <div className='relative flex flex-col items-start lg:p-2 mt-3 md:items-start w-fit'>
                <Link href="/" className='active'>
                    {location.pathname === '/' ? (
                        // @ts-ignore
                        <SidebarRow Icon={HomeIcon} title="Home" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                                                // @ts-ignore
                        <SidebarRow Icon={HomeIcon} title="Home" active='' />
                    )}
                </Link>
                <Link href="/dashboard/profile">
                    {location.pathname === '/dashboard/profile' ? (
                                                // @ts-ignore
                        <SidebarRow Icon={UserIcon} title="Profile" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                                                // @ts-ignore
                        <SidebarRow Icon={UserIcon} title="Profile" active='' />
                    )}
                </Link>
                <Link href="/dashboard/achievement">
                    {location.pathname === '/dashboard/achievement' ? (
                                                // @ts-ignore
                        <SidebarRow Icon={FireIcon} title="Achievements" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                                                // @ts-ignore
                        <SidebarRow Icon={FireIcon} title="Achievements" active='' />
                    )}
                </Link>
                <Link href="/dashboard/suggestion">
                    {location.pathname === '/dashboard/suggestion' ? (
                                                // @ts-ignore
                        <SidebarRow Icon={LightBulbIcon} title="Feedback" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                                                // @ts-ignore
                        <SidebarRow Icon={LightBulbIcon} title="Feedback" active='' />
                    )}
                </Link>
                <Link
                    href=""
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    className="relative">
                    <div className='flex items-center justify-center hidden'>
                        <div
                            className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}>
                            <ChatBubbleBottomCenterTextIcon className='h-6 w-6' />
                            <p className={` md:inline-flex text-base lg:text-xl cursor-pointer`}>ChatRooms</p>
                            <div className='hidden md:inline'>
                                <ChevronRightIcon className={`w-4 h-4 ml-2 ${isOpen ? 'hidden' : 'inline'}`} />
                                <ChevronDownIcon className={`w-4 h-4 ml-2 ${isOpen ? 'inline' : 'hidden'}`} />
                            </div>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="w-full flex flex-col items-center justify-center">
                            <Link href="/dashboard/chatroom" className="flex items-center justify-center md:justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full md:space-x-2">
                                <ChatBubbleLeftIcon className='w-5 h-5' /><span className='hidden md:inline'>My Chatrooms</span>
                            </Link>
                            <Link href="/dashboard/chatroom" className="flex items-center justify-center md:justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full md:space-x-2">
                                <PlusCircleIcon className='w-5 h-5' /><span className='hidden md:inline'>Create Chatroom</span>
                            </Link>
                            <Link href="" className="flex items-center justify-center md:justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full md:space-x-2">
                                <ChatBubbleLeftRightIcon className='w-5 h-5' /><span className='hidden md:inline'>All Chatrooms</span>
                            </Link>
                        </div>
                    )}
                </Link>
                      {/* 
                <Link href="">
                 {/*
                // @ts-ignore */}
                 {/* 
                    <SidebarRow Icon={ComputerDesktopIcon} title="Streams" active='' />
                </Link>
                <Link href="">
                    {/* 
                // @ts-ignore */}
                 {/* 
                    <SidebarRow Icon={MicrophoneIcon} title="Podcasts" active='' />
                </Link>
                */}
            </div>
        </div>
    )
}

export default Sidebar
