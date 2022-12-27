import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';

const Home: NextPage = () => {
  return (
    <div className=' bg-white dark:bg-darkgray mx-auto max-h-screen h-screen overflow-hidden pb-20'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <main className='h-full grid grid-cols-9 xl:max-w-6xl mx-auto'>
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
    
  )
}

export default Home