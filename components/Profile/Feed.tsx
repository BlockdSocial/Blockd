import React, { useEffect, useState } from 'react'
import PostTest from '../Feed/PostTest'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { fetchUserPosts } from '../../stores/post/PostActions'
import { fetchAuthUser } from '../../stores/authUser/AuthUserActions'
import { isEmpty } from 'lodash'

interface User {
  id: number;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
}

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  hasImg: boolean;
  userId: number;
}

function Feed() {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<User>();
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isEmpty(user)) {
      fetchPosts();
    }
  }, [user]);

  const fetchUser = async () => {
    await dispatch(fetchAuthUser()).then(async (res: any) => {
      await setUser(res);
      fetchPosts();
    }) as User;
  };

  const fetchPosts = async () => {
    if (!isEmpty(user)) {
      await dispatch(fetchUserPosts(user?.id)).then((res) => {
        setPosts(res);
      });
    }
  }

  return (
    <div className='p-4'>
      {
        posts &&
        posts.map((post: Post, index: number) => (
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