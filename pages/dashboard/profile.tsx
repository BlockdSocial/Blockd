import Head from 'next/head'
import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import Widgets from '../../components/Widgets/Widgets';
import Navbar from '../../components/Navbar/Navbar';
import ProfilePage from '../../components/Profile/ProfilePage';
import { Toaster } from "react-hot-toast";

function profile() {
  return (
    <div className='bg-white dark:bg-darkgray flex flex-col items-center justify-center mx-auto h-screen overflow-hidden'>
      <Toaster/>
      <Head>
        <title>Blockd</title>
      </Head>
      <Navbar />
      <div className='bg-white dark:bg-darkgray grid grid-cols-9 mx-auto lg:max-w-7xl overflow-hidden w-full'>
        <Sidebar />
        <ProfilePage />
        <Widgets />
      </div>
    </div>

  )
}

export default profile