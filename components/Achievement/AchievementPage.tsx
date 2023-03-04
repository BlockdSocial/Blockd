import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Levels from "./Levels";
import Achievements from "./Achievements";

function AchievementPage() {
  let [showAchievements, setShowAchievements] = useState<boolean>(false);
  let [showLevels, setShowLevels] = useState<boolean>(true);
  const handleToggle1 = () => {
    if (showAchievements == false) {
      setShowAchievements(!showAchievements);
      showLevels = false;
      setShowLevels(showLevels);
    }
  };

  const handleToggle2 = () => {
    if (showLevels == false) {
      setShowLevels(!showLevels);
      showAchievements = false;
      setShowAchievements(showAchievements);
    }
  };

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5">
      <div className="flex flex-col items-center justify-start p-4 dark:border-lightgray min-h-screen pb-16">
        <div className="flex items-center justify-center w-full space-x-6 mb-10 bg-transparent">
          <div
            className={`relative h-24 w-24 border-2 border-white rounded-md p-1 animate-colorChange`}
          >
            <Image
              src="/images/pfp/pfp1.jpg"
              alt="pfp"
              className="w-fill h-fill rounded-md shadow-sm border-2 border-white"
              width={2000}
              height={2000}
            />
            <div
              className={`absolute -bottom-3 -left-4 flex p-1 w-9 h-9 border-2 border-white animate-colorChange rounded-lg`}
            >
              <div className="flex items-center justify-center border-2 border-white text-black font-semibold rounded-md w-full h-full text-sm bg-white">
                8
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start justify-center">
            <p className="text-sm font-semibold mb-2">Total</p>
            <p className="text-2xl font-semibold text-gray-500 dark:text-gray-300">
              1500
            </p>
            <p className="text-l font-semibold text-gray-500 dark:text-gray-300">
              Experience
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between space-x-20 mb-5 w-fit border-b dark:border-lightgray h-10">
          <button
            onClick={() => handleToggle2()}
            className={`text-xs md:text-sm lg:text-base focus:outline-none ${
              showLevels === true
                ? "border-b-2 border-blockd text-blockd :"
                : ""
            }`}
          >
            Levels
          </button>
          <button
            onClick={() => handleToggle1()}
            className={`text-xs md:text-sm lg:text-base focus:outline-none ${
              showAchievements === true
                ? "border-b-2 border-blockd text-blockd :"
                : ""
            }`}
          >
            Achievements
          </button>
        </div>
        {showLevels && <Levels />}
        {showAchievements && <Achievements />}
      </div>
    </div>
  );
}

export default AchievementPage;
