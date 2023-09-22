import React, { useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { PiChatsCircleLight } from "react-icons/pi";
import {CgCloseR} from "react-icons/cg"
import { AiOutlineUser } from "react-icons/ai";

interface Props {
  colorMode: string;
  toggleTheme: () => void;
  closeDrawer?: () => void;
  refreshSession: () => void;
}

const SideDrawer = ({ colorMode, toggleTheme, closeDrawer, refreshSession }: Props) => {
  return (
    <div className="flex flex-col h-screen gap-4">
      {/* new chat btn */}
      <div className="flex justify-between items-center">
        <button
          onClick={refreshSession}
          className="flex p-2 px-4 w-52 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 dark:text-gray-200 dark:bg-cardDark dark:border-gray-900"
        >
          <IoMdAddCircle size={24} />
          <span className="ml-2">New chat</span>
        </button>
        <button className="md:hidden" onClick={closeDrawer}>
          <div className="text-gray-800 dark:text-gray-400">
          <CgCloseR size={24} />
          </div>
        
        </button>
      </div>

      {/* this month section */}
      <div className="flex-1">
        <h1 className="font-bold dark:text-white">This Month (September)</h1>

        {/* chat history */}

        <div className="flex gap-2 hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg dark:hover:bg-cardDark dark:text-white">
          <PiChatsCircleLight size={24} />
          <span>How can I create a....</span>
        </div>

        <div className="flex gap-2 hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg  dark:hover:bg-cardDark dark:text-white">
          <PiChatsCircleLight size={24} />
          <span>How can I create a....</span>
        </div>

        <div className="flex gap-2 hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg  dark:hover:bg-cardDark dark:text-white">
          <PiChatsCircleLight size={24} />
          <span>How can I create a....</span>
        </div>

        <div className="flex gap-2 hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg  dark:hover:bg-cardDark dark:text-white">
          <PiChatsCircleLight size={24} />
          <span>How can I create a....</span>
        </div>

        <h1 className="font-bold  mt-2 dark:text-white">Last Month</h1>

        <div className="flex gap-2 hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg  dark:hover:bg-cardDark dark:text-white">
          <PiChatsCircleLight size={24} />
          <span>How can I create a....</span>
        </div>

        <div className="flex gap-2 hover:cursor-pointer hover:bg-gray-100 p-2 rounded-lg  dark:hover:bg-cardDark dark:text-white">
          <PiChatsCircleLight size={24} />
          <span>How can I create a....</span>
        </div>
      </div>

      {/* toggle theme */}
      <button
        onClick={toggleTheme}
        className="flex mt-2 p-2 px-4 rounded-lg hover:text-white hover:bg-brown-700 transition ease-in duration-200 dark:hover:bg-cardDark  dark:text-gray-200 dark:hover:text-white"
      >
        {colorMode === "light" ? (
          <BsFillMoonFill size={24} />
        ) : (
          <BsFillSunFill size={24} />
        )}
        <span className="ml-2">Toggle Theme</span>
      </button>
      <hr className="my-2 border-t-2 dark:border-gray-900" />

      <div className="flex items-center mb-4">
        <div className="dark:bg-blue-gray-900 bg-gray-200 rounded-full overflow-hidden p-4 dark:text-white">
            <AiOutlineUser size={26}/>
        </div>
        <span className="font-bold ml-2 dark:text-white">Anon. User</span>
      </div>
    </div>
  );
};

export default SideDrawer;
