import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dark, docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Approver } from "@/app/session/approval/approver";
import Running from "@/app/session/approval/running";
import useScroller from "@/app/helper/scroller";

export default function InterpreterIO({
  title,
  content,
  askApprove,
  approver,
  autoApprove,
  disabled,
  busy,
  language,
  colorMode
}: {
  title: string;
  content: string | null;
  askApprove: boolean;
  approver: Approver;
  autoApprove: boolean;
  disabled: boolean;
  busy: boolean;
  language: string;
  colorMode: string;

}) {
  const scrollRef = useScroller(content);
  const isDarkMode = colorMode === "dark";
  return (
    <div className="h-full flex flex-col">
      <div className="text-xl mt-2 text-black dark:text-white font-semibold">
        {title}
      </div>
      <div
        className={`flex-1 ${
          busy
            ? "bg-white dark:bg-textContainerDark"
            : "bg-white dark:bg-textContainerDark"
        } overflow-auto h-0 mt-2 ${
          askApprove ? "border-red-400" : "border-transparent"
        } border-2`}
        ref={scrollRef}
      >
        {busy ? (
          <div className="m-2 ">
            <Running />
          </div>
        ) : (
          <SyntaxHighlighter
            language={language}
            style={isDarkMode ? dark: docco}
            className={`overflow-x-visible bg-white dark:bg-textContainerDark text-black dark:text-white`}
          >
            {content ?? ""}
          </SyntaxHighlighter>
        )}
      </div>
      <div className="flex justify-end items-center my-2">
        <div>
          <input
            className="align-middle accent-red-600"
            type="checkbox"
            checked={autoApprove}
            onChange={(e) => approver.setAutoApprove(e.target.checked)}
            disabled={disabled}
          />
          auto-approve
        </div>
        <button
          className="ml-4 px-4 py-2 bg-red-800 hover:bg-red-500 disabled:bg-gray-100 text-white disabled:text-gray-300 rounded-md"
          onClick={() => approver.approve(false)}
          disabled={!askApprove || disabled}
        >
          Reject
        </button>
        <button
          className="ml-2 px-4 py-2 bg-green-800 hover:bg-green-700 disabled:bg-gray-100 text-white disabled:text-gray-300 rounded-md"
          onClick={() => approver.approve(true)}
          disabled={!askApprove || disabled}
        >
          Approve
        </button>
      </div>
    </div>
  );
}
