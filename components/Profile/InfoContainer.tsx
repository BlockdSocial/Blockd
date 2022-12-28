import React, { useState } from 'react'
import Picture from '../Feed/Picture'
import {
  CheckBadgeIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link';

function InfoContainer() {
    
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="grid grid-cols-8 relative bg-gray-100 dark:bg-lightgray items-center justify-center h-32 w-full mt-10 rounded-md border">
            <div className='col-span-3 place-self-start p-3'>
                <div className='flex items-center space-x-1'>
                    <p className='mr-1 font-semibold text-l group-hover:underline'>@Egoist</p>
                    <CheckBadgeIcon className='h-5 w-5 fill-blockd' />
                </div>
                <div>
                    <p className='mr-1 text-sm group-hover:underline mt-2'>10K followers</p>
                </div>
                <div className="w-full rounded bg-white h-2 mb-6 mt-4 relative">
                    <div className="bg-blockd h-2 rounded w-1/2"></div>
                    <div className='absolute text-sm mt-2'>
                        <span className='font-semibold'>Level 5 :</span> 50%
                    </div>
                </div>

            </div>
            <circle className="col-span-2 -mt-36 mx-auto">
                <Picture path='/images/pfp2.jpg' level={5} pictureCSS='h-16 w-16 md:w-20 md:h-20' levelCSS='top-14 md:top-20 md:w-8 md:h-8' />
            </circle>
            <div className='col-span-3 place-self-start justify-self-end p-3'>
                <div className='w-10 h-10 bg-white dark:bg-darkgray/50 flex items-center justify-center rounded-md'>
                    <Cog8ToothIcon onClick={toggleDropdown} className='h-8 w-8 text-black dark:fill-white cursor-pointer transition-transform duration-500 ease-out hover:rotate-180 active-scale' />
                </div>
                <ul className={`absolute right-5 cursor-pointer bg-white dark:bg-darkgray rounded-lg shadow-lg ${isDropdownVisible ? '' : 'hidden'}`}>
                    <Link href="" className="flex items-center justify-start py-2 px-4 hover:bg-gray-200 hover:font-semibold dark:hover:bg-lightgray/50"><PencilSquareIcon className='w-5 h-5 mr-2' />Edit Profile</Link>
                    <Link href="" className="flex items-center justify-start py-2 px-4 hover:bg-gray-200 hover:font-semibold dark:hover:bg-lightgray/50"><EyeIcon className='w-5 h-5 mr-2' />Display</Link>
                    <Link href="" className="flex items-center justify-start py-2 px-4 hover:bg-gray-200 hover:font-semibold dark:hover:bg-lightgray/50"><QuestionMarkCircleIcon className='w-5 h-5 mr-2' />Help Center</Link>
                </ul>
            </div>
        </div>
    )
}

export default InfoContainer