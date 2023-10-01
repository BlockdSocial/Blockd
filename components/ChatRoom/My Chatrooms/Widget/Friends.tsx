import React from 'react'

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { isEmpty } from 'lodash';
import { config } from '../../../../constants';
import { useAppDispatch } from '../../../../stores/hooks';
import { deleteChat } from '../../../../stores/chat/ChatActions';

function Friends({ chats, setReceiver, setRoom, closeShowFriends, refetchChats }: any) {
  const dispatch = useAppDispatch();

  const handleDeleteChat = async (e: any, chatId: any) => {
    e.stopPropagation();
    await dispatch(deleteChat(chatId)).then(() => {
      refetchChats();
      setReceiver();
    });
  }

  return (
    <div className='flex-1 scrollbar-hide overflow-scroll dark:bg-darkgray'>
      {
        !isEmpty(chats) &&
        chats.map((chat: any, index: any) => (
          <div
            key={index}
            className='flex items-center justify-between p-2 w-full hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer group'
            onClick={() => {
              setReceiver(chat?.otherUser);
              setRoom(null);
              closeShowFriends();
            }}
          >
            <div className='flex items-center justify-start space-x-2'>
              <div className='flex items-center justify-center'>
                <img
                  src={
                    !isEmpty(chat?.otherUser?.profilePic)
                      ? `${config.url.PUBLIC_URL}/${chat?.otherUser?.profilePic?.name}`
                      : "/images/pfp/blockd.jpg"
                  }
                  className='w-10 h-10 rounded-md object-cover'
                />
              </div>
              <div className='flex flex-col items-start justify-start ml-4'>
                <div className='flex items-center justify-center space-x-2'>
                  <span className='text-xs md:text-sm font-semibold'>@{chat?.otherUser?.name}</span>
                  {/* <span className='w-3 h-3 bg-green-500 rounded-full'></span> */}
                </div>
                {/* <span className='text-xs'>Last seen Recently</span> */}
              </div>
            </div>
            <div className='md:hidden md:group-hover:flex items-center justify-center space-x-1' onClick={(e: any) => handleDeleteChat(e, chat?.id)}>
              {/* <PersonAddAlt1RoundedIcon className='w-6 h-6 hover:text-gray-600 dark:hover:text-gray-200' /> */}
              <ClearRoundedIcon className='w-5 h-5 md:hidden md:group-hover:inline hover:text-gray-600 dark:hover:text-gray-200' />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Friends