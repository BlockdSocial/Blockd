import React, { useEffect, useState } from "react";
import PostTest from "../Feed/Post";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { useRouter } from "next/router";
import { isString, slice } from "lodash";
import {
  searchFilteredUsers,
  searchUsers,
} from "../../stores/user/UserActions";
import UserResult from "./UserResult";
import { searchPosts } from "../../stores/post/PostActions";
import Link from "next/link";

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
}

function SearchPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [users, setUsers] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(5);
  // const [initialUsers, setInitialUsers] = useState<any>()
  const initialUsers = slice(users, 0, index);

  const [posts, setPosts] = useState([]);
  const [isCompleted2, setIsCompleted2] = useState(false);
  const [index2, setIndex2] = useState(5);
  const initialPosts = slice(posts, 0, index2);

  const { query } = router.query;
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { popularUsers, filteredUsers } = useAppSelector(
    (state) => state.userReducer
  );
  const { postsResults } = useAppSelector((state) => state.postReducer);

  useEffect(() => {
    if (isString(query) && query.length > 0) {
      handleSearchUsers();
      handleSearchFilteredUsers();
    }
  }, [query]);

  console.log(users);
  const loadMore = () => {
    setIndex(index + 5);
    console.log(index);
    if (index >= users?.length) {
      setIsCompleted(true);
    } else {
      setIsCompleted(false);
    }
  };

  const loadMore2 = () => {
    setIndex2(index2 + 5);
    console.log(index2);
    if (index2 >= posts?.length) {
      setIsCompleted2(true);
    } else {
      setIsCompleted2(false);
    }
  };

  const handleSearchUsers = async () => {
    dispatch(
      searchUsers({
        search: query,
        start: 0,
        end: 20,
      })
    ).then((res: any) => {
      setPosts(res?.posts);
    });
  };

  const handleSearchFilteredUsers = async () => {
    dispatch(
      searchFilteredUsers({
        search: query,
      })
    ).then((res: any) => {
      setUsers(res);
    });
  };

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 bg-gray-100 dark:bg-darkgray pb-14">
      <div className="flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-lightgray rounded-lg space-y-3">
        <h3 className="text-xl font-semibold w-full mb-4">People</h3>
        <>
          {initialUsers &&
            initialUsers.map((user: any) => <UserResult user={user} />)}
          {initialUsers?.length == 0 || isCompleted || users?.length == 5 ? (
            <></>
          ) : (
            <div
              onClick={loadMore}
              className="flex items-center justify-center cursor-pointer p-2 w-full rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-transparent dark:border-blockd dark:border hover:dark:bg-gray-600/10 font-semibold"
            >
              View more
            </div>
          )}
        </>
      </div>
      <div className="flex flex-col items-start justify-center m-2 p-4 bg-white dark:bg-darkgray dark:border dark:border-lightgray rounded-lg space-y-3">
        <h3 className="text-xl font-semibold w-full mb-4">Posts</h3>
        {initialPosts &&
          initialPosts.map((post: any) => (
            // @ts-ignore
            <PostTest
              // @ts-ignore
              mainPost={post}
            />
          ))}
        {initialPosts?.length == 0 || isCompleted2 || posts?.length == 5 ? (
          <></>
        ) : (
          <div
            onClick={loadMore2}
            className="flex items-center justify-center cursor-pointer p-2 w-full rounded-md bg-orange-100 hover:bg-orange-200 text-orange-600 dark:bg-orange-500 hover:dark:bg-orange-600 dark:text-white font-semibold"
          >
            View more
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
