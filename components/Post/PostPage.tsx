import React, { useEffect } from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import PostID from './PostID'
import { useRouter } from 'next/router'
import CommentSection from './CommentSection'
import { fetchPostComments } from '../../stores/comment/CommentActions'
import { fetchPost } from '../../stores/post/PostActions'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { isEmpty } from 'lodash'

interface Comment {
  content: string;
  createdAt: string;
  userId: number;
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

function PostPage() {
  const dispatch = useAppDispatch();
  const { postComments } = useAppSelector((state) => state.commentReducer);
  const { post } = useAppSelector((state) => state.postReducer);

  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    if (!isEmpty(router.query)) {
      fetchComments();
      fetchPostById();
    }
  }, [router.query]);

  const fetchComments = async () => {
    await dispatch(fetchPostComments(postId as string));
  }

  const fetchPostById = async () => {
    await dispatch(fetchPost(postId as string));
  }

  return (
    <div className='relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x'>
      <div className='flex z-[1] flex-col items-start sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className='h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125'
        />
      </div>

      <div className='z-0'>
        <PostID 
          post={post as Post}
          refetchComments={fetchComments}
        />
        {
          postComments &&
          postComments.map((comment: object, index: number) => (
            <CommentSection
              key={index}
              // @ts-ignore
              comment={comment as Comment}
            />
          ))
        }
      </div>

    </div>
  )
}

export default PostPage