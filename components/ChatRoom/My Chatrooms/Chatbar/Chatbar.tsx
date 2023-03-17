import Link from 'next/link'
import React, { useEffect } from 'react'
import ChatbarRow from './ChatbarRow'
import {
  UsersIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../../../stores/hooks'
import { fetchUserChatrooms } from '../../../../stores/chat/ChatActions'

function Chatbar({ setRoom, setReceiver }: any) {
  const dispatch = useAppDispatch();
  const { chatrooms } = useAppSelector((state) => state.chatReducer);

  useEffect(() => {
    handleFetchRooms();
  }, []);

  const handleFetchRooms = async () => {
    await dispatch(fetchUserChatrooms());
  }

  return (
    <div className='relative md:flex md:flex-col col-span-1 pt-4 hidden items-center border-r dark:border-lightgray'>
      <div className='flex flex-col h-full scrollbar-hide overflow-scroll w-full'>
        {
          chatrooms?.map((chatroom: any) => (
            <div
              onClick={() => {
                setRoom(chatroom),
                setReceiver(undefined)
              }}
              key={chatroom?.id}
              className='w-full cursor-pointer'
            >
              <ChatbarRow Picture='/images/placeholder.png' Notif={0} active='' />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Chatbar