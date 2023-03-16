import Link from 'next/link'
import React, { useEffect } from 'react'
import ChatbarRow from './ChatbarRow'
import {
  UsersIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../../../stores/hooks'
import { fetchUserChatrooms } from '../../../../stores/chat/ChatActions'

function Chatbar() {
  const dispatch = useAppDispatch();
  const { chatrooms } = useAppSelector((state) => state.chatReducer);

  useEffect(() => {
    handleFetchRooms();
  }, []);

  const handleFetchRooms = async () => {
    await dispatch(fetchUserChatrooms());
  }

  console.log('chatrooms: ', chatrooms);

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