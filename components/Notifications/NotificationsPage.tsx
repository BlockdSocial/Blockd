import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import {
  BellIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { fetchUserNotifications } from '../../stores/notification/NotificationActions'
import { isEmpty } from 'lodash'
import CustomLoadingOverlay from '../CustomLoadingOverlay'

interface IPic {
  name: string;
}

interface Pic {
  image: IPic;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
  profilePic: Pic;
}

interface INotification {
  id: number;
  type: string;
  otherUser: User;
  createdAt: string;
  postId: number;
  commentId: number;
  replyId: number;
}

function NotificationsPage() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { notifications, isFetchingUserNotifications } = useAppSelector((state) => state.notificationReducer);

  useEffect(() => {
    handleFetchNotifications();
  }, []);

  const Notifications = dynamic(() => import('./Notifications'), { ssr: false })
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...');
    await new Promise(f => setTimeout(f, 1000));
    toast.success('Notifications Updated!', {
      id: refreshToast,
    })
  }

  const handleFetchNotifications = async () => {
    await dispatch(fetchUserNotifications());
  }

  return (
    <div className='min-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 md:border-x pb-14'>
      <CustomLoadingOverlay active={isFetchingUserNotifications} />
      <div className='flex sticky items-center justify-between top-0 p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <div className='flex items-center justify-start space-x-1'>
          <BellIcon className='w-5 h-5 md:w-6 md:h-6' />
          <p className='text-base md:text-xl font-semibold'>Notifications</p>
        </div>
        <div className='flex items-center justify-center'>
          <ArrowPathIcon
            onClick={handleRefresh}
            className='h-6 w-6 cursor-pointer text-black dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale'
          />
        </div>
      </div>
      <hr></hr>
      {
        notifications &&
        notifications?.map((notification: INotification) => (
          notification?.type !== 'message' &&
          <Notifications
            key={notification?.id}
            // @ts-ignore
            notification={notification}
            handleFetchNotifications={handleFetchNotifications}
          />
        ))
      }
    </div>
  )
}

export default NotificationsPage