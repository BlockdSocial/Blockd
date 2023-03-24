import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { followUser } from '../../stores/user/UserActions'
import { fetchPostImage } from '../../stores/post/PostActions'
import { config } from '../../constants'
import { encodeQuery } from '../../utils'

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

function UserResult({ user }: any) {

  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer)
  const [image, setImage] = useState<any>();

  const handleFollowUser = async (userId: any) => {
    if (authUser?.id !== userId) {
      await dispatch(
        followUser({
          user_id: userId,
        })
      );
    }
  };

  useEffect(() => {
    if (user?.profilePicId) {
      dispatch(fetchPostImage(user?.profilePicId)).then((res) => {
        setImage(res[0]?.name);
      });
    }
  }, []);

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex items-center justify-center space-x-3'>
        <div className='flex items-center justify-center'>
          <img
            src={
              image
                ? `${config.url.PUBLIC_URL}/${image}`
                : "/images/placeholder.png"
            }
            className="rounded-md w-16 h-16 bg-blockd"
          />
        </div>
        <div className='flex flex-col items-start justify-center space-y-2'>
          <div className='flex flex-col items-start justify-center'>
            <Link
              href={{
                pathname: "/dashboard/profile",
                query: { user_id: user?.id },
              }}
              as={`/dashboard/profile?${encodeQuery(user?.id, 'profile')}`}
              className='text-l font-bold cursor-pointer hover:underline'
            >
              @{user?.name}
            </Link>
            {/* <span className='text-l text-gray-700 dark:text-gray-300'>10K followers</span> */}
          </div>
          {/* <span className='text-l text-gray-700 dark:text-gray-300'>20 Friends in common</span> */}
        </div>
      </div>
      {
        authUser?.id !== user?.id &&
        <div className='flex items-center justify-center'>
          <p
            className='cursor-pointer p-2 px-6 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold'
            onClick={() => handleFollowUser(user?.id)}
          >
            Follow
          </p>
        </div>
      }
    </div>
  )
}

export default UserResult
