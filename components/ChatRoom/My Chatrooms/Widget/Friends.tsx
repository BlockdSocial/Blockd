import React from 'react'

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { isEmpty } from 'lodash';
import { config } from '../../../../constants';

function Friends({ chats, setReceiver, closeShowFriends }: any) {
  return (
    <div className='max-h-screen scrollbar-hide overflow-scroll dark:bg-darkgray'>
      {
        !isEmpty(chats) &&
        chats.map((chat: any, index: any) => (
          <div
            key={index}
            className='flex items-center justify-between p-2 w-full space-x-4 hover:bg-gray-100 dark:hover:bg-lightgray cursor-pointer group'
            onClick={() => {
              setReceiver(chat?.receiver)
              closeShowFriends()
            }}
          >
            <div className='flex items-center justify-start p-2'>
              <div className='flex items-center justify-center'>
                <img
                  src={
                    !isEmpty(chat?.receiver?.profilePic)
                      ? `${config.url.PUBLIC_URL}/${chat?.receiver?.profilePic?.name}`
                      : "/images/pfp/pfp1.jpg"
                  }
                  className='w-10 h-10 rounded-full'
                />
              </div>
              <div className='flex flex-col items-start justify-start ml-4'>
                <div className='flex items-center justify-center space-x-2'>
                  <span className='text-base font-semibold'>@{chat?.receiver?.name}</span>
                  {/* <span className='w-3 h-3 bg-green-500 rounded-full'></span> */}
                </div>
                {/* <span className='text-xs'>Last seen Recently</span> */}
              </div>
            </div>
            <div className='hidden group-hover:flex items-center justify-center space-x-1'>
              {/* <PersonAddAlt1RoundedIcon className='w-6 h-6 hover:text-gray-600 dark:hover:text-gray-200' /> */}
              <ClearRoundedIcon className='w-6 h-6 hidden group-hover:inline hover:text-gray-600 dark:hover:text-gray-200' />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Friends