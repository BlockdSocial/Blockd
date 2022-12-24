import Image from 'next/image'
import React from 'react'
import {
    CalendarIcon,
    FaceSmileIcon,
    MapPinIcon,
    CameraIcon,
    GifIcon,
} from '@heroicons/react/24/outline'

function TweetBox() {
    return (
        <div className='flex space-x-2 p-5 border-y mt-4'>
            <Image
                src="/images/pfp1.jpg"
                alt="PFP"
                className="mt-4 h-14 w-14 rounded-full object-cover"
                width={60}
                height={60}
            />
            <div className='flex flex-1 items-center pl-2'>
                <form className='flex flex-col flex-1'>
                    <input type="text" placeholder="What's on the block ?" className='h-24 w-full text-xl outline-none placeholder:text:xl'/>
                    <div className='flex items-center'>
                        <div className='flex space-x-2 text-blockd flex-1'>
                            <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' /> 
                            <FaceSmileIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <MapPinIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <CameraIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                            <GifIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                        </div>
                        <button className='bg-blockd px-5 py-2 font-bold text-white rounded-full'>Tweet</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TweetBox