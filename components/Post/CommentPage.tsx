import React from "react";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import MainComment from "./MainComment";
import CommentSection from './CommentSection'
import { useAppSelector } from '../../stores/hooks'

interface Comment {
  content: string;
  createdAt: string;
  userId: number;
}


function CommentPage() {
  const router = useRouter();
  const { postComments } = useAppSelector((state) => state.commentReducer);


  return (
    <div className="relative max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x pb-4">
      <div className="flex z-[1] flex-col items-start sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30">
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className="h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125"
        />
      </div>

      <div className="z-0">
        {/* 
                // @ts-ignore */}
        <MainComment />
        {postComments &&
          postComments.map((comment: object, index: number) => (
            <CommentSection
              key={index}
              // @ts-ignore
              comment={comment as Comment}
            />
          ))}
      </div>
    </div>
  );
}

export default CommentPage;
