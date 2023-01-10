import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import {
    CalendarIcon,
    FaceSmileIcon,
    MapPinIcon,
    PhotoIcon,
} from '@heroicons/react/24/outline'
import Picker from '@emoji-mart/react'
import Link from 'next/link'

function TweetBox() {

    const [input, setInput] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const [showEmojis, setShowEmojis] = useState<boolean>(false)

    const imageInputRef = useRef<HTMLInputElement>(null)
    const dropdown = useRef<any>(null);

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!showEmojis) return;
        function handleClick(event:any) {
            if(showEmojis === true) {
                console.log('hello')
                if (dropdown.current && !dropdown.current.contains(event.target)) {
                    setShowEmojis(false);
                }
            }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
      }, [showEmojis]);

    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

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
        <div className='flex space-x-2 p-4 border-y dark:bg-lightgray'>
            <Link href="profile" className='relative flex flex-col group'>
                <div className='relative flex flex-col p-1 animate-colorChange rounded-lg'>
                    <Image
                        src="/images/pfp/pfp1.jpg"
                        alt='pfp'
                        className='w-16 h-16 rounded-md shadow-sm'
                        width={2000}
                        height={2000} />
                    <div className='absolute -bottom-3 -left-2 flex p-1 w-7 h-7 animate-colorChange rounded-lg'>
                        <div className='flex items-center justify-center text-black font-semibold rounded-md w-full h-full text-xs bg-white '>
                            31
                        </div>
                    </div>
                </div>
            </Link>
            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-col flex-1'>
                    <textarea
                        id="message"
                        maxLength={255}
                        value={input}
                        onChange={(e: any) => setInput(e.target.value)}
                        data-rows="4"
                        className="h-24 w-full text-black dark:text-white outline-none text-l bg-transparent placeholder:pt-6 "
                        placeholder="What's the word on the block?"
                    ></textarea>
                    <hr className='mb-4'></hr>
                    <div className='flex items-center'>
                        <div className='flex relative space-x-2 text-[#181c44] dark:text-white flex-1'>
                            <PhotoIcon
                                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)}
                                className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'
                            />
                            <FaceSmileIcon
                                ref={dropdown}
                                onClick={() => setShowEmojis(b => !b)}
                                className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            {showEmojis && (
                                <div className='absolute left-5 top-7 z-0'>
                                    <Picker
                                        onEmojiSelect={addEmoji}
                                        theme="dark"
                                        set="apple"
                                        icons="outline"
                                        previewPosition="none"
                                        size="1em"
                                        perLine="6"
                                        maxFrequentRows="2"
                                        searchPosition="none"
                                    />
                                </div>
                            )}
                            <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <MapPinIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                        </div>
                        <button
                            disabled={!input}
                            className='bg-blockd px-5 py-2 font-bold text-white rounded-full disabled:opacity-40 disabled:z-[0]'
                        >
                            Post
                        </button>
                    </div>
                    {imageUrlBoxIsOpen && (
                        <form className='rounded-lg mt-5 flex bg-blockd/80 py-2 px-4'>
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
                </form>
            </div>
        </div>
    )
}

export default TweetBox