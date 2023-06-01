import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import router from "next/router";
import React, { useEffect, useState } from "react";
import PostTest from "../Feed/Post";
import { isEmpty } from "lodash";
import { useAppDispatch } from "../../stores/hooks";
import { fetchHashTagPosts } from "../../stores/post/PostActions";

function HashtagPage() {
  const dispatch = useAppDispatch();
  const hashtag = window.location.search.substring(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(5);
  const [posts, setPosts] = useState<any>([]);
  const [complete, setComplete] = useState<boolean>(false);

  useEffect(() => {
    if (!isEmpty(hashtag)) {
      handleFetchHashPosts();
    }
  }, [hashtag]);

  const handleFetchHashPosts = async () => {
    await dispatch(fetchHashTagPosts({
      hashtag: `#${hashtag}`,
      start: start,
      end:  end
    })).then((res) => setPosts(res?.posts));
  }

  const handleLoadClick = async () => {
    setStart(start + 5);
    setEnd(end + 5);
    await dispatch(fetchHashTagPosts({
      hashtag: `#${hashtag}`,
      start: start,
      end:  end
    })).then((res) => {
            //@ts-ignore
      setPosts(posts => [...posts,...res?.posts]);
      if (res?.posts?.length < 5) {
        setComplete(true);
      }
    });
  }

  console.log("posts: ", posts);
  return (
    <div className="relative h-[92vh] scrollbar-hide overflow-scroll col-span-9 md:col-span-5">
      <div className="flex z-[2] items-center justify-start space-x-2 sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30">
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className="h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125"
        />
        <p className="text-[17px]">#{hashtag}</p>
      </div>
      <div className="flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-lightgray rounded-lg space-y-3">
        {
          posts && !isEmpty(posts) &&
          posts?.map((post: any, index: any) => (
            // @ts-ignore
            <PostTest 
            mainPost={post} 
            />
          ))
        }
        {
          !complete &&
        <div onClick={() => handleLoadClick()} className="flex items-center justify-center cursor-pointer p-2 w-full rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold">
          View more
        </div>
}
      </div>
    </div>
  );
}

export default HashtagPage;
