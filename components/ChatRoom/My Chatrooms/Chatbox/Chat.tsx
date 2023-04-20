import React, { useState, useEffect, useRef } from "react";

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
import useWindowDimensions, { encodeQuery } from "../../../../utils";
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
  fetchRooms,
}: any) {
  const dispatch = useAppDispatch();

  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { isFetchingChatroomMessages } = useAppSelector((state) => state.chatReducer);
  const [load, setLoad] = useState<boolean>(true);

  let [showReaction, setShowReaction] = useState<boolean>(false);
  let [reaction, setReaction] = useState<string>("");
  let [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [reply, setReply] = useState<boolean>(false);
  const [replyMessage, setReplyMessage] = useState<any>();
  const boxRef = useRef<any>(null);
  const boxRef2 = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const [fullScreenImage, setFullScreenImage] = useState<boolean>(false);

  let { height, width } = useWindowDimensions();

  height = height - 56 - 56

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
  const [endCount, setEndCount] = useState<number>(9);
  const [endTotal, setEndTotal] = useState<number>(9);
  const [messages2, setMessages2] = useState<any>();
  const { isFetchingMessages, error } = useAppSelector(
    (state) => state.chatReducer
  );
  const ref = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

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
      if (!isEmpty(room)) {
        fetchRoomMessages();
      } else {
        console.log('test');
        getMessages();
      }
    }
  );

  useEffect(() => {
    if (load) {
      scrollToBottom();
    }
  }, [messages, messages2]);

  console.log('receiver222: ', receiver);


  const getMessages = async () => {
    console.log('receiver: ', receiver);
    if (!isEmpty(receiver)) {
      console.log('test2');
      await dispatch(
        fetchMessages({
          receiver_id: receiver?.id,
          start: 0,
          end: 10,
        })
      ).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages2(result?.messages.reverse());
        scrollToBottom();
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
        setMessages2(result?.messages.reverse());
        scrollToBottom();
      });
    }
  };

  const updateRoomMessages = async () => {
    await dispatch(
      fetchChatroomMessages(room?.roomId, {
        start: 0,
        end: 200,
      })
    ).then((result: any) => {
      setMessages2(result?.messages);
    });
  };

  const updateMessages = async (start: number, end: number) => {
    setLoad(false);
    if (isEmpty(room)) {
      await dispatch(
        fetchMessages({
          receiver_id: ref.current?.id,
          start: start,
          end: end,
        })
      ).then((result: any) => {
        const newMessages = result?.messages?.reverse()?.concat(messages2);
        setEndTotal(result?.total);
        setMessages2(newMessages);
      });
    } else {
      await dispatch(
        fetchChatroomMessages(ref?.current?.roomId, {
          start: start,
          end: end,
        })
      ).then((result: any) => {
        console.log('result: ', result);
        const newMessages = result?.messages?.reverse()?.concat(messages2);
        setEndTotal(result?.total);
        setMessages2(newMessages);
      });
    }
  };

  const handleScroll2 = async () => {
    if (boxRef2.current) {
      const { scrollTop, scrollHeight, clientHeight } = boxRef2.current;
      if (
        scrollTop === 0
      ) {
        if (!isFetchingChatroomMessages) {
          if (endTotal == 0) {
            return;
          } else {
            await updateMessages(endCount + 1, endCount + 9);
            setEndCount(endCount + 9);
          }
        }
      }
    }
  };

  return (
    <div
      onScrollCapture={() => handleScroll2()}
      className={`flex flex-col relative ${isEmpty(chats) && isEmpty(chatrooms)
        ? "overflow-hidden"
        : "scrollbar-hide overflow-scroll"
        } h-[92vh] dark:bg-darkgray z-0`}
      id="test"
    >
      <Navbar
        receiver={receiver}
        room={room}
        chats={chats}
        setReceiver={setReceiver}
        setRoom={setRoom}
        fetchRooms={fetchRooms}
        setMessages2={setMessages2}
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
        {isFetchingChatroomMessages && (
          <p className="flex items-center justify-center space-x-3 p-4">
            Loading ...
          </p>
        )}
        {!isEmpty(messages2) &&
          messages2.map((message: any, index: any) => (
            <Message
              key={index}
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
            setLoad={setLoad}
          />
        )}
      </div>
    </div>
  );
}
