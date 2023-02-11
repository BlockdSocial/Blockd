import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'

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


const Navbar = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { systemTheme, theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [dropdownNotifOpen, setDropdownNotifOpen] = useState<boolean>(false)





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
    <div className='w-full shadow-md bg-darkblue dark:bg-lightgray'>
      <div className='bg-darkblue dark:bg-lightgray grid grid-cols-9 place-content-center mx-auto lg:max-w-7xl h-14'>
        <div className='col-span-4 place-self-start place-items-center h-14 px-3'>
          <Link href="/" className='h-full cursor-pointer flex items-center justify-center'>
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
        </div>
        <div className='col-span-5 h-14 px-3'>
          <ul className='flex static items-center justify-end z-[2] right-0 w-full pl-0 transition-all ease-in h-14'>
            {/* Dark/Light Mode */}
            <li className='flex-col items-center text-l mr-2'>
              {renderThemeChanger()}
            </li>
            {/* Messages */}
            <li className='flex flex-col items-center text-l'>
              <Link href="/dashboard/messages">
                {/* 
                // @ts-ignore */}
                <IconGroup Icon={ChatBubbleBottomCenterTextIcon} notif="10"></IconGroup>
              </Link>
            </li>
            {/*
          <li className='hidden md:flex md:flex-col items-center text-l'>
            <Link href="" onClick={() => handleMsg()}>
              <IconGroup Icon={ChatBubbleBottomCenterTextIcon} notif="10"></IconGroup>
            </Link>
          </li>
          <div className={`${dropdownOpen ? 'hidden md:inline z-10' : 'hidden'}`}>
            <MsgDropDown />
          </div>*/}
            {/* Notifications */}
            <li className='flex flex-col items-center text-l'>
              <Link href="/dashboard/notifications">
                {/* 
                // @ts-ignore */}
                <IconGroup Icon={BellIcon} notif="3"></IconGroup>
              </Link>
            </li>
            {/*
          <li className='hidden md:flex md:flex-col items-center text-l'>
            <Link href="" onClick={() => handleNotif()}>
              <IconGroup Icon={BellIcon} notif="3"></IconGroup>
            </Link>
          </li>
          <div className={`${dropdownNotifOpen ? 'hidden md:inline' : 'hidden'}`}>
            <NotifDropDown />
          </div>*/}
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
              <Link href="/dashboard/profile" className='rounded-md p-[2px] bg-white'>
                <Image
                  src="/images/pfp/pfp1.jpg"
                  alt='pfp'
                  className='min-w-10 min-h-10 rounded-md shadow-sm cursor-pointer'
                  width={40}
                  height={40} />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar