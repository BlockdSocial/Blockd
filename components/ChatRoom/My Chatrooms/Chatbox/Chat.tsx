import React, { useState, useEffect, useRef } from 'react'
import {
    FaceSmileIcon,
    ArrowUturnLeftIcon,
    EllipsisVerticalIcon,
    ExclamationCircleIcon,
    TrashIcon,
    EyeDropperIcon,
    DocumentDuplicateIcon
} from '@heroicons/react/24/outline'

import AddReactionRoundedIcon from '@mui/icons-material/AddReactionRounded';

import Picker from '@emoji-mart/react'

export default function Chat() {


    let [showReaction, setShowReaction] = useState<boolean>(false)
    let [reaction, setReaction] = useState<string>('')
    let [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);

    const dropdown = useRef<any>(null);

    useEffect(() => {
        // only add the event listener when the dropdown is opened
        if (!isDropdownVisible) return;
        function handleClick(event: any) {
            if (isDropdownVisible === true) {
                if (dropdown.current && !dropdown.current.contains(event.target)) {
                    setIsDropdownVisible(false);
                }
            }
        }
        window.addEventListener("click", handleClick);
        // clean up
        return () => window.removeEventListener("click", handleClick);
    }, [isDropdownVisible]);

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
        <div className="scrollbar-hide overflow-scroll max-h-screen mt-14 mb-14 p-2 dark:bg-darkgray">
            <div className="">
                <div className='relative flex flex-col'>
                    <div className="grid grid-cols-10 md:grid-cols-12 mb-1">
                        <div
                            className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-[#FF512F] to-[#F09819] dark:from-[#AA076B] dark:to-[#61045F] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white group"
                        >
                            <div className='flex relative z-0 items-center justify-between w-full text-xm font-semibold'>
                                <div>
                                    <p>@Egoist</p>
                                </div>
                                <div className='relative z-0 flex items-center justify-end space-x-2'>
                                    <p>23:01</p>
                                    <div ref={dropdown} className='flex relative rounded-md'>
                                        {isDropdownVisible && (
                                            <ul className={`absolute top-6 right-1 w-32 cursor-pointer rounded-md shadow-xl`}>
                                                <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200 rounded-t-md"><TrashIcon className="w-5 h-5 mr-3" />Delete</div>
                                                <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200"><DocumentDuplicateIcon className="w-5 h-5 mr-3" />Copy</div>
                                                <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200"><EyeDropperIcon className="w-5 h-5 mr-3" />Pin</div>
                                                <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200"><ArrowUturnLeftIcon className="w-5 h-5 mr-3" />Reply</div>
                                                <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200 rounded-b-md"><ExclamationCircleIcon className="w-5 h-5 mr-3" />Report</div>
                                            </ul>
                                        )}
                                        <EllipsisVerticalIcon onClick={() => setIsDropdownVisible(b => !b)} className='w-5 h-5 cursor-pointer' />
                                    </div>

                                </div>
                            </div>
                            <p className='flex items-center justify-end'>Welcome to group everyone !</p>
                            <div className='relative flex items-center justify-start space-x-1 mt-1'>
                                <div className='absolute -left-7 -top-1 hidden group-hover:flex items-start justify-start bg-transparent rounded-md'>
                                    <div className='flex rounded-full p-1 h-full bg-white dark:bg-darkgray'>
                                        <AddReactionRoundedIcon onClick={() => setShowReaction(!showReaction)} className="cursor-pointer text-orange-600 dark:text-pink-800"/>
                                    </div>

                                    {showReaction && (
                                        <div className='absolute top-8 left-0'>
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
                        <div className='col-span-1 flex items-end justify-start'>
                            <img
                                src="/images/pfp/pfp2.jpg"
                                className="object-cover h-10 w-10 rounded-full"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-10 md:grid-cols-12">
                        <div
                            onClick={() => removeReaction()}
                            className={`flex items-center place-self-end w-fit col-span-9 md:col-span-11 p-1 px-2 mr-2 bg-orange-400 hover:bg-orange-500 dark:bg-[#61045F] dark:hover:bg-[#AA076B] rounded-md cursor-pointer ${reaction ? 'inline' : 'hidden'}`}>
                            <input
                                value={reaction}
                                onChange={(e: any) => setReaction(e.target.value)}
                                className="bg-transparent cursor-pointer w-6 text-sm" disabled />
                            <p className='text-xs font-bold text-white'>4</p>
                        </div>
                        <div className='col-span-1 flex items-end justify-end'>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div className='col-span-1 flex items-end justify-end'>
                        <img
                            src="/images/pfp/pfp1.jpg"
                            className="object-cover h-10 w-10 rounded-full flex"
                            alt=""
                        />
                    </div>
                    <div
                        className="flex flex-col place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#606c88] dark:to-[#3f4c6b] rounded-br-xl rounded-tr-xl rounded-tl-xl text-white"
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
                        className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-[#FF512F] to-[#F09819] dark:from-[#AA076B] dark:to-[#61045F] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Egoist</p>
                            <p>23:04</p>
                        </div>
                        <p className=''>Hell yeah brother, BLOCKD is amazing !</p>
                    </div>
                    <div className='col-span-1 flex items-end justify-start'>
                        <img
                            src="/images/pfp/pfp2.jpg"
                            className="object-cover h-10 w-10 rounded-full"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div
                        className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-[#FF512F] to-[#F09819] dark:from-[#AA076B] dark:to-[#61045F] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Egoist</p>
                            <p>23:04</p>
                        </div>
                        Have you got the chance to look into other chatrooms ? I saw an EGO one earlier !
                    </div>
                    <div className='col-span-1 flex items-end justify-start'>
                        <img
                            src="/images/pfp/pfp2.jpg"
                            className="object-cover h-10 w-10 rounded-full"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div className='col-span-1 flex items-end justify-end'>
                        <img
                            src="/images/pfp/pfp1.jpg"
                            className="object-cover h-10 w-10 rounded-full flex"
                            alt=""
                        />
                    </div>
                    <div
                        className="flex flex-col place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#606c88] dark:to-[#3f4c6b] rounded-br-xl rounded-tr-xl rounded-tl-xl text-white"
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
                        className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mr-2 py-3 px-4 bg-gradient-to-r from-[#FF512F] to-[#F09819] dark:from-[#AA076B] dark:to-[#61045F] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white"
                    >
                        <div className='flex items-center justify-between w-full text-xm font-semibold'>
                            <p>@Egoist</p>
                            <p>23:04</p>
                        </div>
                        Welcome to group everyone !
                    </div>
                    <div className='col-span-1 flex items-end justify-start'>
                        <img
                            src="/images/pfp/pfp2.jpg"
                            className="object-cover h-10 w-10 rounded-full"
                            alt=""
                        />
                    </div>
                </div>
                <div className="grid grid-cols-10 md:grid-cols-12 mb-4 mt-8">
                    <div className='col-span-1 flex items-end justify-end'>
                        <img
                            src="/images/pfp/pfp3.jpg"
                            className="object-cover h-10 w-10 rounded-full flex"
                            alt=""
                        />
                    </div>
                    <div
                        className="flex flex-col place-self-start w-fit col-span-9 md:col-span-11 ml-2 py-3 px-4 from-darkblue to-[#363357] bg-gradient-to-r dark:from-[#606c88] dark:to-[#3f4c6b] rounded-br-xl rounded-tr-xl rounded-tl-xl text-white"
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
