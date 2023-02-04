import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core';
import {
  BellIcon,
  ChatBubbleBottomCenterTextIcon,
  KeyIcon,
  WalletIcon
} from '@heroicons/react/24/outline'
import { logoutUser } from '../../stores/authUser/AuthUserActions'
import { useAppDispatch } from '../../stores/hooks'
import IconGroup from './IconGroup'
import { useTheme } from 'next-themes'
import NotifDropDown from './NotifDropDown'
import MsgDropDown from './MsgDropDown'
import { injected } from "../../components/wallet/Connectors"

const Navbar = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [dropdownNotifOpen, setDropdownNotifOpen] = useState<boolean>(false)

  const { active, activate } = useWeb3React();

  async function handleConnectWallet(e: any) {
    e.preventDefault();
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }

  const handleMsg = () => {
    setDropdownOpen(!dropdownOpen)
    if (dropdownNotifOpen === true) {
      setDropdownNotifOpen(!dropdownNotifOpen)
    }
  }

  const handleNotif = () => {
    setDropdownNotifOpen(!dropdownNotifOpen)
    if (dropdownOpen === true) {
      setDropdownOpen(!dropdownOpen)
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogoutClick = async () => {
    await dispatch(logoutUser()).then(() => router.push('/auth/signin'));
  }

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === 'system' ? systemTheme : theme;

    if (currentTheme === 'dark') {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-white" viewBox="0 0 20 20" fill="#9333ea" role="button" onClick={() => setTheme('light')}>
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
            clipRule="evenodd"
          />
        </svg>
      )
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#9333ea" className="w-6 h-6 fill-white" role="button" onClick={() => setTheme('dark')}>
          <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
        </svg>
      )
    }
  }

  let [open, setOpen] = useState(false);
  return (
    <div className='w-full shadow-md'>
      <div className='flex items-center justify-between bg-darkblue dark:bg-lightgray md:px-2 xl:px-8 h-[10vh]'>
        <Link href="/" className='cursor-pointer flex items-center justify-center'>
          <Image
            src="/images/logo/long-logo.png"
            alt="Blockd Logo"
            className="w-26 h-10 ml-4 md:ml-0 hidden md:inline"
            width={140}
            height={50}
          />
          <Image
            src="/images/logo/logo.png"
            alt="Blockd Logo"
            className="ml-4 md:ml-0 w-10 h-7 md:w-12 md:h-8 md:hidden"
            width={60}
            height={40}
          />
        </Link>

        {/*<div className='absolute right-14 md:hidden top-6 cursor-pointer flex flex-col items-center my-1'>
                    {renderThemeChanger()}
                </div>

                <div onClick={() => setOpen(!open)} className='text-3xl absolute right-4 md:right-8 top-6 cursor-pointer md:hidden'>
                    <span className="text-white absolute text-xs -right-3 -top-2 md:-top-1 md:-right-0 h-6 w-6 rounded-full group-hover:bg-orange-600 bg-blockd flex justify-center items-center items border-2 border-gray-900 dark:border-lightgray"><span>13</span></span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-white" name={open ? 'close' : 'menu'}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>*/}

        <ul className={`flex static items-center justify-end z-[2] right-0 w-full pl-0 transition-all ease-in px-2 ${open ? 'top-20 h-fit bg-darkblue dark:bg-lightgray' : 'top-[-490px] h-20'}`}>
          {/* Dark/Light Mode */}
          <li className='flex-col items-center text-l mr-2'>
            {renderThemeChanger()}
          </li>
          {/* Messages */}
          <li className='flex flex-col md:hidden items-center text-l'>
            <Link href="/dashboard/messages">
              <IconGroup Icon={ChatBubbleBottomCenterTextIcon} notif="10"></IconGroup>
            </Link>
          </li>
          <li className='hidden md:flex md:flex-col items-center text-l'>
            <Link href="" onClick={() => handleMsg()}>
              <IconGroup Icon={ChatBubbleBottomCenterTextIcon} notif="10"></IconGroup>
            </Link>
          </li>
          <div className={`${dropdownOpen ? 'hidden md:inline' : 'hidden'}`}>
            <MsgDropDown />
          </div>
          {/* Notifications */}
          <li className='flex flex-col md:hidden items-center text-l'>
            <Link href="/dashboard/notifications">
              <IconGroup Icon={BellIcon} notif="3"></IconGroup>
            </Link>
          </li>
          <li className='hidden md:flex md:flex-col items-center text-l'>
            <Link href="" onClick={() => handleNotif()}>
              <IconGroup Icon={BellIcon} notif="3"></IconGroup>
            </Link>
          </li>
          <div className={`${dropdownNotifOpen ? 'hidden md:inline' : 'hidden'}`}>
            <NotifDropDown />
          </div>
          {/* Sign Up */}
          <li className='cursor-pointer flex flex-col items-center text-l my-1 md:ml-3 rounded-full md:hover:bg-transparent'>
            <p
              className='text-white dark:text-white hover:text-gray-300 dark:hover:text-gray-300 font-semibold'
              onClick={() => handleLogoutClick()}
            >
              Logout
            </p>
          </li>
          {/* Connect Wallet */}
          <li className='md:ml-4 flex items-center text-l my-4 ml-2 rounded-full'>
            {/*<button
              className="hidden md:inline animate-pulse bg-transparent bg-gradient-to-r from-orange-300 to-blockd hover:from-blockd hover:to-blockd text-white dark:text-white font-semibold hover:text-white py-2 px-4 rounded-full"
              onClick={(e) => handleConnectWallet(e)}
            >
              {active ? <span>🟢 Connected</span> : <span>Connect Wallet</span>}
            </button>*/}
            <Link href="/dashboard/profile" className='rounded-full p-[2px] bg-white'>
              <Image
                src="/images/pfp/pfp1.jpg"
                alt='pfp'
                className='min-w-10 min-h-10 rounded-full shadow-sm cursor-pointer'
                width={40}
                height={40} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar