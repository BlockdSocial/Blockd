// 404.js
import Link from "next/link";
import React from "react";

export default function FourOhFour() {
  return (
    <main className="relative min-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 w-full flex flex-col justify-start items-center pt-10 bg-white dark:bg-darkgray">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className="w-40 h-40 text-[#1A2238] dark:text-white mb-10"
      >
        <path
          fill="currentColor"
          d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
        ></path>
        <rect
          width="176"
          height="32"
          x="168"
          y="320"
          fill="currentColor"
        ></rect>
        <polygon
          fill="currentColor"
          points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
        ></polygon>
        <polygon
          fill="currentColor"
          points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
        ></polygon>
      </svg>
      <div className="relative w-full flex items-center justify-center">
        <h1 className="text-9xl font-extrabold text-[#1A2238] dark:text-white tracking-widest">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute top-16 bottom-0 left-0 right-0 h-fit mx-auto my-auto w-36 text-center">
          Page Not Found
        </div>
      </div>
    </main>
  );
}
