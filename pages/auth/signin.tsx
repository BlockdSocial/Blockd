import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loginUser } from '../../stores/authUser/AuthUserActions';
import { useAppDispatch } from '../../stores/hooks';
import { ethers } from "ethers";
import { config } from '../../constants';

export default function SignIn() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const messageUrl = `${config.url.API_URL}/user/generate/message`;

  const web3Login = async (e: any) => {
    e.preventDefault();
    // @ts-ignore
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install MetaMask first.');
      return;
    }

    // @ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let response: any = await fetch(messageUrl);

    const message = await response.json();

    await provider.send("eth_requestAccounts", []);
    const address = await provider.getSigner().getAddress();
    const signature = await provider.getSigner().signMessage(message.message);

    const data = await dispatch(loginUser({
      address: address,
      signature: signature,
      message: message.message
    })).then(() => {
      router.push('/');
    });
  }

  return (
    <section className="flex h-screen bg-image">
      <div className="h-screen hidden md:flex items-center justify-center w-1/2 mx-auto">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-start justify-center">
            <img
              src="/images/logo/long-logo.png"
              alt="Blockd Logo"
              className="md:w-30 md:h-14"
              width={150}
              height={50}
            />
            <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-4xl">LOGIN</h2>
            <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-3xl">SIGN IN TO CONTINUE</h2>
            <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">You are not Registered ? <Link href="/auth/signup" className='underline'>Register Now</Link></h4>
            <br />
            <hr className="w-1/3"></hr>
            <h4 className="text-white mt-10 ml-2 pb-3 text-m md:text-m lg:text-l">Verified By Blockchain Technology</h4>
            <div className='flex mt-8 '>
              <button className="w-32 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-2 px-4 rounded-full">Learn more</button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen flex items-center w-full md:w-1/2 p-12 mx-auto">
        <div className="flex items-center h-[400px] w-[400px] rounded-2xl bg-color relative">
          <div className="w-full">
            <div className="absolute top-0 p-4 border-b border-gray-500 w-full flex justify-center items-center text-center">
              <Image
                src="/images/logo/logo.png"
                alt="Blockd Logo"
                className="self-center block md:hidden mt-2 md:w-30 md:h-14"
                width={80}
                height={50}
              />
              <h2 className="font-bold text-white mt-2 ml-2 pb-3 text-4xl lg:text-5xl">Sign In</h2>
            </div>
            <form action="" className="flex flex-col items-center justify-center">
              <button
                className="w-46 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-6 px-6 rounded-full text-xl"
                onClick={(e) => web3Login(e)}
              >
                Connect Wallet
              </button>
            </form>
            <div className='w-full flex items-center justify-center md:hidden absolute bottom-0 p-4 border-t border-gray-500'>
              <h2 className="text-white text-l lg:text-xl">You are not Registered ? <Link href="/auth/signin" className='underline font-semibold'>Register Now !</Link></h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}