import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ethers } from "ethers";
import {
  CheckIcon,
} from '@heroicons/react/24/outline'
import { registerUser } from '../../stores/authUser/AuthUserActions';
import { useAppDispatch } from '../../stores/hooks'
import { isEmpty } from '../../utils';
import { config } from '../../constants';
import Terms from '../../components/Auth/Terms';

export default function SignUp() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const messageUrl = `${config.url.API_URL}/user/generate/message`;
  const [displayName, setDisplayName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [userMessage, setUserMessage] = useState<object>();
  const [userAddress, setUserAddress] = useState<string>('');
  const [userSignature, setUserSignature] = useState<string>('');
  const [terms, setTerms] = useState<boolean>(false);
  const [isDisplayTermsAndConditionsModal, setIsDisplayTermsAndConditionsModal] = useState<boolean>(false)

  const handleRegisterUser = async (e: any) => {
    e.preventDefault();
    if (!terms || isEmpty(userMessage) || isEmpty(userAddress) || isEmpty(userSignature)) {
      return;
    }
    await dispatch(registerUser({
      name: displayName,
      email: email,
      password: 'zebbolaali',
      password_confirmation: 'zebbolaali',
      address: userAddress,
      signature: userSignature,
      // @ts-ignore
      message: userMessage?.message
    })).then(() => {
      router.push('/');
    });
  }

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
    setUserMessage(message);

    await provider.send("eth_requestAccounts", []);
    const address = await provider.getSigner().getAddress();
    setUserAddress(address);
    const signature = await provider.getSigner().signMessage(message.message);
    setUserSignature(signature);
  }

  return (
    <section className="min-h-screen flex items-stretch overflow-hidden text-white bg-[url('../public/images/bg.jpg')] bg-no-repeat bg-cover">
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
              <div className='flex flex-col items-start justify-center space-y-1 w-full mb-2'>
                <p className='text-white font-semibold text-l'>Display Name</p>
                <input
                  className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                  type="text"
                  name="name"
                  placeholder="@"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className='flex flex-col items-start justify-center space-y-1 w-full'>
                <p className='text-white font-semibold text-l'>Email</p>
                <input
                  className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='flex items-center justify-start mt-4 w-full space-x-2'>
                <input onChange={() => setTerms(!terms)} type="checkbox" className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200" />
                <p onClick={() => setIsDisplayTermsAndConditionsModal(!isDisplayTermsAndConditionsModal)} className='text-white font-semibold text-l cursor-pointer'>Terms and Conditions</p>
              </div>
              <div className='flex items-center justify-start mt-4 w-full space-x-2'>
                <input type="checkbox" className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200" />
                <p className='text-white font-semibold text-l'>Privacy Policy</p>
              </div>
              <button
                className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full"
                onClick={(e) => web3Login(e)}
              >
                {!isEmpty(userSignature) ? <span>🟢 Connected</span> : <span>Connect Wallet</span>}
              </button>
              <button
                className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full"
                onClick={(e) => handleRegisterUser(e)}
              >
                Sign Up
              </button>
            </form>
            <div className='w-full flex items-center justify-center md:hidden p-3 border-t border-gray-500'>
              <h2 className="text-white text-l lg:text-xl">Already Registered ? <Link href="/auth/signin" className='underline font-semibold'>Login</Link></h2>
            </div>

          </div>
        </div>
      </div>
      {/*  ****************Modal****************   */}
      <div className={`absolute flex items-start justify-center left-0 right-0 top-10 bottom-0 mx-auto w-96 h-[80vh] scrollbar-hide overflow-scroll bg-white rounded-lg ${isDisplayTermsAndConditionsModal ? '' : 'hidden'}`}>
        <div className="relative flex flex-col w-full max-w-md">
          <div className="flex flex-col rounded-lg h-full">
            <div className='sticky top-0 z-10 flex items-center justify-between w-full p-2 border-b backdrop-blur-md bg-white/30'>
              <div className='text-black flex text-center justify-center font-semibold'>
                Terms and Conditions
              </div>
              <button type="button" onClick={() => setIsDisplayTermsAndConditionsModal(!isDisplayTermsAndConditionsModal)} className="text-black bg-transparent hover:bg-gray-200 rounded-full text-sm p-1.5 ml-auto inline-flex items-center">
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <Terms />
          </div>
        </div>
      </div>
    </section>
  );
}
