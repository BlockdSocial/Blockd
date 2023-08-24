import React, { useEffect, useState } from 'react'
import {
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline'
import moment from 'moment'
import { useAppDispatch } from '../../stores/hooks'
import { dislikePost, fetchIsDisliked, fetchIsLiked, fetchPostInfo, likePost } from '../../stores/post/PostActions'
import { isEmpty } from 'lodash'

function SuggestionBody({ post }: any) {

  const dispatch = useAppDispatch()
  let [totalVoteNumber, setTotalVoteNumber] = useState<number>(0)
  const [isLiked, setIsLiked] = useState<boolean>()
  const [isDisliked, setIsDisliked] = useState<boolean>()
  const [info, setInfo] = useState<any>()

  useEffect(() => {
    fetchInfo();
    fetchLiked();
    fetchDisliked();
  }, []);

  useEffect(() => {
    if (!isEmpty(info)) {
      setTotalVoteNumber(info?.likes + info?.dislikes)
    }
  }, [info]);

  const fetchInfo = async () => {
    await dispatch(fetchPostInfo(post?.id)).then((result: any) => {
      setInfo(result);
    });
  };

  const handleLikePost = async () => {
    dispatch(
      likePost({
        post_id: post?.id,
        user_id: post?.id,
      })
    ).then(() => {
      fetchInfo();
      fetchLiked();
      fetchDisliked();
    });
  };

  const handleDislikePost = async () => {
    dispatch(
      dislikePost({
        post_id: post?.id,
        user_id: post?.id,
      })
    ).then(() => {
      fetchInfo();
      fetchLiked();
      fetchDisliked();
    });
  };

  const fetchLiked = async () => {
    await dispatch(fetchIsLiked(post?.id)).then((result: any) => {
      setIsLiked(result);
    });
  };

  const fetchDisliked = async () => {
    await dispatch(fetchIsDisliked(post?.id)).then((result: any) => {
      setIsDisliked(result);
    });
  };

  return (
    <div className='p-4'>
      <div className='flex rounded-md border border-gray-100 dark:border-lightgray justify-center'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <div className='flex flex-col items-center justify-center p-4'>
            <span className='text-xl font-semibold'>{totalVoteNumber}</span>
            <span className='text-sm'>Votes</span>
          </div>
          <div className='flex items-center justify-center p-2 space-x-2'>
            <div className='flex flex-col items-center justify-center space-y-1'>
              <div className='flex flex-col items-center justify-center space-y-1'>
                <div
                  onClick={() => handleLikePost()}
                  className={`cursor-pointer p-1 ${isLiked ? 'bg-green-500' : 'hover:bg-gray-100 dark:hover:bg-lightgray'} rounded-md`}
                >
                  <ChevronUpIcon className='w-5 h-5 dark:text-white' />
                </div>
                <p className='text-xs'>
                  {info?.likes != null || undefined ? info?.likes : 0}
                </p>
              </div>
            </div>
            <div className='flex flex-col items-center justify-center space-y-1'>
              <div className='flex flex-col items-center justify-center space-y-1'>
                <div
                  onClick={() => handleDislikePost()}
                  className={`cursor-pointer p-1 ${isDisliked ? 'bg-red-500' : 'hover:bg-gray-100 dark:hover:bg-lightgray'} rounded-md`}>
                  <ChevronDownIcon className='w-5 h-5 dark:text-white' />
                </div>
                <p className='text-xs'>
                  {info?.dislikes != null || undefined ? info?.dislikes : 0}
                </p>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
        <div className='flex flex-col items-start justify-start space-y-5 w-full p-2 px-4 border-l border-gray-200 dark:border-lightgray'>
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center justify-start space-x-2'>
              <div className='relative flex flex-col items-start border border-gray-200 dark:border-none p-1 rounded-lg'>
                <img src="/images/unknown.jpg" className='min-w-10 min-h-12 max-w-10 max-h-12 rounded-md shadow-sm' />
              </div>
            </div>
            <div className='flex items-center justify-end'>
              {/* <p className='font-semibold text-xs lg:text-sm'>{moment(post?.createdAt).fromNow()}</p> */}
            </div>
          </div>
          <div className='flex flex-col items-start space-y-2'>
            {/* <p className='font-semibold text-sm'>Title of the suggestion</p> */}
            <p className='text-sm break-words whitespace-pre-line'>{post?.content}</p>
          </div>
          <div className='flex items-start'>
            <p className='text-sm text-gray-500'>
              {moment(post?.createdAt).fromNow()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuggestionBody