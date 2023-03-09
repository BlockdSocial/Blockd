import React, { useState } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Friends from "./Friends";

function Widget({ chats, setReceiver }: any) {
  const closeShowFriends = () =>{
   
  }
  return (
    <div className="hidden lg:flex lg:flex-col col-span-2 min-h-[93vh] dark:bg-darkray border-r dark:border-lightgray">
      <div className="flex items-center justify-start h-[10%] space-x-2 p-4 z-[1] sticky top-0 backdrop-blur-md border-b dark:border-lightgray bg-white/30 dark:bg-darkgray/30">
        <ChatBubbleLeftRightIcon className="w-7 h-7" />
        <p>Private DMs</p>
      </div>
      <Friends chats={chats} setReceiver={setReceiver} closeShowFriends={closeShowFriends} />
    </div>
  );
}

export default Widget;
