import React from 'react'

interface Props {
    Picture : string,
    RoomName: string,
    active: string
}

function ChatbarRow({Picture,RoomName, active}: Props) {
  return (
    <div 
      className={`flex mt-1 w-full items-center space-x-2 px-4 py-3 ${active} rounded-md hover:bg-gray-100 dark:hover:bg-lightgray group`}>
        <img src={Picture} className='h-6 w-6 mr-2 rounded-full' />
        <p className="hidden md:inline-flex font-semibold text-l cursor-pointer">{RoomName}</p>
    </div>
  )
}

export default ChatbarRow