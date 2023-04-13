import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUturnLeftIcon,
  EllipsisVerticalIcon,
  ExclamationCircleIcon,
  TrashIcon,
  EyeDropperIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { config } from "../../../../constants";

import Picker from "@emoji-mart/react";

import { useAppSelector } from "../../../../stores/hooks";
import { isEmpty } from "lodash";
import Linkify from "react-linkify";
import Link from "next/link";
import { encodeQuery } from "../../../../utils";

export default function Message({ receiver, message }: any) {
  const { authUser } = useAppSelector((state) => state.authUserReducer);

  let [showReaction, setShowReaction] = useState<boolean>(false);
  let [reaction, setReaction] = useState<string>("");
  let [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
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

  const removeReaction = () => {
    reaction = "";
    setReaction(reaction);
  };

  const addReaction = (e: any) => {
    const sym = e.unified.split("-");
    const codesArray: any[] = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    reaction = "";
    setReaction(reaction + emoji);
    setShowReaction(!showReaction);
  };

  const componentDecorator = (href: string, text: string, key: number) => {
    return (
      <a
        onClick={async (e) => {
          e.stopPropagation();
        }}
        href={href}
        key={key}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {text}
      </a>
    );
  };

  return message?.userId == authUser?.id ? (
    <>
      <div
        key={message?.id}
        className={`relative flex flex-col ${isDropdownVisible ? "z-50" : ""} `}
      >
        <div className="grid grid-cols-10 md:grid-cols-12 mb-2">
          <div className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mx-2 py-2 px-2 bg-gradient-to-r from-[#FF512F] to-[#F09819] dark:from-[#AA076B] dark:to-[#61045F] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white group">
            <div className="flex space-x-20 relative z-0 items-center justify-between w-full text-xm font-semibold">
              <div>
                <Link
                  href="/dashboard/profile"
                  className="text-sm md:text-base"
                >
                  @{authUser?.name}
                </Link>
              </div>
              <div className="relative z-0 flex items-center justify-end space-x-2 pl-2">
                <p className="text-sm md:text-base">
                  {moment(message?.createdAt).format("YY-MM-DD HH:mm")}
                </p>
                <div ref={dropdown} className="flex relative rounded-md">
                  {isDropdownVisible && (
                    <ul
                      className={`absolute top-6 right-1 w-32 cursor-pointer rounded-md shadow-xl`}
                    >
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200 rounded-t-md">
                        <TrashIcon className="w-5 h-5 mr-3" />
                        Delete
                      </div>
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200">
                        <DocumentDuplicateIcon className="w-5 h-5 mr-3" />
                        Copy
                      </div>
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200">
                        <EyeDropperIcon className="w-5 h-5 mr-3" />
                        Pin
                      </div>
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200">
                        <ArrowUturnLeftIcon className="w-5 h-5 mr-3" />
                        Reply
                      </div>
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200 rounded-b-md">
                        <ExclamationCircleIcon className="w-5 h-5 mr-3" />
                        Report
                      </div>
                    </ul>
                  )}
                  {/* <EllipsisVerticalIcon onClick={() => setIsDropdownVisible(b => !b)} className='w-5 h-5 cursor-pointer' /> */}
                </div>
              </div>
            </div>
            <p className="flex items-center justify-start py-2 text-sm md:text-base">
              <Linkify componentDecorator={componentDecorator}>
                {message?.content}
              </Linkify>
            </p>
            {message?.imgName != null && (
              <div className="flex items-center justify-start">
                <img
                  src={`${config.url.PUBLIC_URL}/${message?.imgName}`}
                  className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md"
                />
              </div>
            )}
            {message?.gif != null && (
              <div className="flex items-center justify-start">
                <img
                  src={message?.gif}
                  className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md"
                />
              </div>
            )}
            <div className="relative flex items-center justify-start space-x-1 mt-1">
              <div className="absolute -left-7 -top-1 hidden group-hover:flex items-start justify-start bg-transparent rounded-md">
                {/* <div className='flex rounded-full p-1 h-full bg-white dark:bg-darkgray'>
                          <AddReactionRoundedIcon onClick={() => setShowReaction(!showReaction)} className="cursor-pointer text-orange-600 dark:text-pink-800" />
                        </div> */}

                {showReaction && (
                  <div className="absolute top-8 left-0">
                    <Picker
                      set="apple"
                      onEmojiSelect={addReaction}
                      theme="dark"
                      icons="outline"
                      previewPosition="none"
                      size="1em"
                      perLine="6"
                      maxFrequentRows="2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className="col-span-1 flex items-end justify-start"
          >
            <img
              src={
                !isEmpty(authUser?.profilePic)
                  ? `${config.url.PUBLIC_URL}/${authUser?.profilePic?.name}`
                  : "/images/pfp/pfp1.jpg"
              }
              className="object-cover h-10 w-10 rounded-full"
              alt=""
            />
          </Link>
        </div>
        <div className="grid grid-cols-10 md:grid-cols-12">
          <div
            onClick={() => removeReaction()}
            className={`flex items-center place-self-end w-fit col-span-9 md:col-span-11 p-1 px-2 mr-2 bg-orange-400 hover:bg-orange-500 dark:bg-[#61045F] dark:hover:bg-[#AA076B] rounded-md cursor-pointer ${
              reaction ? "inline" : "hidden"
            }`}
          >
            <input
              value={reaction}
              onChange={(e: any) => setReaction(e.target.value)}
              className="bg-transparent cursor-pointer w-6 text-sm"
              disabled
            />
            <p className="text-xs font-bold text-white">4</p>
          </div>
          <div className="col-span-1 flex items-end justify-end"></div>
        </div>
      </div>
      <div
        className={`relative flex flex-col ${isDropdownVisible ? "z-50" : ""} `}
      >
        <div className="grid grid-cols-10 md:grid-cols-12 mb-2">
          <div className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mx-2 py-2 px-2 bg-gradient-to-r from-[#FF512F] to-[#F09819] dark:from-[#AA076B] dark:to-[#61045F] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white group">
            <div className="flex space-x-20 relative z-0 items-center justify-between w-full text-xm font-semibold">
              <div>
                <Link
                  href="/dashboard/profile"
                  className="text-sm md:text-base"
                >
                  @Test Reply
                </Link>
              </div>
              <div className="relative z-0 flex items-center justify-end space-x-2 pl-2">
                <p className="text-sm md:text-base">23-04-11 14:14</p>
                <div ref={dropdown} className="flex relative rounded-md">
                  {isDropdownVisible && (
                    <ul
                      className={`absolute top-6 right-1 w-32 cursor-pointer rounded-md shadow-xl`}
                    >
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200 rounded-t-md">
                        <TrashIcon className="w-5 h-5 mr-3" />
                        Delete
                      </div>
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200">
                        <DocumentDuplicateIcon className="w-5 h-5 mr-3" />
                        Copy
                      </div>
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200">
                        <EyeDropperIcon className="w-5 h-5 mr-3" />
                        Pin
                      </div>
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200">
                        <ArrowUturnLeftIcon className="w-5 h-5 mr-3" />
                        Reply
                      </div>
                      <div className="flex items-center justify-start text-black dark:text-white bg-white dark:bg-lightgray dark:hover:bg-darkgray p-2 hover:bg-gray-200 rounded-b-md">
                        <ExclamationCircleIcon className="w-5 h-5 mr-3" />
                        Report
                      </div>
                    </ul>
                  )}
                  {/* <EllipsisVerticalIcon onClick={() => setIsDropdownVisible(b => !b)} className='w-5 h-5 cursor-pointer' /> */}
                </div>
              </div>
            </div>
            <div className="flex flex-col border-l-[3px] my-2 pl-2 opacity-90">
              <p className="flex items-center justify-start text-sm">
                @User Name
              </p>
              <p className="flex items-center justify-start pt-2 text-sm">
                <Linkify componentDecorator={componentDecorator}>
                  test reply message
                </Linkify>
              </p>
              <div className="flex items-center justify-start mt-2">
                <img
                  src="/images/bg.jpg"
                  className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md"
                />
              </div>
            </div>
            <div className="flex text-sm md:text-base">
              My main reply message
            </div>
            <div className="relative flex items-center justify-start space-x-1 mt-1">
              <div className="absolute -left-7 -top-1 hidden group-hover:flex items-start justify-start bg-transparent rounded-md">
                {/* <div className='flex rounded-full p-1 h-full bg-white dark:bg-darkgray'>
                          <AddReactionRoundedIcon onClick={() => setShowReaction(!showReaction)} className="cursor-pointer text-orange-600 dark:text-pink-800" />
                        </div> */}

                {showReaction && (
                  <div className="absolute top-8 left-0">
                    <Picker
                      set="apple"
                      onEmojiSelect={addReaction}
                      theme="dark"
                      icons="outline"
                      previewPosition="none"
                      size="1em"
                      perLine="6"
                      maxFrequentRows="2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/profile"
            className="col-span-1 flex items-end justify-start"
          >
            <img
              src="/images/pfp/pfp1.jpg"
              className="object-cover h-10 w-10 rounded-full"
              alt=""
            />
          </Link>
        </div>
        <div className="grid grid-cols-10 md:grid-cols-12">
          <div
            onClick={() => removeReaction()}
            className={`flex items-center place-self-end w-fit col-span-9 md:col-span-11 p-1 px-2 mr-2 bg-orange-400 hover:bg-orange-500 dark:bg-[#61045F] dark:hover:bg-[#AA076B] rounded-md cursor-pointer ${
              reaction ? "inline" : "hidden"
            }`}
          >
            <input
              value={reaction}
              onChange={(e: any) => setReaction(e.target.value)}
              className="bg-transparent cursor-pointer w-6 text-sm"
              disabled
            />
            <p className="text-xs font-bold text-white">4</p>
          </div>
          <div className="col-span-1 flex items-end justify-end"></div>
        </div>
      </div>
    </>
  ) : (
    <div key={message?.id} className="grid grid-cols-10 md:grid-cols-12 mb-2">
      <Link
        className="col-span-1 flex items-end justify-end"
        href={{
          pathname: "/dashboard/profile",
          query: {
            user_id: !isEmpty(receiver) ? receiver?.id : message?.otherUser?.id,
          },
        }}
        as={`/dashboard/profile?${encodeQuery(
          !isEmpty(receiver) ? receiver?.id : message?.otherUser?.id,
          "profile"
        )}`}
      >
        <img
          src={
            !isEmpty(receiver?.profilePic)
              ? `${config.url.PUBLIC_URL}/${receiver?.profilePic?.name}`
              : !isEmpty(message?.otherUser?.profilePic)
              ? `${config.url.PUBLIC_URL}/${message?.otherUser?.profilePic?.name}`
              : "/images/pfp/pfp1.jpg"
          }
          className="object-cover h-10 w-10 rounded-full flex"
          alt=""
        />
      </Link>
      <div className="flex flex-col place-self-start w-fit col-span-9 md:col-span-11 mx-2 py-3 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#606c88] dark:to-[#3f4c6b] rounded-br-xl rounded-tr-xl rounded-tl-xl text-white">
        <div className="flex items-center justify-between w-full text-xm font-semibold space-x-20">
          <Link
            href={{
              pathname: "/dashboard/profile",
              query: {
                user_id: !isEmpty(receiver)
                  ? receiver?.id
                  : message?.otherUser?.id,
              },
            }}
            as={`/dashboard/profile?${encodeQuery(
              !isEmpty(receiver) ? receiver?.id : message?.otherUser?.id,
              "profile"
            )}`}
            className="text-sm md:text-base"
          >
            @{!isEmpty(receiver) ? receiver?.name : message?.otherUser?.name}
          </Link>
          <p className="pl-2 text-sm md:text-base">
            {moment(message?.createdAt).format("YY-MM-DD HH:mm")}
          </p>
        </div>
        <p className="flex items-center justify-start py-2 text-sm md:text-base">
          <Linkify componentDecorator={componentDecorator}>
            {message?.content}
          </Linkify>
        </p>
        {message?.imgName != null && (
          <div className="flex items-center justify-start">
            <img
              src={`${config.url.PUBLIC_URL}/${message?.imgName}`}
              className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md"
            />
          </div>
        )}
        {message?.gif != null && (
          <div className="flex items-center justify-start">
            <img
              src={message?.gif}
              className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
}
