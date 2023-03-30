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

  const router = useRouter();
  const { isRegistered } = router.query;

  const [showModal1, setShowModal1] = useState(true);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);
  const [showModal4, setShowModal4] = useState(false);
  const [showModal5, setShowModal5] = useState(false);
  const [showModal6, setShowModal6] = useState(false);
  const [showModal7, setShowModal7] = useState(false);
  const [showModal8, setShowModal8] = useState(false);
  const [showModal9, setShowModal9] = useState(false);

  return (
    <div className="items-start justify-center lg:justify-start hidden md:flex md:col-span-2 px-2 scrollbar-hide overflow-scroll min-h-screen border-x dark:border-lightgray pb-14">
      <div className="relative flex flex-col items-start lg:p-2 mt-3 md:items-start w-fit">
        <div className="relative w-full">
          <Link href="/" className="active">
            {location.pathname === "/" ? (
              <div
                className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 ${
                  showModal3
                    ? "bg-gradient-to-r from-blockd via-orange-400 to-orange-300 text-white"
                    : "bg-gray-100 dark:bg-lightgray"
                } rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}
              >
                <HomeIcon className="h-6 w-6" />
                <p className={`text-base lg:text-xl cursor-pointer`}>Home</p>
              </div>
            ) : (
              <div
                className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}
              >
                <HomeIcon className="h-6 w-6" />
                <p className={`text-base lg:text-xl cursor-pointer`}>Home</p>
              </div>
            )}
          </Link>
          <div
            className={`absolute z-10 left-0 top-16 p-2 bg-gradient-to-r from-blockd via-orange-400 to-orange-300 rounded-md ${
              showModal3 ? "" : "hidden"
            }`}
          >
            <div className="flex flex-col items-start justify-start space-y-2">
              <p className="text-xs text-white">
                You can consulte your feed and do this and this and this.
              </p>
              <div className="flex items-end justify-end w-full space-x-2">
                <p
                  onClick={() => {
                    setShowModal3(false);
                  }}
                  className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                >
                  Skip
                </p>
                <p
                  onClick={() => {
                    setShowModal3(false);
                    setShowModal4(true);
                  }}
                  className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                >
                  Next
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <Link href="/dashboard/profile" className="active">
            {location.pathname === "/dashboard/profile" ? (
              <div
                className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 bg-gray-100 dark:bg-lightgray
                rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}
              >
                <UserIcon className="h-6 w-6" />
                <p className={`text-base lg:text-xl cursor-pointer`}>Profile</p>
              </div>
            ) : (
              <div
                className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 rounded-full ${
                  showModal4
                    ? "bg-gradient-to-r from-blockd via-orange-400 to-orange-300 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-lightgray"
                } group`}
              >
                <UserIcon className="h-6 w-6" />
                <p className={`text-base lg:text-xl cursor-pointer`}>Profile</p>
              </div>
            )}
          </Link>
          <div
            className={`absolute z-10 left-0 top-16 p-2 bg-gradient-to-r from-blockd via-orange-400 to-orange-300 rounded-md ${
              showModal4 ? "" : "hidden"
            }`}
          >
            <div className="flex flex-col items-start justify-start space-y-2">
              <p className="text-xs text-white">
                You can consulte your profile and do this and this and this.
              </p>
              <div className="flex items-end justify-end w-full space-x-2">
                <p
                  onClick={() => {
                    setShowModal4(false);
                  }}
                  className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                >
                  Skip
                </p>
                <p
                  onClick={() => {
                    setShowModal4(false);
                    setShowModal5(true);
                  }}
                  className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                >
                  Next
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full">
          <Link href="/dashboard/suggestion" className="active">
            {location.pathname === "/dashboard/suggestion" ? (
              <div
                className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 bg-gray-100 dark:bg-lightgray
                rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}
              >
                <LightBulbIcon className="h-6 w-6" />
                <p className={`text-base lg:text-xl cursor-pointer`}>
                  Suggestions
                </p>
              </div>
            ) : (
              <div
                className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 rounded-full ${
                  showModal5
                    ? "bg-gradient-to-r from-blockd via-orange-400 to-orange-300 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-lightgray"
                } group`}
              >
                <LightBulbIcon className="h-6 w-6" />
                <p className={`text-base lg:text-xl cursor-pointer`}>
                  Suggestions
                </p>
              </div>
            )}
          </Link>
          <div
            className={`absolute z-10 left-0 top-16 p-2 bg-gradient-to-r from-blockd via-orange-400 to-orange-300 rounded-md ${
              showModal5 ? "" : "hidden"
            }`}
          >
            <div className="flex flex-col items-start justify-start space-y-2">
              <p className="text-xs text-white">
                You can consulte the suggestion page and do this and this and
                this.
              </p>
              <div className="flex items-end justify-end w-full space-x-2">
                <p
                  onClick={() => {
                    setShowModal5(false);
                  }}
                  className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                >
                  Skip
                </p>
                <p
                  onClick={() => {
                    setShowModal5(false);
                    setShowModal6(true);
                  }}
                  className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                >
                  Next
                </p>
              </div>
            </div>
          </div>
        </div>
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
          {(isOpen || isRegistered != undefined) && (
            <div className="w-full flex flex-col items-center justify-center">
              <div className="relative w-full">
                <Link href="/dashboard/myChatrooms">
                  <div
                    className={`flex items-center justify-center md:justify-start p-4 md:space-x-2 rounded-full ${
                      showModal6
                        ? "bg-gradient-to-r from-blockd via-orange-400 to-orange-300 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-lightgray"
                    } group`}
                  >
                    <ChatBubbleLeftIcon className="w-5 h-5" />
                    <span className="hidden md:inline">My Chatrooms</span>
                  </div>
                </Link>
                <div
                  className={`absolute z-10 left-0 top-16 p-2 bg-gradient-to-r from-blockd via-orange-400 to-orange-300 rounded-md ${
                    showModal6 ? "" : "hidden"
                  }`}
                >
                  <div className="flex flex-col items-start justify-start space-y-2">
                    <p className="text-xs text-white">
                      You can consulte your chatrooms and do this and this and
                      this.
                    </p>
                    <div className="flex items-end justify-end w-full space-x-2">
                      <p
                        onClick={() => {
                          setShowModal6(false);
                        }}
                        className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                      >
                        Skip
                      </p>
                      <p
                        onClick={() => {
                          setShowModal6(false);
                          setShowModal7(true);
                        }}
                        className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                      >
                        Next
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                <Link href="/dashboard/createChatroom">
                  <div
                    className={`flex items-center justify-center md:justify-start p-4 md:space-x-2 rounded-full ${
                      showModal7
                        ? "bg-gradient-to-r from-blockd via-orange-400 to-orange-300 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-lightgray"
                    } group`}
                  >
                    <PlusCircleIcon className="w-5 h-5" />
                    <span className="hidden md:inline">Create Chatroom</span>
                  </div>
                </Link>
                <div
                  className={`absolute z-10 left-0 top-16 p-2 bg-gradient-to-r from-blockd via-orange-400 to-orange-300 rounded-md ${
                    showModal7 ? "" : "hidden"
                  }`}
                >
                  <div className="flex flex-col items-start justify-start space-y-2">
                    <p className="text-xs text-white">
                      You can consulte the create chatrooms page and do this and this and
                      this.
                    </p>
                    <div className="flex items-end justify-end w-full space-x-2">
                      <p
                        onClick={() => {
                          setShowModal7(false);
                        }}
                        className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                      >
                        Skip
                      </p>
                      <p
                        onClick={() => {
                          setShowModal7(false);
                          setShowModal8(true);
                        }}
                        className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                      >
                        Next
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative w-full">
                <Link href="/dashboard/allChatrooms">
                  <div
                    className={`flex items-center justify-center md:justify-start p-4 md:space-x-2 rounded-full ${
                      showModal8
                        ? "bg-gradient-to-r from-blockd via-orange-400 to-orange-300 text-white"
                        : "hover:bg-gray-100 dark:hover:bg-lightgray"
                    } group`}
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5" />
                    <span className="hidden md:inline">All Chatrooms</span>
                  </div>
                </Link>
                <div
                  className={`absolute z-10 left-0 top-16 p-2 bg-gradient-to-r from-blockd via-orange-400 to-orange-300 rounded-md ${
                    showModal8 ? "" : "hidden"
                  }`}
                >
                  <div className="flex flex-col items-start justify-start space-y-2">
                    <p className="text-xs text-white">
                      You can consulte the all chatrooms page and do this and this and
                      this.
                    </p>
                    <div className="flex items-end justify-end w-full space-x-2">
                      <p
                        onClick={() => {
                          setShowModal8(false);
                        }}
                        className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                      >
                        Skip
                      </p>
                      <p
                        onClick={() => {
                          setShowModal8(false);
                          setShowModal9(true);
                        }}
                        className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                      >
                        Next
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Link>
        <div className="relative w-full">
          <Link href="/dashboard/achievement" className="active">
            {location.pathname === "/dashboard/achievement" ? (
              <div
                className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 bg-gray-100 dark:bg-lightgray
                rounded-full hover:bg-gray-100 dark:hover:bg-lightgray group`}
              >
                <FireIcon className="h-6 w-6" />
                <p className={`text-base lg:text-xl cursor-pointer`}>Achievements</p>
              </div>
            ) : (
              <div
                className={`flex mt-1 max-w-fit items-start md:items-center md:justify-center space-x-2 p-3 rounded-full ${
                  showModal9
                    ? "bg-gradient-to-r from-blockd via-orange-400 to-orange-300 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-lightgray"
                } group`}
              >
                <FireIcon className="h-6 w-6" />
                <p className={`text-base lg:text-xl cursor-pointer`}>Achievements</p>
              </div>
            )}
          </Link>
          <div
            className={`absolute z-10 left-0 top-16 p-2 bg-gradient-to-r from-blockd via-orange-400 to-orange-300 rounded-md ${
              showModal9 ? "" : "hidden"
            }`}
          >
            <div className="flex flex-col items-start justify-start space-y-2">
              <p className="text-xs text-white">
                You can consulte achievement page and do this and this and this.
              </p>
              <div className="flex items-end justify-end w-full space-x-2">
                <p
                  onClick={() => {
                    setShowModal9(false);
                  }}
                  className="flex items-center justify-center p-1 px-2 bg-white hover:bg-gray-200 cursor-pointer rounded-md text-sm"
                >
                  Begin
                </p>
              </div>
            </div>
          </div>
        </div>
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
      {isRegistered != undefined && (
        <div
          className={`fixed top-0 left-0 flex p-4 items-center justify-center min-h-screen w-full h-full backdrop-blur-md bg-white/60 z-50 ${
            showModal1 ? "" : "hidden"
          }`}
        >
          <div className="relative w-full rounded-lg shadow-lg max-w-md h-fit bg-gray-50 scrollbar-hide overflow-scroll">
            <div className="sticky top-0 rounded-t-lg backdrop-blur-md bg-white/30">
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-900">
                  Welcome to Blockd
                </h3>
              </div>
            </div>
            <div className="flex flex-col items-center justify-start p-4 border-y text-black text-justify">
              Welcome and thank you for being among the first to use the bot
              free social platform that will soon become home to all blockchain
              users (and soon to be blockchain users).
              <br></br>
              Be aware that only certain features are available during this
              Beta, which are:
              <br></br>
              <div className="flex w-full items-center justify-start">
                <span className="text-orange-500 text-xl">•</span>{" "}
                Creating/Editing a post.
              </div>
              <div className="flex w-full items-center justify-start">
                <span className="text-orange-500 text-xl">•</span>{" "}
                Consulting/Editing your profile page.
              </div>
              <div className="flex w-full items-center justify-start">
                <span className="text-orange-500 text-xl">•</span> Submitting
                Feedback.
              </div>
            </div>
            <div className="flex items-center justify-end space-x-3 p-4">
              <p
                onClick={() => {
                  setShowModal1(false);
                  setShowModal2(true);
                }}
                className="p-2 px-5 cursor-pointer rounded-md bg-gray-400 hover:bg-gray-500 text-white"
              >
                Next
              </p>
            </div>
          </div>
        </div>
      )}
      <div
        className={`fixed top-0 left-0 p-4 flex items-center justify-center min-h-screen w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${
          showModal2 ? "" : "hidden"
        }`}
      >
        <div className="relative w-full rounded-lg shadow-lg max-w-md h-fit bg-gray-50 overflow-scroll scrollbar-hide">
          <div className="sticky top-0 rounded-t-lg backdrop-blur-md bg-white/30">
            <div className="p-4">
              <h3 className="text-xl font-medium text-gray-900">
                Welcome to Blockd
              </h3>
            </div>
          </div>
          <div className="flex flex-col items-center justify-start p-4 border-y text-black text-justify">
            We appreciate you taking your time  during our Beta and providing
            feedback which is very important to us, as this is a community
            driven platform.
            <br></br>
            <div className="flex w-full items-center justify-start">
              <span className="text-orange-500 text-xl">*</span>To submit
              feedback:<span className="text-orange-500 text-xl">*</span>
            </div>
            Please visit our Suggestions page, select the "Beta Feedback"
            Category and hit Submit!
          </div>
          <div className="flex items-center justify-end space-x-3 p-4">
            <p
              onClick={() => {
                setShowModal1(true);
                setShowModal2(false);
              }}
              className="p-2 px-5 cursor-pointer rounded-md bg-gray-400 hover:bg-gray-500 text-white"
            >
              Back
            </p>
            <p
              onClick={() => {
                setShowModal1(false);
                setShowModal2(false);
                setShowModal3(true);
              }}
              className="p-2 px-5 cursor-pointer rounded-md bg-gray-400 hover:bg-gray-500 text-white"
            >
              Start
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
