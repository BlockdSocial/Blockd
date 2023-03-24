import React, { useState } from "react";
import SidebarRow from "./SidebarRow";
import {
  MicrophoneIcon,
  ComputerDesktopIcon,
  ChatBubbleBottomCenterTextIcon,
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
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

function Sidebar() {
  let location = useRouter();
  const [isOpen, setOpen] = useState(false);

  return (
    <div className="items-start justify-center lg:justify-start hidden md:flex md:col-span-2 px-2 scrollbar-hide overflow-scroll min-h-screen border-x dark:border-lightgray pb-14">
      <div className="relative flex flex-col items-start lg:p-2 mt-3 md:items-start w-fit">
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
              title="Suggestions"
              active="bg-gray-100 dark:bg-lightgray"
            />
          ) : (
            // @ts-ignore
            <SidebarRow Icon={LightBulbIcon} title="Suggestions" active="" />
          )}
        </Link>
        <Link
          href=""
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="relative"
        >
          <div className="flex items-center justify-center">
            <div
              className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}
            >
              <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />
              <p
                className={`hidden md:inline-flex text-base lg:text-xl cursor-pointer`}
              >
                ChatRooms
              </p>
              <div className="hidden md:inline">
                <ChevronRightIcon
                  className={`w-4 h-4 ml-2 ${isOpen ? "hidden" : "inline"}`}
                />
                <ChevronDownIcon
                  className={`w-4 h-4 ml-2 ${isOpen ? "inline" : "hidden"}`}
                />
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="w-full flex flex-col items-center justify-center">
              <Link
                href="/dashboard/myChatrooms"
                className="flex items-center justify-center md:justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full md:space-x-2"
              >
                <ChatBubbleLeftIcon className="w-5 h-5" />
                <span className="hidden md:inline">My Chatrooms</span>
              </Link>
              <Link
                href="/dashboard/createChatroom"
                className="flex items-center justify-center cursor-pointer md:justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full md:space-x-2"
              >
                <PlusCircleIcon className="w-5 h-5" />
                <span className="hidden md:inline">Create Chatroom</span>
              </Link>
              <Link
                href="/dashboard/allChatrooms"
                className="flex items-center justify-center cursor-pointer md:justify-start p-4 hover:bg-gray-100 dark:hover:bg-lightgray rounded-full w-full md:space-x-2"
              >
                <ChatBubbleLeftRightIcon className="w-5 h-5" />
                <span className="hidden md:inline">All Chatrooms</span>
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
            // @ts-ignore
            <SidebarRow Icon={LockClosedIcon} title="Achievements" active="" />
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
  );
}

export default Sidebar;
