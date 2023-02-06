import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import {
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline'
import Slider from './Slider'
import Link from 'next/link'

function Widgets() {

  const TrendingChatrooms = dynamic(() => import('./TrendingChatrooms'), { ssr: false })
  const TrendingStreams = dynamic(() => import('./TrendingStreams'), { ssr: false })
  const [input, setInput] = useState<string>('')

  return (
    <div className='col-span-2 hidden md:inline max-h-screen scrollbar-hide overflow-scroll '>
      {/* Search */}
      <div className='sticky p-2 top-0 backdrop-blur-md bg-white/30 dark:bg-darkgray/30 z-[1]'>
        <div className='flex items-center space-x-2 bg-gray-100 p-2 dark:bg-darkgray rounded-md dark:border-white border group'>
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-white" />
          <input
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
            type="text"
            placeholder="Search Blockd"
            className='flex-1 outline-none bg-transparent' />
        </div>
      </div>
      {input &&
        <div className='relative ml-2 mr-2'>
          <div className='absolute top-0 bg-gray-100 dark:bg-darkgray border border-gray-200 dark:border-white rounded-md w-full z-10'>
            <div className='flex flex-col items-center justify-center'>
              <div className='flex items-center justify-start space-x-2 hover:rounded-t-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer'>
                <img src="/images/pfp/pfp1.jpg" className='rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd' />
                <p className='font-semibold text-sm'>
                  @Crypto_punk
                </p>
              </div>
              <div className='flex items-center justify-start space-x-2 hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer'>
                <img src="/images/pfp/pfp2.jpg" className='rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd' />
                <p className='font-semibold text-sm'>
                  @Egoist
                </p>
              </div>
              <div className='flex items-center justify-start space-x-2 hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer'>
                <img src="/images/pfp/pfp3.jpg" className='rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd' />
                <p className='font-semibold text-sm'>
                  @IsmailBzz
                </p>
              </div>
              <div className='flex items-center justify-start space-x-2 hover:rounded-b-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer'>
                <img src="/images/pfp/pfp1.jpg" className='rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd' />
                <p className='font-semibold text-sm'>
                  @Crypto_punk
                </p>
              </div>
              <Link href="/search" className='flex items-center justify-start space-x-2 hover:rounded-b-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer'>
                <div className='rounded-full bg-blockd p-2'>
                  <MagnifyingGlassIcon className="w-7 h-7 text-white" />
                </div>
                <p className='font-semibold text-sm'>
                  Search {input}
                </p>
              </Link>
            </div>
          </div>
        </div>
      }

      <Slider />
      <TrendingChatrooms />
      <TrendingStreams />
    </div>
  )
}

export default Widgets