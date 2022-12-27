import Image from 'next/image';
import Link from 'next/link';
import {
    HomeModernIcon,
    KeyIcon,
} from '@heroicons/react/24/outline'

export default function SignUp() {
    return (
        <section className="md:flex-row h-screen bg-image grid grid-cols-10">
            <div className="h-screen hidden md:flex items-center col-span-5 mx-auto">
                <div className="flex items-center w-full">
                    <div className="h-full w-full rounded-2xl">
                        <Image
                            src="/images/logo.png"
                            alt="Blockd Logo"
                            className="self-center md:w-30 md:h-14"
                            width={80}
                            height={50}
                        />
                        <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-4xl">CREATE</h2>
                        <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-4xl">NEW ACCOUNT</h2>
                        <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">Already Registered ? <Link href="/auth/signin" className='underline'>Login</Link></h4>
                        <br />
                        <hr className="w-1/3"></hr>
                        <h4 className="text-white mt-10 ml-2 pb-3 text-m md:text-m lg:text-l">Veified By Blockchain Technology</h4>
                        <div className='flex mt-8 '>
                            <button className="md:w-4/9 bg-button2 text-white py-2 px-4 rounded-xl">Learn more</button>
                            <Link href="/" className='flex py-2 px-4 group'>
                                <HomeModernIcon className='w-6 h-6 text-white mr-2' />
                                <p className='text-white text-xl font-semibold group-hover:underline'>Home</p>
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="h-screen block w-full col-span-10 md:col-span-5 p-12 mx-auto">
                <div className="flex items-center h-full w-full xl:w-3/4 rounded-2xl bg-color relative">
                    <div className="w-full">
                        <div className="flex justify-center items-center text-center">
                            <Image
                                src="/images/logo.png"
                                alt="Blockd Logo"
                                className="self-center block md:hidden mt-2 md:w-30 md:h-14"
                                width={80}
                                height={50}
                            />
                            <h2 className="font-bold text-white mt-2 ml-2 pb-3 text-4xl lg:text-5xl">Sign Up</h2>
                        </div>
                        <form action="" className="flex flex-col items-center">
                            <input className="p-2 mt-8 rounded-xl border w-3/4 sign-up" type="text" name="name" placeholder="Name" />
                            <input className="p-2 mt-8 rounded-xl border w-3/4 sign-up" type="email" name="email" placeholder="Email" />
                            <button className="w-40 mt-8 bg-button1 text-white py-2 px-4 rounded-xl">Connect Wallet</button>
                            <button className="w-40 mt-8 bg-button2 text-white py-2 px-4 rounded-xl">Sign Up</button>
                            <div className='grid-cols-6 absolute bottom-0 flex md:hidden mt-4'>
                                <div className='flex col-span-3 p-6 group'>
                                    <Link href="/" className='flex'>
                                        <HomeModernIcon className='w-6 h-6 text-white mr-2' />
                                        <p className='text-white text-xl font-semibold group-hover:underline'>Home</p>
                                    </Link>
                                </div>
                                <div className='flex col-span-3 p-6 group'>
                                    <Link href="/auth/signin" className='flex'>
                                        <KeyIcon className='w-6 h-6 text-white mr-2' />
                                        <p className='text-white text-xl font-semibold group-hover:underline'>Login</p>
                                    </Link>       
                                </div>    
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}