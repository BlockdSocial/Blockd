import React, { useEffect, useState } from 'react'
import PostTest from '../Feed/Post'
import { useAppSelector } from '../../stores/hooks';

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
  posts: Post[];
  refetch: () => void;
}

function Feed({ posts, refetch }: Props) {
  const { isFetchingUserPosts } = useAppSelector(
    (state) => state.postReducer
  );

  return (
    <div className='p-4'>
      {
        posts &&
        posts.map((post: Post, index: number) => (
          // @ts-ignore
          <PostTest
            key={index}
            // @ts-ignore
            mainPost={post}
            refetch={refetch}
          />
        ))
      }
      {isFetchingUserPosts && (
        <p className="flex items-center justify-center space-x-3 p-4">
          Loading ...
        </p>
      )}
    </div>
  )
}

export default Feed
