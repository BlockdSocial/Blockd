import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";

function PeoplePage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 border-x bg-gray-100 dark:bg-darkgray pb-14">
      <div className="flex z-[1] flex-col items-start sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30">
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className="h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125"
        />
      </div>
      <div className="flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray rounded-lg space-y-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-3">
            <Link
              href="/dashboard/profile"
              className="flex items-center justify-center"
            >
              <img
                src="/images/pfp/pfp1.jpg"
                className="rounded-md w-16 h-16 bg-blockd"
              />
            </Link>
            <div className="flex flex-col items-start justify-center space-y-2">
              <div className="flex flex-col items-start justify-center">
                <Link
                  href="/dashboard/profile"
                  className="text-l font-bold cursor-pointer hover:underline"
                >
                  @IsmailBzz
                </Link>
                {/* <span className="text-l text-gray-700 dark:text-gray-300">
                  10K followers
                </span> */}
              </div>
              {/* <span className="text-l text-gray-700 dark:text-gray-300">
                20 Friends in common
              </span> */}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="cursor-pointer p-2 px-6 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
              Follow
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-3">
            <Link
              href="/dashboard/profile"
              className="flex items-center justify-center"
            >
              <img
                src="/images/pfp/pfp3.jpg"
                className="rounded-md w-16 h-16 bg-blockd"
              />
            </Link>
            <div className="flex flex-col items-start justify-center space-y-2">
              <div className="flex flex-col items-start justify-center">
                <Link
                  href="/dashboard/profile"
                  className="text-l font-bold cursor-pointer hover:underline"
                >
                  @Crypto_Monkey
                </Link>
                <span className="text-l text-gray-700 dark:text-gray-300">
                  123 followers
                </span>
              </div>
              <span className="text-l text-gray-700 dark:text-gray-300">
                1 Friend in common
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="cursor-pointer p-2 px-6 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
              Follow
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-3">
            <Link
              href="/dashboard/profile"
              className="flex items-center justify-center"
            >
              <img
                src="/images/pfp/pfp2.jpg"
                className="rounded-md w-16 h-16 bg-blockd"
              />
            </Link>
            <div className="flex flex-col items-start justify-center space-y-2">
              <div className="flex flex-col items-start justify-center">
                <Link
                  href="/dashboard/profile"
                  className="text-l font-bold cursor-pointer hover:underline"
                >
                  @Egoist
                </Link>
                <span className="text-l text-gray-700 dark:text-gray-300">
                  234K followers
                </span>
              </div>
              <span className="text-l text-gray-700 dark:text-gray-300">
                123 Friends in common
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="cursor-pointer p-2 px-4 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
              Following
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center justify-center">
              <img
                src="/images/pfp/pfp2.jpg"
                className="rounded-md w-16 h-16 bg-blockd"
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-2">
              <div className="flex flex-col items-start justify-center">
                <Link
                  href="/dashboard/profile"
                  className="text-l font-bold cursor-pointer hover:underline"
                >
                  @Egoist
                </Link>
                <span className="text-l text-gray-700 dark:text-gray-300">
                  234K followers
                </span>
              </div>
              <span className="text-l text-gray-700 dark:text-gray-300">
                123 Friends in common
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="cursor-pointer p-2 px-4 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
              Following
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center justify-center">
              <img
                src="/images/pfp/pfp2.jpg"
                className="rounded-md w-16 h-16 bg-blockd"
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-2">
              <div className="flex flex-col items-start justify-center">
                <Link
                  href="/dashboard/profile"
                  className="text-l font-bold cursor-pointer hover:underline"
                >
                  @Egoist
                </Link>
                <span className="text-l text-gray-700 dark:text-gray-300">
                  234K followers
                </span>
              </div>
              <span className="text-l text-gray-700 dark:text-gray-300">
                123 Friends in common
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="cursor-pointer p-2 px-4 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
              Following
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center justify-center">
              <img
                src="/images/pfp/pfp2.jpg"
                className="rounded-md w-16 h-16 bg-blockd"
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-2">
              <div className="flex flex-col items-start justify-center">
                <Link
                  href="/dashboard/profile"
                  className="text-l font-bold cursor-pointer hover:underline"
                >
                  @Egoist
                </Link>
                <span className="text-l text-gray-700 dark:text-gray-300">
                  234K followers
                </span>
              </div>
              <span className="text-l text-gray-700 dark:text-gray-300">
                123 Friends in common
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="cursor-pointer p-2 px-4 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
              Following
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center justify-center">
              <img
                src="/images/pfp/pfp2.jpg"
                className="rounded-md w-16 h-16 bg-blockd"
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-2">
              <div className="flex flex-col items-start justify-center">
                <Link
                  href="/dashboard/profile"
                  className="text-l font-bold cursor-pointer hover:underline"
                >
                  @Egoist
                </Link>
                <span className="text-l text-gray-700 dark:text-gray-300">
                  234K followers
                </span>
              </div>
              <span className="text-l text-gray-700 dark:text-gray-300">
                123 Friends in common
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="cursor-pointer p-2 px-4 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
              Following
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center justify-center space-x-3">
            <div className="flex items-center justify-center">
              <img
                src="/images/pfp/pfp2.jpg"
                className="rounded-md w-16 h-16 bg-blockd"
              />
            </div>
            <div className="flex flex-col items-start justify-center space-y-2">
              <div className="flex flex-col items-start justify-center">
                <Link
                  href="/dashboard/profile"
                  className="text-l font-bold cursor-pointer hover:underline"
                >
                  @Egoist
                </Link>
                <span className="text-l text-gray-700 dark:text-gray-300">
                  234K followers
                </span>
              </div>
              <span className="text-l text-gray-700 dark:text-gray-300">
                123 Friends in common
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <p className="cursor-pointer p-2 px-4 rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
              Following
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PeoplePage;
