import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import {
  MicrophoneIcon,
  ComputerDesktopIcon,
  UserIcon,
  HomeIcon,
  PlusCircleIcon,
  LightBulbIcon,
  FireIcon,
  ChatBubbleLeftIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  LockClosedIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

import {
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  fetchAuthUser,
  logoutUser,
} from "../../stores/authUser/AuthUserActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import IconGroup from "./IconGroup";
import { useTheme } from "next-themes";
import { useChannel, configureAbly } from "@ably-labs/react-hooks";
import Ably from "ably/promises";
import {
  fetchUserNotification,
  fetchUserNotifications,
} from "../../stores/notification/NotificationActions";
import { isEmpty } from "lodash";
import toast, { Toaster } from "react-hot-toast";
import {
  fetchUser,
  resetBell,
  resetMessages,
} from "../../stores/user/UserActions";
import { config, AblyKey } from "../../constants";
import SidebarRow from "../Sidebar/SidebarRow";
import { setCookie, deleteCookie } from 'cookies-next';

interface Data {
  receiver_id: number;
  notification: number;
}
configureAbly({
  key: AblyKey,
});
const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { notifications } = useAppSelector(
    (state) => state.notificationReducer
  );
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [dropdownNotifOpen, setDropdownNotifOpen] = useState<boolean>(false);
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [notificationInfo, setNotificationInfo] = useState<string>();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    setNotificationInfo("");
    dispatch(fetchAuthUser());
    handleFetchNotifications();
  }, []);

  useEffect(() => {
    if (notificationInfo) {
      handleShowNotification(notificationInfo);
    }
  }, [notificationInfo]);

  const handleShowNotification = async (notification: any) => {
    await new Promise((f) => setTimeout(f, 1000));
    toast(notification);
  };

  const handleFetchNotifications = async () => {
    await dispatch(fetchUserNotifications());
  };

  const [channel, ably] = useChannel("notifications", (message) => {
    checkUserNotification(message.data);
  });

  const [message] = useChannel(
    `messageNotification-${authUser.id}`,
    (message) => {
      fetchMessageNotification(message.data);
    }
  );

  const fetchMessageNotification = async (data: Data) => {
    await dispatch(fetchUserNotification(data?.notification)).then(
      async (result: any) => {
        setNotificationInfo(`${result?.otherUser?.name} sent you a message!`);
      }
    );
    await handleFetchNotifications();
    await dispatch(fetchAuthUser());
  };

  const checkUserNotification = async (data: Data) => {
    let localStorageAuthUser: any = "";
    if (isEmpty(authUser)) {
      // @ts-ignore
      localStorageAuthUser = JSON.parse(localStorage.getItem("authUser"));
    } else {
      localStorageAuthUser = authUser;
    }
    if (localStorageAuthUser?.id == data?.receiver_id) {
      await dispatch(fetchUserNotification(data?.notification)).then(
        async (result: any) => {
          if ("like" === result?.type) {
            setNotificationInfo(`${result?.user?.name} has liked your post!`);
          } else if ("comment" === result?.type) {
            setNotificationInfo(
              `${result?.user?.name} commented on your post!`
            );
          } else if ("dislike" === result?.type) {
            setNotificationInfo(`${result?.user?.name} disliked your post!`);
          } else if ("follow" === result?.type) {
            setNotificationInfo(`${result?.user?.name} has followed you!`);
          } else if ("levelUpgrade" === result?.type) {
            setNotificationInfo("Your level has been upgraded!");
          }
        }
      );
    }
    await handleFetchNotifications();
    await dispatch(fetchAuthUser());
  };

  const fetchUserName = async (id: any) => {
    await dispatch(fetchUser(id)).then((result: any) => {
      return result?.name;
    });
  };

  const handleMsg = async () => {
    await dispatch(resetMessages());
    await dispatch(fetchAuthUser());
    setDropdownOpen(!dropdownOpen);
    if (dropdownNotifOpen === true) {
      setDropdownNotifOpen(!dropdownNotifOpen);
    }
  };

  const handleNotif = async () => {
    await dispatch(resetBell());
    await dispatch(fetchAuthUser());
    setDropdownNotifOpen(!dropdownNotifOpen);
    if (dropdownOpen === true) {
      setDropdownOpen(!dropdownOpen);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogoutClick = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    deleteCookie("token");
    await dispatch(logoutUser());
    router.push("/auth/signin");
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  const renderThemeChanger = () => {
    if (!mounted) return null;

    if (currentTheme === "dark") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 md:h-6 md:w-6 fill-white"
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
          fill="#000000"
          className="w-5 h-5 md:h-6 md:w-6 fill-white stroke-black"
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
      <div
        className={`bg-darkblue dark:bg-lightgray grid grid-cols-9 place-content-center mx-auto ${
          router.pathname === "/dashboard/myChatrooms" ||
          router.pathname === "/dashboard/myChatrooms2"
            ? "lg:max-w-7xl "
            : "xl:max-w-[80%]"
        } h-14 px-2`}
      >
        <div className="flex w-full col-span-9 md:col-span-4 place-self-start place-items-center h-14">
          <Toaster />
          <div className="relative flex items-center justify-between w-full">
            <Bars3Icon
              onClick={() => setShowSidebar(!showSidebar)}
              className="w-7 h-7 text-white cursor-pointer md:hidden"
            />
            <Link
              href="/"
              className="h-full cursor-pointer flex items-center justify-center"
            >
              <Image
                src="/images/logo/long-logo.png"
                alt="Blockd Logo"
                className="w-26 h-10 md:ml-0 hidden md:inline"
                width={140}
                height={50}
              />
              <Image
                src="/images/logo/logo.png"
                alt="Blockd Logo"
                className="md:ml-0 w-10 h-7 md:w-12 md:h-8 md:hidden"
                width={60}
                height={40}
              />
            </Link>
            <div className="flex relative">
              <Image
                src={
                  authUser?.profilePic
                    ? `${config.url.PUBLIC_URL}/${authUser?.profilePic}`
                    : "/images/pfp/pfp1.jpg"
                }
                onClick={() => setDropDown(!dropDown)}
                alt="pfp"
                className="w-10 h-10 rounded-md shadow-sm cursor-pointer md:hidden"
                width={2000}
                height={2000}
              />
              {authUser?.unread == 0 ||
              authUser?.unread === undefined ||
              authUser?.unread === null ||
              authUser?.unreadMessages == 0 ||
              authUser?.unreadMessages === undefined ||
              authUser?.unreadMessages === null ? (
                <></>
              ) : (
                <div className="absolute -bottom-1 -right-1 p-[5px] w-1 h-1 rounded-full bg-blockd md:hidden"></div>
              )}
            </div>
            {dropDown && (
              <div className="absolute right-0 top-14 z-50 md:hidden">
                <div className="flex flex-col items-center justify-start bg-white dark:bg-darkgray dark:border-lightgray shadow-lg rounded-md">
                  <Link
                    href="/dashboard/notifications"
                    onClick={() => handleNotif()}
                    className="flex items-center justify-between space-x-2 p-2 text-sm border-b dark:border-lightgray w-full rounded-t-md"
                  >
                    <div className="flex items-center space-x-2">
                      <BellIcon className="h-5 w-5 inline" />
                      <p>Notifications</p>
                    </div>
                    {authUser?.unread == 0 ||
                    authUser?.unread === undefined ||
                    authUser?.unread === null ? (
                      ""
                    ) : (
                      <span className="text-white text-xs h-6 w-6 rounded-full bg-blockd flex justify-center items-center">
                        <span>{authUser?.unread}</span>
                      </span>
                    )}
                  </Link>
                  <Link
                    href="/dashboard/messages"
                    onClick={() => handleMsg()}
                    className="flex items-center justify-between space-x-2 p-2 text-sm border-b dark:border-lightgray w-full"
                  >
                    <div className="flex items-center space-x-2">
                      <ChatBubbleBottomCenterTextIcon className="h-5 w-5 inline" />
                      <p>Messages</p>
                    </div>
                    {authUser?.unreadMessages == 0 ||
                    authUser?.unreadMessages === undefined ||
                    authUser?.unreadMessages === null ? (
                      ""
                    ) : (
                      <span className="text-white text-xs h-6 w-6 rounded-full bg-blockd flex justify-center items-center">
                        <span>{authUser?.unreadMessages}</span>
                      </span>
                    )}
                  </Link>
                  {currentTheme === "dark" ? (
                    <div
                      onClick={() => setTheme("light")}
                      className="flex items-center space-x-2 p-2 border-b dark:border-lightgray text-sm w-full"
                    >
                      {renderThemeChanger()}
                      <p>Light Mode</p>
                    </div>
                  ) : (
                    <div
                      onClick={() => setTheme("dark")}
                      className="flex items-center space-x-2 p-2 border-b dark:border-lightgray text-sm w-full"
                    >
                      {renderThemeChanger()}
                      <p>Dark Mode</p>
                    </div>
                  )}

                  <div
                    onClick={() => handleLogoutClick()}
                    className="flex items-center space-x-2 p-2 text-sm w-full rounded-b-md"
                  >
                    <ArrowLeftOnRectangleIcon className="h-5 w-5 inline" />
                    <p>Logout</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:inline md:col-span-5 h-14">
          <ul className="flex items-center justify-end space-x-1 z-[2] right-0 w-full pl-0 transition-all ease-in h-14">
            {/* Dark/Light Mode */}
            <li className="relative flex-col items-center text-l mr-2">
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

            <li className="flex md:flex-col items-center text-l">
              <Link href="/dashboard/messages" onClick={() => handleMsg()}>
                {/*
                // @ts-ignore */}
                <div className="flex max-w-fit items-center space-x-2 rounded-ful transition-all duration-100 group">
                  <div className="">
                    <strong className="relative inline-flex items-center px-2.5 py-1.5">
                      {authUser?.unreadMessages == 0 ||
                      authUser?.unreadMessages === undefined ||
                      authUser?.unreadMessages === null ? (
                        ""
                      ) : (
                        <span className="text-white absolute text-xs -top-1 -right-0 h-6 w-6 rounded-full group-hover:bg-orange-600 bg-blockd flex justify-center items-center items border-2 border-[#181c44] dark:border-lightgray">
                          <span>{authUser?.unreadMessages}</span>
                        </span>
                      )}
                      <ChatBubbleBottomCenterTextIcon className="h-6 w-6 inline text-white dark:text-white" />
                    </strong>
                  </div>
                </div>
              </Link>
            </li>
            {/* Notifications */}

            <li className="flex flex-col items-center text-l">
              <Link
                href="/dashboard/notifications"
                onClick={() => handleNotif()}
              >
                {/*
                // @ts-ignore */}
                <div className="flex max-w-fit items-center space-x-2 rounded-ful transition-all duration-100 group mr-2">
                  <div className="">
                    <strong className="relative inline-flex items-center px-2.5 py-1.5">
                      {authUser?.unread == 0 ||
                      authUser?.unread === undefined ||
                      authUser?.unread === null ? (
                        ""
                      ) : (
                        <span className="text-white absolute text-xs -top-1 -right-0 h-6 w-6 rounded-full group-hover:bg-orange-600 bg-blockd flex justify-center items-center items border-2 border-[#181c44] dark:border-lightgray">
                          <span>{authUser?.unread}</span>
                        </span>
                      )}
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
            <li className="h-14 rounded-full flex items-center justify-center space-x-4">
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
                      ? `${config.url.PUBLIC_URL}/${authUser?.profilePic?.name}`
                      : "/images/pfp/pfp1.jpg"
                  }
                  alt="pfp"
                  className="w-10 h-10 rounded-md shadow-sm cursor-pointer"
                />
              </Link>
            </li>
          </ul>
        </div>
        {showSidebar && (
          <div
            className={`flex flex-col bg-white dark:bg-darkgray fixed z-50 top-14 h-screen left-0 w-60 transition-all duration-300 ease-linear md:hidden`}
          >
            <div className="relative flex flex-col items-start mt-3 w-fit ml-4">
              <Link href="/" className="active">
                {location.pathname === "/" ? (
                  <SidebarRow
                    // @ts-ignore
                    Icon={HomeIcon}
                    title="Home"
                    active="bg-gray-100 dark:bg-lightgray"
                  />
                ) : (
                  // @ts-ignore
                  <SidebarRow Icon={HomeIcon} title="Home" active="" />
                )}
              </Link>
              <Link href="/dashboard/profile">
                {location.pathname === "/dashboard/profile" ? (
                  <SidebarRow
                    // @ts-ignore
                    Icon={UserIcon}
                    title="Profile"
                    active="bg-gray-100 dark:bg-lightgray"
                  />
                ) : (
                  // @ts-ignore
                  <SidebarRow Icon={UserIcon} title="Profile" active="" />
                )}
              </Link>
              <Link href="/dashboard/suggestion">
                {location.pathname === "/dashboard/suggestion" ? (
                  <SidebarRow
                    // @ts-ignore
                    Icon={LightBulbIcon}
                    title="Feedback"
                    active="bg-gray-100 dark:bg-lightgray"
                  />
                ) : (
                  // @ts-ignore
                  <SidebarRow Icon={LightBulbIcon} title="Feedback" active="" />
                )}
              </Link>
              <Link
                href=""
                onClick={() => setOpen(!isOpen)}
                className="relative"
              >
                <div className="flex items-center justify-center">
                  <div
                    className={`flex mt-1 max-w-fit items-start space-x-2 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}
                  >
                    <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
                    <p className={`text-base cursor-pointer`}>ChatRooms</p>
                    <div>
                      <ChevronRightIcon
                        className={`w-4 h-4 ml-2 ${
                          isOpen ? "hidden" : "inline"
                        }`}
                      />
                      <ChevronDownIcon
                        className={`w-4 h-4 ml-2 ${
                          isOpen ? "inline" : "hidden"
                        }`}
                      />
                    </div>
                  </div>
                </div>
                {isOpen && (
                  <div className="w-full flex flex-col items-center justify-center">
                    <Link
                      href="/dashboard/myChatrooms"
                      className="flex items-center justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full space-x-2"
                    >
                      <ChatBubbleLeftIcon className="w-5 h-5" />
                      <span>My Chatrooms</span>
                    </Link>
                    <Link
                      href="/dashboard/createChatroom"
                      className="flex items-center cursor-pointer justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full space-x-2"
                    >
                      <PlusCircleIcon className="w-5 h-5" />
                      <span>Create Chatroom</span>
                    </Link>
                    <Link
                      href="/dashboard/allChatrooms"
                      className="flex items-center cursor-pointer justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full space-x-2"
                    >
                      <ChatBubbleLeftRightIcon className="w-5 h-5" />
                      <span>All Chatrooms</span>
                    </Link>
                  </div>
                )}
              </Link>

              <Link
                // href="/dashboard/achievement"
                href="#"
                className="opacity-60"
              >
                {location.pathname === "/dashboard/achievement" ? (
                  <SidebarRow
                    // @ts-ignore
                    Icon={LockClosedIcon}
                    title="Achievements"
                    active="bg-gray-100 dark:bg-lightgray"
                  />
                ) : (
                  <SidebarRow
                    // @ts-ignore
                    Icon={LockClosedIcon}
                    title="Achievements"
                    active=""
                  />
                )}
              </Link>
              <Link href="#" className="opacity-60">
                {/*
                // @ts-ignore */}
                <SidebarRow Icon={LockClosedIcon} title="Streams" active="" />
              </Link>
              <Link href="#" className="opacity-60">
                {/* 
                // @ts-ignore */}
                <SidebarRow Icon={LockClosedIcon} title="Podcasts" active="" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
