import Image from 'next/image'
import React, { useRef, useState } from 'react'
import {
    CalendarIcon,
    FaceSmileIcon,
    MapPinIcon,
    FolderIcon,
    GifIcon,
} from '@heroicons/react/24/outline'
import Picture from './Picture'

function TweetBox() {

    const [input, setInput] = useState<string>('')
    const [image, setImage] = useState<string>('')

    const imageInputRef = useRef<HTMLInputElement>(null)

    const [imageUrlBoxIsOpen, setImageUrlBoxIsOpen] = useState<boolean>(false)

    const addImageToPost = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if(!imageInputRef.current?.value) return;

        setImage(imageInputRef.current.value)
        imageInputRef.current.value = '';
        setImageUrlBoxIsOpen(false);
    }

    return (
        <div className='flex space-x-2 p-5 border-y mt-4 dark:bg-lightgray md:dark:rounded-md md:dark:border'>
            <Picture path='/images/pfp1.jpg' level={4} pwidth="w-14" pheight="w-14" ltop="top-14" />
            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-col flex-1'>
                    <textarea 
                        id="message" 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        data-rows="4" 
                        className="h-24 w-full text-black dark:text-white outline-none text-l placeholder:text-l md:text-xl md:placeholder:text-xl bg-transparent placeholder:pt-8 " 
                        placeholder="What's the word on the block ?"
                    ></textarea>
                    <hr className='mb-4'></hr>
                    <div className='flex items-center'>
                        <div className='flex space-x-2 text-[#181c44] dark:text-white flex-1'>
                            <FolderIcon 
                                onClick={() => setImageUrlBoxIsOpen(!imageUrlBoxIsOpen)} 
                                className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' 
                            />
                            <FaceSmileIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
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