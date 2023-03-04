import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Chat from './Chat'
import Footer from './Footer'
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../../stores/hooks';
import { fetchMessages } from '../../../../stores/chat/ChatActions';

function Chatbox({ receiver }: any) {
  const dispatch = useAppDispatch();
  const { messages } = useAppSelector((state) => state.chatReducer);

  useEffect(() => {
    if (!isEmpty(receiver)) {
      getMessages();
    }
  }, [receiver]);

  const getMessages = async () => {
    if (!isEmpty(receiver)) {
      await dispatch(fetchMessages({
        receiver_id: receiver?.id,
        start: 0,
        end: 10
      }));
    }
  }

  return (
    <div className='flex min-h-screen pb-14 flex-col col-span-10 relative md:col-span-9 lg:col-span-7 xl:col-span-7 border-r dark:border-lightgray'>
      <Navbar />
      <Chat receiver={receiver} messages={messages} />
      <Footer receiver={receiver} messages={messages} />
    </div>
  )
}

export default Chatbox