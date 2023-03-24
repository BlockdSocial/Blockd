import Link from 'next/link'
import React from 'react'
import ChatbarRow from './ChatbarRow'

function Chatbar() {
  return (
    <div className='relative flex flex-col col-span-1 pt-4 items-center border-r dark:border-lightgray'>
      <div className='flex flex-col h-full scrollbar-hide overflow-scroll w-full space-y-2'>
        <Link href="/" className='w-full'>
          <ChatbarRow Picture='/images/chatLogo/Bitcoin.png' Notif={245} active='' />
        </Link>
        <Link href="/" className='w-full'>
          <ChatbarRow Picture='/images/chatLogo/Ethereum.png' Notif={15} active='' />
        </Link>
        <Link href="/" className='w-full'>
          <ChatbarRow Picture='/images/chatLogo/Polygon.png' Notif={0} active='' />
        </Link>
        <Link href="/" className='w-full'>
          <ChatbarRow Picture='/images/chatLogo/EGO.png' Notif={36} active='' />
        </Link>
      </div>
    </div>
  )
}

export default Chatbar