import React, { useState } from 'react'
import {
    ChevronDownIcon,
    ChevronUpIcon
} from '@heroicons/react/24/outline'

function SuggestionBody() {


    let [posVote, setPosVote] = useState<number>(143)
    let [negVote, setNegVote] = useState<number>(26)
    let [totalVoteNumber, setTotalVoteNumber] = useState<number>(posVote + negVote)
    let [flagPosVote, setFlagPosVote] = useState<boolean>(false)
    let [flagNegVote, setFlagNegVote] = useState<boolean>(false)
    let [flagVote, setFlagVote] = useState<boolean>(false)

    const upVote = () => {
        if (flagPosVote === true) {
            --posVote
            setPosVote(posVote)
            totalVoteNumber = posVote + negVote
            setTotalVoteNumber(totalVoteNumber)
            flagPosVote = false
            setFlagPosVote(flagPosVote)
            flagVote = false
            setFlagVote(flagVote)
        } else if (flagNegVote === true) {
            --negVote
            setNegVote(negVote)
            ++posVote
            setPosVote(posVote)
            totalVoteNumber = posVote + negVote
            setTotalVoteNumber(totalVoteNumber)
            flagNegVote = false
            setFlagNegVote(flagNegVote)
            flagPosVote = true
            setFlagPosVote(flagPosVote)
            flagVote = true
            setFlagVote(flagVote)
        } else {
            ++posVote
            setPosVote(posVote)
            totalVoteNumber = posVote + negVote
            setTotalVoteNumber(totalVoteNumber)
            flagPosVote = true
            setFlagPosVote(flagPosVote)
            flagVote = true
            setFlagVote(flagVote)
        }
    }

    const downVote = () => {
        if (flagNegVote === true) {
            --negVote
            setNegVote(negVote)
            totalVoteNumber = posVote + negVote
            setTotalVoteNumber(totalVoteNumber)
            flagNegVote = false
            setFlagNegVote(flagNegVote)
            flagVote = false
            setFlagVote(flagVote)
        } else if (flagPosVote === true) {
            --posVote
            setPosVote(posVote)
            ++negVote
            setNegVote(negVote)
            totalVoteNumber = posVote + negVote
            setTotalVoteNumber(totalVoteNumber)
            flagPosVote = false
            setFlagPosVote(flagPosVote)
            flagNegVote = true
            setFlagNegVote(flagNegVote)
            flagVote = true
            setFlagVote(flagVote)
        } else {
            ++negVote
            setNegVote(negVote)
            totalVoteNumber = posVote + negVote
            setTotalVoteNumber(totalVoteNumber)
            flagNegVote = true
            setFlagNegVote(flagNegVote)
            flagVote = true
            setFlagVote(flagVote)
        }
    }

    return (
        <div className='p-4'>
            <div className='flex rounded-md border border-gray-100 dark:border-lightgray justify-center'>
                <div className='flex flex-col items-center justify-center space-y-4'>
                    <div className='flex flex-col items-center justify-center p-4'>
                        <span className='text-xl font-semibold'>{totalVoteNumber}</span>
                        <span className='text-sm'>Votes</span>
                    </div>
                    <div className='flex items-center justify-center p-2 space-x-2'>
                        <div className='flex flex-col items-center justify-center space-y-1'>
                            {flagPosVote && flagVote ? (
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div onClick={() => upVote()} className='cursor-pointer p-1 bg-green-500 rounded-md'>
                                        <ChevronUpIcon className='w-5 h-5 text-white' />
                                    </div>
                                    <p className='text-xs'>{posVote}</p>
                                </div>
                            ) : (!flagPosVote && flagVote) ? (
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div onClick={() => upVote()} className='cursor-pointer p-1 rounded-md hover:bg-gray-100'>
                                        <ChevronUpIcon className='w-5 h-5 text-black' />
                                    </div>
                                    <p className='text-xs'>{posVote}</p>
                                </div>
                            ) : (
                                <div onClick={() => upVote()} className='cursor-pointer p-1 border rounded-md hover:bg-gray-100'>
                                    <ChevronUpIcon className='w-5 h-5' />
                                </div>
                            )}

                        </div>
                        <div className='flex flex-col items-center justify-center space-y-1'>
                            {flagNegVote && flagVote ? (
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div onClick={() => downVote()} className='cursor-pointer p-1 bg-red-500 rounded-md'>
                                        <ChevronDownIcon className='w-5 h-5 text-white' />
                                    </div>
                                    <p className='text-xs'>{negVote}</p>
                                </div>
                            ) : (!flagNegVote && flagVote) ? (
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div onClick={() => downVote()} className='cursor-pointer p-1 rounded-md hover:bg-gray-100'>
                                        <ChevronDownIcon className='w-5 h-5 text-black' />
                                    </div>
                                    <p className='text-xs'>{negVote}</p>
                                </div>
                            ) : (
                                <div onClick={() => downVote()} className='cursor-pointer p-1 border rounded-md hover:bg-gray-100'>
                                    <ChevronDownIcon className='w-5 h-5' />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col items-start justify-start space-y-5 w-full p-2 px-4 border-l border-gray-200 dark:border-lightgray'>
                    <div className='flex items-center justify-start space-x-2'>
                        <div className='relative flex flex-col items-start p-1 animate-colorChange rounded-lg'>
                            <img src="/images/pfp/pfp2.jpg" className='min-w-10 min-h-12 max-w-10 max-h-12 rounded-md shadow-sm' />
                            <div className='absolute -bottom-3 -left-2 flex p-1 w-7 h-7 animate-colorChange rounded-lg'>
                                <div className='flex items-center justify-center text-black font-semibold rounded-md w-full h-full text-xs bg-white '>
                                    15
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col'>
                            <span className='flex items-start font-semibold text-l'>Your Title go here</span>
                            <span className='flex items-end text-sm'>@Egoist</span>
                        </div>
                    </div>
                    <div className='flex items-start'>
                        <p className='text-sm'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Vestibulum tincidunt, nibh non rhoncus egestas, arcu massa varius tellus,
                            nec consequat lacus nulla ut enim. Mauris vehicula dui vel tellus fringilla vulputate.
                        </p>
                    </div>
                    <div className='flex items-start'>
                        <p className='text-sm text-gray-500'>
                            22 hours ago - Category 1
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuggestionBody