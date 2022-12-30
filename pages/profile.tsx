import Head from 'next/head'
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Widgets from '../components/Widgets/Widgets';
import Navbar from '../components/Navbar/Navbar';
import ProfilePage from '../components/Profile/ProfilePage';

function profile() {
  return (
    <div className='bg-white dark:bg-darkgray grid grid-cols-9 mx-auto h-screen overflow-hidden'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Navbar />
      <Sidebar />
      <ProfilePage />
      <Widgets />
    </div>

  )
}

export default profile