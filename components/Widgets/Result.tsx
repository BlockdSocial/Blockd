import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPostImage } from "../../stores/post/PostActions";
import { useAppDispatch } from "../../stores/hooks";
import { config } from "../../constants";
import { encodeQuery } from "../../utils";
import { isEmpty } from "lodash";
import Image from "next/image";
import { useRouter } from "next/router";
import { chatApi } from "../../api";
import { PhoneIcon } from "@heroicons/react/24/outline";
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

function Result({
  result,
  setInput,
  searchInput,
  setSearchInput,
  callMode,
  participants,
  addParticipant,
}: any) {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>();

  searchInput = false;
  console.log('participants',participants, result?.id)

  return (
    <>
      {!callMode ? (
        <Link
          href={{
            pathname: "/dashboard/profile",
            query: { user_id: result?.id },
          }}
          as={`/dashboard/profile?${encodeQuery(result?.id, "profile")}`}
          className="w-full search-result"
         // onClick={() => setInput("")}
        >
          <div
            onClick={() => setSearchInput(searchInput)}
            key={result?.id}
            className="flex items-center justify-start space-x-2 hover:rounded-t-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer"
          >
            <Image
              src={
                !isEmpty(result?.profilePic)
                  ? `${config.url.PUBLIC_URL}/${result?.profilePic?.name}`
                  : "/images/pfp/blockd.jpg"
              }
              className="rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd object-cover"
              width={2000}
              height={2000}
              alt={""}
            />
            <p className="font-semibold text-sm">@{result?.name}</p>
          </div>
        </Link>
      ) : (
        <>
          <div
            //onClick={() => setSearchInput(searchInput)}
            key={result?.id}
            className="flex items-center justify-start search-result space-x-2 hover:rounded-t-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full"
          >
            <Image
              src={
                !isEmpty(result?.profilePic)
                  ? `${config.url.PUBLIC_URL}/${result?.profilePic?.name}`
                  : "/images/pfp/blockd.jpg"
              }
              className="rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd object-cover"
              width={2000}
              height={2000}
              alt={""}
            />
            <p className="font-semibold text-sm">@{result?.name}</p>
            {!participants.includes(result?.id) && (
              
              <>
                <div
                  onClick={() => addParticipant(result?.id)}
                  className="flex w-full text-right justify-end py-2 px-2 cursor-pointer rounded-md bg-gray-100 dark:bg-lightgray hover:bg-gray-200 dark:hover:bg-darkgray"
                >
                  <PhoneIcon className="w-5 h-5 float-right justify-end" />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default Result;
