import Head from 'next/head'
import React from 'react'
import Sidebar from '../components/Sidebar/Sidebar';
import Widgets from '../components/Widgets/Widgets';
import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import PostPage from '../components/Post/PostPage';

function post() {
  return (
    <div className='bg-white dark:bg-darkgray flex flex-col items-center justify-center mx-auto h-screen overflow-hidden'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <div className='bg-white dark:bg-darkgray grid grid-cols-9 mx-auto lg:max-w-7xl h-[90vh] overflow-hidden w-full'>
      <Sidebar />
      <PostPage />
      <Widgets />
      </div>
    </div>

  )
}

export default post