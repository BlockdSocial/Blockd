import React from 'react'
import {
  ArrowSmallRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useAppDispatch } from '../../stores/hooks';
import { isEmpty } from 'lodash';
import { config } from "../../constants";
import moment from 'moment';
import { readNotification } from '../../stores/notification/NotificationActions';

interface IPic {
  name: string;
}

interface Pic {
  image: IPic;
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
}

interface Props {
  notification: INotification
}

function Notifications({ notification }: Props) {
  const dispatch = useAppDispatch();

  const handleReadNotification = async () => {
    await dispatch(readNotification(notification?.id));
  }

  return (
    <div className="divide-slate-200 dark:divide-lightgray">
      <Link href="/dashboard/profile" className="flex items-center justify-between group/item border-b dark:border-lightgray hover:bg-slate-100 dark:hover:bg-lightgray p-4 cursor-pointer">
        <div className='flex mr-2'>
          <img
            className="h-10 w-10 rounded-full"
            src={
              !isEmpty(notification?.user?.profilePic)
                ? `${config.url.PUBLIC_URL}/${notification?.user?.profilePic?.image?.name}`
                : "/images/pfp/pfp1.jpg"
            }
            alt=""
          />
          <div className="ml-3 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-900 dark:text-white"><span className="font-bold">{notification?.user?.name}</span>{' '}
              {
                'like' === notification?.type ?
                  'liked your post!' :
                  'dislike' === notification?.type ?
                    'disliked your post!' :
                    'comment' === notification?.type ?
                      'commented on your post!' :
                      'follow' === notification?.type ?
                        'followed you!' :
                        'levelUpgrade' === notification?.type ?
                        'Your level has been upgraded!' :
                        ''
              } . {moment(notification?.createdAt).fromNow()}
            </p>
          </div>
        </div>
        {
          notification?.type !== 'follow' &&
          <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md'>
            <Link onClick={() => handleReadNotification()}
              href={{
                pathname: "/dashboard/post/",
                query: { postId: notification?.postId },
              }} className="flex invisible group-hover/item:visible">
              <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
              <div className='flex items-center ml-2'>
                <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
              </div>
            </Link>
          </div>
        }
      </Link>
    </div>
  )
}

export default Notifications