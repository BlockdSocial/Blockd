import React, { useState } from 'react'
import Picker from '@emoji-mart/react'
import {
    FaceSmileIcon,
    PhotoIcon,
    PaperAirplaneIcon,
} from '@heroicons/react/24/outline'

function Footer() {

    let [showEmojis, setShowEmojis] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')

    const addEmoji = (e: any) => {
        const sym = e.unified.split("-")
        const codesArray: any[] = []
        sym.forEach((el: any) => codesArray.push("0x" + el))
        const emoji = String.fromCodePoint(...codesArray)
        setInput(input + emoji)
    }

    return (
        <div className='flex flex-col sticky bottom-0 h-[8vh] w-full dark:bg-darkgray'>
            <div className='relative'>

                {showEmojis && (
                    <div className='absolute right-0 bottom-1'>
                        <Picker
                            set="apple"
                            onEmojiSelect={addEmoji}
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
            <form className='flex space-x-1 p-2 w-full absolute bottom-1'>
                <input
                    value={input}
                    onChange={(e: any) => setInput(e.target.value)}
                    className='flex-1 rounded-lg bg-gray-200 dark:bg-lightgray p-2 outline-none dark:text-white dark:placeholder:text-white placeholder:text-black placeholder:font-semibold'
                    type="text"
                    placeholder='Send a Message ...'
                />
                <div className='flex items-center space-x-2 text-[#181c44] dark:text-white'>
                    <PaperAirplaneIcon className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                    <PhotoIcon
                        className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150'
                    />
                    <FaceSmileIcon
                        onClick={() => setShowEmojis(!showEmojis)}
                        className='h-5 w-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150' />
                </div>
            </form>
        </div>
    )
}

export default Footer