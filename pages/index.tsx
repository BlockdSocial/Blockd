import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';
import Navbar from '../components/Navbar';

const Home: NextPage = () => {
  return (
    <div className='z-[-4] bg-white dark:bg-darkgray mx-auto max-h-screen h-screen overflow-hidden'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Navbar />
      <main className='h-full grid grid-cols-9'>
        <Sidebar />
        <Feed />
        <Widgets />
      </main>
    </div>
    
  )
}

export default Home