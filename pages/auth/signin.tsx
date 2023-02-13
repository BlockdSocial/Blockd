import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { loginUser } from '../../stores/authUser/AuthUserActions';
import { useAppDispatch } from '../../stores/hooks';
import { ethers } from "ethers";
import { isEmpty } from "../../utils";
import { config as configUrl } from '../../constants';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { nft_contract } from "../../config/contract";
import { useQuery } from "@tanstack/react-query";
import useIsMounted from "../../hooks/useIsMounted"
import axios from "axios";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSignMessage,
} from "wagmi";

const messageUrl = `${configUrl.url.API_URL}/user/generate/message`;
export default function SignIn() {

  const dispatch = useAppDispatch();
  const mounted= useIsMounted();
  const router = useRouter();
  
  //Data Fetching
const {
  isLoading: fetchingLoading,
  error: fetchingError,
  data: fetchingData,
  isFetching,
} = useQuery({
  queryKey: ["userMessageToSign"],
  queryFn: () => axios.get(messageUrl).then((res) => res.data),
  onSuccess(data) {
    setUserMessage(data?.message);
  },
});
  const [userMessage, setUserMessage] = useState<string>(fetchingData);
  const [userMessageForBackend, setUserMessageForBackend] = useState<string>("");
  const [userSignature, setUserSignature] = useState<string>("");
  const { address } = useAccount();

  const handleLoginUser = async () => {
    if (
      isEmpty(userMessageForBackend) ||
      isEmpty(address) ||
      isEmpty(userSignature)
    ) {
      
      return;
    }

    const data = await dispatch(loginUser({
      address: address,
      signature: userSignature,
      message: userMessageForBackend
    })).then(() => {
      router.push('/');
    });
  }
  

  const getSignMessage=async(e:any) =>{
    console.log("getSignMessage");
    e.preventDefault();
    signMessage();
  }

  useEffect(()=>{
    if(!isEmpty(userSignature)){
    handleLoginUser();
    }
  },[userSignature])

  const {
    data: signData,
    isError: signError,
    isLoading: signLoading,
    isSuccess: signSuccess,
    signMessage,
  } = useSignMessage({
    message: userMessage,
    onSuccess(data, variables, context) {
      setUserSignature(data);
      setUserMessageForBackend(userMessage)
    },
    onError(error) {
      console.log('Error', error)
    },
    onMutate(args) {
      console.log('Mutate', args)  
    },

  });

  const { data } = useContractRead({
    ...nft_contract,
    functionName: "mintPrice",
  });

  const { data: nft_data } = useContractRead({
    ...nft_contract,
    functionName: "balanceOf",
    args: [address ?? ("" as `0x${string}`)],
    enabled: !!address,
  });

  const {
    config,
    isError: isMintError,
    isFetching: isMintFetching,
    error,
  } = usePrepareContractWrite({
    ...nft_contract,
    functionName: "mint",
    args: ["Nft mint"],
    overrides: {
      value: data,
    },
    enabled: !!data && !!address,
  });

  const { writeAsync, isLoading: isMintLoading } = useContractWrite({
    ...config,
  });

  if(!mounted) {
    return null;
  }
  return (
    <section className="min-h-screen flex items-stretch scrollbar-hide overflow-scroll text-white bg-[url('../public/images/bg.jpg')] bg-no-repeat bg-cover">
      <div className="h-screen hidden md:flex items-center justify-center w-1/2 mx-auto">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-start justify-center">
            <Image
              src="/images/logo/long-logo.png"
              alt="Blockd Logo"
              className="md:w-30 md:h-14"
              width={180}
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
      <div className="md:w-1/2 w-full flex items-center justify-center text-center px-10 md:p-0 lg:p-10 xl:p-20 z-0">
        <div className="relative flex flex-col items-center bg-color rounded-md w-full md:w-3/4 md:py-10">
          <div className="relative flex flex-col items-center justify-center w-full h-4/5">
            <form action="" className="flex flex-col items-center justify-center w-full h-full p-16 py-16 lg:px-20">
            <div className="w-full mt-4 flex items-center justify-center">
                
                <ConnectButton
                  showBalance={{
                    smallScreen: false,
                    largeScreen: true,
                  }}
                ></ConnectButton>
              
              </div>
              
              {nft_data && Number(nft_data) > 0 ? (
                <button
                  className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-md"
                  onClick={(e) => getSignMessage(e)}
                >
                  login
                </button>
              ) : (
                <>
                 {/* <button
                    className={`w-full mt-4 text-white  font-semibold py-3 px-4 rounded-md ${
                      isMintLoading && "loading"
                    } ${error ? 'bg-orange-300' : 'cursor-pointer bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 hover:from-blockd hover:to-blockd'}`}
                    disabled={isMintError || isMintFetching}
                    onClick={() => writeAsync && writeAsync()}
                  >
                    Mint
                  </button> */}
                  {error && (
                    <div className="mt-4 w-full bg-red-500 rounded-md p-2">
                      An error occurred preparing the transaction:<br></br>
                      {error.message}
                    </div>
                  )}
                </>
              )}
            </form>
            <div className='w-full flex items-center justify-center md:hidden p-3 border-t border-gray-500'>
              <h2 className="text-white text-l lg:text-xl">You don't have an account ? <Link href="/auth/signup" className='underline font-semibold'>Register</Link></h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}