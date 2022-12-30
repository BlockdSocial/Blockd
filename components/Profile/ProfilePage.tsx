import React, { useState } from 'react'
import InfoContainer from './InfoContainer';
import Feed from './Feed';
import Interactions from './Interactions';
import Followers from './Followers';
import Following from './Following';

function ProfilePage() {

  let [showFeed, setShowFeed] = useState<boolean>(true)
  let [showInteractions, setShowInteractions] = useState<boolean>(false)
  let [showFollowers, setShowFollowers] = useState<boolean>(false)
  let [showFollowing, setShowFollowing] = useState<boolean>(false)

  const handleToggle1 = () => {
    if (showFeed == false) {
      setShowFeed(!showFeed)
      showInteractions = false
      showFollowers = false
      showFollowing = false
      setShowInteractions(showInteractions)
      setShowFollowers(showFollowers)
      setShowFollowing(showFollowing)
    }
  };

  const handleToggle2 = () => {
    if (showInteractions == false) {
      setShowInteractions(!showInteractions)
      showFeed = false
      showFollowers = false
      showFollowing = false
      setShowFeed(showFeed)
      setShowFollowers(showFollowers)
      setShowFollowing(showFollowing)
    }
  };

  const handleToggle3 = () => {
    if (showFollowers == false) {
      setShowFollowers(!showFollowers)
      showInteractions = false
      showFeed = false
      showFollowing = false
      setShowFeed(showFeed)
      setShowInteractions(showInteractions)
      setShowFollowing(showFollowing)
    }
  };

  const handleToggle4 = () => {
    if (showFollowing == false) {
      setShowFollowing(!showFollowing)
      showInteractions = false
      showFeed = false
      showFollowers = false
      setShowFeed(showFeed)
      setShowInteractions(showInteractions)
      setShowFollowers(showFollowers)
    }
  };

  return (
    <div className='relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x'>

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
        <button onClick={() => handleToggle4()} className={`font-semibold focus:outline-none ${showFollowing === true ? 'border-b-2 border-blockd text-blockd :' : ''}`}>
          Following
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
        {showFollowing && (
            <Following />
          )}
    </div >
  )
}

export default ProfilePage