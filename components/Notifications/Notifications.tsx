import React from 'react'
import {
  ArrowSmallRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

function Notifications() {
  return (
    <div className="p-3 divide-y divide-slate-200 dark:divide-lightgray">
      <Link href="/profile" className="flex items-center justify-between group/item hover:bg-slate-100 dark:hover:bg-lightgray rounded-md p-4 cursor-pointer">
        <div className='flex mr-2'>
          <img className="h-10 w-10 rounded-full" src="/images/pfp1.jpg" alt="" />
          <div className="ml-3 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-900 dark:text-white"><span className="font-bold">Abigail Bennett</span> start following you . 3h</p>
          </div>
        </div>
        <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md'>
          <Link href="/profile" className="flex invisible group-hover/item:visible">
            <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
            <div className='flex items-center ml-2'>
              <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
            </div>
          </Link>
        </div>
      </Link>
      <Link href="/profile" className="flex items-center justify-between group/item hover:bg-slate-100 dark:hover:bg-lightgray rounded-md p-4 cursor-pointer">
        <div className='flex mr-2'>
          <img className="h-10 w-10 rounded-full" src="/images/pfp2.jpg" alt="" />
          <div className="ml-3 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-900 dark:text-white"><span className="font-bold">Abigail Bennett</span> start following you . 3h</p>
          </div>
        </div>
        <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md'>
          <Link href="/profile" className="flex invisible group-hover/item:visible">
            <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
            <div className='flex items-center ml-2'>
              <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
            </div>
          </Link>
        </div>
      </Link>
      <Link href="/profile" className="flex items-center justify-between group/item hover:bg-slate-100 dark:hover:bg-lightgray rounded-md p-4 cursor-pointer">
        <div className='flex mr-2'>
          <img className="h-10 w-10 rounded-full" src="/images/pfp3.jpg" alt="" />
          <div className="ml-3 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-900 dark:text-white"><span className="font-bold">Abigail Bennett</span> start following you . 3h</p>
          </div>
        </div>
        <div className='hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md'>
          <Link href="/profile" className="flex invisible group-hover/item:visible">
            <span className="group-hover/edit:text-gray-700 font-semibold">View</span>
            <div className='flex items-center ml-2'>
              <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
            </div>
          </Link>
        </div>
      </Link>
    </div>
  )
}

export default Notifications