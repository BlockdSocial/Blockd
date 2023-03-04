import React from "react";

function Achievements() {
  return (
    <div className="relative flex items-center justify-center w-3/5 h-24 p-2 rounded-lg bg-gray-100 dark:bg-lightgray overflow-hidden cursor-pointer transition-all duration-700 card">
      <div className="absolute text-sm inset-0 w-full h-full flex justify-between items-center bg-gray-100 dark:bg-lightgray border-l-8 border-orange-500 transition-all duration-100 delay-300 z-20 hover:opacity-0">
        <div className="relative flex flex-col items-start justify-start w-full h-full">
          <p className="flex justify-start items-center p-2 lg:text-base w-full h-[70%]">
            Stage 1 of 3 - Posted Up
          </p>
          <p className="absolute bottom-0 h-[30%] w-full flex items-end justify-end p-1 px-2">
            1/3
          </p>
        </div>
        <div className="flex flex-col items-center justify-center bg-gray-200 dark:bg-[#5A5A5A] h-full rounded-r-lg w-20">
          <p className="text-base lg:text-xl">5 <span className="text-xs lg:text-sm">XP</span></p>
        </div>
      </div>
      <div className="absolute inset-0 w-full h-full flex justify-start items-center bg-gray-100 dark:bg-lightgray transition-all z-10 card-back">
        <p className="flex justify-start items-center p-2 px-4 h-full">
          Make your first post on BLOCK’d.
        </p>
      </div>
    </div>
  );
}

export default Achievements;
