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
  user: User;
  createdAt: string;
  postId: number;
  commentId: number;
  replyId: number;
}

function NotificationsPage() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { notifications } = useAppSelector((state) => state.notificationReducer);

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
    <div className='min-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x pb-14'>
      <div className='flex sticky items-center justify-between top-0 p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <div className='flex items-center justify-start space-x-1'>
          <BellIcon className='w-6 h-6' />
          <p className='text-xl font-semibold'>Notifications</p>
        </div>
        <div className='flex items-center justify-center'>
          <ArrowPathIcon
            onClick={handleRefresh}
            className='h-6 w-6 cursor-pointer text-blockd dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale'
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
            notification={notification}
            handleFetchNotifications={handleFetchNotifications}
          />
        ))
      }
    </div>
  )
}

export default NotificationsPage