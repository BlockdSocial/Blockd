import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import toast from "react-hot-toast";
import LandingPost from "./Post";
import {
  fetchFilteredPosts,
} from "../../stores/post/PostActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchAuthUser } from "../../stores/authUser/AuthUserActions";
import Link from "next/link";

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  hasImg: boolean;
  userId: number;
  gif: string;
}

interface Filtered {
  posts: Post[];
}

function Feed() {
  const dispatch = useAppDispatch();


  const { isFetchingFilteredPosts, error } = useAppSelector(
    (state) => state.postReducer
  );
  const [endCount, setEndCount] = useState<number>(4);
  const [endTotal, setEndTotal] = useState<number>(4);
  const [filtered, setFiltered] = useState<Filtered | any>([]);

  let [atTop, setAtTop] = useState<boolean>(false);
  const elementRef = useRef<any>(null);

  useEffect(() => {
   
    setFiltered(undefined);
    fetchFiltered();
  },[]);

  const fetchFiltered = async () => {
    await dispatch(
      fetchFilteredPosts({
        start: 0,
        end: 8,
      })
    ).then((result: any) => {
      setEndTotal(8);
      setEndCount(8);
      setFiltered(result?.posts);
    });
  };


  const goToTopOfPage = () => {
    const element = document.getElementById("top-page");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    await fetchFiltered();
    await new Promise((f) => setTimeout(f, 1000));
    toast.success("Feed Updated!", {
      id: refreshToast,
    });
  };

 

  return (
    <div
      ref={elementRef}
      className="relative max-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14"
    >
      <div id="top-page"></div>
      <div
        className={`flex items-center z-[30] ${
          atTop === false ? "justify-end" : "justify-between"
        } sticky top-0 p-3 md:p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30`}
      >
        {atTop && (
          <ChevronDoubleUpIcon
            onClick={() => goToTopOfPage()}
            className="w-6 h-6 cursor-pointer"
          />
        )}
        <ArrowPathIcon
          onClick={handleRefresh}
          className="flex items-center justify-end w-6 h-6 cursor-pointer text-black dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale"
        />
      </div>

      <div>
        <div className="px-4">
          {filtered &&
            filtered?.slice(0, 7).map((post: Post, index: number) => (
              // @ts-ignore
              <LandingPost
                key={`${index}-post`}
                // @ts-ignore
                mainPost={post}
                refetch={handleRefresh}
              />
            ))}
        </div>
        <div className="p-4">
        <Link
            href={{
              pathname: "/auth/signup",
            
            }}
            
          >
          <div className="flex items-center justify-center p-4 rounded-md w-full bg-orange-200 hover:bg-blockd text-white cursor-pointer">
              Sign up to view more
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Feed;
