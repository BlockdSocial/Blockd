import Head from 'next/head'
import React, { useEffect, useState, useCallback } from 'react'
import Chatbar from '../../components/ChatRoom/My Chatrooms/Chatbar/Chatbar'
import Chatbox from '../../components/ChatRoom/My Chatrooms/Chatbox/Chatbox'
import Sidebar from '../../components/ChatRoom/My Chatrooms/Sidebar/Sidebar'
import Widget from '../../components/ChatRoom/My Chatrooms/Widget/Widget'
import Navbar from '../../components/Navbar/Navbar'
import { createChat, fetchChat, fetchUserChatrooms } from '../../stores/chat/ChatActions'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from "next/router";
import { isEmpty } from 'lodash'
import { fetchUser } from '../../stores/user/UserActions'
import { toast } from 'react-hot-toast'

function chatroom() {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const [chats, setChats] = useState<any>();
  const [receiver, setReceiver] = useState<any>();
  const [room, setRoom] = useState<any>();
  const router = useRouter();
  const { chatReceiverId } = router.query;
  const roomChat = router.query.roomChat != undefined ? JSON.parse(router.query.roomChat as any) : null;
  const { chatrooms, error } = useAppSelector((state) => state.chatReducer);

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    fetchChats();
    handleFetchRooms();
  }, []);

  useEffect(() => {
    if (!isEmpty(roomChat)) {
      var selected = {};
      console.log('roomChat: ', roomChat);
      console.log('chatrooms: ', chatrooms);
      for (let i = 0; i < chatrooms.length; i++) {
        if (chatrooms[i].roomId === roomChat.id) {
          setRoom(chatrooms[i]);
          return;
        }
      }
      setRoom(selected);
    }
  }, [chatrooms]);

  useEffect(() => {
    handleSetReceiver();
  }, [chatReceiverId]);

  const fetchChats = async () => {
    await dispatch(fetchChat()).then((result) => {
      setChats(result);
    });
  };

  const handleFetchRooms = async () => {
    await dispatch(fetchUserChatrooms());
  }

  const handleSetReceiver = useCallback(async () => {

    if (!isEmpty(chatReceiverId)) {
      await dispatch(fetchUser(chatReceiverId)).then((result: any) => {
        setReceiver(result);
      });
    }
  }, []);

  return (
    <div className='bg-white dark:bg-darkgray flex flex-col items-center mx-auto h-screen'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Navbar />
      <div className='bg-white dark:bg-darkgray grid lg:max-w-7xl grid-cols-9 mx-auto overflow-hidden w-full flex-1'>
        <Sidebar />
        <Chatbar
          setRoom={setRoom}
          setReceiver={setReceiver}
          chatrooms={chatrooms}
        />
        <Chatbox
          receiver={receiver}
          chats={chats}
          room={room}
          setReceiver={setReceiver}
          chatrooms={chatrooms}
          setRoom={setRoom}
          fetchRooms={handleFetchRooms}
        />
        <Widget
          chats={chats}
          setReceiver={setReceiver}
          setRoom={setRoom}
          refetchChats={fetchChats}
        />
      </div>
    </div>
  )
}

export default chatroom