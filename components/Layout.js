import Head from 'next/head'
import React, { ReactElement } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import Widgets from './Widgets/Widgets'

// @ts-ignore 
export default function Layout( {children } ) {
    return (
      <div className='bg-white dark:bg-darkgray flex flex-col items-start justify-start mx-auto h-screen overflow-hidden'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <div className='bg-white dark:bg-darkgray grid grid-cols-9 mx-auto lg:max-w-7xl overflow-hidden w-full'>
        <Sidebar />
        {children}
        <Widgets />
      </div>
    </div>
    )
  }