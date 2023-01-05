import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Picture from '../Feed/Picture'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
    CheckBadgeIcon,
    PhotoIcon,
    FaceSmileIcon
} from '@heroicons/react/24/outline'
import TimeAgo from 'react-timeago'
import Picker from '@emoji-mart/react'

function Post() {

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
        <div className='flex flex-col space-x-3 p-4 -z-20 border-y'>
            <div className='w-full'>
                <Link href="/profile" className='flex space-x-3 w-fit group'>
                    <Picture path="/images/pfp/pfp2.jpg" level={5} pictureCSS="w-12 h-12" levelCSS="top-12" />
                    <div>
                        <div className='flex items-center space-x-1 mt-7'>
                            <p className='mr-1 font-semibold text-l group-hover:underline'>@Egoist</p>
                            <CheckBadgeIcon className='h-5 w-5 fill-blockd' />
                        </div>
                    </div>
                </Link>
                <div className='w-full'>
                    <Image
                        src="/images/post1.jpg"
                        alt='Post'
                        className='m-5 ml-0 mb-1 rounded-lg w-full max-h-80 shadow-sm'
                        width={2000}
                        height={2000} />
                    <p className='pt-4 ml-3 font-semibold'>This is a Demo Post</p>
                </div>
            </div>
            <div className='flex justify-between mt-5'>
                <div className='flex'>
                    <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black'>
                        <p className='text-xs'>150K</p>
                        <ArrowUpIcon className='h-5 w-5 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                    </div>
                    <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black'>
                        <ArrowDownIcon className='h-5 w-5  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                        <p className='text-xs'>10K</p>
                    </div>
                    <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black'>
                        <ChatBubbleBottomCenterTextIcon onClick={() => setCommentBoxVisible(!commentBoxVisible)} className='h-5 w-5  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                        <p className='text-xs'>168</p>
                    </div>
                    <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black'>
                        <ShareIcon className='h-5 w-5  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                        <p className='text-xs'>10</p>
                    </div>
                </div>
                <div>
                    <TimeAgo
                        date='Aug 29, 2022'
                        className='text-sm text-gray-500'
                    />
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
    )
}

export default Post