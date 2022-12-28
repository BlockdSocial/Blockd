import Head from 'next/head'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar/Navbar'
import NotificationsPage from '../components/Notifications/NotificationsPage'
import Sidebar from '../components/Sidebar/Sidebar'
import Widgets from '../components/Widgets/Widgets'

function notifications() {
  return (
    <div className=' bg-white dark:bg-darkgray mx-auto max-h-screen h-screen overflow-hidden pb-20'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <main className='h-full grid grid-cols-9 xl:max-w-6xl mx-auto'>
        <Sidebar />
        <NotificationsPage />
        <Widgets />
      </main>
    </div>
  )
}

export default notifications