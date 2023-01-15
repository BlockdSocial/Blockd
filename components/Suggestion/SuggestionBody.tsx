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
        ++posVote
        setPosVote(posVote)
        totalVoteNumber = posVote + negVote
        setTotalVoteNumber(totalVoteNumber)
        flagPosVote = true
        setFlagPosVote(flagPosVote)
        flagVote = true
        setFlagVote(flagVote)
    }

    const downVote = () => {
        ++negVote
        setNegVote(negVote)
        totalVoteNumber = posVote + negVote
        setTotalVoteNumber(totalVoteNumber)
        flagNegVote = true
        setFlagNegVote(flagNegVote)
        flagVote = true
        setFlagVote(flagVote)
    }

    return (
        <div className='p-4'>
            <div className='flex rounded-md border border-gray-100 dark:border-lightgray justify-center'>
                <div className='flex flex-col items-center justify-center space-y-4'>
                    <div className='flex flex-col items-center justify-center p-4'>
                        <span className='text-xl font-semibold'>{totalVoteNumber}</span>
                        <span className='text-sm'>Votes</span>
                    </div>
                    {flagPosVote && flagVote ? (
                        <div className='flex items-center justify-center p-2 space-x-2'>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div className='cursor-pointer p-1 bg-green-500 rounded-md'>
                                        <ChevronUpIcon className='w-5 h-5 text-white' />
                                    </div>
                                    <p className='text-xs'>{posVote}</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div className='cursor-pointer p-1 rounded-md'>
                                        <ChevronDownIcon className='w-5 h-5 dark:text-white' />
                                    </div>
                                    <p className='text-xs'>{negVote}</p>
                                </div>
                            </div>
                        </div>
                    ) : (flagNegVote && flagVote) ? (
                        <div className='flex items-center justify-center p-2 space-x-2'>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div className='cursor-pointer p-1 rounded-md'>
                                        <ChevronUpIcon className='w-5 h-5 dark:text-white' />
                                    </div>
                                    <p className='text-xs'>{posVote}</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div className='cursor-pointer p-1 bg-red-500 rounded-md'>
                                        <ChevronDownIcon className='w-5 h-5 text-white' />
                                    </div>
                                    <p className='text-xs'>{negVote}</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex items-center justify-center p-2 space-x-2'>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div onClick={() => upVote()} className='cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-lightgray rounded-md'>
                                        <ChevronUpIcon className='w-5 h-5 dark:text-white' />
                                    </div>
                                    <p className='text-xs'>-</p>
                                </div>
                            </div>
                            <div className='flex flex-col items-center justify-center space-y-1'>
                                <div className='flex flex-col items-center justify-center space-y-1'>
                                    <div onClick={() => downVote()} className='cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-lightgray rounded-md'>
                                        <ChevronDownIcon className='w-5 h-5 dark:text-white' />
                                    </div>
                                    <p className='text-xs'>-</p>
                                </div>
                            </div>
                        </div>
                    ) }
                </div>
                <div className='flex flex-col items-start justify-start space-y-5 w-full p-2 px-4 border-l border-gray-200 dark:border-lightgray'>
                    <div className='flex items-center justify-between w-full'>
                        <div className='flex items-center justify-start space-x-2'>
                            <div className='relative flex flex-col items-start border border-gray-200 dark:border-none p-1 rounded-lg'>
                                <img src="/images/unknown.jpg" className='min-w-10 min-h-12 max-w-10 max-h-12 rounded-md shadow-sm' />
                            </div>
                        </div>
                        <div className='flex items-center justify-end'>
                            <p className='font-semibold text-xs lg:text-sm'>48 hours left</p>
                        </div>
                    </div>
                    <div className='flex flex-col items-start space-y-2'>
                        <p className='font-semibold text-sm'>Title of the suggestion</p>
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