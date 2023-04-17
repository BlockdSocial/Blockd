import React, { useState } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import Friends from "./Friends";

function Widget({ chats, setReceiver, setRoom, refetchChats }: any) {
  const closeShowFriends = () => {

  }
  return (
    <div className="hidden lg:flex lg:flex-col col-span-2 min-h-[93vh] dark:bg-darkray border-r dark:border-lightgray">
      <div className="flex items-center justify-start h-14 border-b dark:border-lightgray space-x-2 py-4 px-2 bg-white/30 dark:bg-darkgray/30">
        <ChatBubbleLeftRightIcon className="w-7 h-7" />
        <p>Private DMs</p>
      </div>
      <Friends
        chats={chats}
        setReceiver={setReceiver}
        setRoom={setRoom}
        closeShowFriends={closeShowFriends}
        refetchChats={refetchChats}
      />
    </div>
  );
}

export default Widget;
