import React from 'react'
import SidebarRow from './SidebarRow';
import {
    MicrophoneIcon,
    ComputerDesktopIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    HomeIcon,
    ArrowTrendingUpIcon,
    LightBulbIcon,
    FireIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRouter } from 'next/router'

function Sidebar() {

    let location = useRouter();

    return (
        <div className='hidden md:flex flex-col col-span-1 items-center p-2 border-r dark:border-lightgray'>
            <Link href="/" className='active'>
                <SidebarRow Icon={HomeIcon} active='' />
            </Link>
            <Link href="/dashboard/profile">
                <SidebarRow Icon={UserIcon} active='' />
            </Link>
            <Link href="achievement">
                <SidebarRow Icon={FireIcon} active='' />
            </Link>
            <Link href="suggestion">
                <SidebarRow Icon={LightBulbIcon} active='' />
            </Link>
            <Link href="dashboard/chatroom">
                {location.pathname === '/dashboard/chatroom' ? (
                    <SidebarRow Icon={ChatBubbleBottomCenterTextIcon} active='bg-gray-100 dark:bg-lightgray' />
                ) : (
                    <SidebarRow Icon={ChatBubbleBottomCenterTextIcon} active='' />
                )}
            </Link>
            <Link href="">
                <SidebarRow Icon={ComputerDesktopIcon} active='' />
            </Link>
            <Link href="">
                <SidebarRow Icon={MicrophoneIcon} active='' />
            </Link>
            <Link href="">
                <SidebarRow Icon={ArrowTrendingUpIcon} active='' />
            </Link>
        </div>
    )
}

export default Sidebar