import React, { useState } from "react";

function Levels({ rewards }: any) {
  const [isRewardClaimed, setIsRewardClaimed] = useState<boolean>(false);
  const [isDisplayModal, setIsDisplayModal] = useState<boolean>(false);

  const handleClaim = () => {
    setIsDisplayModal(!isDisplayModal);
    setIsRewardClaimed(!isRewardClaimed);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 bg-transparent">
      <div className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 1
        ? "bg-gray-100 dark:bg-lightgray"
        : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
        } rounded-md shadow-lg`}>
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 1</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Orange Frame</h3>
          {rewards.length >= 1 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 1 ? 'border-blockd' : ''}`}></hr>
      <div
        // onClick={() => setIsDisplayModal(!isDisplayModal)}
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 2
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 2</h1>
          <h3 className="text-sm text-gray-500 mb-2">
            Unlock Turquoise Frame
          </h3>
          {rewards.length >= 2 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 2 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 3
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 3</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Blue Frame</h3>
          {rewards.length >= 3 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 3 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 4
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 4</h1>
          <h3 className="text-sm text-gray-500 mb-2">
            Unlock Rainbow Frame
          </h3>
          {rewards.length >= 4 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 4 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 5
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 5</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Sprayed Colors Frame</h3>
          {rewards.length >= 5 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 5 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 6
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 6</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Orange To Pink Frame</h3>
          {rewards.length >= 6 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 6 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 7
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 7</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Golden Frame</h3>
          {rewards.length >= 7 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 7 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 8
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 8</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Paint Colors Frame</h3>
          {rewards.length >= 8 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 8 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 9
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 9</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Crystal Frame</h3>
          {rewards.length >= 9 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 9 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 10
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 10</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Sky Frame</h3>
          {rewards.length >= 10 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 10 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 11
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 11</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Dark Green Frame</h3>
          {rewards.length >= 11 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 11 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 12
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 12</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Water Color Frame</h3>
          {rewards.length >= 12 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 12 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 13
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 13</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Hard Golden Frame</h3>
          {rewards.length >= 13 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 13 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 14
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 14</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Fire Frame</h3>
          {rewards.length >= 14 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 14 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 15
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 15</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Dark Grey Frame</h3>
          {rewards.length >= 15 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 15 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 16
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 16</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Light Gray Frame</h3>
          {rewards.length >= 16 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 16 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 17
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 17</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Dark Purple Frame</h3>
          {rewards.length >= 17 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 17 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 18
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 18</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Blue Yellow Frame</h3>
          {rewards.length >= 18 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 18 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 19
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 19</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Green Red Fire Frame</h3>
          {rewards.length >= 19 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      <hr className={`border-2 h-10 ${rewards.length > 19 ? 'border-blockd' : ''}`}></hr>
      <div
        className={`flex items-center justify-center space-x-4 w-72 p-4 px-2 border dark:border-lightgray ${rewards.length >= 20
          ? "bg-gray-100 dark:bg-lightgray"
          : "cursor-pointer hover:bg-gray-100 dark:hover:bg-lightgray opacity-60"
          } rounded-md shadow-lg`}
      >
        <div className="flex items-center justify-center w-1/4">
          <img
            src="/images/badges/badge3.png"
            className="flex w-14 max-w-full h-auto"
          />
        </div>
        <div className="flex flex-col items-start justify-start w-3/4">
          <h1 className="text-l font-semibold">Level 20</h1>
          <h3 className="text-sm text-gray-500 mb-2">Unlock Pixel Frame</h3>
          {rewards.length >= 20 && (
            <button
              type="button"
              className="text-white bg-gradient-to-r  from-[#ff5858] to-[#f09819] font-medium rounded-md text-sm px-4 py-1 text-center"
              disabled
            >
              Reward Claimed
            </button>
          )}
        </div>
      </div>
      {/*  ****************Modal****************   */}
      <div
        className={`fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${isDisplayModal ? "" : "hidden"
          }`}
      >
        <div className="relative flex flex-col w-full rounded-md max-w-md h-96">
          <img
            src="/images/badges/badge4.png"
            className="absolute -top-20 left-0 right-0 ml-auto mr-auto w-60 h-68 flex justify-center align-center"
          />
          <div className="flex rounded-md bg-gradient-to-r from-[#EC9F05] to-[#FF4E00] h-full">
            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsDisplayModal(!isDisplayModal)}
                className="absolute top-3 right-2.5 text-white bg-transparent hover:bg-orange-400 rounded-md text-sm p-1.5 ml-auto inline-flex items-center"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="flex flex-col items-center justify-center w-full mt-28 p-10">
              <p className="text-3xl text-white font-semibold font-mono">
                Congrats!
              </p>
              <p className="text-l text-white mb-4 text-center p-2">
                You reached level 2 and unlocked a green Blockd icon
              </p>
              <p
                onClick={() => handleClaim()}
                className="text-center cursor-pointer bg-white hover:bg-gray-200 p-3 rounded-3xl w-full text-black font-semibold"
              >
                Claim Reward
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Levels;
