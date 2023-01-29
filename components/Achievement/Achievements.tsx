import React from 'react'

function Achievements() {
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
            <div className='flex items-center justify-center space-x-4 w-72 p-4 px-2 cursor-pointer border dark:border-lightgray hover:bg-gray-100 dark:hover:bg-lightgray rounded-lg shadow-lg'>
                <div className='flex items-center justify-center w-1/4'>
                    <img src='/images/badges/badge2.png' className='flex w-14 max-w-full h-auto' />
                </div>
                <div className='flex flex-col items-start justify-start w-3/4'>
                    <h1 className='text-l font-semibold'>Level 2</h1>
                    <h3 className='text-sm text-gray-500 mb-2'>Unlock Green block icon</h3>
                    <button type="button" className="text-white bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-1 text-center">Claim Reward</button>
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
        </div>
    )
}

export default Achievements