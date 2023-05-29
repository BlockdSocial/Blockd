import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Slider from "./Slider";
import Link from "next/link";
import { fetchTrendingPosts } from "../../stores/post/PostActions";
import { useAppDispatch } from "../../stores/hooks";
import { searchFilteredUsers } from "../../stores/user/UserActions";
import { ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import Result from "./Result";
import { isEmpty } from "lodash";
import { getPairInformationByChain } from "dexscreener-api";

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

type ETHARRAY = {
  name: string;
  image: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
};

function Widgets() {
  const dispatch = useAppDispatch();
  // const { trendingPosts } = useAppSelector((state) => state.postReducer);
  const TrendingChatrooms = dynamic(() => import("./TrendingChatrooms"), {
    ssr: false,
  });
  //const TrendingStreams = dynamic(() => import('./TrendingStreams'), { ssr: false })
  const [searchResult, setSearchResult] = useState<any>();
  const [input, setInput] = useState<string>("");
  const [trendingPosts, setTrendingPosts] = useState<any>();

  let [BNBPrice, setBNBPrice] = useState<any>();
  let [ETHPrice, setETHPrice] = useState<any>();
  let [MATICPrice, setMATICPrice] = useState<any>();

  //Get the Token Price

  const fetchData = async () => {
    //Get pair information by chain
    const BNBResponse = await getPairInformationByChain(
      "bsc",
      "0x16b9a82891338f9bA80E2D6970FddA79D1eb0daE"
    );

    const ETHResponse = await getPairInformationByChain(
      "ethereum",
      "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640"
    );

    const MATICResponse = await getPairInformationByChain(
      "polygon",
      "0x9B08288C3Be4F62bbf8d1C20Ac9C5e6f9467d8B7"
    );

    //Get pairs matching base token address
    //const tokensResponse = await getPairsMatchingBaseTokenAddress("0x1DF2C6DF4d4E7F3188487F4515587c5E8b75dbfa");

    BNBPrice = await BNBResponse.pair.priceUsd;
    ETHPrice = await ETHResponse.pair.priceUsd;
    MATICPrice = await MATICResponse.pair.priceUsd;

    // priceChange = pairsResponse.pairs[0].priceChange.h24;

    return { BNBPrice, ETHPrice };
  };

  useEffect(() => {
    fetchData().then(() => {
      const BNB = BNBPrice;
      setBNBPrice(BNB);
      const ETH = ETHPrice;
      setETHPrice(ETH);
      const MATIC = MATICPrice;
      setMATICPrice(MATIC);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BNBPrice, ETHPrice]);

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
        searchFilteredUsers({
          search: input,
        })
      ).then((result: any) => {
        setSearchResult(result);
      });
    }
  }, [input]);

  const handleBlur = (e: any) => {
    if (!isEmpty(e.relatedTarget)) {
      console.log(e.relatedTarget.className);
      if (
        e.relatedTarget.className !== "w-full search-result" &&
        e.relatedTarget.className !==
          "flex items-center justify-start space-x-2 hover:rounded-b-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer"
      ) {
        setInput("");
      } else {
        return;
      }
    } else {
      setInput("");
    }
  };

  return (
    <div className="col-span-2 hidden md:inline min-h-screen scrollbar-hide overflow-scroll pb-16 border-x dark:border-lightgray">
      {/* Search */}
      <div className="sticky p-2 top-0 backdrop-blur-md bg-white/30 dark:bg-darkgray/30 z-[1]">
        <div className="flex items-center space-x-2 bg-gray-100 py-2 dark:bg-darkgray rounded-md dark:border-white border group">
          <MagnifyingGlassIcon className="hidden lg:inline w-5 h-5 ml-2 text-gray-400 dark:text-white" />
          <input
            value={input}
            onChange={(e: any) => setInput(e.target.value)}
            type="text"
            placeholder="Search Blockd"
            className="flex-1 outline-none bg-transparent"
            onBlur={(e: any) => handleBlur(e)}
          />
        </div>
        {input && (
          <div
            id="dropdownResults"
            className="relative mt-2 backdrop-blur-md bg-white/30 dark:bg-darkgray/30"
          >
            <div className="absolute top-0 left-0 bg-gray-100 dark:bg-darkgray border border-gray-200 dark:border-white rounded-md w-full z-10">
              <div className="flex flex-col items-center justify-center">
                {searchResult &&
                  searchResult?.map(
                    (result: any, index: any) =>
                      index <= 4 && (
                        <Result
                          result={result}
                          key={result?.id}
                          setInput={setInput}
                          setSearchInput={() => {}}
                        />
                      )
                  )}
                <Link
                  href={{
                    pathname: "/search",
                    query: { query: input },
                  }}
                  className="flex items-center justify-start space-x-2 hover:rounded-b-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer"
                  onClick={() => setInput("")}
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
      <div className="p-2 flex flex-col space-y-2 mt-8 bg-gray-100 dark:bg-lightgray m-2 rounded-md">
        <div className="flex items-center justify-start space-x-2 w-full mb-2">
          <ArrowTrendingUpIcon className="w-5 h-5" />
          <p>Live Charts</p>
        </div>
        {ETHPrice && (
          <div className="flex items-center justify-start space-x-2 w-full">
            <img src="/images/logo/eth-logo-2.png" className="w-5 h-5"/>
            <p>{ETHPrice}</p>
          </div>
        )}
        {MATICPrice && (
          <div className="flex items-center justify-start space-x-2 w-full">
          <img src="/images/logo/matic-logo.png" className="w-5 h-5"/>
            <p>{MATICPrice}</p>
          </div>
        )}
        {BNBPrice && (
          <div className="flex items-center justify-start space-x-2 w-full">
          <img src="/images/logo/bnb-logo.png" className="w-5 h-5"/>
            <p>{BNBPrice}</p>
          </div>
        )}
      </div>
      {/* <div className="p-2">
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
      </div> */}
      {/* <TrendingChatrooms /> */}
      {/* <TrendingStreams /> */}
      {/* <div className="p-2">
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
              src="/images/pfp/pfp1.jpg"
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
      </div> */}
    </div>
  );
}

export default Widgets;
