import Image from 'next/image'
import React, { useState, useRef } from 'react'
import Picture from './Picture'
import TimeAgo from 'react-timeago'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
    CheckCircleIcon,
    FaceSmileIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import Picker from '@emoji-mart/react'
import Comments from '../Post/Comments'

function PostTest() {

    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [showEmojis, setShowEmojis] = useState<boolean>(false)

    const imageInputRef = useRef<HTMLInputElement>(null)

    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    const addImageToPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = ''
        setImageUrlBoxIsOpen(false);
    }

    const addEmoji = (e: any) => {
        const sym = e.unified.split("-")
        const codesArray: any[] = []
        sym.forEach((el: any) => codesArray.push("0x" + el))
        const emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
    }

    return (
        <div className='flex space-x-3 border-b p-6'>
            <div className='w-full flex'>
                <div className='flex flex-col'>
                    <Link href="profile" className='flex w-fit h-fit group'>
                        <div className='p-1 bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-lg'>
                            <Image
                                src="/images/pfp/pfp2.jpg"
                                alt='pfp'
                                className='w-20 h-16 rounded-lg shadow-sm'
                                width={2000}
                                height={2000} />

                        </div>
                    </Link>
                    <p className='text-center font-semibold text-sm mt-2'>Level 15</p>
                </div>
                <div className='flex flex-col px-4'>
                    <div className='flex items-center justify-start space-x-1 mt-5 cursor-pointer group'>
                        <p className='mr-1 font-semibold text-l group-hover:font-bold'>@Egoist</p>
                        <Image
                            src="/images/badges/badge.svg"
                            alt='pfp'
                            className='w-5 h-5 rounded-lg shadow-sm'
                            width={2000}
                            height={2000} />
                    </div>

                    <div className='flex'>
                        <TimeAgo
                            date='Aug 29, 2022'
                            className='text-xs text-gray-500'
                        />
                    </div>
                    <div className='w-full'>
                        <p className='pt-4 font-semibold'>This is a Demo Post</p>
                        <Link href="post">
                            <Image
                                src="/images/post1.jpg"
                                alt='Post'
                                className='m-5 ml-0 mb-1 rounded-lg w-full max-h-80 shadow-sm'
                                width={2000}
                                height={2000} />
                        </Link>
                    </div>
                    <div className='flex items-center justify-start mt-5'>
                        <div className='flex'>
                            <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white'>
                                <p className='text-xs'>150K</p>
                                <ArrowUpIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                            </div>
                            <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white'>
                                <ArrowDownIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                <p className='text-xs'>10K</p>
                            </div>
                            <div onClick={() => setCommentBoxVisible(!commentBoxVisible)} className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                                <ChatBubbleBottomCenterTextIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                <p className='text-xs'>168</p>
                            </div>
                            <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                                <ShareIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                <p className='text-xs'>10</p>
                            </div>
                        </div>
                    </div>
                    {commentBoxVisible && (
                        <form onSubmit={handleSubmit} className='mt-3 flex space-x-3'>
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                className='flex-1 rounded-lg bg-gray-100 dark:bg-lightgray p-2 outline-none'
                                type="text"
                                placeholder='Write a comment...'
                            />
                            <button
                                disabled={!input}
                                type="submit"
                                className='text-blockd font-semibold disabled:text-gray-200 dark:disabled:text-lightgray'>Post
                            </button>
                        </form>
                    )}
                    {commentBoxVisible && (
                        <div className='flex items-center'>
                            <div className='flex relative space-x-2 text-[#181c44] dark:text-white flex-1 mt-2'>
                                <PhotoIcon
                                    onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                                    className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'
                                />
                                <FaceSmileIcon
                                    onClick={() => setShowEmojis(!showEmojis)}
                                    className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                                {showEmojis && (
                                    <div className='absolute -left-6 top-7 z-40'>
                                        <Picker
                                            onEmojiSelect={addEmoji}
                                            theme="dark"
                                            set="apple"
                                            icons="outline"
                                            previewPosition="none"
                                            size="1em"
                                            perLine="6"
                                            maxFrequentRows="2"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    {imageUrlBoxIsOpen && (
                        <form className='rounded-lg mt-3 flex bg-blockd/80 py-2 px-4'>
                            <input
                                ref={imageInputRef}
                                className='flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white'
                                type="text"
                                placeholder='Enter Image URL...'
                            />
                            <button
                                type='submit'
                                onClick={addImageToPost}
                                className='font-bold text-white'
                            >
                                Add Image
                            </button>
                        </form>
                    )}
                    {image && (
                        <img className='mt-10 h-40 w-full rounded-xl object-contain shadow-lg' src={image} alt='' />
                    )}
                </div>
            </div>
        </div>
    )
}

export default PostTest