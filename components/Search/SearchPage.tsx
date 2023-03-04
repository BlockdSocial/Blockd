import Link from 'next/link'
import React, { useEffect } from 'react'
import PostTest from '../Feed/Post'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import { isEmpty, isString } from 'lodash'
import { searchUsers } from '../../stores/user/UserActions'
import { searchPosts } from '../../stores/post/PostActions'

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

function SearchPage() {

  const dispatch = useAppDispatch();
  const router = useRouter()
  const { query } = router.query
  const { popularUsers } = useAppSelector((state) => state.userReducer)

  console.log('query: ', query);

  useEffect(() => {
    if (isString(query) && query.length > 0) {
      handleSearchUsers();
    }
  }, [query]);

  const handleSearchUsers = async () => {
    dispatch(searchUsers({
      search: query,
      end: 5,
    }));
  }

  console.log('popularUsers: ', popularUsers);

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 bg-gray-100 dark:bg-darkgray pb-14">
      <div className='flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-lightgray rounded-lg space-y-3'>
        <h3 className='text-xl font-semibold w-full mb-4'>People</h3>
        <>
          {
            popularUsers?.users &&
            popularUsers?.users.map((user: any) => (
              <div className='flex items-center justify-between w-full'>
                <div className='flex items-center justify-center space-x-3'>
                  <div className='flex items-center justify-center'>
                    <img src="/images/pfp/pfp1.jpg" className='rounded-md w-16 h-16 bg-blockd' />
                  </div>
                  <div className='flex flex-col items-start justify-center space-y-2'>
                    <div className='flex flex-col items-start justify-center'>
                      <Link href="/dashboard/profile" className='text-l font-bold cursor-pointer hover:underline'>@{user?.name}</Link>
                      <span className='text-l text-gray-700 dark:text-gray-300'>10K followers</span>
                    </div>
                    <span className='text-l text-gray-700 dark:text-gray-300'>20 Friends in common</span>
                  </div>
                </div>
                <div className='flex items-center justify-center'>
                  <p className='cursor-pointer p-2 px-6 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold'>Follow</p>
                </div>
              </div>
            ))
          }
        </>
        <Link href="/people" className='flex items-center justify-center cursor-pointer p-2 w-full rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold'>View all</Link>
      </div>
      <div className='flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-lightgray rounded-lg space-y-3'>
        <h3 className='text-xl font-semibold w-full mb-4'>Posts</h3>
        {
          popularUsers?.posts &&
          popularUsers?.posts.map((post: any) => (
            // @ts-ignore
            <PostTest
              // @ts-ignore
              post={post}
            />
          ))
        }
      </div>
    </div>
  )
}

export default SearchPage
