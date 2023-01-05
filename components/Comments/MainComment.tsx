import React, { useRef, useState } from 'react'
import {
    ArrowUpIcon,
    ArrowDownIcon,
    ChatBubbleBottomCenterTextIcon,
    ShareIcon,
    PhotoIcon,
    FaceSmileIcon
} from '@heroicons/react/24/outline'
import TimeAgo from 'react-timeago'
import Picker from '@emoji-mart/react'

function MainComment() {

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
        <div className='relative border-b flex flex-col space-x-2 rounded-lg p-4'>
            <div className='flex space-x-2'>
                <img src="/images/pfp/pfp1.jpg" className='mt-2 h-12 w-12 object-cover rounded-full' alt="" />
                <div >
                    <div className='flex items-center space-x-1'>
                        <p className='mr-1 font-semibold'>
                            @IsmailBzz
                        </p>
                        <TimeAgo
                            date='Dec 23, 2022'
                            className='text-sm text-gray-500'
                        />
                    </div>
                    <div className='flex flex-col items-start justify-start p-2'>
                        <p>
                            This is my first Comment
                        </p>
                        <div className='flex justify-between mt-2'>
                            <div className='flex'>
                                <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white'>
                                    <p className='text-xs'>15K</p>
                                    <ArrowUpIcon className='h-4 w-4 cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                </div>
                                <div className='flex cursor-pointer items-center space-x-1 text-gray-400 hover:text-black dark:hover:text-white'>
                                    <ArrowDownIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                    <p className='text-xs'>1K</p>
                                </div>
                                <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                                    <ChatBubbleBottomCenterTextIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                    <p className='text-xs'>16</p>
                                </div>
                                <div className='flex cursor-pointer items-center space-x-1 ml-3 text-gray-400 hover:text-black dark:hover:text-white'>
                                    <ShareIcon className='h-4 w-4  cursor-pointer transition-transform ease-out duration-150 hover:scale-150' />
                                    <p className='text-xs'>1</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
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
    )
}

export default MainComment