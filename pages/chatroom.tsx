import Head from 'next/head'
import React from 'react'
import Chatbar from '../components/ChatRoom/Chatbar/Chatbar'
import Chatbox from '../components/ChatRoom/Chatbox'
import Sidebar from '../components/ChatRoom/Sidebar/Sidebar'
import Widget from '../components/ChatRoom/Widget'
import Navbar from '../components/Navbar/Navbar'

function chatroom() {
  return (
    <div className='bg-white dark:bg-darkgray grid grid-cols-12 mx-auto overflow-hidden h-screen'>
        <Head>
          <title>Blockd</title>
        </Head>
        <Navbar />
        <Sidebar />
        <Chatbar />
        <Chatbox />
        <Widget />
    </div>
  )
}

export default chatroom