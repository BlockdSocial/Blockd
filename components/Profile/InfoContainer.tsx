import React, { useState, useEffect, useRef } from "react";
import {
  CheckBadgeIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { CameraIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";
import { fetchAuthUser } from "../../stores/authUser/AuthUserActions";
import {
  updateProfilcePicture,
  updateProfileBanner,
  updateUser,
} from "../../stores/user/UserActions";
import { fetchPostImage } from "../../stores/post/PostActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { isEmpty } from "lodash";
import { config } from "../../constants";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
  score: number;
}

interface Props {
  user: User;
  refetchUser: () => void;
  userId: string;
}

function InfoContainer({ user, refetchUser, userId }: Props) {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDisplayModal, setIsDisplayModal] = useState<boolean>(false);
  const [color, setColor] = useState<string>("bg-blue-300");
  const [userName, setUserName] = useState<string>();
  const [userEmail, setUserEmail] = useState<string>();
  const [profilePicture, setProfilePicture] = useState<string>();
  const [bannerPicture, setBannerPicture] = useState<string>();

  //Hide dropdown when clicking outside it

  const dropdown = useRef<any>(null);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!isDropdownVisible) return;
    function handleClick(event: any) {
      if (isDropdownVisible === true) {
        if (dropdown.current && !dropdown.current.contains(event.target)) {
          setIsDropdownVisible(false);
        }
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [isDropdownVisible]);

  useEffect(() => {
    if (!isEmpty(user)) {
      setUserName(user?.name);
      setUserEmail(user?.email);
      fetchProfilePicture(user?.profilePicId);
      fetchBannerPicture(user?.bannerPicId);
    }
  }, [user]);

  const fetchProfilePicture = async (id: number) => {
    if (id != undefined || id != null) {
      await dispatch(fetchPostImage(id)).then((result: any) => {
        setProfilePicture(result[0]?.name);
      });
    }
  };

  const fetchBannerPicture = async (id: number) => {
    if (id != undefined || id != null) {
      await dispatch(fetchPostImage(id)).then((result: any) => {
        setBannerPicture(result[0]?.name);
      });
    }
  };

  //Set a color for the frame

  const changeFrameColor = (color: any) => {
    setColor(color);
  };

  let [frameColor, setFrameColor] = useState<string>("");
  useEffect(() => {
    frameColor = color;
    setFrameColor(frameColor);
  }, [color]);

  //Click on the Camera Icon to change Banner

  const inputFileBanner = useRef<HTMLInputElement | null>(null);

  const onBannerClick = () => {
    // `current` points to the mounted file input element
    if (inputFileBanner.current) {
      inputFileBanner.current.click();
    }
  };

  //Click on the Camera Icon to change Banner

  const inputFilePfp = useRef<HTMLInputElement | null>(null);

  const onPfpClick = () => {
    // `current` points to the mounted file input element
    if (inputFilePfp.current) {
      inputFilePfp.current.click();
    }
  };

  const handleUpdateUser = async (e: any) => {
    e.preventDefault();
    await dispatch(
      updateUser({
        name: userName,
        email: userEmail,
      })
    ).then(() => {
      setIsModalVisible(false);
      setIsDisplayModal(false);
      refetchUser();
    });
  };

  const handleUploadProfilePicture = async (file: object) => {
    await dispatch(
      updateProfilcePicture({
        user_id: user?.id,
        image: file,
        content: `${user?.name} changed their profile picture.`,
      })
    ).then(() => {
      refetchUser();
    });
  };

  const handleUploadProfileBanner = async (file: object) => {
    await dispatch(
      updateProfileBanner({
        user_id: user?.id,
        image: file,
        content: `${user?.name} changed their banner.`,
      })
    ).then(() => {
      refetchUser();
    });
  };

  return (
    <div className="flex flex-col items-start justify-center relative  bg-cover mt-5 mx-auto">
      <div className="relative flex items-center justify-center w-full bg-white dark:bg-lightgray group">
        <img
          src={
            !isEmpty(bannerPicture)
              ? `${config.url.PUBLIC_URL}/${bannerPicture}`
              : "/images/blockdbg.jpg"
          }
          alt="Banner"
          className={`w-full object-contain max-h-96 ${
            user?.id === authUser?.id && "group-hover:opacity-50"
          }`}
          width="720"
          height="350"
        />
        {user?.id === authUser?.id && (
          <div
            onClick={() => onBannerClick()}
            className="group-hover:flex items-center justify-center absolute top-50 left-50 hidden cursor-pointer w-10 h-10 p-2 bg-white rounded-full"
          >
            <CameraIcon className="w-8 h-8 text-black" />
          </div>
        )}
        <input
          type="file"
          id="file"
          ref={inputFileBanner}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleUploadProfileBanner(e.target.files![0])}
        />
      </div>
      <div className="flex items-start justify-between p-3 w-full bg-white dark:bg-darkgray border-b dark:border-lightgray">
        <div className="flex items-center justify-start">
          <circle className="flex items-center justify-start p-3">
            <div className="z-0">
              <div
                className={`relative w-20 h-20 md:h-24 md:w-24 border-2 border-white rounded-md p-1 ${frameColor}`}
              >
                <img
                  src={
                    !isEmpty(profilePicture)
                      ? `${config.url.PUBLIC_URL}/${profilePicture}`
                      : "/images/pfp/pfp1.jpg"
                  }
                  alt="pfp"
                  className="w-fill h-full rounded-md shadow-sm border-2 border-white"
                />
                <div
                  className={`absolute -bottom-3 -left-4 flex p-1 w-9 h-9 border-2 border-white ${frameColor} rounded-lg`}
                >
                  <div className="flex items-center justify-center border-2 border-white text-black font-semibold rounded-md w-full h-full text-sm bg-white">
                    0
                  </div>
                </div>
                {user?.id === authUser?.id && (
                  <div
                    onClick={() => onPfpClick()}
                    className="flex items-center justify-center absolute -bottom-3 -right-4 cursor-pointer w-8 h-8 md:w-10 md:h-10 p-[5px] bg-gray-900 hover:bg-gray-700 dark:bg-white dark:hover:bg-gray-300 border-4 border-white dark:border-darkgray rounded-full"
                  >
                    <CameraIcon className="w-6 h-6 md:w-8 md:h-8 text-white dark:text-darkgray" />
                  </div>
                )}
                <input
                  type="file"
                  id="file"
                  ref={inputFilePfp}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) =>
                    handleUploadProfilePicture(e.target.files![0])
                  }
                />
              </div>
            </div>
          </circle>
          <div className="flex flex-col items-start justify-end rounded-md p-3">
            <div className="flex items-center space-x-1">
              <p className="mr-1 text-xs md:text-sm lg:text-xl group-hover:underline">
                @{user?.name}
              </p>
            </div>
            <div>
              <p className="mr-1 text-xs md:text-sm group-hover:underline mt-2">
                10K followers
              </p>
            </div>
            <div className="flex items-center justify-start w-32 md:w-48 h-5 rounded bg-gray-200 mb-2 relative group">
              <div className="flex items-center justify-center bg-gradient-to-r from-orange-700 via-orange-500 to-orange-300 p-1 h-5 rounded w-3/4">
                <span className="text-xs font-semibold cursor-pointer text-white inline">
                  {authUser?.score} XP
                </span>
              </div>
              {/* <div className="flex items-center justify-center w-1/4">
                <span className='text-xs font-semibold cursor-pointer text-black'>60 XP</span>
              </div> */}
            </div>
            {/* <div className='text-sm'>
              <span className='font-semibold'>Level 5 :</span> 75%
            </div> */}
          </div>
        </div>
        <div ref={dropdown} className="flex">
          {user?.id === authUser?.id ? (
            <div className="w-fit h-fit p-4 flex items-center justify-center rounded-md bg-white dark:bg-darkgray">
              <Cog8ToothIcon
                onClick={() => setIsDropdownVisible((b) => !b)}
                className="h-6 w-6 text-black dark:fill-white cursor-pointer transition-transform duration-500 ease-out hover:rotate-180 active-scale"
              />
            </div>
          ) : (
            <div className="w-fit h-fit p-2 flex items-center justify-center rounded-md bg-white dark:bg-darkgray">
              <p className="text-xs lg:text-base p-2 cursor-pointer rounded-md bg-gray-100 dark:bg-lightgray hover:bg-gray-200 dark:hover:bg-darkgray">follow</p>
            </div>
          )}
          <ul
            className={`absolute right-3 cursor-pointer bg-white dark:bg-darkgray rounded-lg shadow-lg ${
              isDropdownVisible ? "" : "hidden"
            }`}
          >
            <Link
              type="button"
              onClick={() => setIsModalVisible(!isModalVisible)}
              href=""
              className="flex items-center justify-start p-3 hover:bg-gray-200 hover:rounded-t-md dark:hover:bg-lightgray/50"
            >
              <PencilSquareIcon className="w-5 h-5 mr-2" />
              Edit Profile
            </Link>
            <Link
              type="button"
              href=""
              className="flex items-center justify-start p-3 hover:bg-gray-200 hover:rounded-b-md dark:hover:bg-lightgray/50"
            >
              <QuestionMarkCircleIcon className="w-5 h-5 mr-2" />
              Help Center
            </Link>
          </ul>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 p-4 flex items-stretch justify-center min-h-screen w-full h-full scrollbar-hide overflow-scroll backdrop-blur-md bg-white/60 z-50 py-4 ${
          isModalVisible ? "" : "hidden"
        }`}
      >
        <div className="relative w-full h-full shadow-xl rounded-lg max-w-md bg-white scrollbar-hide overflow-scroll">
          <div className="relative bg-white rounded-lg">
            <div className="sticky top-0 left-0 z-[1] flex items-center justify-between p-4 border-b backdrop-blur-md bg-white/30">
              <h3 className="text-xl font-medium text-gray-900">
                Edit Profile
              </h3>
              <button
                type="button"
                onClick={() => setIsModalVisible(!isModalVisible)}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="px-6 py-6 lg:px-8">
              <form className="space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your Display Name
                  </label>
                  <input
                    type="text"
                    name="Name"
                    className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
                <button
                  onClick={(e) => handleUpdateUser(e)}
                  className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Edit
                </button>
              </form>
            </div>
            <div className="relative">
              <div className="w-full flex items-center justify-between p-4 border-y backdrop-blur-md bg-white/30">
                <h3 className="text-xl font-medium text-gray-900">
                  Change Frame Color
                </h3>
              </div>
            </div>
            <div className="relative flex flex-col items-start p-4">
              <h3 className="font-semibold py-2 text-black">My collection</h3>
              <div className="grid grid-cols-12 z-0 lg:grid-cols-8 w-full place-items-center">
                <div
                  onClick={() =>
                    changeFrameColor(
                      "bg-gradient-to-r from-[#E55D87] to-[#5FC3E4]"
                    )
                  }
                  className="w-24 h-40 opacity-80 hover:opacity-100 col-span-4 lg:col-span-2 cursor-pointer mt-3 mr-1 bg-gradient-to-r from-[#E55D87] to-[#5FC3E4] rounded-md"
                ></div>
                <div
                  onClick={() => changeFrameColor("bg-orange-500")}
                  className="w-24 h-40 opacity-80 hover:opacity-100 col-span-4 lg:col-span-2 cursor-pointer mt-3 mr-1 bg-orange-500 rounded-md"
                ></div>
                <div
                  onClick={() => changeFrameColor("bg-blue-300")}
                  className="w-24 h-40 opacity-80 hover:opacity-100 col-span-4 lg:col-span-2 cursor-pointer mt-3 mr-1 bg-blue-300 rounded-md"
                ></div>
                <div
                  onClick={() =>
                    changeFrameColor("bg-[url('/images/frames/frame2.jpg')]")
                  }
                  className="w-24 h-40 opacity-80 hover:opacity-100 col-span-4 lg:col-span-2 cursor-pointer mt-3 mr-1 bg-[url('/images/frames/frame2.jpg')] rounded-md"
                ></div>
                <div
                  onClick={() =>
                    changeFrameColor(
                      "bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
                    )
                  }
                  className="w-24 h-40 opacity-80 hover:opacity-100 col-span-4 lg:col-span-2 cursor-pointer mt-3 mr-1 bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded-md"
                ></div>
                <div
                  onClick={() =>
                    changeFrameColor("bg-[url('/images/frames/frame1.jpg')]")
                  }
                  className="w-24 h-40 opacity-80 hover:opacity-100 col-span-4 lg:col-span-2 cursor-pointer mt-3 mr-1 bg-[url('/images/frames/frame1.jpg')] rounded-md"
                ></div>
              </div>
            </div>
            <div className="flex flex-col items-start p-4">
              <h3 className="font-semibold py-2 text-black">New Frames</h3>
              <div className="grid grid-cols-12 lg:grid-cols-8 w-full place-items-center">
                <div className="flex flex-col items-center justify-center col-span-4 lg:col-span-2">
                  <div
                    className={`w-24 h-40 mt-3 mr-1 opacity-60 hover:opacity-100 bg-gradient-to-r from-[#FF512F] to-[#DD2476] rounded-md`}
                  ></div>
                  <p className="cursor-pointer font-semibold text-sm p-2 mt-2 hover:bg-orange-600 rounded-full hover:text-white">
                    Unlock
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center col-span-4 lg:col-span-2">
                  <div
                    className={`w-24 h-40 mt-3 mr-1 opacity-60 hover:opacity-100 bg-gradient-to-r from-[#F09819] to-[#EDDE5D] rounded-md`}
                  ></div>
                  <p className="cursor-pointer font-semibold text-sm p-2 mt-2 hover:bg-orange-600 rounded-full hover:text-white">
                    Unlock
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center col-span-4 lg:col-span-2">
                  <div
                    className={`w-24 h-40 mt-3 mr-1 opacity-60 hover:opacity-100 bg-[url('/images/frames/frame3.jpg')] bg-cover object-contain rounded-md`}
                  ></div>
                  <p className="cursor-pointer font-semibold text-sm p-2 mt-2 hover:bg-orange-600 rounded-full hover:text-white">
                    Unlock
                  </p>
                </div>
                <div className="flex flex-col items-center justify-center col-span-4 lg:col-span-2">
                  <div
                    className={`w-24 h-40 mt-3 mr-1 opacity-60 hover:opacity-100 bg-gradient-to-r from-[#3CA55C] to-[#B5AC49] rounded-md`}
                  ></div>
                  <p className="cursor-pointer font-semibold text-sm p-2 mt-2 hover:bg-orange-600 rounded-full hover:text-white">
                    Unlock
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoContainer;
