import Head from 'next/head'
import React from 'react'
import Chatbar from '../components/ChatRoom/Chatbar'
import Chatbox from '../components/ChatRoom/Chatbox'
import Sidebar from '../components/ChatRoom/Sidebar/Sidebar'
import Widget from '../components/ChatRoom/Widget'
import Navbar from '../components/Navbar/Navbar'

function chatroom() {
  return (
    <div className=' bg-white dark:bg-darkgray mx-auto max-h-screen h-screen overflow-hidden pb-20'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Navbar />
      <main className='h-full grid grid-cols-10 mx-auto'>
        <Sidebar />
        <Chatbar />
        <Chatbox />
        <Widget />
      </main>
    </div>
  )
}

export default chatroom