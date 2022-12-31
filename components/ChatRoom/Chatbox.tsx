import React from 'react'
import {
    FaceSmileIcon,
    PhotoIcon,
    PaperAirplaneIcon,
    EllipsisHorizontalIcon
} from '@heroicons/react/24/outline'

function Chatbox() {

    return (
        <div className='relative col-span-10 md:col-span-9 lg:col-span-7 xl:col-span-7 border-r dark:border-lightgray h-screen pb-4'>
            <div className="flex items-center justify-between sticky top-0 h-[49px] w-full dark:bg-darkgray border-b dark:border-lightgray p-4">
                <div className='flex items-center space-x-2'>
                    <img src='/images/chatLogo/Bitcoin.png' className='h-8 w-8 rounded-full' />
                    <div className='flex flex-col items-center justify-center'>
                        <p className='font-semibold'>BTC Official Chat</p>
                        <p className='text-xs'>480 members, 26 online</p>
                    </div>
                </div>
                <div className='flex items-center justify-center'>
                    <EllipsisHorizontalIcon className='w-8 h-8' />
                </div>
            </div>
            <div className="scrollbar-hide overflow-scroll h-3/4 p-4 z-[0] dark:bg-darkgray">
                <div className="mt-5">
                    <div className="grid grid-cols-10 md:grid-cols-12 mb-4">
                        <div
                            className="place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-blockd via-orange-500 to-orange-400 dark:from-[#242424] dark:to-[#3a3a3a] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
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
                    <div className="grid grid-cols-10 md:grid-cols-12 mb-4">
                        <div className='col-span-1 flex items-end'>
                            <img
                                src="/images/pfp/pfp1.jpg"
                                className="object-cover h-10 w-10 rounded-full flex"
                                alt=""
                            />
                        </div>
                        <div
                            className="place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#818589] dark:to-[#3a3a3a] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                            <p className='flex items-center justify-start'>So freaking pumped for what's coming it all sounds great. Let's freaking go</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-10 md:grid-cols-12 mb-4">
                        <div
                            className="place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-blockd via-orange-500 to-orange-400 dark:from-[#242424] dark:to-[#3a3a3a] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
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
                    <div className="grid grid-cols-10 md:grid-cols-12 mb-4">
                        <div
                            className="place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-blockd via-orange-500 to-orange-400 dark:from-[#242424] dark:to-[#3a3a3a] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
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
                    <div className="grid grid-cols-10 md:grid-cols-12 mb-4">
                        <div className='col-span-1 flex items-end'>
                            <img
                                src="/images/pfp/pfp1.jpg"
                                className="object-cover h-10 w-10 rounded-full flex"
                                alt=""
                            />
                        </div>
                        <div
                            className="place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#818589] dark:to-[#3a3a3a] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                            Oh shit! I'll check it for sure.
                        </div>
                    </div>
                    <div className="grid grid-cols-10 md:grid-cols-12 mb-4">
                        <div
                            className="place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-blockd via-orange-500 to-orange-400 dark:from-[#242424] dark:to-[#3a3a3a] rounded-bl-3xl rounded-tl-3xl rounded-tr-xl text-white"
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
                    <div className="grid grid-cols-10 md:grid-cols-12 mb-4">
                        <div className='col-span-1 flex items-end'>
                            <img
                                src="/images/pfp/pfp3.jpg"
                                className="object-cover h-10 w-10 rounded-full flex"
                                alt=""
                            />
                        </div>
                        <div
                            className="place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 from-darkblue to-[#363357] bg-gradient-to-r dark:from-[#818589] dark:to-[#3a3a3a] rounded-br-3xl rounded-tr-3xl rounded-tl-xl text-white"
                        >
                            Thank you ! let GOOOO !
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex px-3 flex-col sticky bottom-0 h-[50px] w-full dark:bg-darkgray z-[1]'>
                <form className='flex space-x-3'>
                    <input
                        className='flex-1 rounded-lg bg-gray-200 dark:bg-lightgray p-2 outline-none dark:text-white dark:placeholder:text-white placeholder:text-black placeholder:font-semibold'
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
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Chatbox