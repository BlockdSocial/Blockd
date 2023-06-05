import React, { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import {
  MagnifyingGlassIcon,
  ArrowDownRightIcon,
  ArrowUpRightIcon,
} from "@heroicons/react/24/outline";
import Slider from "./Slider";
import Link from "next/link";
import { fetchTrendingPosts } from "../../stores/post/PostActions";
import { useAppDispatch } from "../../stores/hooks";
import { searchFilteredUsers } from "../../stores/user/UserActions";
import { ArrowTrendingUpIcon, HashtagIcon } from "@heroicons/react/24/outline";
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

  let [BTCPrice, setBTCPrice] = useState<any>();
  let [BTCUrl, setBTCUrl] = useState<any>();
  let [BTCPriceChange, setBTCPriceChange] = useState<any>();
  let [ETHPrice, setETHPrice] = useState<any>();
  let [ETHUrl, setETHUrl] = useState<any>();
  let [ETHPriceChange, setETHPriceChange] = useState<any>();
  let [MATICPrice, setMATICPrice] = useState<any>();
  let [MATICUrl, setMATICUrl] = useState<any>();
  let [MATICPriceChange, setMATICPriceChange] = useState<any>();

  const MINUTE_MS = 100000;

  //Get the Token Price

  const fetchData = async () => {
    //Get pair information by chain
    const BTCResponse = await getPairInformationByChain(
      "bsc",
      "0x46cf1cf8c69595804ba91dfdd8d6b960c9b0a7c4"
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

    BTCPrice = await BTCResponse.pair.priceUsd;
    BTCUrl = await BTCResponse.pair.url;
    BTCPriceChange = await BTCResponse.pair.priceChange.h1;
    ETHUrl = await ETHResponse.pair.url;
    ETHPrice = await ETHResponse.pair.priceUsd;
    ETHPriceChange = await ETHResponse.pair.priceChange.h1;
    MATICUrl = await MATICResponse.pair.url;
    MATICPrice = await MATICResponse.pair.priceUsd;
    MATICPriceChange = await MATICResponse.pair.priceChange.h1;

    // priceChange = pairsResponse.pairs[0].priceChange.h24;

    return {
      BTCPrice,
      ETHPrice,
      MATICPrice,
      BTCPriceChange,
      ETHPriceChange,
      MATICPriceChange,
      BTCUrl,
      ETHUrl,
      MATICUrl,
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData().then(() => {
        const BTC = BTCPrice;
        setBTCPrice(BTC);
        const BTCChange = BTCPriceChange;
        setBTCPriceChange(BTCChange);
        const BtcUrl = BTCUrl;
        setBTCUrl(BtcUrl);
        const ETH = ETHPrice;
        setETHPrice(ETH);
        const ETHChange = ETHPriceChange;
        setETHPriceChange(ETHChange);
        const EthUrl = ETHUrl;
        setETHUrl(EthUrl);
        const MATIC = MATICPrice;
        setMATICPrice(MATIC);
        const MATICChange = MATICPriceChange;
        setMATICPriceChange(MATICChange);
        const MaticUrl = MATICUrl;
        setMATICUrl(MaticUrl);
      });
    }, MINUTE_MS);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  
      fetchData().then(() => {
        const BTC = BTCPrice;
        setBTCPrice(BTC);
        const BTCChange = BTCPriceChange;
        setBTCPriceChange(BTCChange);
        const BtcUrl = BTCUrl;
        setBTCUrl(BtcUrl);
        const ETH = ETHPrice;
        setETHPrice(ETH);
        const ETHChange = ETHPriceChange;
        setETHPriceChange(ETHChange);
        const EthUrl = ETHUrl;
        setETHUrl(EthUrl);
        const MATIC = MATICPrice;
        setMATICPrice(MATIC);
        const MATICChange = MATICPriceChange;
        setMATICPriceChange(MATICChange);
        const MaticUrl = MATICUrl;
        setMATICUrl(MaticUrl);
      });
    
  }, []);

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
      <div className="flex flex-col space-y-2 mt-8 bg-gray-100 dark:bg-lightgray m-2 rounded-md">
        <div className="p-2 flex items-center justify-start space-x-2 w-full">
          <ArrowTrendingUpIcon className="w-5 h-5" />
          <p>Live Chart</p>
        </div>
        {ETHPrice && (
          <Link
            href={ETHUrl}
            target="_blank"
            className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
          >
            <img src="/images/logo/eth-logo-2.png" className="w-7 h-7" />
            <p
              className={`${
                ETHPriceChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {ETHPrice}
            </p>
            {ETHPriceChange > 0 ? (
              <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
            ) : (
              <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
            )}
          </Link>
        )}
        {MATICPrice && (
          <Link
            href={MATICUrl}
            target="_blank"
            className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
          >
            <img src="/images/logo/matic-logo.png" className="w-7 h-7" />
            <p
              className={`${
                MATICPriceChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {MATICPrice}
            </p>
            {MATICPriceChange > 0 ? (
              <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
            ) : (
              <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
            )}
          </Link>
        )}
        {BTCPrice && (
          <Link
            href={BTCUrl}
            target="_blank"
            className="flex items-center justify-between space-x-2 w-full p-2 hover:bg-gray-200 hover:dark:bg-[#1F2022]"
          >
            <img src="/images/logo/btc-logo.png" className="w-7 h-7" />
            <p
              className={`${
                BTCPriceChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {BTCPrice}
            </p>
            {BTCPriceChange > 0 ? (
              <ArrowUpRightIcon className="w-4 h-4 stroke-[3px] text-green-600" />
            ) : (
              <ArrowDownRightIcon className="w-4 h-4 stroke-[3px] text-red-600" />
            )}
          </Link>
        )}
      </div>
      {/* <div className="flex flex-col mt-4 bg-gray-100 dark:bg-lightgray m-2 rounded-md">
        <p className="flex items-center justify-start space-x-2 p-2">
          <HashtagIcon className="w-4 h-4" />
          Trending Hashtags
        </p>
        <div className="px-2 py-3 flex flex-col hover:bg-gray-200 hover:dark:bg-[#1F2022] text-sm cursor-pointer">
          <p>#Hashtag1</p>
          <p>27 Posts</p>
        </div>
        <div className="px-2 py-3 flex flex-col hover:bg-gray-200 hover:dark:bg-[#1F2022] text-sm cursor-pointer">
          <p>#Hashtag2</p>
          <p>15K Posts</p>
        </div>
        <div className="px-2 py-3 flex flex-col hover:bg-gray-200 hover:dark:bg-[#1F2022] hover:rounded-b-md text-sm cursor-pointer">
          <Link href="/dashboard/trendingHashtags" className="">View More</Link>
        </div>
      </div> */}
    </div>
  );
}

export default Widgets;
