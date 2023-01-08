import Head from 'next/head'
import React from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'
import SuggestionPage from '../components/Suggestion/SuggestionPage'
import Widgets from '../components/Widgets/Widgets'

function suggestion() {
  return (
    <div className='bg-white dark:bg-darkgray flex flex-col items-center justify-center mx-auto h-screen overflow-hidden'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <div className='bg-white dark:bg-darkgray grid grid-cols-9 mx-auto lg:max-w-7xl h-[90vh] overflow-hidden w-full'>
        <Sidebar />
        <SuggestionPage />
        <Widgets />
      </div>
    </div>
  )
}

export default suggestion