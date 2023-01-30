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
        <div className='flex items-start justify-center col-span-1 md:col-span-2 px-2'>
            <div className='relative flex flex-col items-start p-2 mt-3 md:items-start w-fit'>
                <Link href="/" className='active'>
                    {location.pathname === '/' ? (
                        <SidebarRow Icon={HomeIcon} title="Home" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                        <SidebarRow Icon={HomeIcon} title="Home" active='' />
                    )}
                </Link>
                <Link href="/dashboard/profile">
                    {location.pathname === '/dashboard/profile' ? (
                        <SidebarRow Icon={UserIcon} title="Profile" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                        <SidebarRow Icon={UserIcon} title="Profile" active='' />
                    )}
                </Link>
                <Link href="achievement">
                    {location.pathname === '/achievement' ? (
                        <SidebarRow Icon={FireIcon} title="Achievements" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                        <SidebarRow Icon={FireIcon} title="Achievements" active='' />
                    )}
                </Link>
                <Link href="suggestion">
                    {location.pathname === '/dashboard/suggestion' ? (
                        <SidebarRow Icon={LightBulbIcon} title="Suggestions" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                        <SidebarRow Icon={LightBulbIcon} title="Suggestions" active='' />
                    )}
                </Link>
                <Link href="dashboard/chatroom">
                    {location.pathname === '/dashboard/chatroom' ? (
                        <SidebarRow Icon={ChatBubbleBottomCenterTextIcon} title="ChatRooms" active='bg-gray-100 dark:bg-lightgray' />
                    ) : (
                        <SidebarRow Icon={ChatBubbleBottomCenterTextIcon} title="ChatRooms" active='' />
                    )}
                </Link>
                <Link href="">
                    <SidebarRow Icon={ComputerDesktopIcon} title="Streams" active='' />
                </Link>
                <Link href="">
                    <SidebarRow Icon={MicrophoneIcon} title="Podcasts" active='' />
                </Link>
                <Link href="" className='inline md:hidden'>
                    <SidebarRow Icon={ArrowTrendingUpIcon} title="" active='' />
                </Link>
            </div>
            <div className='md:flex items-center justify-center absolute bottom-2 hidden'>
                <p className='p-2 text-xs items-center justify-center text-center font-semibold w-3/4'>
                    Verified By Blockchain Technology, Blockd LLC.
                </p>
            </div>
        </div>
    )
}

export default Sidebar
