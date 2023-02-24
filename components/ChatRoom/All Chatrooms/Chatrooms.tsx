import React from "react";

function Chatrooms() {
  return (
    <div className="flex flex-col items-start justify-center p-4 space-y-2">
      <div className="flex items-center justify-between rounded-md bg-gray-200 hover:bg-gray-300 dark:hover:bg-lightgray/50 dark:bg-lightgray w-full p-2 px-4">
        <div className="flex items-center justify-start space-x-4">
          <img
            src="/images/chatLogo/Bitcoin.png"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm md:text-base font-semibold">Group 1</p>
            <p className="text-xs md:text-sm">30K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-red-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            -50 %
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-md bg-gray-200 hover:bg-gray-300 dark:hover:bg-lightgray/50 dark:bg-lightgray w-full p-2 px-4">
        <div className="flex items-center justify-start space-x-4">
          <img
            src="/images/chatLogo/Ethereum.png"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm md:text-base font-semibold">Group 2</p>
            <p className="text-xs md:text-sm">3K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            +70 %
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-md bg-gray-200 hover:bg-gray-300 dark:hover:bg-lightgray/50 dark:bg-lightgray w-full p-2 px-4">
        <div className="flex items-center justify-start space-x-4">
          <img
            src="/images/chatLogo/Polygon.png"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm md:text-base font-semibold">Group 3</p>
            <p className="text-xs md:text-sm">2K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            +3 %
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between rounded-md bg-gray-200 hover:bg-gray-300 dark:hover:bg-lightgray/50 dark:bg-lightgray w-full p-2 px-4">
        <div className="flex items-center justify-start space-x-4">
          <img
            src="/images/chatLogo/EGO.png"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm md:text-base font-semibold">Group 4</p>
            <p className="text-xs md:text-sm">1K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-red-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            -20 %
          </p>
        </div>
      </div>
    </div>
  );
}

export default Chatrooms;
