import Image from 'next/image';
import Link from 'next/link';

export default function SignUp() {
    return (
        <section className="flex flex-col md:flex-row h-screen bg-image">
            <div className="h-screen hidden md:flex items-center w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
                <div className="flex items-center w-full">
                    <div className="h-full w-full rounded-2xl p-10 ml-10 xl:ml-28">
                        <Image
                            src="/images/logo.png"
                            alt="Blockd Logo"
                            className="self-center md:w-30 md:h-14"
                            width={80}
                            height={50}
                        />
                        <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-4xl">CREATE</h2>
                        <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-4xl">NEW ACCOUNT</h2>
                        <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">Already Registered ? <Link href="/auth/signin">Login</Link></h4>
                        <br />
                        <hr className="w-1/3"></hr>
                        <h4 className="text-white mt-10 ml-2 pb-3 text-m md:text-m lg:text-l">Veified By Blockchain Technology</h4>
                        <button className="md:w-4/9 mt-8 bg-button2 text-white py-2 px-4 rounded-xl">Learn more</button>
                    </div>
                </div>
            </div>
            <div className="h-screen block w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-12">
                <div className="flex items-center h-full w-full xl:w-3/4 rounded-2xl bg-color">
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
                            <input className="p-2 mt-8 rounded-xl border w-3/4" type="text" name="name" placeholder="Name" />
                            <input className="p-2 mt-8 rounded-xl border w-3/4" type="email" name="email" placeholder="Email" />
                            <button className="md:w-4/9 mt-8 bg-button1 text-white py-2 px-4 rounded-xl">Connect Wallet</button>
                            <button className="md:w-4/9 mt-8 bg-button2 text-white py-2 px-4 rounded-xl">Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}