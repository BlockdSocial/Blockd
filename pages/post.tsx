import Head from 'next/head'
import React from 'react'
import Sidebar from '../components/Sidebar';
import Widgets from '../components/Widgets';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import PostPage from '../components/PostPage';

function post() {
    return (
        <div className='z-[-4] bg-white dark:bg-darkgray mx-auto max-h-screen h-screen overflow-hidden pb-20'>
          <Head>
            <title>Blockd</title>
          </Head>
          <Toaster />
          <Navbar />
          <main className='h-full grid grid-cols-9'>
            <Sidebar />
            <PostPage />
            <Widgets />
          </main>
        </div>
        
      )
}

export default post