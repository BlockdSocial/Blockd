import React from 'react'
import {
  ArrowSmallRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

function Followers() {
  return (
    <div>
      <div role="list" className="divide-y divide-slate-200 dark:divide-lightgray">
        <Link href="/dashboard/profile" className="flex items-center justify-between group/item hover:bg-slate-100 dark:hover:bg-lightgray p-4 cursor-pointer">
          <div className='flex'>
            <img className="h-10 w-10 rounded-full" src="/images/pfp/pfp1.jpg" alt="" />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 dark:text-white">@Crypto_crazy</p>
              <p className="text-sm text-slate-500 dark:text-slate-300 truncate">Level : 9</p>
            </div>
          </div>
          <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-6 rounded-md'>
            <Link href="/dashboard/profile" className="flex invisible group-hover/item:visible">
              <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
              <div className='flex items-center ml-2'>
                <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
              </div>   
            </Link>
          </div>
        </Link>
        <Link href="/dashboard/profile" className="flex items-center justify-between group/item hover:bg-slate-100 dark:hover:bg-lightgray p-4 cursor-pointer">
          <div className='flex'>
            <img className="h-10 w-10 rounded-full" src="/images/pfp/pfp2.jpg" alt="" />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 dark:text-white">@Egoist</p>
              <p className="text-sm text-slate-500 dark:text-slate-300 truncate">Level : 18</p>
            </div>
          </div>
          <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-6 rounded-md'>
            <Link href="/dashboard/profile" className="flex invisible group-hover/item:visible">
              <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
              <div className='flex items-center ml-2'>
                <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
              </div>   
            </Link>
          </div>
        </Link>
        <Link href="/dashboard/profile" className="flex items-center justify-between group/item hover:bg-slate-100 dark:hover:bg-lightgray p-4 cursor-pointer">
          <div className='flex'>
            <img className="h-10 w-10 rounded-full" src="/images/pfp/pfp3.jpg" alt="" />
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-slate-900 dark:text-white">@Monkey_Crypto</p>
              <p className="text-sm text-slate-500 dark:text-slate-300 truncate">Level : 5</p>
            </div>
          </div>
          <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-6 rounded-md'>
            <Link href="/dashboard/profile" className="flex invisible group-hover/item:visible">
              <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
              <div className='flex items-center ml-2'>
                <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
              </div>   
            </Link>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Followers