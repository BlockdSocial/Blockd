import React, { useEffect } from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { fetchFollowings } from "../../stores/user/UserActions";
import { isEmpty } from "lodash";
import { config } from "../../constants";
import { toast } from "react-hot-toast";
import { encodeQuery } from "../../utils";

function Following({ user }: any) {
  const dispatch = useAppDispatch();
  const { followings, error } = useAppSelector((state) => state.userReducer);

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    fetchUserFollowings();
  }, []);

  const fetchUserFollowings = async () => {
    await dispatch(fetchFollowings(user?.id));
  };

  return (
    <div>
      <div role="list" className="">
        {!isEmpty(followings) &&
          followings.map((following: any, index: any) => (
            <Link
              href={{
                pathname: "/dashboard/profile",
                query: { user_id: following?.otherUser?.id },
              }}
              as={`/dashboard/profile?${encodeQuery(
                following?.otherUser?.id,
                "profile"
              )}`}
              className="relative flex items-center justify-between overflow-hidden group/item hover:bg-slate-100 dark:hover:bg-lightgray p-2 pl-14 cursor-pointer my-1"
            >
              <img
                className="absolute -left-4 h-16 w-16 rounded-full object-cover shadow-md opacity-60 group-hover/item:opacity-100"
                src={
                  !isEmpty(following?.otherUser?.profilePic)
                    ? `${config.url.PUBLIC_URL}/${following?.otherUser?.profilePic?.name}`
                    : "/images/pfp/pfp1.jpg"
                }
                alt=""
              />
              <div className="flex">
                <div className="ml-3 overflow-hidden">
                  <div className="flex items-center space-x-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      @{following?.otherUser?.name}
                    </p>
                    {following?.otherUser?.level == 20 && (
                      <img
                        src="/images/badges/verified.png"
                        className="w-4 h-4"
                      />
                    )}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-300 truncate">
                    Level : {following?.otherUser?.level}
                  </p>
                </div>
              </div>
              <div className="hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-6 rounded-md">
                <Link
                  href={{
                    pathname: "/dashboard/profile",
                    query: { user_id: following?.otherUser?.id },
                  }}
                  as={`/dashboard/profile?${encodeQuery(
                    following?.otherUser?.id,
                    "profile"
                  )}`}
                  className="flex invisible group-hover/item:visible"
                >
                  <span className="group-hover/edit:text-gray-700 font-semibold">
                    View
                  </span>
                  <div className="flex items-center ml-2">
                    <ArrowSmallRightIcon className="group-hover/edit:text-slate-500 w-4 h-4" />
                  </div>
                </Link>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Following;
