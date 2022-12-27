import Image from 'next/image';
import Link from 'next/link';
import {
    HomeModernIcon,
    KeyIcon,
} from '@heroicons/react/24/outline'

export default function SignIn() {
    return (
        <section className="grid grid-cols-10 h-screen bg-image">
            <div className="h-screen hidden md:flex items-center col-span-5 mx-auto">
                <div className="flex items-center w-full">
                    <div className="h-full w-full rounded-2xl p-10 ml-10 xl:ml-28">
                        <Image
                            src="/images/logo.png"
                            alt="Blockd Logo"
                            className="self-center md:w-30 md:h-14"
                            width={80}
                            height={50}
                        />
                        <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-4xl">LOGIN</h2>
                        <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-3xl">SIGN IN TO CONTINUE</h2>
                        <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">You are not Registered ? <Link href="/auth/signup" className='underline'>Register Now</Link></h4>
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
            <div className="h-screen flex items-center w-full col-span-10 md:col-span-5 p-12 mx-auto">
                <div className="flex items-center h-2/3 w-full xl:w-3/4 rounded-2xl bg-color relative">
                    <div className="w-full">
                        <div className="flex justify-center items-center text-center">
                            <Image
                                src="/images/logo.png"
                                alt="Blockd Logo"
                                className="self-center block md:hidden mt-2 md:w-30 md:h-14"
                                width={80}
                                height={50}
                            />
                            <h2 className="font-bold text-white mt-2 ml-2 pb-3 text-4xl lg:text-5xl">Sign In</h2>
                        </div>
                        <form action="" className="flex flex-col items-center">
                            <button className="w-40 mt-8 bg-button2 text-white py-2 px-4 rounded-xl">Connect Wallet</button>
                            <div className='grid-cols-6 flex absolute bottom-0 md:hidden mt-4'>
                                <div className='flex col-span-3 p-6 group'>
                                    <Link href="/" className='flex'>
                                        <HomeModernIcon className='w-6 h-6 text-white mr-2' />
                                        <p className='text-white text-xl font-semibold group-hover:underline'>Home</p>
                                    </Link>
                                </div>
                                <div className='flex col-span-3 p-6 group'>
                                    <Link href="/auth/signup" className='flex'>
                                        <KeyIcon className='w-6 h-6 text-white mr-2' />
                                        <p className='text-white text-xl font-semibold group-hover:underline'>Sign Up</p>
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