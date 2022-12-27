import Head from 'next/head'
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Widgets from '../components/Widgets/Widgets';
import Navbar from '../components/Navbar/Navbar';
import ProfilePage from '../components/Profile/ProfilePage';

function profile() {
    return (
        <div className='bg-white dark:bg-darkgray mx-auto max-h-screen h-screen overflow-hidden pb-20'>
          <Head>
            <title>Blockd</title>
          </Head>
          <Navbar />
          <main className='h-full grid grid-cols-9 xl:max-w-6xl mx-auto'>
            <Sidebar />
            <ProfilePage />
            <Widgets />
          </main>
        </div>
        
      )
}

export default profile