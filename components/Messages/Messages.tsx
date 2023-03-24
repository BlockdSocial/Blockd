import React from "react";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAppDispatch } from "../../stores/hooks";
import { readNotification } from "../../stores/notification/NotificationActions";
import { isEmpty } from "lodash";
import { config } from "../../constants";
import moment from "moment";

function Messages({ notification, handleFetchNotifications }: any) {
  const dispatch = useAppDispatch();

  const handleReadNotification = async () => {
    await dispatch(readNotification(notification?.id)).then(() => {
      handleFetchNotifications();
    });
  };

  return (
    <div className="divide-slate-200 dark:divide-lightgray">
      <Link
        onClick={() => handleReadNotification()}
        href={{
          pathname: "/dashboard/myChatrooms/",
          query: { chatReceiverId: notification?.user?.id },
        }}
        // @ts-ignore
        className={`flex items-center justify-between group/item border-b dark:border-lightgray ${
          notification?.read == 0 ? "bg-slate-100 dark:bg-lightgray" : ""
        } p-4 cursor-pointer`}
      >
        <div className="flex mr-2">
          <Link
            onClick={() => handleReadNotification()}
            href={{
              pathname: "/dashboard/profile",
              query: { user_id: notification?.user?.id },
            }}
          >
            <img
              className="h-10 w-10 rounded-full"
              src={
                !isEmpty(notification?.user?.profilePic)
                  ? `${config.url.PUBLIC_URL}/${notification?.user?.profilePic?.name}`
                  : "/images/pfp/pfp1.jpg"
              }
              alt=""
            />
          </Link>
          <div className="ml-3 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {notification?.user?.name} Sent you a private message.
              <br></br>
              <span className="text-xs">{moment(notification?.createdAt).fromNow()}</span>
            </p>
          </div>
        </div>
        <div className="hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md">
          <Link
            onClick={() => handleReadNotification()}
            href={{
              pathname: "/dashboard/myChatrooms/",
              query: { chatReceiverId: notification?.user?.id },
            }}
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
    </div>
  );
}

export default Messages;
