import Link from 'next/link'
import React from 'react'
import ChatbarRow from './ChatbarRow'
import {
  UsersIcon,
  UserIcon
} from '@heroicons/react/24/outline'

function Chatbar() {
  return (
    <div className='relative flex flex-col col-span-2 md:col-span-2 lg:col-span-1 items-center border-r dark:border-lightgray'>
      <div className='flex items-center justify-center space-x-2 h-14 p-4 border-b w-full dark:border-lightgray'>
        <UsersIcon className="w-6 h-6" />
      </div>
      <div className='flex flex-col h-full scrollbar-hide overflow-scroll w-full'>
        <Link href="/" className='w-full'>
          <ChatbarRow Picture='/images/chatLogo/Bitcoin.png' Notif={245} active='' />
        </Link>
        <Link href="/" className='w-full'>
          <ChatbarRow Picture='/images/chatLogo/Ethereum.png' Notif={15} active='' />
        </Link>
        <Link href="/" className='w-full'>
          <ChatbarRow Picture='/images/chatLogo/Polygon.png' Notif={2} active='' />
        </Link>
        <Link href="/" className='w-full'>
          <ChatbarRow Picture='/images/chatLogo/EGO.png' Notif={36} active='' />
        </Link>
      </div>
    </div>
  )
}

export default Chatbar