import React, { useEffect, useState } from "react";
import {
  UsersIcon,
  MagnifyingGlassIcon,
  UserPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { isEmpty } from "lodash";
import { config } from "../../../../constants";
import { useAppSelector, useAppDispatch } from "../../../../stores/hooks";
import { searchFilteredUsers } from "../../../../stores/user/UserActions";
import Link from "next/link";
import { encodeQuery } from "../../../../utils";
import {
  addMember,
  searchRoomMembers,
} from "../../../../stores/chat/ChatActions";
import { toast } from "react-hot-toast";

function Members({ members, room }: any) {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const { error } = useAppSelector((state) => state.chatReducer);
  let [input, setInput] = useState<string>("");
  let [inputAdd, setInputAdd] = useState<string>("");
  let [showSearch, setShowSearch] = useState<boolean>(false);
  let [showAddMember, setShowAddMember] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<any>();
  const [roomMembers, setRoomMembers] = useState<any>();

  useEffect(() => {
    if (!isEmpty(members)) {
      setRoomMembers(members);
    }
  }, []);

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    if (input.length > 0) {
      dispatch(
        searchRoomMembers(room?.roomId, {
          search: input,
        })
      ).then((result: any) => {
        setRoomMembers(result);
      });
    }
  }, [input]);

  const toggleSearch = () => {
    input = "";
    setInput(input);
    showAddMember = false;
    setShowAddMember(showAddMember);
    setShowSearch(!showSearch);
  };

  const toggleAddMember = () => {
    inputAdd = "";
    setInputAdd(inputAdd);
    showSearch = false;
    setShowSearch(showSearch);
    setShowAddMember(!showAddMember);
  };

  const refreshSearch = () => {
    input = "";
    setInput(input);
  };

  const refreshAddMember = () => {
    inputAdd = "";
    setInputAdd(inputAdd);
  };

  useEffect(() => {
    if (inputAdd.length > 0) {
      dispatch(
        searchFilteredUsers({
          search: inputAdd,
        })
      ).then((result: any) => {
        console.log("resSULT: ", result);
        setSearchResult(result);
      });
    }
  }, [inputAdd]);

  const handleAddMember = async (id: any) => {
    await dispatch(
      addMember(room?.roomId, {
        user_id: id,
      })
    ).then(() => {
      toast.success("Member Added!", {
        duration: 4000,
      });
      refreshAddMember();
    });
  };

  return (
    <div className="flex flex-col bg-white h-[90vh]">
      <div className="flex flex-col p-2 border-b">
        <p className="font-semibold">Description</p>
      </div>
      <div>
        <p className="p-2 text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
          fringilla dapibus feugiat. Class aptent taciti sociosqu ad litora
          torquent per conubia nostra, per inceptos himenaeos.
        </p>
      </div>
      <div className="flex items-center border-y justify-between text-black">
        <div className="flex items-center justify-start space-x-2 p-2">
          <UsersIcon className="w-5 h-5" />
          <p className="font-semibold">Members</p>
        </div>
        <div className="flex items-center justify-end space-x-2 p-2">
          <MagnifyingGlassIcon
            onClick={() => toggleSearch()}
            className="w-5 h-5 cursor-pointer"
          />
          {authUser?.id === room?.room?.moderatorId && (
            <UserPlusIcon
              onClick={() => toggleAddMember()}
              className="w-5 h-5 cursor-pointer"
            />
          )}
        </div>
      </div>
      <div
        className={`items-center border-b space-x-2 p-2 group ${
          showSearch ? "flex" : "hidden"
        }`}
      >
        <MagnifyingGlassIcon className="w-5 h-5" />
        <input
          value={input}
          onChange={(e: any) => setInput(e.target.value)}
          type="text"
          placeholder="Search a member"
          className="flex-1 outline-none bg-transparent text-black"
        />
        <XMarkIcon
          onClick={() => refreshSearch()}
          className={`w-5 h-5 cursor-pointer ${input ? "inline" : "hidden"}`}
        />
      </div>
      <div
        className={`items-center space-x-2 p-2 group ${
          showAddMember ? "flex" : "hidden"
        }`}
      >
        <UserPlusIcon className="w-5 h-5" />
        <input
          value={inputAdd}
          onChange={(e: any) => setInputAdd(e.target.value)}
          type="text"
          placeholder="Add a member"
          className="flex-1 outline-none bg-transparent text-black"
        />
        <XMarkIcon
          onClick={() => refreshAddMember()}
          className={`w-5 h-5 cursor-pointer ${inputAdd ? "inline" : "hidden"}`}
        />
      </div>
      <div className="relative mt-2 backdrop-blur-md bg-white/30 dark:bg-darkgray/30 overflow-visible">
        <div className="absolute top-0 left-0 bg-gray-100 dark:bg-darkgray rounded-md w-full z-10">
          <div className="flex flex-col items-center justify-center">
            {searchResult &&
              inputAdd.length > 0 &&
              searchResult?.map((result: any) => (
                <div
                  className="w-full"
                  key={result?.id}
                  onClick={() => handleAddMember(result?.id)}
                >
                  <div
                    key={result?.id}
                    className="flex items-center justify-start space-x-2 hover:rounded-t-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer"
                  >
                    <img
                      src={
                        !isEmpty(result?.profilePic)
                          ? `${config.url.PUBLIC_URL}/${result?.profilePic?.name}`
                          : "/images/placeholder.png"
                      }
                      className="rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd"
                    />
                    <p className="font-semibold text-sm">@{result?.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {roomMembers && !isEmpty(input) && !isEmpty(room) ? (
        roomMembers.map((member: any) => (
          <Link
            key={member?.id}
            href={{
              pathname: "/dashboard/profile",
              query: { user_id: member?.id },
            }}
            as={`/dashboard/profile?${encodeQuery(member?.id, "profile")}`}
          >
            <div className="flex items-center justify-between p-2 w-full space-x-4 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center justify-start">
                <div className="flex items-center justify-center">
                  <img
                    src={
                      !isEmpty(member?.profilePic)
                        ? `${config.url.PUBLIC_URL}/${member?.profilePic?.name}`
                        : "/images/pfp/pfp1.jpg"
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start ml-4 text-black">
                  <span className="text-base font-semibold">
                    @{member?.name}
                  </span>
                  {/* <span className='text-xs'>Last seen Recently</span> */}
                </div>
              </div>
              {/* <div className='flex items-center justify-end p-2 text-orange-600'>
              <span className='text-sm font-semibold'>Admin</span>
            </div> */}
            </div>
          </Link>
        ))
      ) : !isEmpty(members) ? (
        members.map((member: any) => (
          <Link
            key={member?.id}
            href={{
              pathname: "/dashboard/profile",
              query: { user_id: member?.otherUser?.id },
            }}
            as={`/dashboard/profile?${encodeQuery(
              member?.otherUser?.id,
              "profile"
            )}`}
          >
            <div className="flex items-center justify-between p-2 w-full space-x-4 hover:bg-gray-100 cursor-pointer">
              <div className="flex items-center justify-start">
                <div className="flex items-center justify-center">
                  <img
                    src={
                      !isEmpty(member?.otherUser?.profilePic)
                        ? `${config.url.PUBLIC_URL}/${member?.otherUser?.profilePic?.name}`
                        : "/images/pfp/pfp1.jpg"
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start ml-4 text-black">
                  <span className="text-base font-semibold">
                    @{member?.otherUser?.name}
                  </span>
                  {/* <span className='text-xs'>Last seen Recently</span> */}
                </div>
              </div>
              {/* <div className='flex items-center justify-end p-2 text-orange-600'>
              <span className='text-sm font-semibold'>Admin</span>
            </div> */}
            </div>
          </Link>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

export default Members;
