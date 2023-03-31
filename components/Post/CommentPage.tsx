import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import MainComment from "./MainComment";
import CommentSection from './CommentSection';
import { useAppSelector, useAppDispatch } from '../../stores/hooks';
import { isEmpty, result } from "lodash";
import { fetchComment, fetchCommentReplies } from "../../stores/comment/CommentActions";
import { fetchPost } from "../../stores/post/PostActions";
import { parseQueryString } from "../../utils";

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

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: number;
  user: User;
  gif: string;
  imgName: string;
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
  user: User;
}

function CommentPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { comment, commentReplies } = useAppSelector((state) => state.commentReducer);
  const { post } = useAppSelector((state) => state.postReducer);
  const spliced = window.location.search.substring(1);
  const split = spliced.split('&');
  const commentId = parseQueryString(split[0]).commentId;
  const postId = parseQueryString(split[1]).postId;

  useEffect(() => {
    if (!isEmpty(router.query)) {
      fetchReplies();
      fetchCommentById();
      fetchPostById();
    }
  }, [router.query]);

  const fetchReplies = async () => {
    await dispatch(fetchCommentReplies(commentId as string));
  }

  const fetchCommentById = async () => {
    await dispatch(fetchComment(commentId as string));
  }

  const fetchPostById = async () => {
    await dispatch(fetchPost(postId as string));
  }

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14">
      <div className="flex z-[2] flex-col items-start sticky border-b dark:border-lightgray top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30">
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className="h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125"
        />
      </div>

      <div className="z-0">
        {/* // @ts-ignore */}
        <MainComment
          // @ts-ignore
          comment={comment as Comment}
          refetchReplies={fetchReplies}
        />
        {commentReplies &&
          commentReplies.map((comment: object, index: number) => (
            <CommentSection
              key={index}
              // @ts-ignore
              comment={comment as Comment}
              // @ts-ignore
              post={post as Post}
              type='reply'
            />
          ))}
      </div>
    </div>
  );
}

export default CommentPage;
