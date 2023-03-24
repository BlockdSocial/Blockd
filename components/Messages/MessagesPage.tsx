import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  ChatBubbleBottomCenterTextIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { fetchUserNotifications } from '../../stores/notification/NotificationActions'

function MessagesPage() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { notifications } = useAppSelector((state) => state.notificationReducer);

  useEffect(() => {
    handleFetchNotifications();
  }, []);

  const Messages = dynamic(() => import('./Messages'), { ssr: false })
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...');
    await new Promise(f => setTimeout(f, 1000));
    toast.success('Messages Updated!', {
      id: refreshToast,
    })
  }

  const handleFetchNotifications = async () => {
    await dispatch(fetchUserNotifications());
  }

  return (
    <div className='max-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 md:border-x'>
      <div className='flex sticky items-center justify-between top-0 border-b p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <div className='flex items-center justify-start space-x-1'>
          <ChatBubbleBottomCenterTextIcon className='w-5 h-5 md:w-6 md:h-6' />
          <p className='text-base md:text-xl font-semibold'>Messages</p>
        </div>
        <div className='flex items-center justify-center'>
          <ArrowPathIcon
            onClick={handleRefresh}
            className='h-6 w-6 cursor-pointer text-blockd dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale'
          />
        </div>
      </div>
      {
        notifications &&
        notifications?.map((notification: any) => (
          notification?.type === 'message' &&
          <Messages 
            key={notification?.id}
            notification={notification}
            handleFetchNotifications={handleFetchNotifications}
          />
        ))
      }
    </div>
  )
}

export default MessagesPage