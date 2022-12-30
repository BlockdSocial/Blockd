import Link from 'next/link'
import React from 'react'
import ChatbarRow from './ChatbarRow'
import {
  UsersIcon,
  UserIcon
} from '@heroicons/react/24/outline'

function Chatbar() {
  return (
    <div className='relative flex flex-col col-span-2 md:col-span-3 items-center md:justify-start border-r scrollbar-hide overflow-scroll h-screen'>
      <div className='flex items-center justify-center md:justify-start space-x-2 p-4 border-y w-full'>
        <UsersIcon className="w-6 h-6" />
        <p className='text-l font-semibold hidden md:inline'>Groups Chat</p>
      </div>
      <Link href="/" className='w-full px-2'>
        <ChatbarRow Picture='/images/chatLogo/Bitcoin.png' RoomName='Bitcoin Official' active='' />
      </Link>
      <Link href="/" className='w-full px-2'>
        <ChatbarRow Picture='/images/chatLogo/Ethereum.png' RoomName='Ethereum Official' active='' />
      </Link>
      <Link href="/" className='w-full px-2'>
        <ChatbarRow Picture='/images/chatLogo/Polygon.png' RoomName='Polygon Official' active='' />
      </Link>
      <Link href="/" className='w-full px-2'>
        <ChatbarRow Picture='/images/chatLogo/EGO.png' RoomName='EGO Official' active='' />
      </Link>
      <div className='flex items-center justify-center md:justify-start space-x-2 p-4 border-y w-full mt-2'>
        <UserIcon className="w-6 h-6" />
        <p className='text-l font-semibold hidden md:inline'>Users Chat</p>
      </div>
      <Link href="/" className='w-full px-2'>
        <ChatbarRow Picture='/images/pfp/pfp3.jpg' RoomName='Crypto_Crazy' active='' />
      </Link>
      <Link href="/" className='w-full px-2'>
        <ChatbarRow Picture='/images/pfp/pfp1.jpg' RoomName='Monkey_Crypto' active='' />
      </Link>
    </div>
  )
}

export default Chatbar