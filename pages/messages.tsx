import Head from 'next/head'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Messages from '../components/messages'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgets from '../components/Widgets/Widgets'

function messages() {
  return (
    <div className=' bg-white dark:bg-darkgray mx-auto max-h-screen h-screen overflow-hidden pb-20'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <main className='h-full grid grid-cols-9 xl:max-w-6xl mx-auto'>
        <Sidebar />
        <Messages />
        <Widgets />
      </main>
    </div>
  )
}

export default messages