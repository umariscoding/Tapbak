import React from "react";
import { FaStore } from "react-icons/fa";

function Navbar() {
  return (
    <div className="flex flex-col justify-between items-center p-4">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold">Tapbak</h1>
        <div className="flex font-medium gap-2 items-center">
          <FaStore /> John's Store
        </div>
      </div>
      <div className="h-[1px] mt-1 w-full bg-gray-200"></div>
    </div>
  );
}

export default Navbar;
