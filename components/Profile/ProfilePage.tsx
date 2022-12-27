import React, { useState } from 'react'
import Picture from '../Feed/Picture'
import {
  CheckBadgeIcon,
  Cog8ToothIcon,
  PencilSquareIcon,
  EyeIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link';
import InfoContainer from './InfoContainer';
import Feed from './Feed';
import Interactions from './Interactions';
import Followers from './Followers';

function ProfilePage() {

  let [showFeed, setShowFeed] = useState<boolean>(true)
  let [showInteractions, setShowInteractions] = useState<boolean>(false)
  let [showFollowers, setShowFollowers] = useState<boolean>(false)

  const handleToggle1 = () => {
    if (showFeed == false) {
      setShowFeed(!showFeed)
      showInteractions = false
      showFollowers = false
      setShowInteractions(showInteractions)
      setShowFollowers(showFollowers)
    }
  };

  const handleToggle2 = () => {
    if (showInteractions == false) {
      setShowInteractions(!showInteractions)
      showFeed = false
      showFollowers = false
      setShowFeed(showFeed)
      setShowFollowers(showFollowers)
    }
  };

  const handleToggle3 = () => {
    if (showFollowers == false) {
      setShowFollowers(!showFollowers)
      showInteractions = false
      showFeed = false
      setShowFeed(showFeed)
      setShowInteractions(showInteractions)
    }
  };

  return (
    <div className='relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x mb-5 p-6'>

      <InfoContainer />

      <div className='flex items-center justify-between p-5 w-full border-b h-10 mt-8'>
        <button onClick={() => handleToggle1()} className={`font-semibold focus:outline-none ${showFeed === true ? 'border-b-2 border-blockd text-blockd :' : ''}`}>
          Feed
        </button>
        <button onClick={() => handleToggle2()} className={`font-semibold focus:outline-none ${showInteractions === true ? 'border-b-2 border-blockd text-blockd :' : ''}`}>
          Interactions
        </button>
        <button onClick={() => handleToggle3()} className={`font-semibold focus:outline-none ${showFollowers === true ? 'border-b-2 border-blockd text-blockd :' : ''}`}>
          Followers
        </button>
      </div>

      {showFeed && (
          <Feed />
        )}
      {showInteractions && (
          <Interactions />
        )}
      {showFollowers && (
          <Followers />
        )}
    </div >
  )
}

export default ProfilePage