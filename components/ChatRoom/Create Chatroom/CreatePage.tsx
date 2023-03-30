import React, { useState, useRef,useEffect } from "react";
import { toast } from "react-hot-toast";
import { createChatroom } from "../../../stores/chat/ChatActions";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { LinkIcon, XMarkIcon, CheckCircleIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { isEmpty } from "lodash";
import { config } from "../../../constants";
import { useRouter } from "next/router";
import { KeyboardReturnOutlined } from "@mui/icons-material";

function CreatePage() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [count, setCount] = useState<string>("");
  const [contractAddress, setContractAddress] = useState<string>("");
  const [network, setNetwork] = useState<number>(1);
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenNumber, setTokenNumber] = useState<string>("");
  let [image, setImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [uploadedVideo, setUploadedVideo] = useState<string>("");
  const [tokenError, setTokenError] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { error } = useAppSelector((state) => state.chatReducer);
  const router = useRouter();

  // ALCHEMY URL --> Replace with your API Key at the end
  const url = `https://eth-mainnet.g.alchemy.com/v2/${config.url.ALCHEMY_API_KEY}`;

  const validateAddressToken = async () => {
    
    if (!isEmpty(contractAddress)) {
      let WETHContractAddress = contractAddress;

      // REQUEST OPTIONS
      const options = {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({
          id: 1,
          jsonrpc: "2.0",
          method: "alchemy_getTokenMetadata",
          params: [WETHContractAddress],
        }),
      };

      // MAKE THE REQUEST AND PRINT THE RESPONSE
      fetch(url, options)
        .then((res) => res.json())
        .then((json) => { console.log(json), setTokenName(json.result.name), setTokenError(false) })
        .catch((err) => { console.error("error:" + err), setTokenError(true) });
    }
  }

  // handle selection change
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  }

  // const handleCountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCount(Number(event.target.value));
  // }

  const handleNetworkChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNetwork(Number(event.target.value));
  }

  useEffect(() => {
    if (!isEmpty(error)) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleCreateRoom = async () => {
    if(isEmpty(name)) {
      setErrorMessage ('Name field is required')
      return;
    }
    if(name.length <= 4) {
      setErrorMessage ('The name must be at least 4 characters')
      console.log(name.length);
      return;
    }
    if(isEmpty(description)) {
      setErrorMessage ('Description field is required')
      return;
    }
    
    if (selectedOption === 'private') {
    if (isEmpty(tokenName)) {
      setErrorMessage ('Token  name field is required')
      return;
    }
    
    if (isEmpty(tokenNumber)) {
      setErrorMessage ('Token  amount field is required')
      return;
    }
    if (isEmpty(contractAddress)) {
      setErrorMessage ('Contract address field is required')
      return;
    }
  }
    if (image) {
      if (selectedOption === 'private') {
        await dispatch(createChatroom({
          display_name: name,
          description: description,
          moderator_id: authUser?.id,
          private: 1,
          image: uploadedImage,
          token_address: contractAddress,
          chainId: network,
          token_name: tokenName,
          amount: Number(tokenNumber)
        })).then((res: any) => {
          if (!res) {
        return;
          }
          router.push({
            pathname: '/dashboard/myChatrooms',
            query: { roomChat: JSON.stringify(res) },
          },
            undefined, { shallow: true }
          )
        });
      } else {
        await dispatch(createChatroom({
          display_name: name,
          description: description,
          moderator_id: authUser?.id,
          private: 0,
          image: uploadedImage,
        })).then((res: any) => {
          if (!res) {
            return;
              }
          router.push({
            pathname: '/dashboard/myChatrooms',
            query: { roomChat: JSON.stringify(res) },
          },
            undefined, { shallow: true }
          )
        });
      }
    } else {
      if (selectedOption === 'private') {
        await dispatch(createChatroom({
          display_name: name,
          description: description,
          moderator_id: authUser?.id,
          private: 1,
          token_address: contractAddress,
          chainId: network,
          token_name: tokenName,
          amount: Number(tokenNumber)
        })).then((res: any) => {
          if (!res) {
            return;
              }
          router.push({
            pathname: '/dashboard/myChatrooms',
            query: { roomChat: JSON.stringify(res) },
          },
            undefined, { shallow: true }
          )
        });
      } else {
        await dispatch(createChatroom({
          display_name: name,
          description: description,
          moderator_id: authUser?.id,
          private: 0,
        })).then((res: any) => {
          if (!res) {
            return;
              }
          router.push({
            pathname: '/dashboard/myChatrooms',
            query: { roomChat: JSON.stringify(res) },
          },
            undefined, { shallow: true }
          )
        });
      }
    }
 
  }
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
                    onChange={(e) => { setContractAddress(e.target.value), setTokenError(null) }}
                    value={contractAddress}
                    onBlur={validateAddressToken}
                    required
                  />
                  {
                    false == tokenError &&
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
                  }
                  {
                    true == tokenError &&
                    <>
                      <span>
                        <a
                          href="#"
                          className="transititext-primary text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                          data-te-toggle="tooltip"
                          title="Please double check your token address"
                        >
                          <ExclamationCircleIcon type="button" data-tooltip-target="tooltip-default" className="w-6 h-6 absolute right-3 top-7 text-orange-400" />
                        </a>
                      </span>
                    </>
                  }
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
                    <option value={3} className="outline-none p-2">
                      Ropsten Test Network
                    </option>
                    <option value={5} className="outline-none p-2">
                      Goerli Test Network
                    </option>
                    <option value={42} className="outline-none p-2">
                      Kovan Test Network
                    </option>
                    <option value={56} className="outline-none p-2">
                      Binance Smart Chain
                    </option>
                    <option value={137} className="outline-none p-2">
                      Polygon Mainnet
                    </option>
                    <option value={1337} className="outline-none p-2">
                      Ganache
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
                    onChange={(e) => setTokenNumber(e.target.value)}
                    value={tokenNumber}
                    required
                  />
                </div>
              </>
            )}
            {
              authUser?.level < 2 ?
                <>
                  <div className="mt-4 w-full bg-red-500 rounded-md p-2">
                    You must be level 2 or higher to create a chat room.
                  </div>
                  <div className="flex items-center justify-center w-full mt-4">
                    <button
                      className="text-sm font-semibold p-3 w-full text-white rounded-lg bg-blockd bg-gray-500"
                      onClick={() => handleCreateRoom()}
                      disabled={true}
                    >
                      Create
                    </button>
                  </div>
                </>
                :
                <>
                {errorMessage && (
                  <div className="mt-4 w-full bg-red-500 rounded-md p-2">
                    {errorMessage}
                  </div>
                )}
                <div className="flex items-center justify-center w-full mt-4">
                  
                  <button
                    className="text-sm font-semibold p-3 w-full text-white rounded-lg bg-blockd hover:bg-orange-400"
                    onClick={() => handleCreateRoom()}
                  >
                    Create
                  </button>
                </div>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
