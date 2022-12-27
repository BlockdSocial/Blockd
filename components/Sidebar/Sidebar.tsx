import React from 'react'
import Image from 'next/image';
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


function Sidebar() {
    return (
        <div className='flex flex-col col-span-1 md:col-span-2 items-center px-4 mt-3 md:mt-0 md:p-4 lg:pl-10 md:items-start'>
            <Link href="/">
                <SidebarRow Icon={HomeIcon} title="Home" />
            </Link>
            <Link href="">
                <SidebarRow Icon={UserIcon} title="Profile" />
            </Link>
            <Link href="">
                <SidebarRow Icon={BellIcon} title="Notifications" />
            </Link>
            <Link href="">
                <SidebarRow Icon={ChatBubbleBottomCenterTextIcon} title="ChatRooms" />
            </Link>
            <Link href="">
                <SidebarRow Icon={ComputerDesktopIcon} title="Streams" />
            </Link>
            <Link href="">
                <SidebarRow Icon={MicrophoneIcon} title="Podcasts" />
            </Link>
        </div>
    )
}

export default Sidebar
