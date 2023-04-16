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
import Link from "next/link";
import { encodeQuery } from "../../../../utils";
import Message from "./Message";

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
  const [reply, setReply] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<any>();
  const boxRef = useRef<any>(null);
  const boxRef2 = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const [fullScreenImage, setFullScreenImage] = useState<boolean>(false);

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
      console.log("message", message);
      updateMessages(message?.data?.type);
    }
  );

  useEffect(() => {
    scrollToBottom();
  }, [messages, messages2]);

  const getMessages = async () => {
    console.log("sdd");
    if (!isEmpty(receiver)) {
      await dispatch(
        fetchMessages({
          receiver_id: receiver?.id,
          start: 0,
          end: 200,
        })
      ).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages2(result?.messages);
      });
    }
  };

  const fetchRoomMessages = async () => {
    console.log("sddfetchRoomMessages");
    if (!isEmpty(room)) {
      await dispatch(
        fetchChatroomMessages(room?.roomId, {
          start: 0,
          end: 200,
        })
      ).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages2(result?.messages);
      });
    }
  };

  const updateRoomMessages = async () => {
    console.log("sddupdateRoomMessages");
    await dispatch(
      fetchChatroomMessages(room?.roomId, {
        start: 0,
        end: 200,
      })
    ).then((result: any) => {
      setMessages2(result?.messages);
    });
  };

  const updateMessages = async (type: any) => {
    if ("room" !== type) {
      await dispatch(
        fetchMessages({
          receiver_id: ref.current?.id,
          start: 0,
          end: 200,
        })
      ).then((result: any) => {
        setMessages2(result?.messages);
      });
    } else {
      await dispatch(
        fetchChatroomMessages(room?.roomId, {
          start: 0,
          end: 200,
        })
      ).then((result: any) => {
        setMessages2(result?.messages);
      });
    }
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
      className={`flex flex-col relative ${
        isEmpty(chats) && isEmpty(chatrooms)
          ? "overflow-hidden"
          : "scrollbar-hide overflow-scroll"
      }  h-[92vh] dark:bg-darkgray z-0`}
      id="test"
    >
      <Navbar
        receiver={receiver}
        room={room}
        chats={chats}
        setReceiver={setReceiver}
        setRoom={setRoom}
      />

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
      <div ref={boxRef2} className="p-2 md:p-0 flex-1 scrollbar-hide overflow-scroll">
        {!isEmpty(messages2) &&
          messages2.map((message: any) => (
            <Message
              key={message?.id}
              setReply={setReply}
              receiver={receiver}
              message={message}
              setReplyMessage={setReplyMessage}
            />
          ))}
        <div ref={boxRef} />
      </div>

      <div className="w-full">
        {(!isEmpty(receiver) || !isEmpty(room)) && (
          <Footer
            setReply={setReply}
            reply={reply}
            receiver={receiver}
            room={room}
            messages={messages2}
            getMessages={getMessages}
            fetchRoomMessages={fetchRoomMessages}
            replyMessage={replyMessage}
            setReplyMessage={setReplyMessage}
          />
        )}
      </div>
    </div>
  );
}
