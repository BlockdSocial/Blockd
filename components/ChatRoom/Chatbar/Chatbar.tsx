import Link from 'next/link'
import React from 'react'
import ChatbarRow from './ChatbarRow'
import {
  UsersIcon,
  UserIcon
} from '@heroicons/react/24/outline'

function Chatbar() {
  return (
    <div className='relative flex flex-col col-span-3 items-start p-2 border-r'>
      <div className='flex items-center justify-start space-x-2 p-4 border-b w-full'>
        <UsersIcon className="w-6 h-6" />
        <p className='text-l font-semibold'>Group Chats</p>
      </div>
      <Link href="/" className='active w-full'>
        <ChatbarRow Picture='/images/chatLogo/Bitcoin.png' RoomName='Bitcoin Official' active='' />
      </Link>
      <Link href="/" className='active w-full'>
        <ChatbarRow Picture='/images/chatLogo/Ethereum.png' RoomName='Ethereum Official' active='' />
      </Link>
      <Link href="/" className='active w-full'>
        <ChatbarRow Picture='/images/chatLogo/Polygon.png' RoomName='Polygon Official' active='' />
      </Link>
      <Link href="/" className='active w-full'>
        <ChatbarRow Picture='/images/chatLogo/EGO.png' RoomName='EGO Official' active='' />
      </Link>
      <Link href="/" className='active w-full'>
        <ChatbarRow Picture='/images/pfp/pfp3.jpg' RoomName='Crypto_Crazy' active='' />
      </Link>
      <Link href="/" className='active w-full'>
        <ChatbarRow Picture='/images/pfp/pfp1.jpg' RoomName='Monkey_Crypto' active='' />
      </Link>
    </div>
  )
}

export default Chatbar