import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Chat from './Chat'
import Footer from './Footer'
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../../stores/hooks';
import { fetchMessages } from '../../../../stores/chat/ChatActions';
import { useChannel } from '@ably-labs/react-hooks';
import { fetchAuthUser } from '../../../../stores/authUser/AuthUserActions';

function Chatbox({ receiver }: any) {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const elementRef = useRef<any>(null);
  let [atTop, setAtTop] = useState<boolean>(false);
  const [endCount, setEndCount] = useState<number>(4);
  const [endTotal, setEndTotal] = useState<number>(4);
  const [messages, setMessages] = useState<any>();
  const { isFetchingMessages } = useAppSelector((state) => state.chatReducer);
  const ref = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  useEffect(() => {
    if (!isEmpty(receiver)) {
      getMessages();
    }
    ref.current = receiver;
  }, [receiver]);

  const [message] = useChannel(`messageNotification-${authUser.id}`, (message) => {
    console.log(message);
    console.log(authUser);

    updateMessages();
  });


  useEffect(() => {
    const handleScroll = () => {
      if (elementRef?.current?.scrollTop !== 0) {
        atTop = true
        setAtTop(atTop);
      } else {
        atTop = false
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
      await dispatch(fetchMessages({
        receiver_id: receiver?.id,
        start: 0,
        end: 100
      })).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages(result?.messages);
      });
    }
  }

  const updateMessages = async () => {
    await dispatch(fetchMessages({
      receiver_id: ref.current?.id,
      start: 0,
      end: 100
    })).then((result: any) => {
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
  }

  return (
    <div
      className='flex min-h-screen flex-col col-span-10 relative md:col-span-9 lg:col-span-7 xl:col-span-7 border-r dark:border-lightgray'
    >
      {
        !isEmpty(receiver) &&
        <Navbar
          receiver={receiver}
        />
      }
      <Chat
        receiver={receiver}
        messages={messages}
        elementRef={elementRef}
        handleScroll={handleScroll}
      />
      <Footer
        receiver={receiver}
        messages={messages}
        getMessages={getMessages}
      />
    </div>
  )
}

export default Chatbox