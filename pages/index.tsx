import { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from '../components/Sidebar/Sidebar';
import Feed from '../components/Feed/Feed';
import Widgets from '../components/Widgets/Widgets';
import Navbar from '../components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

const Home: NextPage = () => {
  return (
    <div className='bg-white dark:bg-darkgray grid grid-cols-9 mx-auto h-screen overflow-hidden'>
      <Head>
        <title>Blockd</title>
      </Head>
      <Toaster />
      <Navbar />
      <Sidebar />
      <Feed />
      <Widgets />
    </div>


  )
}

export default Home