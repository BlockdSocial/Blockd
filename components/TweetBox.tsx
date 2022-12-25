import Image from 'next/image'
import React, { useState } from 'react'
import {
    CalendarIcon,
    FaceSmileIcon,
    MapPinIcon,
    CameraIcon,
    GifIcon,
} from '@heroicons/react/24/outline'
import Picture from './Picture'

function TweetBox() {

    const [input, setInput] = useState<string>('')

    return (
        <div className='flex space-x-2 p-5 border-y mt-4 dark:bg-lightgray md:dark:rounded-md md:dark:border'>
            <Picture path='/images/pfp1.jpg' level={4} />
            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-col flex-1'>
                    <textarea 
                        id="message" 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        data-rows="4" 
                        className="h-24 w-full outline-none text-l placeholder:text-l md:text-xl md:placeholder:text-xl bg-transparent placeholder:pt-8 " 
                        placeholder="What's the word on the block ?"
                    ></textarea>
                    <hr className='mb-4'></hr>
                    <div className='flex items-center'>
                        <div className='flex space-x-2 text-blockd dark:text-white flex-1'>
                            <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' /> 
                            <FaceSmileIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <MapPinIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <CameraIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <GifIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                        </div>
                        <button 
                            disabled={!input}
                            className='bg-blockd px-5 py-2 font-bold text-white rounded-full disabled:opacity-40 disabled:z-[0]'
                        >
                                Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TweetBox