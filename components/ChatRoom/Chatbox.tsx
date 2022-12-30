import React from 'react'
import {
    CalendarIcon,
    FaceSmileIcon,
    MapPinIcon,
    PhotoIcon,
    PaperAirplaneIcon
} from '@heroicons/react/24/outline'

function Chatbox() {

    return (
        <div className='relative col-span-10 md:col-span-6 border-r h-screen pb-4'>
            <div className="flex flex-col sticky top-0 h-[49px] w-full dark:bg-darkgray border-b">

            </div>
            <div className="scrollbar-hide overflow-scroll h-3/4 p-4 z-[0]">
                <div className="mt-5">
                    <div className="grid grid-cols-12 mb-4">
                        <div
                            className="place-self-end w-fit col-span-11 mr-2 py-3 px-4 bg-[#899499] dark:bg-[#36454F] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            <p className='flex items-center justify-end'>Welcome to group everyone !</p>
                        </div>
                        <div className='col-span-1 flex items-end justify-end'>
                            <img
                                src="/images/pfp/pfp2.jpg"
                                className="object-cover h-10 w-10 rounded-full"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mb-4">
                        <div className='col-span-1 flex items-end'>
                            <img
                                src="/images/pfp/pfp1.jpg"
                                className="object-cover h-10 w-10 rounded-full flex"
                                alt=""
                            />
                        </div>
                        <div
                            className="place-self-start w-fit col-span-11 ml-2 py-3 px-4 bg-[#7393B3] dark:bg-[#818589] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                            <p className='flex items-center justify-start'>So freaking pumped for what's coming it all sounds great. Let's freaking go</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mb-4">
                        <div
                            className="place-self-end w-fit col-span-11 mr-2 py-3 px-4 bg-[#899499] dark:bg-[#36454F] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            <p className=''>Hell yeah brother, BLOCKD is amazing !</p>
                        </div>
                        <div className='col-span-1 flex items-end justify-end'>
                            <img
                                src="/images/pfp/pfp2.jpg"
                                className="object-cover h-10 w-10 rounded-full"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mb-4">
                        <div
                            className="place-self-end w-fit col-span-11 mr-2 py-3 px-4 bg-[#899499] dark:bg-[#36454F] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            Have you got the chance to look into other chatrooms ? I saw an EGO one earlier !
                        </div>
                        <div className='col-span-1 flex items-end justify-end'>
                            <img
                                src="/images/pfp/pfp2.jpg"
                                className="object-cover h-10 w-10 rounded-full"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mb-4">
                        <div className='col-span-1 flex items-end'>
                            <img
                                src="/images/pfp/pfp1.jpg"
                                className="object-cover h-10 w-10 rounded-full flex"
                                alt=""
                            />
                        </div>
                        <div
                            className="place-self-start w-fit col-span-11 ml-2 py-3 px-4 bg-[#7393B3] dark:bg-[#818589] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                            Oh shit! I'll check it for sure.
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mb-4">
                        <div
                            className="place-self-end w-fit col-span-11 mr-2 py-3 px-4 bg-[#899499] dark:bg-[#36454F] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
                        >
                            Welcome to group everyone !
                        </div>
                        <div className='col-span-1 flex items-end justify-end'>
                            <img
                                src="/images/pfp/pfp2.jpg"
                                className="object-cover h-10 w-10 rounded-full"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-12 mb-4">
                        <div className='col-span-1 flex items-end'>
                            <img
                                src="/images/pfp/pfp3.jpg"
                                className="object-cover h-10 w-10 rounded-full flex"
                                alt=""
                            />
                        </div>
                        <div
                            className="place-self-start w-fit col-span-11 ml-2 py-3 px-4 bg-[#7393B3] dark:bg-[#818589] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                            Thank you ! let GOOOO !
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex px-3 flex-col sticky bottom-0 h-[50px] w-full dark:bg-darkgray z-[1]'>
                <form className='flex space-x-3'>
                    <input
                        className='flex-1 rounded-lg bg-gray-300 dark:bg-lightgray p-2 outline-none dark:text-white'
                        type="text"
                        placeholder='Send a Message ...'
                    />
                    <div className='flex items-center relative space-x-2 text-[#181c44] dark:text-white'>
                        <PaperAirplaneIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                        <PhotoIcon
                            className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'
                        />
                        <FaceSmileIcon
                            className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                        <CalendarIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                        <MapPinIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chatbox