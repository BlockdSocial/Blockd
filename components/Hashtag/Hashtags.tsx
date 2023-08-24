import Link from "next/link";
import React from "react";

function Hashtags() {
  return (
    <Link href="/dashboard/hashtag" className="flex flex-col p-2 py-3 space-y-2 cursor-pointer bg-gray-100 dark:bg-lightgray hover:bg-gray-200 hover:dark:bg-[#1F2022]">
      <p>#Hashtag</p>
      <p className="text-sm">15K Posts</p>
    </Link>
  );
}

export default Hashtags;
