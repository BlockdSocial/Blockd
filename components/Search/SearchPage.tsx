import Link from 'next/link'
import React, { useEffect } from 'react'
import PostTest from '../Feed/Post'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from 'next/router'
import { isEmpty, isString } from 'lodash'
import { followUser, searchFilteredUsers, searchUsers } from '../../stores/user/UserActions'
import { searchPosts } from '../../stores/post/PostActions'
import { config } from '../../constants'
import { encodeQuery } from '../../utils'
import UserResult from './UserResult'

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
  const { authUser } = useAppSelector((state) => state.authUserReducer)
  const { popularUsers, filteredUsers } = useAppSelector((state) => state.userReducer)

  useEffect(() => {
    if (isString(query) && query.length > 0) {
      handleSearchUsers();
      handleSearchFilteredUsers();
    }
  }, [query]);

  const handleSearchUsers = async () => {
    dispatch(searchUsers({
      search: query,
      end: 20,
    }));
  }

  const handleSearchFilteredUsers = async () => {
    dispatch(searchFilteredUsers({
      search: query
    }))
  }

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 bg-gray-100 dark:bg-darkgray pb-14">
      <div className='flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-lightgray rounded-lg space-y-3'>
        <h3 className='text-xl font-semibold w-full mb-4'>People</h3>
        <>
          {
            filteredUsers &&
            filteredUsers.map((user: any) => (
              <UserResult user={user} />
            ))
          }
        </>
        {/* <Link href="/people" className='flex items-center justify-center cursor-pointer p-2 w-full rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold'>View all</Link> */}
      </div>
      <div className='flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-lightgray rounded-lg space-y-3'>
        <h3 className='text-xl font-semibold w-full mb-4'>Posts</h3>
        {
          popularUsers?.posts &&
          popularUsers?.posts.map((post: any) => (
            // @ts-ignore
            <PostTest
              // @ts-ignore
              mainPost={post}
            />
          ))
        }
      </div>
    </div>
  )
}

export default SearchPage
