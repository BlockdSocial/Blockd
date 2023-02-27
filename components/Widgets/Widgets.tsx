import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Slider from "./Slider";
import Link from "next/link";
import { fetchTrendingPosts, searchPosts } from "../../stores/post/PostActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { searchUsers } from "../../stores/user/UserActions";
import { isEmpty } from "lodash";
import { config } from "../../constants";
import { TrendingStreams } from "./TrendingStreams";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

interface Pic {
  name: string;
}
interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
  profilePic: Pic;
}

function Widgets() {
  const dispatch = useAppDispatch();
  // const { trendingPosts } = useAppSelector((state) => state.postReducer);
  const TrendingChatrooms = dynamic(() => import("./TrendingChatrooms"), {
    ssr: false,
  });
  //const TrendingStreams = dynamic(() => import('./TrendingStreams'), { ssr: false })
  const [searchResult, setSearchResult] = useState<User[]>();
  const [input, setInput] = useState<string>("");
  const [trendingPosts, setTrendingPosts] = useState<any>();

  const fetchTrendings = useCallback(() => {
    dispatch(fetchTrendingPosts()).then((res) => {
      setTrendingPosts(res);
    });
  }, []);

  useEffect(() => {
    fetchTrendings();
  }, []);

  useEffect(() => {
    if (input.length > 0) {
      dispatch(
        searchUsers({
          search: input,
          end: 5,
        })
      ).then((result: any) => {
        setSearchResult(result?.users);
      });
    }
  }, [input]);

  return (
    <div className="col-span-2 hidden md:inline min-h-screen scrollbar-hide overflow-scroll pb-14 border-x dark:border-lightgray">
      {/* Search */}
      <div className="sticky p-2 top-0 backdrop-blur-md bg-white/30 dark:bg-darkgray/30 z-[1]">
        <div className="flex items-center space-x-2 bg-gray-100 p-2 dark:bg-darkgray rounded-md dark:border-white border group">
          <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-white" />
          <input
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
            type="text"
            placeholder="Search Blockd"
            className="flex-1 outline-none bg-transparent"
          />
        </div>
        {input && (
          <div className="relative mt-2 backdrop-blur-md bg-white/30 dark:bg-darkgray/30">
            <div className="absolute top-0 left-0 bg-gray-100 dark:bg-darkgray border border-gray-200 dark:border-white rounded-md w-full z-10">
              <div className="flex flex-col items-center justify-center">
                {searchResult &&
                  searchResult?.map((result: any, index: number) => (
                    <Link
                      href={{
                        pathname: "/dashboard/profile",
                        query: { user_id: result?.id },
                      }}
                      className="w-full"
                    >
                      <div
                        key={result?.id}
                        className="flex items-center justify-start space-x-2 hover:rounded-t-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer"
                      >
                        <img
                          src={
                            !isEmpty(result?.profilePic)
                              ? `${config.url.PUBLIC_URL}/${result?.profilePic?.name}`
                              : "/images/pfp/pfp1.jpg"
                          }
                          className="rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd"
                        />
                        <p className="font-semibold text-sm">@{result?.name}</p>
                      </div>
                    </Link>
                  ))}
                <Link
                  href={{
                    pathname: "/search",
                    query: { query: input }
                  }}
                  className="flex items-center justify-start space-x-2 hover:rounded-b-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer"
                >
                  <div className="rounded-full bg-blockd p-2">
                    <MagnifyingGlassIcon className="w-7 h-7 text-white" />
                  </div>
                  <p className="font-semibold text-sm">Search {input}</p>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <>
        <Slider trendingPosts={trendingPosts} />
      </>
      <div className="p-2">
        <div className="flex items-center justify-start rounded-md space-x-2 p-2 mt-6">
          <ArrowTrendingUpIcon className="w-4 h-4 lg:w-5 lg:h-5" />
          <p className="font-semibold text-xs lg:text-base">
            Trending Chatrooms
          </p>
        </div>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-1">
            <div className="rounded-full w-3 h-3 bg-blockd"></div>
            <p className="font-semibold text-sm">EGO Official</p>
          </div>
          <div className="lg:flex items-center justify-end lg:col-span-3 hidden">
            <p className="font-semibold text-green-800 dark:text-white">
              +1200%
            </p>
          </div>
        </Link>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-1">
            <div className="rounded-full w-3 h-3 bg-blockd"></div>
            <p className="font-semibold text-sm">Shiba Inu</p>
          </div>
          <div className="lg:flex items-center justify-end lg:col-span-3 hidden">
            <p className="font-semibold text-green-800 dark:text-white">
              +700%
            </p>
          </div>
        </Link>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-1">
            <div className="rounded-full w-3 h-3 bg-blockd"></div>
            <p className="font-semibold text-sm">BTC</p>
          </div>
          <div className="lg:flex items-center justify-end lg:col-span-3 hidden">
            <p className="font-semibold text-green-800 dark:text-white">
              +100%
            </p>
          </div>
        </Link>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-1">
            <div className="rounded-full w-3 h-3 bg-blockd"></div>
            <p className="font-semibold text-sm">TRT Token</p>
          </div>
          <div className="lg:flex items-center justify-end lg:col-span-3 hidden">
            <p className="font-semibold text-green-800 dark:text-white">+25%</p>
          </div>
        </Link>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-1">
            <div className="rounded-full w-3 h-3 bg-blockd"></div>
            <p className="font-semibold text-sm">Solar Official</p>
          </div>
          <div className="lg:flex items-center justify-end lg:col-span-3 hidden">
            <p className="font-semibold text-green-800 dark:text-white">+20%</p>
          </div>
        </Link>
        <div className="flex items-center justify-start">
          <Link
            href="/dashboard/trending"
            className="flex items-center justify-start bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md w-fit p-2 mt-1"
          >
            <p className="font-semibold text-sm">See all chatrooms</p>
          </Link>
        </div>
      </div>
      {/* <TrendingChatrooms /> */}
      {/* <TrendingStreams /> */}
      <div className="p-2">
        <div className="flex items-center justify-start rounded-md space-x-2 p-2 mt-2">
          <ComputerDesktopIcon className="w-4 h-4 lg:w-5 lg:h-5" />
          <p className="font-semibold text-xs lg:text-base">
            Trending Streamers
          </p>
        </div>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-2">
            <img
              src="/images/pfp/pfp1.jpg"
              className="rounded-full w-6 h-6 bg-blockd"
            />
            <p className="font-semibold text-sm">@Crypto_punk</p>
          </div>
        </Link>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-2">
            <img
              src="/images/pfp/pfp2.jpg"
              className="rounded-full w-6 h-6 bg-blockd"
            />
            <p className="font-semibold text-sm">@Egoist</p>
          </div>
        </Link>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-2">
            <img
              src="/images/pfp/pfp3.jpg"
              className="rounded-full w-6 h-6 bg-blockd"
            />
            <p className="font-semibold text-sm">@Crypto_crazy</p>
          </div>
        </Link>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-2">
            <img
              src="/images/pfp/pfp1.jpg"
              className="rounded-full w-6 h-6 bg-blockd"
            />
            <p className="font-semibold text-sm">@Crypto_queen</p>
          </div>
        </Link>
        <Link
          href="/dashboard/chatroom"
          className="grid grid-cols-8 bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md space-x-1 p-2 mt-1"
        >
          <div className="flex items-center justify-start col-span-8 lg:col-span-5 space-x-2">
            <img
              src="/images/pfp/pfp3.jpg"
              className="rounded-full w-6 h-6 bg-blockd"
            />
            <p className="font-semibold text-sm">@Shiba_king</p>
          </div>
        </Link>
        <div className="flex items-center justify-start">
          <Link
            href="/dashboard/trending"
            className="flex items-center justify-start bg-gray-100 hover:bg-gray-200 dark:hover:bg-darkgray dark:bg-lightgray rounded-md w-fit p-2 mt-1"
          >
            <p className="font-semibold text-sm">See all streamers</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Widgets;
