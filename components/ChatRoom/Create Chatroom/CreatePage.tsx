import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { createChatroom } from "../../../stores/chat/ChatActions";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { chatApi } from "../../../api";
import {
  LinkIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { isEmpty } from "lodash";
import { config } from "../../../constants";
import { useRouter } from "next/router";
import { KeyboardReturnOutlined, MinimizeTwoTone } from "@mui/icons-material";
import { renderComment } from "../../../utils";
import { chateRoom_contract } from "../../../config/contract";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useSignMessage,
} from "wagmi";

function CreatePage() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [count, setCount] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [network, setNetwork] = useState<number>(1);
  const [type, setType] = useState<string>('ERC20');

  const [tokenName, setTokenName] = useState<string>("");
  const [tokenNumber, setTokenNumber] = useState<number>(0);
  let [image, setImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [uploadedVideo, setUploadedVideo] = useState<string>("");
  const [tokenError, setTokenError] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [connectAddressError, setConnectAddressError] = useState<string>("");

  const errorReduser = useAppSelector((state) => state.chatReducer?.error);
  const router = useRouter();

  const { address } = useAccount();

  // ALCHEMY URL --> Replace with your API Key at the end
  // const url = `https://eth-mainnet.g.alchemy.com/v2/${config.url.ALCHEMY_API_KEY}`;

  // const validateAddressToken = async () => {

  //   if (!isEmpty(contractAddress)) {
  //     let WETHContractAddress = contractAddress;

  //     // REQUEST OPTIONS
  //     const options = {
  //       method: "POST",
  //       headers: { accept: "application/json", "content-type": "application/json" },
  //       body: JSON.stringify({
  //         id: 1,
  //         jsonrpc: "2.0",
  //         method: "alchemy_getTokenMetadata",
  //         params: [WETHContractAddress],
  //       }),
  //     };

  //     // MAKE THE REQUEST AND PRINT THE RESPONSE
  //     fetch(url, options)
  //       .then((res) => res.json())
  //       .then((json) => { console.log(json), setTokenName(json.result.name), setTokenError(false) })
  //       .catch((err) => { console.error("error:" + err), setTokenError(true) });
  //   }
  // }

  // handle selection change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // const handleCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCount(Number(event.target.value));
  // }

  const checkUserBalance = async () => {
    let fields = {
      token_address: contractAddress,
      chainId: network,
      type: type,
      token_name: tokenName,
      amount: Number(tokenNumber),
    };
    try {
      let result = await chatApi.checkUserBalance(fields);
      console.log("checkUserBalance", result);
      return "true";
    } catch (error: any) {
      console.log("checkUserBalance error: ", error.message);
      return error.message;
    }
  };
console.log(tokenNumber);
  useEffect(() => {
    let authUserAddress: `0x${string}` = authUser?.address;
    if (authUserAddress && address) {
      if (authUserAddress !== address) {
        console.log('hussein',authUserAddress,address )
        setConnectAddressError(
          "Can't Use this address please use the same address that you previously created"
        );
      } else {
        setConnectAddressError("");
      }
    }
  }, [address, authUser]);

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(Number(event.target.value));
  };
  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value);
  };

  useEffect(() => {
    if (!isEmpty(errorReduser)) {
      setErrorMessage(errorReduser);
    }
  }, [errorReduser]);

  const validateChatRoom = async () => {
    if (isEmpty(address)) {
      setErrorMessage("Please connect to you address");
      return false;
    }
    if (isEmpty(name)) {
      setErrorMessage("Name field is required");
      return false;
    }
    if (name.length < 4) {
      setErrorMessage("The name must be at least 4 characters");
      console.log(name.length);
      return false;
    }
    if (isEmpty(description)) {
      setErrorMessage("Description field is required");
      return false;
    }
    if (description.length < 4) {
      setErrorMessage("The description must be at least 4 characters");
      console.log(name.length);
      return false;
    }

    if (selectedOption === "private") {
      if (isEmpty(tokenName)) {
        setErrorMessage("Token  name field is required");
        return false;
      }

      if (tokenNumber <= 0) {
        setErrorMessage("Token amount field must be grater than 0");
        return false;
      }
      if (isEmpty(contractAddress)) {
        setErrorMessage("Contract address field is required");
        return false;
      }
      let checkBalance = await checkUserBalance();
      if (checkBalance !== "true") {
        setErrorMessage(checkBalance);
        return false;
      }

    }
    console.log('kosas')
    setErrorMessage("");
    return true;
  };

  const handleCreateRoom = async () => {
    if (image) {
      if (selectedOption === "private") {
        await dispatch(
          createChatroom({
            display_name: name,
            description: description,
            moderator_id: authUser?.id,
            private: 1,
            image: uploadedImage,
            token_address: contractAddress,
            chainId: network,
            type: type,
            token_name: tokenName,
            amount: Number(tokenNumber),
          })
        ).then((res: any) => {
          if (!res) {
            return;
          }
          router.push(
            {
              pathname: "/dashboard/myChatrooms",
              query: { roomChat: JSON.stringify(res) },
            },
            undefined,
            { shallow: true }
          );
        });
      } else {
        await dispatch(
          createChatroom({
            display_name: name,
            description: description,
            moderator_id: authUser?.id,
            private: 0,
            image: uploadedImage,
          })
        ).then((res: any) => {
          if (!res) {
            return;
          }
          router.push(
            {
              pathname: "/dashboard/myChatrooms",
              query: { roomChat: JSON.stringify(res) },
            },
            undefined,
            { shallow: true }
          );
        });
      }
    } else {
      if (selectedOption === "private") {
        await dispatch(
          createChatroom({
            display_name: name,
            description: description,
            moderator_id: authUser?.id,
            private: 1,
            token_address: contractAddress,
            chainId: network,
            type: type,
            token_name: tokenName,
            amount: Number(tokenNumber),
          })
        ).then((res: any) => {
          if (!res) {
            return;
          }
          router.push(
            {
              pathname: "/dashboard/myChatrooms",
              query: { roomChat: JSON.stringify(res) },
            },
            undefined,
            { shallow: true }
          );
        });
      } else {
        await dispatch(
          createChatroom({
            display_name: name,
            description: description,
            moderator_id: authUser?.id,
            private: 0,
          })
        ).then((res: any) => {
          if (!res) {
            return;
          }
          router.push(
            {
              pathname: "/dashboard/myChatrooms",
              query: { roomChat: JSON.stringify(res) },
            },
            undefined,
            { shallow: true }
          );
        });
      }
    }
  };
  const inputPicture = useRef<HTMLInputElement | null>(null);

  const onUploadPictureClick = () => {
    // `current` points to the mounted file input element
    if (inputPicture.current) {
      inputPicture.current.click();
    }
  };

  const handleUploadPicture = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setUploadedImage(e.target.files[0]);
  };

  const closePicture = () => {
    image = "";
    setImage(image);
    setUploadedImage("");
    setUploadedVideo("");
  };

  const { data } = useContractRead({
    ...chateRoom_contract,
    functionName: "mintPrice",
  });

  const {
    config,
    isError: isMintError,
    isFetching: isMintFetching,
    error,
  } = usePrepareContractWrite({
    ...chateRoom_contract,
    functionName: "mint",
    overrides: {
      value: data,
    },
    enabled: !!data && !!address,
    onSuccess(data: any) {
      console.log("call useEffect", data);
    },
  });
  console.log("data", data);

  const { writeAsync, isLoading: isMintLoading } = useContractWrite({
    ...config,
    onSuccess(data: any) {
      handleCreateRoom();
      console.log("onSuccess");
    },
  });

  const mint = async () => {
    if (await validateChatRoom()) {
      writeAsync && writeAsync();
    }
  };
  

  return (
    <div className="min-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14">
      <div className="p-4">
        <div className="flex flex-col items-center justify-center space-y-3 border-2 border-orange-200 dark:border-lightgray rounded-xl w-full p-4 bg-white dark:bg-darkgray">
          <p className="text-xl font-semibold text-center">Create a Chatroom</p>
          <div className="flex flex-col p-3 items-start w-full space-y-3">
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Name</h3>
              <input
                type="text"
                className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                placeholder="Chatroom Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Description</h3>
              <input
                type="text"
                className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                placeholder="Enter a small description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Chatroom Picture</h3>
              <div
                onClick={() => onUploadPictureClick()}
                className="flex space-x-2 text-sm p-2 w-full rounded-lg outline-none text-black dark:text-white bg-gray-200 dark:bg-lightgray cursor-pointer"
              >
                <LinkIcon className="w-5 h-5" />
                <p>Attach Image</p>
              </div>
            </div>
            {image && (
              <div className="relative w-full">
                <img
                  className="max-w-full max-h-[300px] h-auto object-contain rounded-md"
                  src={image}
                  alt=""
                />
                <div
                  onClick={() => closePicture()}
                  className="flex items-center justify-center absolute top-2 left-2 w-7 h-7 rounded-full p-1 cursor-pointer bg-white dark:bg-lightgray hover:bg-gray-200 dark:hover:bg-darkgray"
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
              </div>
            )}
            <input
              type="file"
              id="file"
              ref={inputPicture}
              className="hidden"
              accept="image/*"
              onChange={handleUploadPicture}
            />
            {/* <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Users count</h3>
              <select
                value={count}
                onChange={handleCountChange}
                className="w-full rounded-lg border-none outline-none p-2 text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                required
              >
                <option value="1 - 100" className="outline-none p-2">
                  1 - 100
                </option>
                <option value="100 - 1K" className="outline-none p-2">
                  100 - 1K
                </option>
                <option value="1K - 5K" className="outline-none p-2">
                  1K - 5K
                </option>
                <option value="5K - 10K" className="outline-none p-2">
                  5K - 10K
                </option>
              </select>
            </div> */}
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Type</h3>
              <div className="w-full">
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="w-full rounded-lg border-none outline-none p-2 text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                  required
                >
                  <option value="public" className="outline-none p-2">
                    Public Chatroom
                  </option>
                  <option value="private" className="outline-none p-2">
                    Private Chatroom
                  </option>
                </select>
              </div>
            </div>
            {selectedOption === "private" && (
              <>
                <div className="w-full relative">
                  <h3 className="text-sm font-semibold pb-1">
                    Contract Address
                  </h3>
                  <input
                    type="text"
                    className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                    placeholder="CA of the required token"
                    onChange={(e) => {
                      setContractAddress(e.target.value), setTokenError(null);
                    }}
                    value={contractAddress}
                    // onBlur={validateAddressToken}
                    required
                  />
                  {false == tokenError && (
                    // <CheckCircleIcon className="pointer-events-none w-6 h-6 absolute right-3 top-7 text-green-600" />
                    <>
                      <span>
                        <a
                          href="#"
                          className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                          data-te-toggle="tooltip"
                          title={`Verified, the token name is ${tokenName}`}
                        >
                          <CheckCircleIcon className="w-6 h-6 absolute right-3 top-7 text-green-600" />
                        </a>
                      </span>
                    </>
                  )}
                  {true == tokenError && (
                    <>
                      <span>
                        <a
                          href="#"
                          className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                          data-te-toggle="tooltip"
                          title="Please double check your token address"
                        >
                          <ExclamationCircleIcon
                            type="button"
                            data-tooltip-target="tooltip-default"
                            className="w-6 h-6 absolute right-3 top-7 text-orange-400"
                          />
                        </a>
                      </span>
                    </>
                  )}
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-semibold pb-1">Token/NFT</h3>
                  <select
                    value={type}
                    onChange={handleTypeChange}
                    className="w-full rounded-lg border-none outline-none p-2 text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                    required
                  >
                    <option value={'ERC20'} className="outline-none p-2">
                    ERC20
                    </option>
                    <option value={'NFT'} className="outline-none p-2">
                    NFT
                    </option>
                    
                  </select>
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-semibold pb-1">Network</h3>
                  <select
                    value={network}
                    onChange={handleNetworkChange}
                    className="w-full rounded-lg border-none outline-none p-2 text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                    required
                  >
                    <option value={1} className="outline-none p-2">
                      Ethereum Main Network
                    </option>
                    <option value={56} className="outline-none p-2">
                      Binance Smart Chain
                    </option>
                    <option value={137} className="outline-none p-2">
                      Polygon Mainnet
                    </option>
                    <option value={250} className="outline-none p-2">
                      Fantom
                    </option>
                    <option value={43114} className="outline-none p-2">
                      Avalanche Network
                    </option>
                  </select>
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-semibold pb-1">Token Name</h3>
                  <input
                    type="text"
                    className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                    placeholder="Enter token name"
                    onChange={(e) => setTokenName(e.target.value)}
                    value={tokenName}
                    required
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-semibold pb-1">Token Amount</h3>
                  <input
                    type="number"
                    className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                    placeholder="Enter token amount needed to join"
                    onChange={(e) => setTokenNumber(e.target.valueAsNumber)}
                    value={tokenNumber}
                    required
                  />
                </div>
              </>
            )}
            {authUser?.level < 2 ? (
              <>
                <div className="mt-4 w-full bg-red-500 rounded-md p-2">
                  You must be level 2 or higher to create a chat room.
                </div>
                <div className="flex items-center justify-center w-full mt-4">
                  <button
                    className="text-sm font-semibold p-3 w-full text-white rounded-lg bg-blockd"
                    onClick={() => handleCreateRoom()}
                    disabled={true}
                  >
                    Create
                  </button>
                </div>
              </>
            ) : (
              <>
                {errorMessage != "" && (
                  <div className="mt-4 w-full bg-red-500 rounded-md p-2">
                    {errorMessage}
                  </div>
                )}
                {connectAddressError && (
                  <div className="mt-4 w-full bg-red-500 rounded-md p-2">
                    {connectAddressError}
                  </div>
                )}
                <div className="flex items-center justify-center w-full mt-4">
                  <div className="w-full">
                    <div className="w-full mt-4 flex items-center justify-center">
                      <ConnectButton
                        showBalance={{
                          smallScreen: false,
                          largeScreen: true,
                        }}
                      ></ConnectButton>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <button
                        className={`w-full mt-4 text-white   font-semibold py-3 px-4 rounded-md  ${
                          isMintLoading && "loading"
                        } ${
                          error || isMintError || isMintFetching || connectAddressError
                            ? "bg-orange-300"
                            : "cursor-pointer bg-gradient-to-r  from-orange-700 via-orange-500 to-orange-300 hover:from-blockd hover:to-blockd"
                        }`}
                        disabled={
                          isMintError || isMintFetching || connectAddressError || error
                            ? true
                            : false
                        }
                        onClick={() => mint()}
                      >
                        Mint
                      </button>
                     
                    </div>
                    {error && (
                    <div className="mt-4 w-full text-center max-h-20 bg-red-500 rounded-md p-2 break-normal overflow-scroll scrollbar-hide">
                      An error occurred preparing the transaction:<br></br>
                      {/* @ts-ignore */}
                      {error?.reason ? error?.reason : error?.message}
                    </div>
                  )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
