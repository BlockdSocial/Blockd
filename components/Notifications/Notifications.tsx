import React from "react";
import Image from "next/image";
import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAppDispatch } from "../../stores/hooks";
import { isEmpty } from "lodash";
import { config } from "../../constants";
import moment from "moment";
import { readNotification } from "../../stores/notification/NotificationActions";

interface IPic {
  name: string;
}

interface Pic {
  image: IPic;
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

interface INotification {
  id: number;
  type: string;
  user: User;
  createdAt: string;
  postId: number;
  commentId: number;
  replyId: number;
}

interface Props {
  notification: INotification;
  handleFetchNotifications: () => void;
}

function Notifications({ notification, handleFetchNotifications }: Props) {
  const dispatch = useAppDispatch();

  const handleReadNotification = async () => {
    await dispatch(readNotification(notification?.id)).then(() => {
      handleFetchNotifications();
    });
  };
  let pathname, query;
  if (
    notification?.type == "like" ||
    notification?.type == "dislike" ||
    notification?.type == "comment"
  ) {
    pathname = "/dashboard/post/";
    query = { postId: notification?.postId };
  } else if (notification?.type === "message") {
    pathname = "/dashboard/myChatrooms/";
    query = { chatReceiverId: notification?.user?.id };
  } else {
    pathname = "/dashboard/profile/";
    query = {};
  }

  const renderNotificationText = () => {
    switch (notification?.type) {
      case "like":
        if (
          null != notification?.commentId ||
          undefined != notification?.commentId
        ) {
          return "liked your comment!";
        }
        if (
          null != notification?.replyId ||
          undefined != notification?.replyId
        ) {
          return "liked your reply!";
        }
        return "liked your post!";
        break;
      case "dislike":
        if (
          null != notification?.commentId ||
          undefined != notification?.commentId
        ) {
          return "disliked your comment!";
        }
        if (
          null != notification?.replyId ||
          undefined != notification?.replyId
        ) {
          return "disliked your reply!";
        }
        return "disliked your post!";
        break;
      case "comment":
        return "commented on your post!";
        break;
      case "follow":
        return "followed you!";
        break;
      case "levelUpgrade":
        return "Your level has been upgraded!";
        break;
      case "levelDowngrade":
        return "Your level has been downgraded!";
        break;
      case "reply":
        return "replied to your comment!";
      default:
        break;
    }
  };

  console.log("notification: ", notification);

  return (
    <div className="divide-slate-200 dark:divide-lightgray">
      <Link
        onClick={() => handleReadNotification()}
        href={{
          pathname: pathname,
          query: query,
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
            <Image
              className="h-10 w-10 rounded-full"
              src={
                !isEmpty(notification?.user?.profilePic)
                  ? `${config.url.PUBLIC_URL}/${notification?.user?.profilePic?.name}`
                  : "/images/pfp/pfp1.jpg"
              }
              width={50}
              height={50}
              alt=""
            />
          </Link>
          <div className="ml-3 flex items-center justify-center">
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              <span className="font-bold">{notification?.user?.name}</span>{" "}
              {renderNotificationText()}<br></br>
              <span className="text-xs">
                {moment(notification?.createdAt).fromNow()}
              </span>
            </p>
          </div>
        </div>
        {notification?.type === "like" ||
        notification?.type === "dislike" ||
        notification?.type === "comment" ? (
          <div className="hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md">
            <Link
              onClick={() => handleReadNotification()}
              href={{
                pathname: pathname,
                query: query,
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
        ) : notification?.type === "message" ? (
          <div className="hover:bg-slate-200 dark:hover:bg-darkgray p-2 mr-1 md:mr-2 lg:mr-6 rounded-md">
            <Link
              onClick={() => handleReadNotification()}
              href={{
                pathname: pathname,
                query: query,
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
        ) : null}
      </Link>
    </div>
  );
}

export default Notifications;
