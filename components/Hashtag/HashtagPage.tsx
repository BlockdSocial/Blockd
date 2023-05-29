import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import router from "next/router";
import React from "react";
import PostTest from "../Feed/Post";

function HashtagPage() {
  return (
    <div className="relative h-[92vh] scrollbar-hide overflow-scroll col-span-9 md:col-span-5">
      <div className="flex z-[2] items-center justify-start space-x-2 sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30">
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className="h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125"
        />
        <p className="text-[17px]">#Hashtag Name</p>
      </div>
      <div className="flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-lightgray rounded-lg space-y-3">
        {/* <PostTest />  */}
        <div className="flex items-center justify-center cursor-pointer p-2 w-full rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
          View more
        </div>
      </div>
    </div>
  );
}

export default HashtagPage;
