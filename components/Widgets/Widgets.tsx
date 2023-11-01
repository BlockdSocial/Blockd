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
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchUser, searchFilteredUsers } from "../../stores/user/UserActions";
import { ArrowTrendingUpIcon, HashtagIcon } from "@heroicons/react/24/outline";
import Result from "./Result";
import { isEmpty, result } from "lodash";
import { getPairInformationByChain } from "dexscreener-api";
import LiveChart from "./LiveChart";
import { useRouter } from "next/router";
import { chatApi } from "../../api";

interface Pic {
  name: string;
}
type ETHARRAY = {
  name: string;
  image: string;
  current_price: number;
  market_cap_change_percentage_24h: number;
};

const call =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("call") as any)
    : "";

function Widgets() {
  const dispatch = useAppDispatch();
  const { user, authUser }: any = useAppSelector(
    (state: any) => state.authUserReducer
  );
  // const { trendingPosts } = useAppSelector((state) => state.postReducer);
  const TrendingChatrooms = dynamic(() => import("./TrendingChatrooms"), {
    ssr: false,
  });
  //const TrendingStreams = dynamic(() => import('./TrendingStreams'), { ssr: false })
  const [searchResult, setSearchResult] = useState<any>();
  const [input, setInput] = useState<string>("");
  const [trendingPosts, setTrendingPosts] = useState<any>();
  const [participants, setParticipants] = useState<any>([]);
  const [callMode, setCallMode] = useState<boolean>(false);
  const { asPath, pathname } = useRouter();

  //Get the Token Price
  useEffect(() => {
    if ("/dashboard/video" == pathname && call?.id) {
      console.log({ pathname });
      setCallMode(true);
      getParticipants();
    } else {
      setCallMode(false);
    }
    console.log(callMode, "pathname");
  }, [pathname]);

  const getParticipants = async () => {
    let result = await chatApi.getParticipants(call?.id);
    setParticipants(result?.participants);
  };
  const addParticipant = async (newParticipantId: number) => {
    console.log(newParticipantId, newParticipantId,'addParticipant')
    let result = await chatApi.addParticipant({
      newParticipant: newParticipantId,
      call_id: call?.id,
    });
  };

  const fetchTrendings = useCallback(() => {
    dispatch(fetchTrendingPosts()).then((res: any) => {
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
    return;
    console.log(e, 'addParticipant')
    if (!isEmpty(e.relatedTarget)) {
      console.log(e.relatedTarget.className, 'addParticipant')
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
      {!isEmpty(authUser) ? (
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
                            callMode={callMode}
                            participants={participants}
                            addParticipant={addParticipant}
                          />
                        )
                    )}
                  {!callMode && (
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
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {!callMode 
      ?
        <>
          {!isEmpty(authUser) ? (
            <Slider trendingPosts={trendingPosts} />
          ) : (
            <></>
          )}

          <LiveChart />
        </>
        :
        <></>
      }
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
