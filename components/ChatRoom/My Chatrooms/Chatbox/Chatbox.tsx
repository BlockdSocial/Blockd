import React, { useState, useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Chat from './Chat'
import Footer from './Footer'
import { isEmpty } from 'lodash';
import { useAppDispatch, useAppSelector } from '../../../../stores/hooks';
import { fetchMessages } from '../../../../stores/chat/ChatActions';

function Chatbox({ receiver }: any) {
  const dispatch = useAppDispatch();
  const elementRef = useRef<any>(null);
  let [atTop, setAtTop] = useState<boolean>(false);
  const [endCount, setEndCount] = useState<number>(4);
  const [endTotal, setEndTotal] = useState<number>(4);
  const [messages, setMessages] = useState<any>();
  const { isFetchingMessages } = useAppSelector((state) => state.chatReducer);

  useEffect(() => {
    if (!isEmpty(receiver)) {
      getMessages();
    }
  }, [receiver]);

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
        end: 10
      })).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages(result?.messages);
      });
    }
  }

  const updateMessages = async (start: number, end: number) => {
    await dispatch(fetchMessages({
      start: start,
      end: end
    })).then((result: any) => {
      const newMessages = messages?.concat(result?.messages);
      setEndTotal(result?.total)
      setMessages(newMessages);
    });
  };

  const handleScroll = async (e: any) => {
    // console.log(e);
    if (elementRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
      if (scrollTop + clientHeight === scrollHeight || scrollTop + clientHeight === scrollHeight - 0.5) {

        if (!isFetchingMessages) {
          if (endTotal < 10) {

            return;

          } else {
            updateMessages(endCount + 1, endCount + 10);
            setEndCount(endCount + 10);
          }
        }
      }
    }
  }

  return (
    <div
      className='flex min-h-screen pb-14 flex-col col-span-10 relative md:col-span-9 lg:col-span-7 xl:col-span-7 border-r dark:border-lightgray'
      onScrollCapture={(e) => handleScroll(e)}
      ref={elementRef}
    >
      <Navbar />
      <Chat receiver={receiver} messages={messages} />
      <Footer
        receiver={receiver}
        messages={messages}
        getMessages={getMessages}
      />
    </div>
  )
}

export default Chatbox