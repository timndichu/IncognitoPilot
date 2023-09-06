import useColorMode from "@/app/hooks/useColorMode";
import React, { useEffect } from "react";
import { IconContext } from "react-icons";
import { AiOutlineComment } from "react-icons/ai";

import { BsFillArrowRightCircleFill } from "react-icons/bs";

import { PiWarningDiamondDuotone } from "react-icons/pi";

import { BsFillCpuFill } from "react-icons/bs";

const CardRow = ({ colorMode }: { colorMode: string }) => {
  // Conditionally set the color for the icon
  const iconColor = colorMode === "dark" ? "#FFC300" : "#865E42";

  return (
    <div className="flex justify-center gap-8">
      <div className="flex flex-col items-center p-4 w-auto max-w-64 h-auto bg-cardLight rounded-3xl  dark:bg-cardDark">
        <AiOutlineComment size={48} color={iconColor} />
        <h1 className="font-semibold mt-4 mb-4 text-2xl text-black dark:text-white">
          Example
        </h1>
        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left w-10/12 dark:text-white">
            &quot;Explain the concept of supply and demand&quot;
          </span>
          <IconContext.Provider
            value={{
              color: iconColor,
            }}
          >
            <BsFillArrowRightCircleFill
              size={26}
              className="hover:cursor-pointer"
            />
          </IconContext.Provider>
        </div>

        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left w-10/12 dark:text-white">
            &quot;Write an essay for me&quot;
          </span>
          <IconContext.Provider
            value={{
              color: iconColor,
            }}
          >
            <BsFillArrowRightCircleFill
              size={26}
              className="hover:cursor-pointer"
            />
          </IconContext.Provider>
        </div>

        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left w-10/12 dark:text-white">
            &quot;Can you elaborate on the Big Bang for me?&quot;
          </span>
          <IconContext.Provider
            value={{
              color: iconColor,
            }}
          >
            <BsFillArrowRightCircleFill
              size={26}
              className="hover:cursor-pointer"
            />
          </IconContext.Provider>
        </div>
      </div>

      <div className="flex flex-col items-center p-4 w-auto max-w-64 h-auto bg-cardLight rounded-3xl  dark:bg-cardDark">
        <BsFillCpuFill size={48} color={iconColor} />
        <h1 className="font-semibold mt-4 mb-4 text-2xl text-black dark:text-white">
          Capabilities
        </h1>
        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left dark:text-white">
            Provide information and answer questions
          </span>
        </div>

        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left dark:text-white">
            General Knowledge and facts
          </span>
        </div>
        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left dark:text-white">
            Code generation
          </span>
        </div>
      </div>

      <div className="flex flex-col items-center p-4 w-auto max-w-64 h-auto bg-cardLight rounded-3xl  dark:bg-cardDark">
        <PiWarningDiamondDuotone size={48} color={iconColor} />
        <h1 className="font-semibold mt-4 mb-4 text-2xl text-black dark:text-white">
          Limitations
        </h1>
        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left dark:text-white">
            Lack of common sense and reasoning
          </span>
        </div>

        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left dark:text-white">
            Potential for bias responses
          </span>
        </div>

        <div className="flex justify-between items-center w-full h-12 bg-textContainerLight rounded-lg mt-4 p-2 dark:bg-textContainerDark">
          <span className="text-textContainerDark font-semibold text-sm text-left dark:text-white">
            Limited knowledge of events past 2021
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardRow;
