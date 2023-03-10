import React, { useEffect, useState } from 'react'
import PostTest from '../Feed/Post'

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
    </div>
  )
}

export default Feed
