import React from 'react'
import SidebarRow from './SidebarRow';
import {
    MicrophoneIcon,
    ComputerDesktopIcon,
    ChatBubbleBottomCenterTextIcon,
    UserIcon,
    HomeIcon,
    BellIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRouter } from 'next/router'

function Sidebar() {

    let location = useRouter();

    return (
        <div className='flex flex-col col-span-1 md:col-span-2 items-center px-4 mt-3 md:mt-0 md:p-4 lg:pl-10 md:items-start'>
            <Link href="/" className='active'>
                {location.pathname === '/' ? (
                    <SidebarRow Icon={HomeIcon} title="Home" active='bg-gray-100 dark:bg-lightgray'/>
                ):(
                    <SidebarRow Icon={HomeIcon} title="Home" active=''/>
                )}     
            </Link>
            <Link href="profile">
                {location.pathname === '/profile' ? (
                    <SidebarRow Icon={UserIcon} title="Profile"  active='bg-gray-100 dark:bg-lightgray'/>
                ):(
                    <SidebarRow Icon={UserIcon} title="Profile"  active=''/>
                )}
            </Link>
            <Link href="">
                <SidebarRow Icon={BellIcon} title="Notifications" active='' />
            </Link>
            <Link href="">
                <SidebarRow Icon={ChatBubbleBottomCenterTextIcon} title="ChatRooms" active='' />
            </Link>
            <Link href="">
                <SidebarRow Icon={ComputerDesktopIcon} title="Streams" active='' />
            </Link>
            <Link href="">
                <SidebarRow Icon={MicrophoneIcon} title="Podcasts" active='' />
            </Link>
        </div>
    )
}

export default Sidebar
