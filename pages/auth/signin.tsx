import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { loginUser } from "../../stores/authUser/AuthUserActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { isEmpty } from "../../utils";
import { config as configUrl } from "../../constants";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { nft_contract } from "../../config/contract";
import { useQuery } from "@tanstack/react-query";
import useIsMounted from "../../hooks/useIsMounted";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import CustomLoadingOverlay from "../../components/CustomLoadingOverlay";

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
  const { isLoggingIn,authError } = useAppSelector((state) => state.authUserReducer);
  const mounted = useIsMounted();
  const router = useRouter();

  //Data Fetching
  // const {
  //   isLoading: fetchingLoading,
  //   error: fetchingError,
  //   data: fetchingData,
  //   isFetching,
  // } = useQuery({
  //   queryKey: ["userMessageToSign"],
  //   queryFn: () => axios.get(messageUrl).then((res) => res.data),
  //   onSuccess(data) {
  //     setUserMessage(data?.message);
  //   },
  // });
  useEffect(() => {
    if (authError?.message && authError?.message !== "Unauthenticated") {
      toast.error(authError?.message);
    }
  }, [authError]);

  const [userMessage, setUserMessage] = useState<string>('');
  const [userMessageForBackend, setUserMessageForBackend] =
    useState<string>("");
  const [userSignature, setUserSignature] = useState<string>("");
  const { address } = useAccount();
  
  useEffect(() => {
    axios.get(messageUrl).then((res) => setUserMessage(res?.data?.message));
  }, [userMessageForBackend]);


  const handleLoginUser = async () => {
    if (
      isEmpty(userMessageForBackend) ||
      isEmpty(address) ||
      isEmpty(userSignature)
    ) {
      return;
    }

    const data = await dispatch(
      loginUser({
        address: address,
        signature: userSignature,
        message: userMessageForBackend,
      })
    ).then(async (res: any) => {
      if (res?.errors) {
        await new Promise((f) => setTimeout(f, 1000));
        toast.error(res?.errors);
        return;
      } else {
        localStorage.setItem("authUser", JSON.stringify(res));
        router.push("/");
      }
    });
  };

  const getSignMessage = async (e: any) => {
    e.preventDefault();
    signMessage();
  };

  useEffect(() => {
    if (!isEmpty(userSignature)) {
      handleLoginUser();
    }
  }, [userSignature]);

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
      setUserMessageForBackend(userMessage);
    },
    onError(error) {
      console.log("Error", error);
    },
    onMutate(args) {
      console.log("Mutate", args);
    },
  });



  const { data: nft_data } = useContractRead({
    ...nft_contract,
    functionName: "balanceOf",
    args: [address ?? ("" as `0x${string}`)],
    enabled: !!address,
  });

  

  

  if (!mounted) {
    return null;
  }
  return (
    <section className="min-h-screen flex items-stretch scrollbar-hide overflow-scroll text-white bg-[url('../public/images/bg.jpg')] bg-no-repeat bg-cover">
      <CustomLoadingOverlay active={isLoggingIn} />
      <div className="h-screen hidden md:flex items-center justify-center w-1/2 mx-auto">
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col items-start justify-center">
            <img
              src="/images/logo/long-logo.png"
              alt="Blockd Logo"
              className="w-80 lg:w-96"
            />
            <h2 className="font-bold text-white mt-10 ml-2 pb-3 md:text-2xl lg:text-3xl">
              JOIN THE{" "}
              <span className="md:text-3xl lg:text-4xl text-orange-500">
                #1
              </span>
            </h2>
            <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-3xl">
              <span className="md:text-3xl lg:text-4xl text-orange-500">
                BLOCKCHAIN
              </span>{" "}
              SOCIAL
            </h2>
            <h2 className="font-bold text-white mt-1 ml-2 pb-3 md:text-2xl lg:text-3xl">
              MEDIA PLATFORM
            </h2>
            <h4 className="text-white mt-1 ml-2 pb-3 text-l md:text-l lg:text-xl">
              Not Registered ?{" "}
              <Link href="/auth/signup" className="underline">
                REGISTER HERE
              </Link>
            </h4>
            <br />
            <hr className="w-1/3"></hr>
            <h4 className="text-white mt-6 ml-2 pb-3 text-m md:text-m lg:text-l">
              Verified By Blockchain Technology
            </h4>
            <div className="flex mt-4">
              <a
                href="/auth/infographic"
                target="_blank"
                className="flex items-center justify-center w-32 bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 text-white hover:from-blockd hover:to-blockd font-semibold py-2 px-4 rounded-md"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full flex items-center justify-center text-center z-0 px-10">
        <div className="relative flex flex-col items-center bg-color rounded-md w-fit">
          <div className="relative flex flex-col items-center justify-center w-full h-4/5">
            <form
              action=""
              className="flex flex-col items-center justify-center w-full h-full p-14 lg:p-24"
            >
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
                  {
                    <>
                      {address && (
                        <p className="text-red-600 mt-3 text-base font-bold">
                          Please create an account to proceed{" "}
                          <Link
                            href="/auth/signup"
                            className="underline font-semibold"
                          >
                            Register Now
                          </Link>
                        </p>
                      )}
                    </>
                  }
               
                </>
              )}
            </form>
            <div className="w-full flex items-center justify-center md:hidden p-3 border-t border-gray-500">
              <h2 className="text-white text-l lg:text-xl">
                You don't have an account ?{" "}
                <Link href="/auth/signup" className="underline font-semibold">
                  Register
                </Link>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
