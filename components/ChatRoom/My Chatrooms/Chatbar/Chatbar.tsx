import Link from 'next/link'
import React, { useEffect } from 'react'
import ChatbarRow from './ChatbarRow'
import {
  UsersIcon,
  UserIcon
} from '@heroicons/react/24/outline'
import { useAppDispatch, useAppSelector } from '../../../../stores/hooks'
import { fetchUserChatrooms } from '../../../../stores/chat/ChatActions'
import { isEmpty } from 'lodash'
import { config } from '../../../../constants'

function Chatbar({ setRoom, setReceiver, chatrooms }: any) {

  return (
    <div className='relative flex flex-col col-span-1 pt-4 items-center border-r dark:border-lightgray flex-1 scrollbar-hide overflow-scroll'>
      <div className='flex flex-col w-full space-y-2'>
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
              <ChatbarRow
                Picture={
                  !isEmpty(chatroom?.room?.imgName) ?
                    `${config.url.PUBLIC_URL}/${chatroom?.room?.imgName}` :
                    '/images/placeholder.png'
                }
                Notif={0} active=''
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Chatbar