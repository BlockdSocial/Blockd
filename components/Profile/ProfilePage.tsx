import React, { useState, useEffect } from "react";
import InfoContainer from "./InfoContainer";
import Feed from "./Feed";
import Interactions from "./Interactions";
import Followers from "./Followers";
import Following from "./Following";
import { fetchAuthUser } from "../../stores/authUser/AuthUserActions";
import { fetchFollowers, fetchUser } from "../../stores/user/UserActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { fetchUserPosts } from "../../stores/post/PostActions";
import CustomLoadingOverlay from "../CustomLoadingOverlay";
import { parseQueryString } from "../../utils";
import { toast } from "react-hot-toast";
import {
  DocumentDuplicateIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
  score: number;
  level: number;
  levelTotal: number;
  frameName: string;
}

function ProfilePage() {
  const dispatch = useAppDispatch();
  let [showFeed, setShowFeed] = useState<boolean>(true);
  let [showInteractions, setShowInteractions] = useState<boolean>(false);
  let [showFollowers, setShowFollowers] = useState<boolean>(false);
  let [showFollowing, setShowFollowing] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>();
  const [user, setUser] = useState<User>();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { isFetchingUserPosts, userPosts } = useAppSelector(
    (state) => state.postReducer
  );
  const { isFetchingAuthUser } = useAppSelector(
    (state) => state.authUserReducer
  );
  const { isFetchingUser, error } = useAppSelector(
    (state) => state.userReducer
  );

  const router = useRouter();
  const user_id =
    router.query.user_id ||
    parseQueryString(window.location.search.substring(1)).user_id;

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    if (user_id == undefined || null) {
      fetchLoggedInUser();
    } else {
      fetchUserById();
    }
  }, [user_id]);

  const fetchLoggedInUser = async () => {
    await dispatch(fetchAuthUser()).then((res: any) => {
      setUser(res);
      fetchPosts(res);
    });
  };

  const fetchUserById = async () => {
    if (!isEmpty(user_id)) {
      await dispatch(fetchUser(user_id)).then((res: any) => {
        setUser(res);
        fetchPosts(res);
      });
    }
  };

  const fetchPosts = async (thisUser: any = {}) => {
    if (!thisUser) {
      thisUser = user;
    }
    if (!isEmpty(thisUser)) {
      await dispatch(fetchUserPosts(thisUser?.id)).then((res) => {
        setPosts(res);
      });
    }
  };

  const handleToggle1 = () => {
    if (showFeed == false) {
      setShowFeed(!showFeed);
      showInteractions = false;
      showFollowers = false;
      showFollowing = false;
      setShowInteractions(showInteractions);
      setShowFollowers(showFollowers);
      setShowFollowing(showFollowing);
    }
  };

  const handleToggle2 = () => {
    if (showInteractions == false) {
      setShowInteractions(!showInteractions);
      showFeed = false;
      showFollowers = false;
      showFollowing = false;
      setShowFeed(showFeed);
      setShowFollowers(showFollowers);
      setShowFollowing(showFollowing);
    }
  };

  const handleToggle3 = () => {
    if (showFollowers == false) {
      setShowFollowers(!showFollowers);
      showInteractions = false;
      showFeed = false;
      showFollowing = false;
      setShowFeed(showFeed);
      setShowInteractions(showInteractions);
      setShowFollowing(showFollowing);
    }
  };

  const handleToggle4 = () => {
    if (showFollowing == false) {
      setShowFollowing(!showFollowing);
      showInteractions = false;
      showFeed = false;
      showFollowers = false;
      setShowFeed(showFeed);
      setShowInteractions(showInteractions);
      setShowFollowers(showFollowers);
    }
  };

  const [text, setText] = useState("ReferralID");

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14">
      <CustomLoadingOverlay
        active={isFetchingUserPosts || isFetchingAuthUser || isFetchingUser}
      />

      <InfoContainer
        user={user as User}
        refetchUser={isEmpty(user_id) ? fetchLoggedInUser : fetchUserById}
        userId={user_id as string}
      />

      <div className="border-b">
        <div className="flex items-center justify-start my-5 px-4 space-x-1">
          <UserPlusIcon className="w-5 h-5 stroke-[2px]" />
          <p className="text-base font-semibold">Referral Link : </p>
          <input
            className="text-base w-20 bg-transparent"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled
          />
          <DocumentDuplicateIcon
            onClick={async () => {
              if ("clipboard" in navigator) {
                await navigator.clipboard.writeText(text);
                toast.success("Copied to clipboard!");
              } else {
                document.execCommand("copy", true, text);
              }
            }}
            className="w-5 h-5 cursor-pointer copy-button"
          />
        </div>
      </div>
      <div className="flex items-center justify-between p-5 w-full border-b dark:border-lightgray h-10 mt-8">
        <button
          onClick={() => handleToggle1()}
          className={`text-xs md:text-sm lg:text-base focus:outline-none ${
            showFeed === true ? "border-b-2 border-blockd text-blockd :" : ""
          }`}
        >
          Feed
        </button>
        {/* <button onClick={() => handleToggle2()} className={`text-xs md:text-sm lg:text-base focus:outline-none ${showInteractions === true ? 'border-b-2 border-blockd text-blockd :' : ''}`}>
          Interactions
        </button> */}
        <button
          onClick={() => handleToggle3()}
          className={`text-xs md:text-sm lg:text-base focus:outline-none ${
            showFollowers === true
              ? "border-b-2 border-blockd text-blockd :"
              : ""
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => handleToggle4()}
          className={`text-xs md:text-sm lg:text-base focus:outline-none ${
            showFollowing === true
              ? "border-b-2 border-blockd text-blockd :"
              : ""
          }`}
        >
          Following
        </button>
      </div>

      {showFeed && <Feed posts={posts} refetch={fetchPosts} />}
      {showInteractions && <Interactions />}
      {showFollowers && <Followers user={user} />}
      {showFollowing && <Following user={user} />}
    </div>
  );
}

export default ProfilePage;
