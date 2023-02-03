import React, { useEffect, useState } from 'react'
import { ArrowPathIcon } from '@heroicons/react/24/outline'
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid'
import TweetBox from './TweetBox'
import toast from 'react-hot-toast'
import PostTest from './PostTest'
import Post from './Post'
import { fetchTrendingPosts } from '../../stores/post/PostActions'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

function Feed() {

  const dispatch = useAppDispatch();
  const { trendingPosts } = useAppSelector((state) => state.postReducer);
  const [ topOfPage, setTopOfPage ] = useState<boolean>(false)

  useEffect(() => {
    fetchTrendings();
  }, []);

  const fetchTrendings = async () => {
    await dispatch(fetchTrendingPosts());
  }

  const goToTopOfPage = () => {
    const element = document.getElementById('top-page');
    console.log(element)
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreaching...');
    await new Promise(f => setTimeout(f, 1000));
    toast.success('Feed Updated!', {
      id: refreshToast,
    })
  }

  return (
    <div className='relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x pb-4'>
      <div id="top-page"></div>
      <div className='flex items-center z-[1] justify-between sticky top-0 p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <ChevronDoubleUpIcon onClick={() => goToTopOfPage()} className='w-6 h-6 cursor-pointer' />
        <ArrowPathIcon
          onClick={handleRefresh}
          className='flex items-center justify-end h-6 w-6 cursor-pointer text-black dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale'
        />
      </div>

      <div>
        <TweetBox refetchTrending={fetchTrendings} />
        <div className='p-4'>
          {
            trendingPosts &&
            trendingPosts.map((post: Post, index: number) => (
              <PostTest
                key={index}
                post={post}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Feed