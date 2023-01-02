import React, { useState } from 'react'
import {
    FaceSmileIcon,
    EllipsisHorizontalIcon,
    ArrowUturnLeftIcon
} from '@heroicons/react/24/outline'
import Picker from '@emoji-mart/react'

export default function Chat() {

    
    let [showReaction, setShowReaction] = useState<boolean>(false)
    let [reaction, setReaction] = useState<string>('')

    const removeReaction = () => {
        reaction = ''
        setReaction(reaction)
    }

    const addReaction = (e: any) => {
        const sym = e.unified.split("-")
        const codesArray: any[] = []
        sym.forEach((el: any) => codesArray.push("0x" + el))
        const emoji = String.fromCodePoint(...codesArray)
        reaction = ''
        setReaction(reaction + emoji)
        setShowReaction(!showReaction)
    }

    return (
        <div className="scrollbar-hide overflow-scroll h-3/4 p-4 dark:bg-darkgray">
            <div className="mt-5">
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4">
                    <div
                        className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 dark:from-[#202020] dark:to-[#383838] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white group"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Egoist</p>
                            <p>23:01</p>
                        </div>
                        <p className='flex items-center justify-end'>Welcome to group everyone !</p>
                        <div className='flex items-center justify-between mt-1'>
                            <div
                                onClick={() => removeReaction()}
                                className={`mt-1 p-1 w-fit flex items-center justify-center bg-orange-400 hover:bg-orange-500 dark:bg-[#383838] dark:hover:bg-lightgray rounded-md cursor-pointer ${reaction ? 'inline' : 'hidden'}`}>
                                <input
                                    value={reaction}
                                    onChange={(e: any) => setReaction(e.target.value)}
                                    className="bg-transparent cursor-pointer w-6 text-sm" disabled />
                                <p className='text-xs'>5</p>
                            </div>
                            <div className='hidden sticky group-hover:flex items-center justify-between bg-orange-400 dark:bg-[#383838] w-fit rounded-md'>
                                <div className='flex items-center justify-center p-1 rounded-l-md hover:bg-orange-500 dark:hover:bg-lightgray h-full group'>
                                    <FaceSmileIcon onClick={() => setShowReaction(!showReaction)} className='w-5 h-5 cursor-pointer' />
                                </div>
                                <div className='flex items-center justify-center p-1 hover:bg-orange-500 dark:hover:bg-lightgray h-full'>
                                    <ArrowUturnLeftIcon className='w-5 h-5 cursor-pointer' />
                                </div>
                                <div className='flex items-center justify-center p-1 rounded-r-md hover:bg-orange-500 dark:hover:bg-lightgray h-full'>
                                    <EllipsisHorizontalIcon className='w-5 h-5 cursor-pointer' />
                                </div>

                                {showReaction && (
                                    <div className='absolute top-8 right-0'>
                                        <Picker
                                            set="apple"
                                            onEmojiSelect={addReaction}
                                            theme="dark"
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
                    </div>
                    <div className='col-span-1 flex items-end justify-end'>
                        <img
                            src="/images/pfp/pfp2.jpg"
                            className="object-cover h-10 w-10 rounded-full"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div className='col-span-1 flex items-end'>
                        <img
                            src="/images/pfp/pfp1.jpg"
                            className="object-cover h-10 w-10 rounded-full flex"
                            alt=""
                        />
                    </div>
                    <div
                        className="flex flex-col place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#818589] dark:to-[#3a3a3a] rounded-br-xl rounded-tr-xl rounded-tl-xl text-white"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Crypto_Crazy</p>
                            <p>23:01</p>
                        </div>
                        <p className='flex items-center justify-start'>So freaking pumped for what's coming it all sounds great. Let's freaking go</p>
                    </div>
                </div>
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div
                        className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 dark:from-[#202020] dark:to-[#383838] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Egoist</p>
                            <p>23:04</p>
                        </div>
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
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div
                        className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 dark:from-[#202020] dark:to-[#383838] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Egoist</p>
                            <p>23:04</p>
                        </div>
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
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div className='col-span-1 flex items-end'>
                        <img
                            src="/images/pfp/pfp1.jpg"
                            className="object-cover h-10 w-10 rounded-full flex"
                            alt=""
                        />
                    </div>
                    <div
                        className="flex flex-col place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#818589] dark:to-[#3a3a3a] rounded-br-xl rounded-tr-xl rounded-tl-xl text-white"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Crypto_crazy</p>
                            <p>23:04</p>
                        </div>
                        Oh shit! I'll check it for sure.
                    </div>
                </div>
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div
                        className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 dark:from-[#202020] dark:to-[#383838] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Egoist</p>
                            <p>23:04</p>
                        </div>
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
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div className='col-span-1 flex items-end'>
                        <img
                            src="/images/pfp/pfp3.jpg"
                            className="object-cover h-10 w-10 rounded-full flex"
                            alt=""
                        />
                    </div>
                    <div
                        className="flex flex-col place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 from-darkblue to-[#363357] bg-gradient-to-r dark:from-[#818589] dark:to-[#3a3a3a] rounded-br-xl rounded-tr-xl rounded-tl-xl text-white"
                    >
                        <div className='flex items-center space-x-4 justify-between w-full text-xm font-semibold'>
                            <p>@Monkey_crypto</p>
                            <p>23:04</p>
                        </div>
                        Thank you ! let GOOOO !
                    </div>
                </div>
            </div>
        </div>
    )
}
