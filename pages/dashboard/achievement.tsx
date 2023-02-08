import Head from 'next/head'
import React from 'react'
import AchievementPage from '../../components/Achievement/AchievementPage'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Widgets from '../../components/Widgets/Widgets'

function trending() {
  return (
    <div className='bg-white dark:bg-darkgray flex flex-col items-center justify-center mx-auto h-screen overflow-hidden'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Navbar />
      <div className='bg-white dark:bg-darkgray grid grid-cols-9 mx-auto lg:max-w-7xl h-[90vh] overflow-hidden w-full'>
      <Sidebar />
      <AchievementPage />
      <Widgets />
      </div>
    </div>
  )
}

export default trending