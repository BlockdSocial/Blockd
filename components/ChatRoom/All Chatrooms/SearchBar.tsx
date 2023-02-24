import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function SearchBar() {
  return (
    <div className="flex items-center justify-between space-x-3 px-4 pt-4">
      <div className="w-1/2">
        <select className="rounded-lg w-full border-none outline-none text-black dark:text-white p-2 bg-gray-200 dark:bg-lightgray">
          <option className="outline-none p-2">Polygon</option>
          <option className="outline-none p-2">Binance Smart Chain</option>
          <option className="outline-none p-2">Avalanche</option>
          <option className="outline-none p-2">Phantom</option>
        </select>
      </div>
      <div className="flex items-center p-2 w-1/2 space-x-2 bg-gray-200 dark:bg-lightgray rounded-md">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 dark:text-white" />
        <input
          type="text"
          placeholder="Group Name"
          className="flex-1 text-black dark:text-white outline-none bg-transparent"
        />
      </div>
    </div>
  );
}

export default SearchBar;
