import React, { useEffect, useState } from 'react'
import PostTest from '../Feed/PostTest'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { fetchUserPosts } from '../../stores/post/PostActions'
import { fetchAuthUser } from '../../stores/authUser/AuthUserActions'
import { isEmpty } from 'lodash'

interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
  score: number;
}

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  hasImg: boolean;
  userId: number;
  gif: string;
}

interface Props {
  user: User;
}

function Feed({ user }: Props) {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    setPosts([]);
    fetchPosts();
  }, [user]);

  console.log('user: ', user);

  const fetchPosts = async () => {
    if (!isEmpty(user)) {
      await dispatch(fetchUserPosts(user?.id)).then((res) => {
        setPosts(res);
      });
    } else {
      await dispatch(fetchUserPosts(authUser?.id)).then((res) => {
        setPosts(res);
      });
    }
  }

  return (
    <div className='p-4'>
      {
        posts &&
        posts.map((post: Post, index: number) => (
          // @ts-ignore
          <PostTest
            key={index}
            post={post}
          />
        ))
      }
    </div>
  )
}

export default Feed
