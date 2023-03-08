import Link from 'next/link'
import React from 'react'
import ChatbarRow from './ChatbarRow'
import {
  UsersIcon,
  UserIcon
} from '@heroicons/react/24/outline'

function Chatbar() {
  return (
    <div className='relative md:flex md:flex-col col-span-1 pt-4 hidden items-center border-r dark:border-lightgray'>
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