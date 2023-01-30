import Image from 'next/image';
import Link from 'next/link';
import {
    CheckIcon,
    KeyIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react';
import Head from 'next/head';

function signup() {

    const [isChecked, setIsChecked] = useState<boolean>(false)
    const [isChecked2, setIsChecked2] = useState<boolean>(false)

    return (
        <section className="min-h-screen flex items-stretch scrollbar-hide overflow-scroll text-white bg-[url('../public/images/bg.jpg')] bg-no-repeat bg-cover">
            <div className="md:flex w-1/2 hidden relative items-center">
                <div className="flex items-center justify-center w-full">
                    <div className="flex flex-col items-start justify-center">
                        <Image
                            src="/images/logo/long-logo.png"
                            alt="Blockd Logo"
                            className="md:w-30 md:h-14"
                            width={180}
                            height={50}
                        />
                        <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-4xl">CREATE</h2>
                        <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-4xl">NEW ACCOUNT</h2>
                        <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">Already Registered ? <Link href="/auth/signin" className='underline'>Login</Link></h4>
                        <br />
                        <hr className="w-1/3"></hr>
                        <h4 className="text-white mt-10 ml-2 pb-3 text-m md:text-m lg:text-l">Verified By Blockchain Technology</h4>
                        <div className='flex mt-8 '>
                            <button className="w-32 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full">Learn more</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="md:w-1/2 w-full flex items-center justify-center text-center p-10 lg:p-20 z-0">
                <div className="flex items-center h-full w-full bg-color relative rounded-md">
                    <div className="relative flex flex-col items-center justify-center w-full h-full">
                        <div className="flex justify-center items-center p-4 space-x-4 border-b border-gray-500 w-full">
                            <Image
                                src="/images/logo/logo.png"
                                alt="Blockd Logo"
                                className="md:hidden md:w-30 md:h-14"
                                width={70}
                                height={50}
                            />
                            <h2 className="text-center font-bold text-white text-4xl lg:text-5xl pb-3">Sign Up</h2>
                        </div>
                        <form action="" className="flex flex-col items-center justify-center w-full h-full px-10 py-5 lg:px-20">
                            <div className='flex flex-col items-start justify-center space-y-1 w-full'>
                                <p className='text-white font-semibold text-l'>Display Name</p>
                                <input className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none" type="text" name="name" placeholder="@" />
                            </div>
                            <div className='flex flex-col items-start justify-center space-y-1 mt-4 w-full'>
                                <p className='text-white font-semibold text-l'>Email</p>
                                <input className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none" type="email" name="email" placeholder="example@gmail.com" />
                            </div>
                            <div className='flex items-center justify-start mt-4 w-full space-x-2'>
                                <div onClick={() => setIsChecked(!isChecked)} className='flex items-center justify-center border rounded-md cursor-pointer w-5 h-5'>
                                    {isChecked &&
                                        <CheckIcon className='w-4 h-4 text-white' />
                                    }
                                </div>
                                <p className='text-white font-semibold text-l'>Terms and Conditions</p>
                            </div>
                            <div className='flex items-center justify-start mt-4 w-full space-x-2'>
                                <div onClick={() => setIsChecked2(!isChecked2)} className='flex items-center justify-center border rounded-md cursor-pointer w-5 h-5'>
                                    {isChecked2 &&
                                        <CheckIcon className='w-4 h-4 text-white' />
                                    }
                                </div>
                                <p className='text-white font-semibold text-l'>Privacy Policy</p>
                            </div>
                            <button className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full">Connect Wallet</button>
                            {isChecked === true && isChecked2 === true ? (
                                <button className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full">Sign Up</button>
                            ) : (
                                <button className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white font-semibold py-3 px-4 rounded-full opacity-70" disabled>Sign Up</button>
                            )}
                        </form>
                        <div className='w-full flex items-center justify-center md:hidden p-3 border-t border-gray-500'>
                            <h2 className="text-white text-l lg:text-xl">Already Registered ? <Link href="/auth/signin" className='underline font-semibold'>Login</Link></h2>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default signup