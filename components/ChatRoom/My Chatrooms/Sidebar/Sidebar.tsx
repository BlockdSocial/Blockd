import React, { useState } from 'react'
import SidebarRow from './SidebarRow';
import {
    MicrophoneIcon,
    ComputerDesktopIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    HomeIcon,
    ArrowTrendingUpIcon,
    LightBulbIcon,
    FireIcon,
    ChatBubbleLeftIcon,
    ChatBubbleLeftRightIcon,
    PlusCircleIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRouter } from 'next/router'

function Sidebar() {

    let location = useRouter();
    const [isOpen, setOpen] = useState(false);

    return (
        <div className="md:flex md:flex-col hidden col-span-1 items-center p-2 border-x dark:border-lightgray">
            <Link href="/" className='active'>
                {/* 
                // @ts-ignore */}
                <SidebarRow Icon={HomeIcon} active='' />
            </Link>
            <Link href="/dashboard/profile">
                {/* 
                // @ts-ignore */}
                <SidebarRow Icon={UserIcon} active='' />
            </Link>
            <Link href="achievement">
                {/* 
                // @ts-ignore */}
                <SidebarRow Icon={FireIcon} active='' />
            </Link>
            <Link href="suggestion">
                {/* 
                // @ts-ignore */}
                <SidebarRow Icon={LightBulbIcon} active='' />
            </Link>
            <Link
                href=""
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                className="relative">
                <div className='flex items-center justify-center'>
                    <div
                        className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}>
                        <ChatBubbleBottomCenterTextIcon className='h-6 w-6' />
                    </div>
                </div>
                {isOpen && (
                    <div className="w-full flex flex-col items-center justify-center">
                        <Link href="/dashboard/myChatrooms" className="flex items-center justify-center p-2 py-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full lg:space-x-2">
                            <ChatBubbleLeftIcon className='w-5 h-5' />
                        </Link>
                        <Link href="/dashboard/createChatroom" className="flex items-center justify-center p-2 py-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full lg:space-x-2">
                            <PlusCircleIcon className='w-5 h-5' />
                        </Link>
                        <Link href="/dashboard/allChatrooms" className="flex items-center justify-center p-2 py-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full lg:space-x-2">
                            <ChatBubbleLeftRightIcon className='w-5 h-5' />
                        </Link>
                    </div>
                )}
            </Link>
            <Link href="">
                {/* 
                // @ts-ignore */}
                <SidebarRow Icon={ComputerDesktopIcon} active='' />
            </Link>
            <Link href="">
                {/* 
                // @ts-ignore */}
                <SidebarRow Icon={MicrophoneIcon} active='' />
            </Link>
        </div>
    )
}

export default Sidebar