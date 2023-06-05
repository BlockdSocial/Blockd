import React, { useEffect, useState } from "react";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  MinusCircleIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { config } from "../../constants";
import { isEmpty } from "lodash";
import { encodeQuery, renderComment, renderCommentText } from "../../utils";
// @ts-ignore
import renderHTML from "react-render-html";
import { fetchAuthUser } from "../../stores/authUser/AuthUserActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";

interface Images {
  name: string;
}
interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  hasImg: boolean;
  userId: number;
  gif: string;
  postImage: Images;
}
interface Props {
  trendingPosts: Post[];
}

interface Slide {
  url: string;
  title: string;
  id: number;
}

function Slider({ trendingPosts }: Props) {
  const dispatch = useAppDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const { authUser }: any = useAppSelector((state) => state.authUserReducer);

  useEffect(() => {
    if (trendingPosts != undefined) {
      const newSlides = [];
      for (let i = 0; i < trendingPosts.length; i++) {
        if (trendingPosts[i]?.hasImg) {
          const trendingPost = {
            title: trendingPosts[i]?.content,
            id: trendingPosts[i]?.id,
            url: `${config.url.PUBLIC_URL}/${trendingPosts[i]?.postImage?.name}`,
          };
          newSlides.push(trendingPost);
        }
      }
      setSlides(newSlides);
    }
  }, [trendingPosts]);
  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: any) => {
    setCurrentIndex(slideIndex);
  };
  console.log(authUser);

  return (
    <>
      {!isEmpty(slides) && (
        <div className="mt-3">
          <div className="flex items-center justify-start rounded-md space-x-2 p-2 mt-4">
            {/* <ShareIcon className="w-4 h-4 lg:w-5 lg:h-5" /> */}
            <p className="text-xs lg:text-base">Trending Posts</p>
          </div>
          <div className="h-52 w-full m-auto p-2 relative group">
            <Link
              href={{
                pathname: authUser ? "/dashboard/post/" : "/auth/signup",
                query: { postId: slides[currentIndex]?.id },
              }}
              as={`/dashboard/post?${encodeQuery(
                slides[currentIndex]?.id,
                "post"
              )}`}
            >
              <div
                style={{ backgroundImage: `url(${slides[currentIndex]?.url})` }}
                className="w-full h-full relative rounded-md bg-center bg-cover duration-500"
              >
                <Link
                  href={{
                    pathname: "/dashboard/post/",
                    query: { postId: slides[currentIndex]?.id },
                  }}
                  as={`/dashboard/post?${encodeQuery(
                    slides[currentIndex]?.id,
                    "post"
                  )}`}
                  className="absolute bg-gradient-to-r dark:from-lightgray from-indigo-500 text-white dark:bg-white text-sm font-semibold p-1 pl-2 rounded-b-md flex items-center justify-start bottom-0 w-full"
                >
                  {!isEmpty(slides[currentIndex]?.title) &&
                    renderHTML(renderCommentText(slides[currentIndex]?.title))}
                </Link>
              </div>
            </Link>
            {/* Left Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <ChevronLeftIcon onClick={prevSlide} className="w-4 h-4" />
            </div>
            {/* Right Arrow */}
            <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
              <ChevronRightIcon onClick={nextSlide} className="w-4 h-4" />
            </div>
            <div className="flex top-4 justify-center py-2">
              {slides.map((slide, slideIndex) => (
                <div
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className="text-2xl cursor-pointer"
                >
                  <MinusCircleIcon className="ml-1 w-2 h-2 dark:fill-white dark:text-white fill-black text-black" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Slider;
