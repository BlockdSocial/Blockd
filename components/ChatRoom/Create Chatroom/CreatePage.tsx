import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";

function CreatePage() {
  const [selectedOption, setSelectedOption] = useState<string>("");
  let [image, setImage] = useState<string>("");
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [uploadedVideo, setUploadedVideo] = useState<string>("");

  // handle selection change
  function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOption(event.target.value);
  }

  const inputPicture = useRef<HTMLInputElement | null>(null);

  const onUploadPictureClick = () => {
    // `current` points to the mounted file input element
    if (inputPicture.current) {
      inputPicture.current.click();
    }
  };

  const handleUploadPicture = (e: any) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setUploadedImage(e.target.files[0]);
  };

  const closePicture = () => {
    image = "";
    setImage(image);
    setUploadedImage("");
    setUploadedVideo("");
  };

  return (
    <div className="min-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 pb-14">
      <div className="p-4">
        <div className="flex flex-col items-center justify-center space-y-3 border-2 border-orange-200 dark:border-lightgray rounded-xl w-full p-4 bg-white dark:bg-darkgray">
          <p className="text-xl font-semibold text-center">Create a Chatroom</p>
          <div className="flex flex-col p-3 items-start w-full space-y-3">
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Name</h3>
              <input
                type="text"
                className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                placeholder="Chatroom Name"
              />
            </div>
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Description</h3>
              <input
                type="text"
                className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                placeholder="Enter a small description"
              />
            </div>
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Chatroom Picture</h3>
              <div
                onClick={() => onUploadPictureClick()}
                className="flex space-x-2 text-sm p-2 w-full rounded-lg outline-none text-black dark:text-white bg-gray-200 dark:bg-lightgray cursor-pointer"
              >
                <LinkIcon className="w-5 h-5" />
                <p>Attach Image</p>
              </div>
            </div>
            {image && (
              <div className="relative w-full">
                <img
                  className="max-w-full max-h-[300px] h-auto object-contain rounded-md"
                  src={image}
                  alt=""
                />
                <div
                  onClick={() => closePicture()}
                  className="flex items-center justify-center absolute top-2 left-2 w-7 h-7 rounded-full p-1 cursor-pointer bg-white dark:bg-lightgray hover:bg-gray-200 dark:hover:bg-darkgray"
                >
                  <XMarkIcon className="w-5 h-5" />
                </div>
              </div>
            )}
            <input
              type="file"
              id="file"
              ref={inputPicture}
              className="hidden"
              accept="image/*"
              onChange={handleUploadPicture}
            />
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Users count</h3>
              <select className="w-full rounded-lg border-none outline-none p-2 text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray">
                <option value="option1" className="outline-none p-2">
                  1 - 100
                </option>
                <option value="option2" className="outline-none p-2">
                  100 - 1K
                </option>
                <option value="option3" className="outline-none p-2">
                  1K - 5K
                </option>
                <option value="option4" className="outline-none p-2">
                  5K - 10K
                </option>
              </select>
            </div>
            <div className="w-full">
              <h3 className="text-sm font-semibold pb-1">Type</h3>
              <div className="w-full">
                <select
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="w-full rounded-lg border-none outline-none p-2 text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                >
                  <option value="public" className="outline-none p-2">
                    Public Chatroom
                  </option>
                  <option value="private" className="outline-none p-2">
                    Private Chatroom
                  </option>
                </select>
              </div>
            </div>
            {selectedOption === "private" && (
              <>
                <div className="w-full">
                  <h3 className="text-sm font-semibold pb-1">
                    Contract Address
                  </h3>
                  <input
                    type="text"
                    className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                    placeholder="CA of the required token"
                  />
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-semibold pb-1">Network</h3>
                  <select className="w-full rounded-lg border-none outline-none p-2 text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray">
                    <option value="option1" className="outline-none p-2">
                      Polygon
                    </option>
                    <option value="option2" className="outline-none p-2">
                      Avalanche
                    </option>
                    <option value="option3" className="outline-none p-2">
                      Binance Smart Chain
                    </option>
                    <option value="option4" className="outline-none p-2">
                      Phantom
                    </option>
                  </select>
                </div>
                <div className="w-full">
                  <h3 className="text-sm font-semibold pb-1">Token Amount</h3>
                  <input
                    type="text"
                    className="text-sm p-2 w-full rounded-lg outline-none text-black placeholder:text-gray-400 dark:text-white bg-gray-200 dark:bg-lightgray"
                    placeholder="Enter token amount needed to join"
                  />
                </div>
              </>
            )}
            <div className="flex items-center justify-center w-full mt-4">
              <button className="text-sm font-semibold p-3 w-full text-white rounded-lg bg-blockd hover:bg-orange-400">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
