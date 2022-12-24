import Image from 'next/image'
import React, { useState } from 'react'
import {
    CalendarIcon,
    FaceSmileIcon,
    MapPinIcon,
    CameraIcon,
    GifIcon,
} from '@heroicons/react/24/outline'

function TweetBox() {

    const [input, setInput] = useState<string>('')

    return (
        <div className='flex space-x-2 p-5 border-y mt-4 dark:bg-lightgray md:dark:rounded-md md:dark:border'>
            <Image
                src="/images/pfp1.jpg"
                alt="PFP"
                className="mt-4 h-14 w-14 rounded-full object-cover"
                width={60}
                height={60}
            />
            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-col flex-1'>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)}
                        type="text" 
                        placeholder="What's the word on the block ?" 
                        className='h-24 w-full text-xl outline-none placeholder:text:xl bg-transparent'
                    />
                    <hr className='mb-4'></hr>
                    <div className='flex items-center'>
                        <div className='flex space-x-2 text-blockd flex-1'>
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