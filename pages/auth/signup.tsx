import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ethers } from "ethers";
import { CheckIcon } from "@heroicons/react/24/outline";
import { registerUser } from "../../stores/authUser/AuthUserActions";
import { useAppDispatch } from "../../stores/hooks";
import { isEmpty } from "../../utils";
import { config as configUrl } from "../../constants";
import Terms from "../../components/Auth/Terms";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { nft_contract } from "../../config/contract";
import useIsMounted from "../../hooks/useIsMounted"
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSignMessage,
} from "wagmi";
import { write } from "fs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { indexOf } from "lodash";
//import { useEffect } from "hoist-non-react-statics/node_modules/@types/react";

const messageUrl = `${configUrl.url.API_URL}/user/generate/message`;

export default function SignUp() {
  const dispatch = useAppDispatch();
  const mounted= useIsMounted();
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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
      setUserMessage(data);
    },
  });

  const [userMessage, setUserMessage] = useState<object>(fetchingData);
  //const [userMessage, setUserMessage] = useState<string>('Sign this message to confirm you own this wallet a…ll not cost any gas fees. Nonce: XPM35n0APkJkeIqZ');
 

  // const [userAddress, setUserAddress] = useState<string>("");
  const [userSignature, setUserSignature] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);
  const [
    isDisplayTermsAndConditionsModal,
    setIsDisplayTermsAndConditionsModal,
  ] = useState<boolean>(false);

  const { address } = useAccount();

  const hussein=async(e:any) =>{

    e.preventDefault();
       await signMessage();
     
      
   
  }

  useEffect(()=>{
    if(!isEmpty(userSignature)){
    handleRegisterUser();
    }
  },[userSignature])
  

  const handleRegisterUser = async (e: any= null) => {
   console.log("userMessage",userMessage);

    if (
      !terms ||
      isEmpty(userMessage) ||
      isEmpty(address) ||
      isEmpty(userSignature)
    ) {
      console.log('sinup',userSignature)
      return;
    }
    await dispatch(
      registerUser({
        name: displayName,
        email: email,
        password: "zebbolaali",
        password_confirmation: "zebbolaali",
        address: address,
        signature: userSignature,
        // @ts-ignore
        message: userMessage?.message,
      })
    ).then((res) => {
      console.log('res',res)
      
      router.push({
        pathname: "/",
        query: {
          isRegistered: true,
        },
      });
      
    });
  
  };

  // const web3Login = async (e: any) => {
  //   e.preventDefault();
  //   // @ts-ignore
  //   if (!window.ethereum) {
  //     alert("MetaMask not detected. Please install MetaMask first.");
  //     return;
  //   }

  //   // @ts-ignore
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);

  //   let response: any = await fetch(messageUrl);

  //   const message = await response.json();
  //   setUserMessage(message);

  //   await provider.send("eth_requestAccounts", []);
  //   const address = await provider.getSigner().getAddress();
  //   setUserAddress(address);
  //   const signature = await provider.getSigner().signMessage(message.message);
  //   setUserSignature(signature);
  // };

  const {
    data: signData,
    isError: signError,
    isLoading: signLoading,
    isSuccess: signSuccess,
    signMessage,
  } = useSignMessage({
    message: JSON.stringify(userMessage),
    onSuccess(data, variables, context) {
      setUserSignature(data);
      //handleRegisterUser();
      return true;
     
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
    <section className="min-h-screen flex items-stretch overflow-hidden text-white bg-[url('../public/images/bg.jpg')] bg-no-repeat bg-cover">
      <div className="md:flex w-1/2 hidden min-h-screen relative items-center">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-start justify-center">
            <Image
              src="/images/logo/long-logo.png"
              alt="Blockd Logo"
              className="md:w-30 md:h-14"
              width={180}
              height={50}
            />
            <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-4xl">
              CREATE
            </h2>
            <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-4xl">
              NEW ACCOUNT
            </h2>
            <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">
              Already Registered ?{" "}
              <Link href="/auth/signin" className="underline">
                Login
              </Link>
            </h4>
            <br />
            <hr className="w-1/3"></hr>
            <h4 className="text-white mt-10 ml-2 pb-3 text-m md:text-m lg:text-l">
              Verified By Blockchain Technology
            </h4>
            <div className="flex mt-8 ">
              <button className="w-32 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full">
                Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full min-h-screen flex items-center justify-center text-center p-10 lg:px-20 lg:py-10 z-0">
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
              <h2 className="text-center font-bold text-white text-4xl lg:text-5xl pb-3">
                Sign Up
              </h2>
            </div>
            <form
              action=""
              className="flex flex-col items-center justify-center w-full h-full px-10 py-5 lg:px-20"
            >
              <div className="flex flex-col items-start justify-center space-y-1 w-full mb-2">
                <p className="text-white font-semibold text-l">Display Name</p>
                <input
                  className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                  type="text"
                  name="name"
                  placeholder="@"
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start justify-center space-y-1 w-full">
                <p className="text-white font-semibold text-l">Email</p>
                <input
                  className="p-2 rounded-xl text-white placeholder:text-white w-full bg-gray-300/30 outline-none border-none"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-start mt-4 w-full space-x-2">
                <input
                  onChange={() => setTerms(!terms)}
                  type="checkbox"
                  className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                />
                <p
                  onClick={() =>
                    setIsDisplayTermsAndConditionsModal(
                      !isDisplayTermsAndConditionsModal
                    )
                  }
                  className="text-white font-semibold text-l cursor-pointer"
                >
                  Terms and Conditions
                </p>
              </div>
              <div className="flex items-center justify-start mt-4 w-full space-x-2">
                <input
                  type="checkbox"
                  className="bg-red-100 border-red-300 text-red-500 focus:ring-red-200"
                />
                <p className="text-white font-semibold text-l">
                  Privacy Policy
                </p>
              </div>
              {/* <button
                className="w-full mt-4 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-3 px-4 rounded-full"
                onClick={(e) => web3Login(e)}
              >
                {!isEmpty(userSignature) ? <span>🟢 Connected</span> : <span>Connect Wallet</span>}
              </button> */}
              <div className="w-full mt-4 flex items-center justify-start">
                
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
                  onClick={(e) => hussein(e)}
                >
                  Sign Up
                </button>
              ) : (
                <>
                  <button
                    className={`w-full mt-4 text-white  font-semibold py-3 px-4 rounded-md ${
                      isMintLoading && "loading"
                    } ${error ? 'bg-orange-300' : 'cursor-pointer bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 hover:from-blockd hover:to-blockd'}`}
                    disabled={isMintError || isMintFetching}
                    onClick={() => writeAsync && writeAsync()}
                  >
                    Mint
                  </button>
                  {error && (
                    <div className="mt-4 w-full bg-red-500 rounded-md p-2">
                      An error occurred preparing the transaction:<br></br>
                      {error.message}
                    </div>
                  )}
                </>
              )}
            </form>
            <div className="w-full flex items-center justify-center md:hidden p-3 border-t border-gray-500">
              <h2 className="text-white text-l lg:text-xl">
                Already Registered ?{" "}
                <Link href="/auth/signin" className="underline font-semibold">
                  Login
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
      {/*  ****************Modal****************   */}
      <div
        className={`fixed top-0 left-0 p-4 flex items-stretch justify-center min-h-screen w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${
          isDisplayTermsAndConditionsModal ? "" : "hidden"
        }`}
      >
        <div className="relative flex flex-col w-full max-w-md bg-white rounded-lg overflow-scroll scrollbar-hide">
          <div className="relative flex flex-col rounded-lg h-full">
            <div className="sticky top-0 z-10 flex items-center justify-between w-full p-2 border-b backdrop-blur-md bg-white/30">
              <div className="text-black flex text-center justify-center font-semibold">
                Terms and Conditions
              </div>
              <button
                type="button"
                onClick={() =>
                  setIsDisplayTermsAndConditionsModal(
                    !isDisplayTermsAndConditionsModal
                  )
                }
                className="text-black bg-transparent hover:bg-gray-200 rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
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
