import React from "react";
import Image from "next/image";

function Modal({fullScreenImage, setFullScreenImage, src} : any) {
  return (
    <div
      className={`fixed top-0 left-0 flex items-center justify-center w-full h-full backdrop-blur-md bg-white/60 z-50 overflow-scroll scrollbar-hide ${
        fullScreenImage ? "" : "hidden"
      }`}
    >
      <div className="relative w-fit max-w-2xl h-auto m-6 bg-transparent">
        <div className="flex items-center justify-center relative rounded-t-lg">
          <button
            type="button"
            onClick={() => setFullScreenImage(!fullScreenImage)}
            className="absolute top-1 right-1 text-gray-400 bg-transparent bg-white hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5 ml-auto inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              className="w-4 h-4"
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
          <Image
            src={src}
            alt="pfp"
            className="rounded-lg max-w-full object-cover max-h-[600px] shadow-sm cursor-pointer"
            width={2000}
            height={2000}
            onClick={() => setFullScreenImage(!fullScreenImage)}
          />
          {/* <img
                src={`${config.url.PUBLIC_URL}/${post?.postImage?.name}`}
                alt="Post"
                className="rounded-lg max-w-full object-contain max-h-[600px] shadow-sm cursor-pointer"
                onClick={() => setFullScreenImage(!fullScreenImage)}
              /> */}
        </div>
      </div>
    </div>
  );
}

export default Modal;
