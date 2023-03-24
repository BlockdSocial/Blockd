import React, { useEffect, useState } from "react";
import {
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useAppDispatch, useAppSelector } from "../../../stores/hooks";
import { fetchAllRooms } from "../../../stores/chat/ChatActions";
import { isEmpty } from "lodash";
import { config } from "../../../constants";

function OrdinaryChatrooms() {
  const dispatch = useAppDispatch();
  const { allRooms } = useAppSelector((state) => state.chatReducer);
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    getChatrooms();
  }, []);

  const getChatrooms = async () => {
    await dispatch(fetchAllRooms());
  }

  return (
    <div className="flex flex-col items-center justify-center mt-2 space-y-1">
      {
        allRooms &&
        allRooms.map((room: any) => (
          <div
            onClick={() => 0 === room?.private ? {} : setModalOpen(!modalOpen)}
            className="relative flex items-center justify-between group cursor-pointer bg-gray-100 dark:bg-lightgray w-full p-2 px-4"
          >
            <div className="flex items-center justify-start space-x-4">
              <img
                src={
                  !isEmpty(room?.imgName)
                    ? `${config.url.PUBLIC_URL}/${room?.imgName}`
                    : "/images/placeholder.png"
                } className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col items-start justify-start">
                <div className="flex items-center justify-start space-x-1">
                  <p className="text-sm md:text-base font-semibold">{room?.displayName}</p>
                  {
                    1 === room?.private &&
                    <LockClosedIcon className="w-4 h-4 stroke-2" />
                  }
                </div>
                <p className="text-xs md:text-sm">{room?.participants} Members</p>
              </div>
            </div>
            {/* <div className="flex items-center justify-start">
          <p className="text-sm md:text-base font-semibold bg-red-700 p-2 rounded-md text-white">
            -20 %
          </p>
        </div> */}
            <div className="absolute top-0 -inset-full h-full w-5/6 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-lightgray dark:to-white opacity-40 group-hover:animate-shine"></div>
          </div>
        ))
      }
      {/* <div className="relative flex items-center justify-between group cursor-pointer bg-gray-100 dark:bg-lightgray w-full p-2 px-4">
        <div className="flex items-center justify-start space-x-4">
          <img
            src="/images/chatLogo/Ethereum.png"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm md:text-base font-semibold">
              Ethereum Official
            </p>
            <p className="text-xs md:text-sm">3K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            +50 %
          </p>
        </div>
        <div className="absolute top-0 -inset-full h-full w-5/6 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-lightgray dark:to-white opacity-40 group-hover:animate-shine"></div>
      </div>
      <div className="relative flex items-center justify-between group cursor-pointer bg-gray-100 dark:bg-lightgray w-full p-2 px-4">
        <div className="flex items-center justify-start space-x-4">
          <img
            src="/images/chatLogo/Polygon.png"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm md:text-base font-semibold">
              Polygon Official
            </p>
            <p className="text-xs md:text-sm">2K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            +12.5 %
          </p>
        </div>
        <div className="absolute top-0 -inset-full h-full w-5/6 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-lightgray dark:to-white opacity-40 group-hover:animate-shine"></div>
      </div>
      <div className="relative flex items-center justify-between group cursor-pointer bg-gray-100 dark:bg-lightgray w-full p-2 px-4">
        <div className="flex items-center justify-start space-x-4">
          <img
            src="/images/chatLogo/EGO.png"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="text-sm md:text-base font-semibold">
              EGO Whales Group
            </p>
            <p className="text-xs md:text-sm">1K Members</p>
          </div>
        </div>
        <div className="flex items-center justify-start bg-red-700 p-2 rounded-md">
          <p className="text-sm md:text-base font-semibold text-white">
            -2 %
          </p>
        </div>
        <div className="absolute top-0 -inset-full h-full w-5/6 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-lightgray dark:to-white opacity-40 group-hover:animate-shine"></div>
      </div> */}
      {/* <div
        onClick={() => setSeeMore(!seeMore)}
        className={`p-2 bg-gray-200 hover:bg-gray-300 dark:hover:bg-lightgray/50 dark:bg-lightgray rounded-md cursor-pointer ${
          seeMore ? "hidden" : ""
        }`}
      >
        See more
      </div>
      {seeMore && (
        <>
          <div
            onClick={() => setModalOpen(!modalOpen)}
            className="relative flex items-center justify-between group cursor-pointer bg-gray-100 dark:bg-lightgray w-full p-2 px-4"
          >
            <div className="flex items-center justify-start space-x-4">
              <img
                src="/images/chatLogo/Bitcoin.png"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col items-start justify-start">
                <div className="flex items-center justify-start space-x-1">
                  <p className="text-sm md:text-base font-semibold">
                    BTC Official
                  </p>
                  <LockClosedIcon className="w-4 h-4 stroke-2" />
                </div>
                <p className="text-xs md:text-sm">30K Members</p>
              </div>
            </div>
            <div className="flex items-center justify-start">
              <p className="text-sm md:text-base font-semibold bg-green-700 p-2 rounded-md text-white">
                +1200 %
              </p>
            </div>
            <div className="absolute top-0 -inset-full h-full w-5/6 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-lightgray dark:to-white opacity-40 group-hover:animate-shine"></div>
          </div>
          <div className="relative flex items-center justify-between group cursor-pointer bg-gray-100 dark:bg-lightgray w-full p-2 px-4">
            <div className="flex items-center justify-start space-x-4">
              <img
                src="/images/chatLogo/Ethereum.png"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col items-start justify-start">
                <p className="text-sm md:text-base font-semibold">
                  Ethereum Official
                </p>
                <p className="text-xs md:text-sm">3K Members</p>
              </div>
            </div>
            <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
              <p className="text-sm md:text-base font-semibold text-white">
                +700 %
              </p>
            </div>
            <div className="absolute top-0 -inset-full h-full w-5/6 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-lightgray dark:to-white opacity-40 group-hover:animate-shine"></div>
          </div>
          <div className="relative flex items-center justify-between group cursor-pointer bg-gray-100 dark:bg-lightgray w-full p-2 px-4">
            <div className="flex items-center justify-start space-x-4">
              <img
                src="/images/chatLogo/Polygon.png"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col items-start justify-start">
                <p className="text-sm md:text-base font-semibold">
                  Polygon Official
                </p>
                <p className="text-xs md:text-sm">2K Members</p>
              </div>
            </div>
            <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
              <p className="text-sm md:text-base font-semibold text-white">
                +300 %
              </p>
            </div>
            <div className="absolute top-0 -inset-full h-full w-5/6 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-lightgray dark:to-white opacity-40 group-hover:animate-shine"></div>
          </div>
          <div className="relative flex items-center justify-between group cursor-pointer bg-gray-100 dark:bg-lightgray w-full p-2 px-4">
            <div className="flex items-center justify-start space-x-4">
              <img
                src="/images/chatLogo/EGO.png"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col items-start justify-start">
                <p className="text-sm md:text-base font-semibold">
                  EGO Whales Group
                </p>
                <p className="text-xs md:text-sm">1K Members</p>
              </div>
            </div>
            <div className="flex items-center justify-start bg-green-700 p-2 rounded-md">
              <p className="text-sm md:text-base font-semibold text-white">
                +200 %
              </p>
            </div>
            <div className="absolute top-0 -inset-full h-full w-5/6 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-lightgray dark:to-white opacity-40 group-hover:animate-shine"></div>
          </div>
          <div
            onClick={() => setSeeMore(!seeMore)}
            className={`p-2 bg-gray-200 hover:bg-gray-300 dark:hover:bg-lightgray/50 dark:bg-lightgray rounded-md cursor-pointer ${
              !seeMore ? "hidden" : ""
            }`}
          >
            See less
          </div>
        </>
      )} */}
      <div
        className={`fixed -top-2 left-0 p-4 flex items-center justify-center min-h-screen w-full h-full scrollbar-hide overflow-scroll backdrop-blur-md bg-white/60 z-50 py-4 ${modalOpen ? "" : "hidden"
          }`}
      >
        <div className="relative w-full h-fit shadow-xl rounded-lg max-w-md bg-white scrollbar-hide overflow-scroll">
          <div className="relative bg-white rounded-lg">
            <div className="sticky top-0 left-0 z-[1] flex items-center justify-between p-4 border-b backdrop-blur-md bg-white/30">
              <div className="flex items-center justify-start space-x-4">
                <img
                  src="/images/chatLogo/Bitcoin.png"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col items-start justify-start">
                  <p className="text-sm md:text-base font-semibold">
                    BTC Official
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(!modalOpen)}
                className="flex items-center justify-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="px-6 py-6 lg:px-8">
              <form className="space-y-6" action="#">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Users count
                  </label>
                  <div className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg w-full p-2.5">
                    30K members
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Network
                  </label>
                  <div className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg w-full p-2.5">
                    Polygon
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Contract Address
                  </label>
                  <div className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg w-full p-2.5">
                    xD3KJJHYGFCPOIUH4895I484UYH47I
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Total Tokens needed
                  </label>
                  <div className="bg-gray-100 outline-none text-gray-900 text-sm rounded-lg w-full p-2.5">
                    10 BTC
                  </div>
                </div>
                <button className="w-full text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Request to join
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdinaryChatrooms;
