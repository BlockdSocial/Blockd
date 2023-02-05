import React, { useEffect } from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import PostID from './PostID'
import { useRouter } from 'next/router'
import CommentSection from './CommentSection'
import { fetchPostComments } from '../../stores/comment/CommentActions'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { isEmpty } from 'lodash'

interface Comment {
  content: string;
  createdAt: string;
}

function PostPage() {
  const dispatch = useAppDispatch();
  const { postComments } = useAppSelector((state) => state.commentReducer);

  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    if (!isEmpty(router.query)) {
      fetchComments();
    }
  }, [router.query]);

  const fetchComments = async () => {
    dispatch(fetchPostComments(postId as string));
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
        <PostID />
        {
          postComments &&
          postComments.map((comment: object, index: number) => (
            <CommentSection
              key={index}
              comment={comment as Comment}
            />
          ))
        }
      </div>

    </div>
  )
}

export default PostPage