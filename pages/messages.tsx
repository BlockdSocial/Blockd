import Head from 'next/head'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import MessagesPage from '../components/Messages/MessagesPage'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgets from '../components/Widgets/Widgets'

function messages() {
  return (
    <div className='bg-white dark:bg-darkgray grid grid-cols-9 mx-auto h-screen overflow-hidden'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <Sidebar />
      <MessagesPage />
      <Widgets />
    </div>
  )
}

export default messages