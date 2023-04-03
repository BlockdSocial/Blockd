import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Chat from "./Chat";
import Footer from "./Footer";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import { fetchChatroomMessages, fetchMessages } from "../../../../stores/chat/ChatActions";
import { useChannel } from "@ably-labs/react-hooks";
import { fetchAuthUser } from "../../../../stores/authUser/AuthUserActions";
import { toast } from "react-hot-toast";

function Chatbox({ receiver, chats, setReceiver, room, chatrooms, setRoom }: any) {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const elementRef = useRef<any>(null);
  let [atTop, setAtTop] = useState<boolean>(false);
  const [endCount, setEndCount] = useState<number>(4);
  const [endTotal, setEndTotal] = useState<number>(4);
  const [messages, setMessages] = useState<any>();
  const { isFetchingMessages, error } = useAppSelector((state) => state.chatReducer);
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
    `messageNotification-${authUser.id}`,
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
    const handleScroll = () => {
      if (elementRef?.current?.scrollTop !== 0) {
        atTop = true;
        setAtTop(atTop);
      } else {
        atTop = false;
        setAtTop(atTop);
      }
    };
    elementRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      elementRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        setMessages(result?.messages);
      });
    }
  };

  const fetchRoomMessages = async () => {
    if (!isEmpty(room)) {
      await dispatch(
        fetchChatroomMessages(room?.roomId, {
          start: 0,
          end: 100
        })
      ).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages(result?.messages);
      })
    }
  }

  const updateRoomMessages = async () => {
    await dispatch(
      fetchChatroomMessages(room?.roomId, {
        start: 0,
        end: 100
      })
    ).then((result: any) => {
      setMessages(result?.messages);
    });
  }

  const updateMessages = async () => {
    await dispatch(
      fetchMessages({
        receiver_id: ref.current?.id,
        start: 0,
        end: 100,
      })
    ).then((result: any) => {
      setMessages(result?.messages);
    });
  };

  const handleScroll = async (e: any) => {
    // console.log(e);
    // if (elementRef.current) {
    //   const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
    //   console.log('scrollTop: ', scrollTop);
    //   console.log('clientHeight: ', clientHeight);
    //   if (scrollTop === 0) {
    //     if (!isFetchingMessages) {
    //       if (endTotal < 10) {
    //         return;
    //       } else {
    //         updateMessages(endCount + 1, endCount + 10);
    //         setEndCount(endCount + 10);
    //       }
    //     }
    //   }
    // }
  };

  return (
    <div className="flex min-h-[92vh] flex-col col-span-8 md:col-span-7 lg:col-span-5 relative border-r dark:border-lightgray">
      {/* {<Navbar room={room} receiver={receiver} chats={chats} setReceiver={setReceiver} setRoom={setRoom} />} */}
      <Chat
        receiver={receiver}
        room={room}
        messages={messages}
        elementRef={elementRef}
        handleScroll={handleScroll}
      />
      {
        isEmpty(chats) && isEmpty(chatrooms) &&
        <div className="flex flex-col items-center justify-start">
          <img
            src="/images/badges/no-message.webp"
            className="object-contain max-w-[300px]"
          />
          <p className="p-2 rounded-full px-4 bg-gray-200 dark:bg-lightgray">
            No Messages Yet !
          </p>
        </div>
      }
      {/* {(!isEmpty(receiver) || !isEmpty(room)) && (
        <Footer
          receiver={receiver}
          room={room}
          messages={messages}
          getMessages={getMessages}
          fetchRoomMessages={fetchRoomMessages}
        />
      )} */}
    </div>
  );
}

export default Chatbox;
