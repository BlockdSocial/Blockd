import Head from 'next/head'
import React, { useEffect, useState, useCallback } from 'react'
import Chatbar from '../../components/ChatRoom/My Chatrooms/Chatbar/Chatbar'
import Chatbox from '../../components/ChatRoom/My Chatrooms/Chatbox/Chatbox'
import Sidebar from '../../components/ChatRoom/My Chatrooms/Sidebar/Sidebar'
import Widget from '../../components/ChatRoom/My Chatrooms/Widget/Widget'
import Navbar from '../../components/Navbar/Navbar'
import { createChat, fetchChat } from '../../stores/chat/ChatActions'
import { useAppDispatch, useAppSelector } from '../../stores/hooks'
import { useRouter } from "next/router";
import { isEmpty } from 'lodash'
import { fetchUser } from '../../stores/user/UserActions'

function chatroom() {
  const dispatch = useAppDispatch();
  // const { chats } = useAppSelector((state) => state.chatReducer);
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const [chats, setChats] = useState<any>();
  const [receiver, setReceiver] = useState<any>();
  const router = useRouter();
  const { chatReceiverId } = router.query;

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    handleSetReceiver();
  }, [chatReceiverId]);

  const fetchChats = async () => {
    await dispatch(fetchChat()).then((result) => {
      setChats(result);
    });
  };

  console.log('checkChat: ', chats);

  const handleSetReceiver = useCallback(async () => {

    await dispatch(fetchUser(chatReceiverId)).then((result: any) => {
      setReceiver(result);
    });
  }, []);

  console.log('receiver: ', receiver);

  return (
    <div className='bg-white dark:bg-darkgray flex flex-col items-center mx-auto h-screen'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Navbar />
      <div className='bg-white dark:bg-darkgray grid lg:max-w-7xl grid-cols-12 mx-auto overflow-hidden w-full'>
        <Sidebar />
        <Chatbar />
        <Chatbox receiver={receiver} />
        <Widget chats={chats} setReceiver={setReceiver} />
      </div>
    </div>
  )
}

export default chatroom