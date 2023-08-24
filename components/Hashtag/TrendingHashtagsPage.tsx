import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import router from "next/router";
import React from "react";
import Hashtags from "./Hashtags";

function TrendingHashtagsPage() {
  return (
    <div className="relative h-[92vh] scrollbar-hide overflow-scroll col-span-9 md:col-span-5">
      <div className='flex z-[2] items-center justify-start space-x-2 sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30'>
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className='h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125'
        />
        <p className="text-[17px]">Trending Hashtags</p>
      </div>
      <Hashtags />
      <Hashtags />
      <Hashtags />
      <Hashtags />
      <Hashtags />
      <Hashtags />
      <Hashtags />
      <Hashtags />
    </div>
  );
}

export default TrendingHashtagsPage;
