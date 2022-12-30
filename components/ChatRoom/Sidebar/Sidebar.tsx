import React from 'react'
import SidebarRow from './SidebarRow';
import {
    MicrophoneIcon,
    ComputerDesktopIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    HomeIcon,
    ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRouter } from 'next/router'

function Sidebar() {

    let location = useRouter();

    return (
        <div className='hidden md:flex flex-col col-span-1 items-center p-2 border-r h-screen'>
            <Link href="/" className='active'>
                {location.pathname === '/' ? (
                    <SidebarRow Icon={HomeIcon} active='bg-gray-100 dark:bg-lightgray'/>
                ):(
                    <SidebarRow Icon={HomeIcon} active=''/>
                )}     
            </Link>
            <Link href="profile">
                {location.pathname === '/profile' ? (
                    <SidebarRow Icon={UserIcon} active='bg-gray-100 dark:bg-lightgray'/>
                ):(
                    <SidebarRow Icon={UserIcon} active=''/>
                )}
            </Link>
            <Link href="">
                <SidebarRow Icon={ChatBubbleBottomCenterTextIcon} active='' />
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