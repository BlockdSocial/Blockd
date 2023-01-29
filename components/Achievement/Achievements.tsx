import React, { useState } from 'react'

function Achievements() {

    const [isRewardClaimed, setIsRewardClaimed] = useState<boolean>(false);
    const [isDisplayModal, setIsDisplayModal] = useState<boolean>(false);

    const handleClaim = () => {
        setIsDisplayModal(!isDisplayModal)
        setIsRewardClaimed(!isRewardClaimed)
    }

    return (
        <div className='flex flex-col items-center justify-center w-full px-6 bg-transparent'>
            <div className='flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray rounded-lg shadow-lg'>
                <div className='flex items-center justify-center w-1/4'>
                    <img src='/images/badges/badge1.png' className='flex w-14 max-w-full h-auto' />
                </div>
                <div className='flex flex-col items-start justify-start w-3/4'>
                    <h1 className='text-l font-semibold'>Level 1</h1>
                    <h3 className='text-sm text-gray-500 mb-2'>Earn 150 XP</h3>
                    <button type="button" className="text-white bg-gradient-to-r from-orange-300 to-orange-300 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-1 text-center" disabled>Reward Claimed</button>
                </div>
            </div>
            <hr className='border-2 h-10 border-blockd'></hr>
            <div onClick={() => setIsDisplayModal(!isDisplayModal)} className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${isRewardClaimed ? '' : 'cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray'} rounded-lg shadow-lg`}>
                <div className='flex items-center justify-center w-1/4'>
                    <img src='/images/badges/badge2.png' className='flex w-14 max-w-full h-auto' />
                </div>
                <div className='flex flex-col items-start justify-start w-3/4'>
                    <h1 className='text-l font-semibold'>Level 2</h1>
                    <h3 className='text-sm text-gray-500 mb-2'>Unlock Green block icon</h3>
                    {isRewardClaimed === true ? (
                        <button type="button" className="text-white bg-gradient-to-r from-orange-300 to-orange-300 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-4 py-1 text-center" disabled>Reward Claimed</button>
                    ):(
                        <button type="button" className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-1 text-center">Claim Reward</button>
                    )}
                    
                </div>
            </div>
            <hr className='border-2 h-10 border-blockd'></hr>
            <div className='flex items-center justify-center space-x-4 w-72 p-4 px-2 cursor-pointer border dark:border-lightgray rounded-lg opacity-60'>
                <div className='flex items-center justify-center w-1/4'>
                    <img src='/images/badges/badge3.png' className='flex w-14 max-w-full h-auto' />
                </div>
                <div className='flex flex-col items-start justify-start w-3/4'>
                    <h1 className='text-l font-semibold'>Level 4</h1>
                    <h3 className='text-sm text-gray-500 mb-2'>Unlock GIFs</h3>
                    <div className="flex items-center justify-start w-[135px] h-2 rounded bg-gray-200 mb-2 relative group">
                        <div className="flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-1 h-2 rounded w-3/4">
                            {/*<span className='text-xs font-semibold cursor-pointer text-white inline'>120 XP</span>*/}
                        </div>
                        <div className="flex items-center justify-center w-1/4">
                            {/*<span className='text-xs font-semibold cursor-pointer text-black'>60 XP</span>*/}
                        </div>
                    </div>
                </div>
            </div>
            <hr className='border-2 h-10'></hr>
            <div className='flex items-center justify-center space-x-4 w-72 p-4 px-2 cursor-pointer border dark:border-lightgray rounded-lg opacity-60'>
                <div className='flex items-center justify-center w-1/4'>
                    <img src='/images/badges/badge3.png' className='flex w-14 max-w-full h-auto' />
                </div>
                <div className='flex flex-col items-start justify-start w-3/4'>
                    <h1 className='text-l font-semibold'>Level 5</h1>
                    <h3 className='text-sm text-gray-500 mb-2'>Unlocks ability to create/host chatrooms and streams</h3>
                    <div className="flex items-center justify-start w-[135px] h-2 rounded bg-gray-200 mb-2 relative group">
                        <div className="flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-1 h-2 rounded w-1/2">
                            {/*<span className='text-xs font-semibold cursor-pointer text-white inline'>120 XP</span>*/}
                        </div>
                        <div className="flex items-center justify-center w-1/4">
                            {/*<span className='text-xs font-semibold cursor-pointer text-black'>60 XP</span>*/}
                        </div>
                    </div>
                </div>
            </div>
            <hr className='border-2 h-10'></hr>
            <div className='flex items-center justify-center space-x-4 w-72 p-4 px-2 cursor-pointer border dark:border-lightgray rounded-lg opacity-60'>
                <div className='flex items-center justify-center w-1/4'>
                    <img src='/images/badges/badge3.png' className='flex w-14 max-w-full h-auto' />
                </div>
                <div className='flex flex-col items-start justify-start w-3/4'>
                    <h1 className='text-l font-semibold'>Level 6</h1>
                    <h3 className='text-sm text-gray-500 mb-2'>Unlock Frame Colors</h3>
                    <div className="flex items-center justify-start w-[135px] h-2 rounded bg-gray-200 mb-2 relative group">
                        <div className="flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 p-1 h-2 rounded">
                            {/*<span className='text-xs font-semibold cursor-pointer text-white inline'>120 XP</span>*/}
                        </div>
                        <div className="flex items-center justify-center w-1/4">
                            {/*<span className='text-xs font-semibold cursor-pointer text-black'>60 XP</span>*/}
                        </div>
                    </div>
                </div>
            </div>
            {/*  ****************Modal****************   */}
            <div className={`absolute flex items-center justify-center mx-auto z-50 w-96 top-20 p-4 ${isDisplayModal ? '' : 'hidden'}`}>
                <div className="relative flex flex-col w-full rounded-lg max-w-md h-96">
                    <img src='/images/badges/badge4.png' className='absolute -top-20 left-0 right-0 ml-auto mr-auto w-60 h-68 flex justify-center align-center' />
                    <div className="flex rounded-lg bg-gradient-to-r from-[#EC9F05] to-[#FF4E00] h-full">
                        <div className='flex items-center justify-end'>
                            <button type="button" onClick={() => setIsDisplayModal(!isDisplayModal)} className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-orange-400 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className='flex flex-col items-center justify-center w-full mt-28 p-10'>
                            <p className='text-3xl text-white font-semibold font-mono'>Congrats!</p>
                            <p className='text-l text-white mb-4 text-center p-2'>You reached level 2 and unlocked a green blockd icon</p>
                            <p 
                                onClick={() => handleClaim()}
                                className='text-center cursor-pointer bg-[#E55B13] hover:bg-orange-400 p-3 rounded-3xl w-full text-white font-semibold'>Claim Reward</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Achievements