import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUturnLeftIcon,
  EllipsisVerticalIcon,
  ExclamationCircleIcon,
  TrashIcon,
  EyeDropperIcon,
  DocumentDuplicateIcon,
  FaceSmileIcon,
} from "@heroicons/react/24/outline";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import moment from "moment";
import { config } from "../../../../constants";

import Picker from "@emoji-mart/react";

import { useAppSelector } from "../../../../stores/hooks";
import { isEmpty } from "lodash";
import Linkify from "react-linkify";
import Link from "next/link";
import { encodeQuery, renderComment2 } from "../../../../utils";
// @ts-ignore
import renderHTML from "react-render-html";
import Modal from "./Modal";

export default function Message({
  setReply,
  receiver,
  message,
  setReplyMessage,
  setRepliedUser,
}: any) {
  const { authUser } = useAppSelector((state) => state.authUserReducer);

  let [showReaction, setShowReaction] = useState<boolean>(false);
  let [reaction, setReaction] = useState<string>("");
  let [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [fullScreenImage1, setFullScreenImage1] = useState<boolean>(false);
  const [fullScreenImage2, setFullScreenImage2] = useState<boolean>(false);
  const [fullScreenImage3, setFullScreenImage3] = useState<boolean>(false);
  const [fullScreenImage4, setFullScreenImage4] = useState<boolean>(false);
  const [fullScreenImage5, setFullScreenImage5] = useState<boolean>(false);
  const [fullScreenImage6, setFullScreenImage6] = useState<boolean>(false);
  const [fullScreenImage7, setFullScreenImage7] = useState<boolean>(false);
  const [fullScreenImage8, setFullScreenImage8] = useState<boolean>(false);
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
      <div className="flex flex-col w-full items-end justify-end mt-6 pr-4">
        <div className="flex flex-col min-w-[80%] max-w-[100%] lg:min-w-[40%] lg:max-w-[70%] space-y-2">
          <div className="flex w-full space-x-8 items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {moment(message?.createdAt).format("YY-MM-DD HH:mm")}
            </p>
            <div className="flex items-center justify-center space-x-2">
              <p className="text-sm dark:text-white font-normal">You</p>
              <Link
                href="/dashboard/profile"
                className="flex items-end justify-start"
              >
                <img
                  src={
                    !isEmpty(authUser?.profilePic)
                      ? `${config.url.PUBLIC_URL}/${authUser?.profilePic?.name}`
                      : "/images/pfp/pfp1.jpg"
                  }
                  className="object-cover h-7 w-7 lg:h-10 lg:w-10 rounded-full"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="flex flex-col w-full py-2 px-4 bg-gradient-to-r from-[#FF512F] to-[#F09819] dark:from-[#AA076B] dark:to-[#61045F] rounded-bl-3xl rounded-tl-3xl rounded-br-xl text-white group">
            {message?.repliedMessageId && (
              <div className="flex flex-col border-r-[3px] border-white mt-2 p-2 rounded-bl-3xl rounded-tl-3xl bg-gray-200/20">
                {!isEmpty(message?.originMessage?.content) && (
                  <p className="py-1 text-sm">
                    <Linkify componentDecorator={componentDecorator}>
                      {renderHTML(
                        renderComment2(message?.originMessage?.content)
                      )}
                    </Linkify>
                  </p>
                )}
                <div className="flex items-center justify-start">
                  {message?.originMessage?.imgName != null && (
                    <>
                      <img
                        src={`${config.url.PUBLIC_URL}/${message?.originMessage?.imgName}`}
                        className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md cursor-pointer rounded-bl-3xl rounded-tl-3xl"
                        onClick={() => setFullScreenImage1(!fullScreenImage1)}
                      />
                      <Modal
                        fullScreenImage={fullScreenImage1}
                        setFullScreenImage={setFullScreenImage1}
                        src={`${config.url.PUBLIC_URL}/${message?.originMessage?.imgName}`}
                      />
                    </>
                  )}
                  {message?.originMessage?.gif != null && (
                    <>
                      <img
                        src={message?.originMessage?.gif}
                        className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md cursor-pointer rounded-bl-3xl rounded-tl-3xl"
                        onClick={() => setFullScreenImage2(!fullScreenImage2)}
                      />
                      <Modal
                        fullScreenImage={fullScreenImage2}
                        setFullScreenImage={setFullScreenImage2}
                        src={message?.originMessage?.gif}
                      />
                    </>
                  )}
                </div>
              </div>
            )}
            {!isEmpty(message?.content) && (
              <p className="py-2 text-sm whitespace-normal break-words">
                <Linkify componentDecorator={componentDecorator}>
                  {renderHTML(renderComment2(message?.content))}
                </Linkify>
              </p>
            )}
            {message?.imgName != null && (
              <>
                <div className="flex items-center justify-start my-2">
                  <img
                    src={`${config.url.PUBLIC_URL}/${message?.imgName}`}
                    className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md cursor-pointer"
                    onClick={() => setFullScreenImage3(!fullScreenImage3)}
                  />
                </div>
                <Modal
                  fullScreenImage={fullScreenImage3}
                  setFullScreenImage={setFullScreenImage3}
                  src={`${config.url.PUBLIC_URL}/${message?.imgName}`}
                />
              </>
            )}
            {message?.gif != null && (
              <>
                <div className="flex items-center justify-start my-2">
                  <img
                    src={message?.gif}
                    className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md cursor-pointer"
                    onClick={() => setFullScreenImage4(!fullScreenImage4)}
                  />
                </div>
                <Modal
                  fullScreenImage={fullScreenImage4}
                  setFullScreenImage={setFullScreenImage4}
                  src={message?.gif}
                />
              </>
            )}
          </div>
          <div className="flex items-center justify-end">
            {/* TODO HUSSEIN ADD TO BACKEDN */}
            {/* <div className="flex items-center justify-center space-x-2 relative">
              <div
                onClick={() => setShowReaction(!showReaction)}
                className="flex items-center justify-center p-1 rounded-3xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-500/40 dark:hover:bg-gray-500/80 cursor-pointer"
              >
                <FaceSmileIcon className="w-4 h-4" />
              </div>
              {showReaction && (
                <div className="absolute top-8 left-0 z-50">
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
              <div
                onClick={() => removeReaction()}
                className={`flex items-center justify-center px-2 rounded-3xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-500/40 dark:hover:bg-gray-500/80 cursor-pointer ${
                  reaction ? "inline" : "hidden"
                }`}
              >
                <input
                  value={reaction}
                  onChange={(e: any) => setReaction(e.target.value)}
                  className="bg-transparent cursor-pointer w-5 text-base"
                  disabled
                />
                <p className="text-xs font-bold text-white">7</p>
              </div>
            </div> */}
            <div
              onClick={() => {
                setReply(true),
                  setReplyMessage(message),
                  setRepliedUser(receiver?.name);
              }}
              className="flex items-center justify-center space-x-2 rounded-3xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-500/40 dark:hover:bg-gray-500/80 px-2 p-1 cursor-pointer"
            >
              <ArrowUturnLeftIcon className="w-3 h-3" />
              <p className="text-xs font-light">Reply</p>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="flex flex-col w-full items-start justify-start mt-6 pl-4">
      <div className="flex flex-col min-w-[40%] max-w-[100%] lg:max-w-[70%] space-y-2">
        <div className="flex w-full items-center justify-between space-x-8">
          <div className="flex items-center justify-center space-x-2">
            <Link
              className="col-span-1 flex items-end justify-end"
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
            >
              <img
                src={
                  !isEmpty(receiver?.profilePic)
                    ? `${config.url.PUBLIC_URL}/${receiver?.profilePic?.name}`
                    : !isEmpty(message?.otherUser?.profilePic)
                    ? `${config.url.PUBLIC_URL}/${message?.otherUser?.profilePic?.name}`
                    : "/images/pfp/pfp1.jpg"
                }
                className="object-cover w-7 h-7 lg:h-10 lg:w-10 rounded-full flex"
                alt=""
              />
            </Link>
            <p className="text-sm dark:text-white font-normal">
              @{!isEmpty(receiver) ? receiver?.name : message?.otherUser?.name}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {moment(message?.createdAt).format("YY-MM-DD HH:mm")}
          </p>
        </div>
        <div className="flex flex-col w-full py-2 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#606c88] dark:to-[#3f4c6b] rounded-bl-xl rounded-tr-3xl rounded-br-3xl text-white group">
          {message?.repliedMessageId && (
            <div className="flex flex-col border-l-[3px] border-white mt-2 p-2 rounded-[3px] rounded-tr-3xl rounded-br-3xl bg-gray-200/20">
              {!isEmpty(message?.originMessage?.content) && (
                <p className="py-1  text-sm">
                  <Linkify componentDecorator={componentDecorator}>
                    {renderHTML(
                      renderComment2(message?.originMessage?.content)
                    )}
                  </Linkify>
                </p>
              )}
              <div className="flex items-center justify-start">
                {message?.originMessage?.imgName != null && (
                  <>
                    <img
                      src={`${config.url.PUBLIC_URL}/${message?.originMessage?.imgName}`}
                      className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md cursor-pointer rounded-tr-3xl rounded-br-3xl"
                      onClick={() => setFullScreenImage5(!fullScreenImage5)}
                    />
                    <Modal
                      fullScreenImage={fullScreenImage5}
                      setFullScreenImage={setFullScreenImage5}
                      src={`${config.url.PUBLIC_URL}/${message?.originMessage?.imgName}`}
                    />
                  </>
                )}
                {message?.originMessage?.gif != null && (
                  <>
                    <img
                      src={message?.originMessage?.gif}
                      className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md cursor-pointer rounded-tr-3xl rounded-br-3xl"
                      onClick={() => setFullScreenImage6(!fullScreenImage6)}
                    />
                    <Modal
                      fullScreenImage={fullScreenImage6}
                      setFullScreenImage={setFullScreenImage6}
                      src={message?.originMessage?.gif}
                    />
                  </>
                )}
              </div>
            </div>
          )}
          {!isEmpty(message?.content) && (
            <p className=" py-2 text-sm whitespace-normal break-words">
              <Linkify componentDecorator={componentDecorator}>
                {renderHTML(renderComment2(message?.content))}
              </Linkify>
            </p>
          )}

          {message?.imgName != null && (
            <>
              <div className="flex items-center justify-start my-2">
                <img
                  src={`${config.url.PUBLIC_URL}/${message?.imgName}`}
                  className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md cursor-pointer"
                  onClick={() => setFullScreenImage7(!fullScreenImage7)}
                />
              </div>
              <Modal
                fullScreenImage={fullScreenImage7}
                setFullScreenImage={setFullScreenImage7}
                src={`${config.url.PUBLIC_URL}/${message?.imgName}`}
              />
            </>
          )}
          {message?.gif != null && (
            <>
              <div className="flex items-center justify-start my-2">
                <img
                  src={message?.gif}
                  className="object-contain md:max-h-[300px] md:max-w-[400px] rounded-md cursor-pointer"
                  onClick={() => setFullScreenImage8(!fullScreenImage8)}
                />
              </div>
              <Modal
                fullScreenImage={fullScreenImage8}
                setFullScreenImage={setFullScreenImage8}
                src={message?.gif}
              />
            </>
          )}
        </div>
        <div className="flex items-center justify-start">
          <div className="flex items-center justify-center space-x-2 relative">
            {/* <div
              onClick={() => setShowReaction(!showReaction)}
              className="flex items-center justify-center p-1 rounded-3xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-500/40 dark:hover:bg-gray-500/80 cursor-pointer"
            >
              <FaceSmileIcon className="w-4 h-4" />
            </div> */}
            {showReaction && (
              <div className="absolute top-8 left-0 z-50">
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
            <div
              onClick={() => removeReaction()}
              className={`flex items-center justify-center px-2 rounded-3xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-500/40 dark:hover:bg-gray-500/80 cursor-pointer ${
                reaction ? "inline" : "hidden"
              }`}
            >
              <input
                value={reaction}
                onChange={(e: any) => setReaction(e.target.value)}
                className="bg-transparent cursor-pointer w-5 text-base"
                disabled
              />
              <p className="text-xs font-bold text-white">7</p>
            </div>
          </div>
          <div
            onClick={() => {
              setReply(true),
                setReplyMessage(message),
                setRepliedUser(receiver?.name);
            }}
            className="flex items-center justify-center space-x-2 rounded-3xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-500/40 dark:hover:bg-gray-500/80 px-2 p-1 cursor-pointer"
          >
            <ArrowUturnLeftIcon className="w-3 h-3" />
            <p className="text-xs font-light">Reply</p>
          </div>
        </div>
      </div>
    </div>
  );
}
