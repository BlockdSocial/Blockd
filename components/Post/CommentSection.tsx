import React, { useEffect, useState } from 'react'
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ChatBubbleBottomCenterTextIcon,
  ShareIcon,
} from '@heroicons/react/24/outline'
import TimeAgo from 'react-timeago'
import Link from 'next/link'
import Image from 'next/image'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { fetchUser } from '../../stores/user/UserActions'
import { fetchPostImage } from '../../stores/post/PostActions'
import { isEmpty } from 'lodash'
import { config } from '../../constants'
import { fetchCommentInfo, likeComment } from '../../stores/comment/CommentActions'

interface Comment {
  content: string;
  createdAt: string;
  userId: number;
  id: string;
}

interface Info {
  likes: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
}

interface Props {
  comment: Comment;
}

function CommentSection({ comment }: Props) {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer)
  const [user, setUser] = useState<User>();
  const [profilePicture, setProfilePicture] = useState<string>();
  const [info, setInfo] = useState<Info>();

  useEffect(() => {
    fetchCommentUser();
    fetchInfo();
  }, [comment]);

  useEffect(() => {
    if (!isEmpty(user)) {
      fetchProfilePicture(user?.profilePicId);
    }
  }, [user]);

  const fetchProfilePicture = async (id: number) => {
    if (id != undefined || id != null) {
      await dispatch(fetchPostImage(id)).then((result: any) => {
        setProfilePicture(result[0]?.name);
      });
    }
  }

  const fetchCommentUser = async () => {
    await dispatch(fetchUser(comment?.userId)).then((result: any) => {
      setUser(result);
    }) as User;
  };

  const fetchInfo = async () => {
    await dispatch(fetchCommentInfo(comment?.id)).then((result: any) => {
      setInfo(result);
    });
  }

  const handleLikeComment = async () => {
    dispatch(likeComment({
      comment_id: comment?.id,
      user_id: authUser?.id,
    })).then(() => {
      fetchInfo();
    });
  }

  console.log(info);

  return (
    <Link href="#" className='relative border-b flex flex-col space-x-2 hover:bg-gray-100 dark:hover:bg-lightgray p-4'>
      <div className='flex space-x-2'>
        <Link href="/dashboard/profile" className='flex flex-col w-fit h-fit group'>
          <div className='relative flex flex-col items-center justify-center p-1 animate-colorChange rounded-lg'>
            <img
              src={!isEmpty(profilePicture) ? `${config.url.PUBLIC_URL}/${profilePicture}` : '/images/pfp/pfp2.jpg'}
              alt='pfp'
              className='w-14 h-14 rounded-md shadow-sm'
              width={60}
              height={60} />
            <div className='absolute -bottom-3 -left-2 flex p-1 w-7 h-7 animate-colorChange rounded-lg'>
              <div className='flex items-center justify-center text-black font-semibold rounded-md w-full h-full text-xs bg-white '>
                0
              </div>
            </div>
          </div>
        </Link>
        <div >
          <div className='flex items-center space-x-1'>
            <p className='mr-1 font-semibold'>
              @{user?.name}
            </p>
            <TimeAgo
              date={comment?.createdAt}
              className='text-sm text-gray-500'
            />
          </div>
          <div className='flex flex-col items-start justify-start p-2'>
            <p>
              {comment?.content}
            </p>
            <div className='flex justify-between mt-2'>
              <div className='flex'>
                <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white'>
                  <p className='text-xs'>{info?.likes != null || undefined ? info?.likes : 0}</p>
                  <ArrowUpIcon
                    className='h-4 w-4 cursor-pointer transition-transform ease-out duration-150 hover:scale-150'
                    onClick={() => handleLikeComment()}
                  />
                </div>
                {/* <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white'>
                  <ArrowDownIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                  <p className='text-xs'>1K</p>
                </div>
                <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                  <ChatBubbleBottomCenterTextIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                  <p className='text-xs'>16</p>
                </div>
                <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                  <ShareIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                  <p className='text-xs'>1</p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>

  )
}

export default CommentSection