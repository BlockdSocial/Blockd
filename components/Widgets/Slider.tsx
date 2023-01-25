import React, { useState } from 'react'
import {
    ChevronRightIcon,
    ChevronLeftIcon,
    MinusCircleIcon,
    ShareIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link';


function Slider() {

    const slides = [
        {
            url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
            title: 'Blockchain News !'
        },
        {
            url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
            title: 'Breaking Shiba Inu !!'
        },
        {
            url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
            title: 'EGO V3 is LIVE!'
        },

        {
            url: 'https://images.unsplash.com/photo-1512756290469-ec264b7fbf87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2253&q=80',
            title: 'Blockd has 1M users !'
        },
        {
            url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80',
            title: 'Elon Mask is BROKE !'
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: any) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <div className='mt-3'>
            <div className='flex items-center justify-start rounded-md space-x-2 p-2 mt-4'>
                <ShareIcon className='w-4 h-4 lg:w-5 lg:h-5' />
                <p className='font-semibold text-xs lg:text-base'>
                    Most Shared
                </p>
            </div>
            <div className='h-52 w-full m-auto p-2 relative group'>
                <div
                    style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
                    className='w-full h-full relative rounded-md bg-center bg-cover duration-500'
                >
                    <Link href="/dashboard/post" className='absolute bg-gradient-to-r dark:from-lightgray from-indigo-500 text-white dark:bg-white text-sm font-semibold p-1 pl-2 rounded-b-md flex items-center justify-start bottom-0 w-full'>{slides[currentIndex].title}</Link>
                </div>
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronLeftIcon onClick={prevSlide} className='w-4 h-4' />
                </div>
                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <ChevronRightIcon onClick={nextSlide} className='w-4 h-4' />
                </div>
                <div className='flex top-4 justify-center py-2'>
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className='text-2xl cursor-pointer'
                        >
                            <MinusCircleIcon className='ml-1 w-2 h-2 dark:fill-white dark:text-white fill-black text-black' />
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Slider