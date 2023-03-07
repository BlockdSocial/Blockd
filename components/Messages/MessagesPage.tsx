import React from 'react'
import dynamic from 'next/dynamic'
import {
  ChatBubbleBottomCenterTextIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

function MessagesPage() {

  const Messages = dynamic(() => import('./Messages'), { ssr: false })
  const handleRefresh = async () => {
    const refreshToast = toast.loading('Refreshing...');
    await new Promise(f => setTimeout(f, 1000));
    toast.success('Messages Updated!', {
      id: refreshToast,
    })
  }

  return (
    <div className='max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x'>
      <div className='flex sticky items-center justify-between top-0 border-b p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <div className='flex items-center justify-start space-x-1'>
          <ChatBubbleBottomCenterTextIcon className='w-6 h-6' />
          <p className='text-xl font-semibold'>Messages</p>
        </div>
        <div className='flex items-center justify-center'>
          <ArrowPathIcon
            onClick={handleRefresh}
            className='h-6 w-6 cursor-pointer text-blockd dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale'
          />
        </div>
      </div>
      {Array.from({ length: 10 }, (_, i) => <Messages key={i} />)}
    </div>
  )
}

export default MessagesPage