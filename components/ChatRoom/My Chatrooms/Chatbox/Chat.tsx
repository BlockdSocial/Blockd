import React, { useState, useEffect, useRef } from "react";
import {
  FaceSmileIcon,
  ArrowUturnLeftIcon,
  EllipsisVerticalIcon,
  ExclamationCircleIcon,
  TrashIcon,
  EyeDropperIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import moment from "moment";
import { config } from "../../../../constants";

import AddReactionRoundedIcon from "@mui/icons-material/AddReactionRounded";

import Picker from "@emoji-mart/react";

import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import { isEmpty } from "lodash";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  fetchChatroomMessages,
  fetchMessages,
} from "../../../../stores/chat/ChatActions";
import { useChannel } from "@ably-labs/react-hooks";
import { fetchAuthUser } from "../../../../stores/authUser/AuthUserActions";
import Linkify from "react-linkify";

export default function Chat({
  receiver,
  messages,
  room,
  elementRef,
  handleScroll,
  chats,
  setReceiver,
  setRoom,
  chatrooms,
}: any) {
  const dispatch = useAppDispatch();

  const { authUser } = useAppSelector((state) => state.authUserReducer);

  let [showReaction, setShowReaction] = useState<boolean>(false);
  let [reaction, setReaction] = useState<string>("");
  let [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const boxRef = useRef<any>(null);
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

  const scrollToBottom = () => {
    boxRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  let [atTop, setAtTop] = useState<boolean>(false);
  const [endCount, setEndCount] = useState<number>(4);
  const [endTotal, setEndTotal] = useState<number>(4);
  const [messages2, setMessages2] = useState<any>();
  const { isFetchingMessages, error } = useAppSelector(
    (state) => state.chatReducer
  );
  const ref = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    if (!isEmpty(receiver)) {
      getMessages();
      ref.current = receiver;
    }
    if (!isEmpty(room)) {
      fetchRoomMessages();
      ref.current = room;
    }
  }, [receiver, room]);

  const [message] = useChannel(
    `messageNotifications-${authUser.id}`,
    (message) => {
      updateMessages();
    }
  );

  const [roomMessage] = useChannel(
    `roomNotification-${room?.room?.name}`,
    (message) => {
      updateRoomMessages();
    }
  );

  useEffect(() => {
    scrollToBottom();
    // console.log('hello');
    // const handleScroll = () => {
    //   if (boxRef?.current?.scrollTop !== 0) {
    //     atTop = true;
    //     setAtTop(atTop);
    //   } else {
    //     atTop = false;
    //     setAtTop(atTop);
    //   }
    // };
    // boxRef?.current?.addEventListener("scroll", handleScroll);
    // return () => {
    //   boxRef?.current?.removeEventListener("scroll", handleScroll);
    // };
  }, [messages, messages2]);

  const getMessages = async () => {
    if (!isEmpty(receiver)) {
      await dispatch(
        fetchMessages({
          receiver_id: receiver?.id,
          start: 0,
          end: 100,
        })
      ).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages2(result?.messages);
      });
    }
  };

  const fetchRoomMessages = async () => {
    if (!isEmpty(room)) {
      await dispatch(
        fetchChatroomMessages(room?.roomId, {
          start: 0,
          end: 100,
        })
      ).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages2(result?.messages);
      });
    }
  };

  const updateRoomMessages = async () => {
    await dispatch(
      fetchChatroomMessages(room?.roomId, {
        start: 0,
        end: 100,
      })
    ).then((result: any) => {
      setMessages2(result?.messages);
    });
  };

  const updateMessages = async () => {
    await dispatch(
      fetchMessages({
        receiver_id: ref.current?.id,
        start: 0,
        end: 100,
      })
    ).then((result: any) => {
      setMessages2(result?.messages);
    });
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

  return (
    <div
      onScrollCapture={(e: any) => handleScroll(e)}
      className={`relative ${
        isEmpty(chats) && isEmpty(chatrooms)
          ? "overflow-hidden"
          : "scrollbar-hide overflow-scroll"
      }  h-[92vh] dark:bg-darkgray z-0`}
      id="test"
    >
      <div className="sticky top-0 z-50 bg-white">
        <Navbar
          receiver={receiver}
          room={room}
          chats={chats}
          setReceiver={setReceiver}
          setRoom={setRoom}
        />
      </div>

      {isEmpty(chats) && isEmpty(chatrooms) && (
        <div className="absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center">
          <img
            src="/images/badges/no-message.webp"
            className="object-contain max-w-[300px]"
          />
          <p className="p-2 rounded-full w-fit px-4 bg-gray-200 dark:bg-lightgray">
            No Messages Yet !
          </p>
        </div>
      )}
      <div className="py-2 h-[78vh] scrollbar-hide overflow-scroll">
        {!isEmpty(messages2) &&
          messages2.map((message: any, index: any) =>
            message?.userId == authUser?.id ? (
              <div key={index} className="relative flex flex-col">
                <div className="grid grid-cols-10 md:grid-cols-12 mb-2">
                  <div className="flex flex-col place-self-end w-fit col-span-9 md:col-span-11 mx-2 py-2 px-2 bg-gradient-to-r from-[#FF512F] to-[#F09819] dark:from-[#AA076B] dark:to-[#61045F] rounded-bl-xl rounded-tl-xl rounded-tr-xl text-white group">
                    <div className="flex space-x-20 relative z-0 items-center justify-between w-full text-xm font-semibold">
                      <div>
                        <p className="text-sm md:text-base">
                          @{authUser?.name}
                        </p>
                      </div>
                      <div className="relative z-0 flex items-center justify-end space-x-2 pl-2">
                        <p className="text-sm md:text-base">
                          {moment(message?.createdAt).format("YY-MM-DD HH:mm")}
                        </p>
                        <div
                          ref={dropdown}
                          className="flex relative rounded-md"
                        >
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
                  <div className="col-span-1 flex items-end justify-start">
                    <img
                      src={
                        !isEmpty(authUser?.profilePic)
                          ? `${config.url.PUBLIC_URL}/${authUser?.profilePic?.name}`
                          : "/images/pfp/pfp1.jpg"
                      }
                      className="object-cover h-10 w-10 rounded-full"
                      alt=""
                    />
                  </div>
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
            ) : (
              <div
                key={index}
                className="grid grid-cols-10 md:grid-cols-12 mb-2"
              >
                <div className="col-span-1 flex items-end justify-end">
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
                </div>
                <div className="flex flex-col place-self-start w-fit col-span-9 md:col-span-11 mx-2 py-3 px-4 bg-gradient-to-r from-darkblue to-[#363357] dark:from-[#606c88] dark:to-[#3f4c6b] rounded-br-xl rounded-tr-xl rounded-tl-xl text-white">
                  <div className="flex items-center justify-between w-full text-xm font-semibold space-x-20">
                    <p className="text-sm md:text-base">
                      @
                      {!isEmpty(receiver)
                        ? receiver?.name
                        : message?.otherUser?.name}
                    </p>
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
            )
          )}
        <div ref={boxRef} />
      </div>
      <div className="absolute bottom-0 w-full">
        {(!isEmpty(receiver) || !isEmpty(room)) && (
          <Footer
            receiver={receiver}
            room={room}
            messages={messages2}
            getMessages={getMessages}
            fetchRoomMessages={fetchRoomMessages}
          />
        )}
      </div>
    </div>
  );
}
