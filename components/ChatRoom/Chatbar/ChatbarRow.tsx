import React from 'react'

interface Props {
    Picture : string,
    RoomName: string,
    active: string
}

function ChatbarRow({Picture,RoomName, active}: Props) {
  return (
    <div 
      className={`flex items-center justify-center md:justify-start md:w-full mt-1 space-x-2 p-2 ${active} rounded-md hover:bg-gray-100 dark:hover:bg-lightgray group`}>
        <img src={Picture} className='h-6 w-6 md:mr-2 rounded-full' />
        <p className="hidden md:inline-flex font-semibold text-l cursor-pointer">{RoomName}</p>
    </div>
  )
}

export default ChatbarRow