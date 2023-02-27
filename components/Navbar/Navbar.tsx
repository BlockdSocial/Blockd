import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import {
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  KeyIcon,
  WalletIcon
} from '@heroicons/react/24/outline'
import { fetchAuthUser, logoutUser } from '../../stores/authUser/AuthUserActions'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import IconGroup from './IconGroup'
import { useTheme } from 'next-themes'
import NotifDropDown from './NotifDropDown'
import MsgDropDown from './MsgDropDown'
import { useChannel, configureAbly } from "@ably-labs/react-hooks";
import Ably from "ably/promises";
import { fetchUserNotification, fetchUserNotifications } from '../../stores/notification/NotificationActions'
import { isEmpty } from 'lodash'
import toast from 'react-hot-toast'
import { fetchUser } from '../../stores/user/UserActions'
import { config, AblyKey } from "../../constants";

interface Data {
  receiver_id: number;
  notification: number;
}
configureAbly({
  key:  AblyKey,
});
const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { notifications, unread } = useAppSelector((state) => state.notificationReducer);
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownNotifOpen, setDropdownNotifOpen] = useState<boolean>(false);
  const [notificationInfo, setNotificationInfo] = useState<string>()


  useEffect(() => {
    setNotificationInfo('');
    dispatch(fetchAuthUser());
    handleFetchNotifications();
  }, []);

  useEffect(() => {
    if (notificationInfo) {
      handleShowNotification(notificationInfo);
    }
  }, [notificationInfo]);

  const handleShowNotification = async (notification: any) => {
    await new Promise(f => setTimeout(f, 1000));
    toast(notification);
  }

  const handleFetchNotifications = async () => {
    await dispatch(fetchUserNotifications());
  }

  const [channel, ably] = useChannel("notifications", (message) => {
    console.log(message);
    console.log(authUser)

    checkUserNotification(message.data);
  });

  const checkUserNotification = async (data: Data) => {
    console.log("data: ", data);
    console.log(authUser)
    let localStorageAuthUser:any = ''
    if(!authUser) {
      localStorageAuthUser = localStorage.getItem(authUser)
      console.log(localStorageAuthUser);
    }
    else {
      localStorageAuthUser = authUser;
    }
    console.log({localStorageAuthUser});
    if (localStorageAuthUser?.id === data?.receiver_id) {
      await dispatch(fetchUserNotification(data?.notification)).then(async (result: any) => {
        console.log('result: ', result);
        if ('like' === result?.type) {
          setNotificationInfo(`${result?.user?.name} has liked your post!`);
        }
        else if ('comment' === result?.type) {
          setNotificationInfo(`${result?.user?.name} commented on your post!`);
        }
        else if ('dislike' === result?.type) {
          setNotificationInfo(`${result?.user?.name} disliked your post!`);
        }
      });
    }
  };

  const fetchUserName = async (id: any) => {
    await dispatch(fetchUser(id)).then((result: any) => {
      console.log("NAME: ", result?.name);
      return result?.name;
    });
  };

  const handleMsg = () => {
    setDropdownOpen(!dropdownOpen);
    if (dropdownNotifOpen === true) {
      setDropdownNotifOpen(!dropdownNotifOpen);
    }
  };

  const handleNotif = () => {
    setDropdownNotifOpen(!dropdownNotifOpen);
    if (dropdownOpen === true) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoutClick = async () => {
    await dispatch(logoutUser()).then(() => router.push("/auth/signin"));
  };

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 fill-white"
          viewBox="0 0 20 20"
          fill="#9333ea"
          role="button"
          onClick={() => setTheme("light")}
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      );
    } else {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#9333ea"
          className="w-6 h-6 fill-white"
          role="button"
          onClick={() => setTheme("dark")}
        >
          <path
            fillRule="evenodd"
            d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
            clipRule="evenodd"
          />
        </svg>
      );
    }
  };

  return (
    <div className="w-full bg-darkblue dark:bg-lightgray">
      <div className=" bg-darkblue dark:bg-lightgray grid grid-cols-9 place-content-center mx-auto lg:max-w-7xl h-14">
        <div className="col-span-2 md:col-span-4 place-self-start place-items-center h-14 px-4 md:px-0">
          <Link
            href="/"
            className="h-full cursor-pointer flex items-center justify-center"
          >
            <Image
              src="/images/logo/long-logo.png"
              alt="Blockd Logo"
              className="w-26 h-10 ml-4 md:ml-0 hidden md:inline"
              width={140}
              height={50}
            />
            <Image
              src="/images/logo/logo.png"
              alt="Blockd Logo"
              className="ml-4 md:ml-0 w-10 h-7 md:w-12 md:h-8 md:hidden"
              width={60}
              height={40}
            />
          </Link>
        </div>
        <div className="col-span-7 md:col-span-5 h-14">
          <ul className="flex items-center justify-end z-[2] right-0 w-full pl-0 transition-all ease-in h-14">
            {/* Dark/Light Mode */}
            <li className="flex-col items-center text-l mr-2">
              {renderThemeChanger()}
            </li>
            {/* Messages */}
            <li className="flex-col items-center text-l hidden">
              <Link href="/dashboard/messages">
                {/* 
                // @ts-ignore */}
                <IconGroup
                  //@ts-ignore
                  Icon={ChatBubbleBottomCenterTextIcon}
                  notif="10"
                ></IconGroup>
              </Link>
            </li>
            {/*
          <li className='hidden md:flex md:flex-col items-center text-l'>
            <Link href="" onClick={() => handleMsg()}>
              <IconGroup Icon={ChatBubbleBottomCenterTextIcon} notif="10"></IconGroup>
            </Link>
          </li>
          <div className={`${dropdownOpen ? 'hidden md:inline z-10' : 'hidden'}`}>
            <MsgDropDown />
          </div>*/}
            {/* Notifications */}

            <li className="hidden md:flex md:flex-col items-center text-l">
              <Link href="/dashboard/notifications" onClick={() => handleNotif()}>
                {/* 
                // @ts-ignore */}
                <div className="flex max-w-fit items-center space-x-2 p-2 rounded-ful transition-all duration-100 group">
                  <div className="">
                    <strong className="relative inline-flex items-center px-2.5 py-1.5">
                      <span className="text-white absolute text-xs top-0 right-0 md:-top-1 md:-right-0 h-6 w-6 rounded-full group-hover:bg-orange-600 bg-blockd flex justify-center items-center items border-2 border-[#181c44] dark:border-lightgray">
                        <span>{unread}</span>
                      </span>
                      <BellIcon className="h-6 w-6 inline text-white dark:text-white" />
                    </strong>
                  </div>
                </div>
              </Link>
            </li>
            {/*
          <div className={`${dropdownNotifOpen ? 'hidden md:inline' : 'hidden'}`}>
            <NotifDropDown />
          </div>*/}
            {/* Sign Up */}
            <li className="ml-4 h-14 rounded-full flex items-center justify-center space-x-4">
              <p
                className="text-white cursor-pointer dark:text-white hover:text-gray-300 dark:hover:text-gray-300 font-semibold"
                onClick={() => handleLogoutClick()}
              >
                Logout
              </p>
              <Link
                href="/dashboard/profile"
                className="rounded-md p-[1px] bg-white w-full"
              >
                <img
                  src={
                    authUser?.profilePic
                      ? `${config.url.PUBLIC_URL}/${authUser?.profilePic}`
                      : "/images/pfp/pfp1.jpg"
                  } 
                  alt="pfp"
                  className="max-h-10 object-contain rounded-md shadow-sm cursor-pointer"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
