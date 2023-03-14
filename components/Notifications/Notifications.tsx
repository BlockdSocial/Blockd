import React from 'react'
import Image from 'next/image';
import {
  ArrowSmallRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useAppDispatch } from '../../stores/hooks';
import { isEmpty } from 'lodash';
import { config } from "../../constants";
import moment from 'moment';
import { readNotification } from '../../stores/notification/NotificationActions';
import { encodeQuery } from '../../utils';


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

interface Props {
  notification: INotification
  handleFetchNotifications: () => void;
}

function Notifications({ notification, handleFetchNotifications }: Props) {
  const dispatch = useAppDispatch();

  const handleReadNotification = async () => {
    await dispatch(readNotification(notification?.id)).then(() => {
      handleFetchNotifications();

    });
  }
  let pathname, query, as;
  switch (notification?.type) {
    case 'like':
      if (null != notification?.commentId || undefined != notification?.commentId) {
        pathname = '/dashboard/post/comment';
        query = { commentId: notification?.commentId, postId: notification?.postId }
        as = `/dashboard/post/comment?${encodeQuery(notification?.commentId, 'comment')}&${encodeQuery(notification?.postId, 'post')}`
      }
      else if (null != notification?.replyId || undefined != notification?.replyId) {
        pathname = '/dashboard/post/comment';
        query = { commentId: notification?.commentId, postId: notification?.postId }
        as = `/dashboard/post/comment?${encodeQuery(notification?.commentId, 'comment')}&${encodeQuery(notification?.postId, 'post')}`
      }
      else {
        pathname = '/dashboard/post/';
        query = { postId: notification?.postId }
        as = `/dashboard/post?${encodeQuery(notification?.postId, 'post')}`
      }
      break;
    case 'dislike':
      if (null != notification?.commentId || undefined != notification?.commentId) {
        pathname = '/dashboard/post/comment';
        query = { commentId: notification?.commentId, postId: notification?.postId }
        as = `/dashboard/post/comment?${encodeQuery(notification?.commentId, 'comment')}&${encodeQuery(notification?.postId, 'post')}`
      }
      else if (null != notification?.replyId || undefined != notification?.replyId) {
        pathname = '/dashboard/post/comment';
        query = { commentId: notification?.commentId, postId: notification?.postId }
        as = `/dashboard/post/comment?${encodeQuery(notification?.commentId, 'comment')}&${encodeQuery(notification?.postId, 'post')}`
      }
      else {
        pathname = '/dashboard/post/';
        query = { postId: notification?.postId }
        as = `/dashboard/post?${encodeQuery(notification?.postId, 'post')}`
      }
      break;
    case 'comment':
      pathname = '/dashboard/post/comment';
      query = { commentId: notification?.commentId, postId: notification?.postId }
      as = `/dashboard/post/comment?${encodeQuery(notification?.commentId, 'comment')}&${encodeQuery(notification?.postId, 'post')}`
      break;
    case 'follow':
      pathname = '/dashboard/profile/';
      query = {}
      as = '/dashboard/profile/'
      break;
    case 'levelUpgrade':
      pathname = '/dashboard/profile/';
      query = {}
      as = '/dashboard/profile/'
      break;
    case 'levelDowngrade':
      pathname = '/dashboard/profile/';
      query = {}
      as = '/dashboard/profile/'
      break;
    case 'reply':
      pathname = '/dashboard/post/comment';
      query = { commentId: notification?.commentId, postId: notification?.postId }
      as = `/dashboard/post/comment?${encodeQuery(notification?.commentId, 'comment')}&${encodeQuery(notification?.postId, 'post')}`
      break;
    default:
      break;
  }

  const renderNotificationText = () => {

    switch (notification?.type) {
      case 'like':
        if (null != notification?.commentId || undefined != notification?.commentId) {
          return 'liked your comment!';
        }
        if (null != notification?.replyId || undefined != notification?.replyId) {
          return 'liked your reply!';
        }
        return 'liked your post!';
        break;
      case 'dislike':
        if (null != notification?.commentId || undefined != notification?.commentId) {
          return 'disliked your comment!';
        }
        if (null != notification?.replyId || undefined != notification?.replyId) {
          return 'disliked your reply!';
        }
        return 'disliked your post!';
        break;
      case 'comment':
        return 'commented on your post!';
        break;
      case 'follow':
        return 'followed you!';
        break;
      case 'levelUpgrade':
        return 'Your level has been upgraded!';
        break;
      case 'levelDowngrade':
        return 'Your level has been downgraded!';
        break;
      case 'reply':
        return 'replied to your comment!';
      default:
        break;
    }
  }

  return (
    <div className="divide-slate-200 dark:divide-lightgray">
      <Link
        onClick={() => handleReadNotification()}
        href={{
          pathname: pathname,
          query: query,
        }}
        as={as}
        // @ts-ignore
        className={`flex items-center justify-between group/item border-b dark:border-lightgray ${notification?.read == 0 ? 'bg-slate-100 dark:bg-lightgray' : ''} p-4 cursor-pointer`}
      >
        <div className='flex mr-2'>
          <Link
            onClick={() => handleReadNotification()}
            href={{
              pathname: "/dashboard/profile",
              query: { user_id: notification?.otherUser?.id },
            }}
            as={`/dashboard/profile?${encodeQuery(notification?.otherUser?.id, 'profile')}`}
          >
            <Image
              className="h-10 w-10 rounded-full"
              src={
                !isEmpty(notification?.otherUser?.profilePic)
                  ? `${config.url.PUBLIC_URL}/${notification?.otherUser?.profilePic?.name}`
                  : "/images/pfp/pfp1.jpg"
              }
              width={50}
              height={50}
              alt=""
            />
          </Link>
          <div className="ml-3 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-900 dark:text-white"><span className="font-bold">{notification?.otherUser?.name}</span>{' '}
              {renderNotificationText()} . {moment(notification?.createdAt).fromNow()}
            </p>
          </div>
        </div>
        {
          notification?.type === 'like' || notification?.type === 'dislike' || notification?.type === 'comment' ?
            <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md'>
              <Link onClick={() => handleReadNotification()}
                href={{
                  pathname: pathname,
                  query: query,
                }}
                as={as}
                className="flex invisible group-hover/item:visible">
                <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
                <div className='flex items-center ml-2'>
                  <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
                </div>
              </Link>
            </div> :
            notification?.type === 'message' ?
              <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md'>
                <Link onClick={() => handleReadNotification()}
                  href={{
                    pathname: pathname,
                    query: query,
                  }}
                  as={as}
                  className="flex invisible group-hover/item:visible">
                  <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
                  <div className='flex items-center ml-2'>
                    <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
                  </div>
                </Link>
              </div> :
              null
        }
      </Link>
    </div>
  )
}

export default Notifications