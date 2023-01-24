import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import {
  HomeModernIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../stores/authUser/AuthUserActions';
import { useAppSelector, useAppDispatch } from '../../stores/hooks'

export default function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleRegisterUser = async () => {
    await dispatch(registerUser({
      name: displayName,
      email: email,
      password: '123',
      signature: '122222',
      address: 'address'
    }));
  }

  const web3Login = async (e: any) => {
    e.preventDefault();
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install MetaMask first.');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    let response: any = await fetch('http://localhost:8000/api/user/message');

    const message = await response.json();

    await provider.send("eth_requestAccounts", []);
    const address = await provider.getSigner().getAddress();
    const signature = await provider.getSigner().signMessage(message.message);

    const data = await dispatch(registerUser({
        name: displayName,
        email: email,
        password: 'zebbolaali',
        password_confirmation: 'zebbolaali',
        address: address,
        signature: signature,
        message: message.message
    })).then(() => {
      router.push('/');
    });

    console.log('data: ', data);
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
      <div className="flex items-center justify-start h-screen w-full md:w-1/2 p-12 mx-auto">
        <div className="flex items-center h-[550px] w-[500px] rounded-2xl bg-color relative">
          <div className="relative flex flex-col items-center justify-center w-full h-full">
            <div className="absolute top-0 flex justify-center items-center p-4 space-x-4 border-b border-gray-500 w-full">
              <Image
                src="/images/logo/logo.png"
                alt="Blockd Logo"
                className="md:hidden md:w-30 md:h-14"
                width={70}
                height={50}
              />
              <h2 className="text-center font-bold text-white text-4xl lg:text-5xl pb-3">Sign Up</h2>
            </div>
            <form action="" className="flex flex-col items-center justify-center w-full p-16">
              <div className='flex flex-col items-start justify-center space-y-1 mt-4 w-full'>
                <p className='text-white font-semibold text-l'>Display Name</p>
                <input
                  className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                  type="text"
                  name="name"
                  placeholder="@"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className='flex flex-col items-start justify-center space-y-1 mt-4 w-full'>
                <p className='text-white font-semibold text-l'>Email</p>
                <input
                  className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-center mt-4 w-full space-x-2'>
                <input type="checkbox" className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200" />
                <p className='text-white font-semibold text-l'>Terms and Conditions</p>
              </div>
              <button
                className="w-40 mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full"
                onClick={(e) => web3Login(e)}
              >
                Connect Wallet
              </button>
              <button
                className="w-32 mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full"
                onClick={() => handleRegisterUser()}
              >
                Sign Up
              </button>
            </form>
            <div className='w-full flex items-center justify-center md:hidden absolute bottom-0 p-4 border-t border-gray-500'>
              <h2 className="text-white text-l lg:text-xl">Already Registered ? <Link href="/auth/signin" className='underline font-semibold'>Login</Link></h2>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}