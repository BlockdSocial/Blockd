import React from 'react'
import { ArrowLeftCircleIcon } from '@heroicons/react/24/outline'
import PostID from './PostID'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

function PostPage() {

    const router = useRouter()

    const handleRefresh = async () => {
        const refreshToast = toast.loading('Refreaching...');
        await new Promise(f => setTimeout(f, 1000));
        toast.success('Post Updated!', {
            id: refreshToast,
        })
    }

    return (
        <div className='relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x mb-5'>
            <div className='flex z-[1] flex-col items-start sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
                <ArrowLeftCircleIcon
                    onClick={() => router.back()}
                    className='h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125'
                />
            </div>

            <div className=' -z-20'>
                <PostID />
            </div>

        </div>
    )
}

export default PostPage