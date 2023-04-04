import React from "react";

interface Props {
  Picture: string;
  Notif: number;
  active: string;
}

function ChatbarRow({ Picture, Notif, active }: Props) {
  return (
    <div
      className={`flex relative items-center justify-center w-full md:p-1 ${active} hover:bg-gray-100 dark:hover:bg-lightgray group`}
    >
      <strong className="relative inline-flex items-center">
        {Notif !== 0 && (
          <div className="p-[5px] md:p-[7px] absolute top-6 md:top-8 -right-1 border-[2px] dark:border-darkgray bg-red-600 rounded-full"></div>
        )}
        <img src={Picture} className="h-8 w-8 md:h-10 md:w-10 lg:w-12 lg:h-12 rounded-full object-cover" />
        {/*<p className='inline md:hidden text-white dark:text-white font-semibold group-hover:text-gray-300 py-1 px-2'>{name}</p>*/}
      </strong>
    </div>
  );
}

export default ChatbarRow;
