import React from "react";
import { useRouter } from "next/router";
import {
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import TrendingChatrooms from "./TrendingChatrooms";
import SearchBar from "./SearchBar";
import OrdinaryChatrooms from "./OrdinaryChatrooms";

function AllChatroomsPage() {
  const router = useRouter();

  return (
    <div className="min-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 border-x pb-16">
      <div className="flex z-[1] space-x-2 items-center sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30">
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className="h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125"
        />
        <p>All Chatrooms</p>
      </div>

      <TrendingChatrooms />
      <SearchBar />
      <OrdinaryChatrooms  />
    </div>
  );
}

export default AllChatroomsPage;
