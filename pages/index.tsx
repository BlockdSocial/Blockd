import { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import Widgets from '../components/Widgets/Widgets';
import Navbar from '../components/Navbar/Navbar';
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