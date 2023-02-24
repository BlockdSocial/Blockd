import React from "react";
import {
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";

function TrendingChatrooms() {
  return (
    <div className="flex flex-col items-start justify-center p-4 mt-2 space-y-2">
      <p className="flex items-center space-x-2 mb-4">
        <ArrowTrendingUpIcon className="w-5 h-5" />
        <span>Trending Chatrooms</span>
      </p>
      <div className="flex items-center justify-between rounded-md bg-gray-200 hover:bg-gray-300 dark:hover:bg-lightgray/50 dark:bg-lightgray w-full p-2 px-4">
        <div className="flex items-center justify-start space-x-4">
          <img
            src="/images/chatLogo/Bitcoin.png"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm md:text-base font-semibold">BTC Official</p>
            <p className="text-xs md:text-sm">30K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            +1200 %
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
            <p className="text-sm md:text-base font-semibold">
              Ethereum Official
            </p>
            <p className="text-xs md:text-sm">3K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            +700 %
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
            <p className="text-sm md:text-base font-semibold">
              Polygon Official
            </p>
            <p className="text-xs md:text-sm">2K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            +300 %
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
            <p className="text-sm md:text-base font-semibold">
              EGO Whales Group
            </p>
            <p className="text-xs md:text-sm">1K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            +200 %
          </p>
        </div>
      </div>
    </div>
  );
}

export default TrendingChatrooms;
