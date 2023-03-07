import React from 'react'

interface Props {
  Picture: string,
  Notif: number,
  active: string
}

function ChatbarRow({ Picture, Notif, active }: Props) {
  return (
    <div
      className={`flex relative items-center justify-center w-full space-x-2 p-1 ${active} hover:bg-gray-100 dark:hover:bg-lightgray group`}>
      <strong className="relative inline-flex items-center px-2.5 py-1.5">
        <div className={`text-white absolute text-[10px] md:text-xs top-7 ${(Notif > 100) ? '-right-1' : 'right-0' }`}>
          {Notif !== 0 && (Notif < 100) ? (
            <div className='p-1 flex items-center justify-center w-6 h-6 text-[10px] md:text-xs font-semibold rounded-full bg-red-600 text-white group-hover:bg-red-800 border-2 border-white dark:border-darkgray'>{Notif}</div>
          ) : (Notif !== 0 && (Notif > 100) ? (
            <div className='p-1 flex items-center justify-center text-[10px] md:text-xs font-semibold rounded-full bg-red-600 text-white group-hover:bg-red-800 border-2 border-white dark:border-darkgray'>+100</div>
          ) : (
            <div className='p-1 hidden items-center justify-center text-[10px] md:text-xs font-semibold rounded-full bg-red-600 text-white group-hover:bg-red-800'></div>
          ))}
        </div>
        <img src={Picture} className='h-8 w-8 md:h-10 md:w-10 rounded-full' />
        {/*<p className='inline md:hidden text-white dark:text-white font-semibold group-hover:text-gray-300 py-1 px-2'>{name}</p>*/}
      </strong>

    </div>
  )
}

export default ChatbarRow