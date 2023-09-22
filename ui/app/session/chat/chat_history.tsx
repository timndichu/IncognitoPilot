import { Message } from "@/app/session/communication/message";
import { TbUser } from "react-icons/tb";
import React from "react";
import InterpreterIO from "../approval/interpreter_io";
import { ChatRoundState } from "../communication/chat_round";
import { Approver } from "../approval/approver";

const CodeGenerationSection = ({
  history,
  thinking,
  showIO,
  setShowIO,
  code,
  chatRoundState,
  approverOut,
  autoApproveOut,
  askApproveOut,
  codeResult,
  error,
  approverIn,
  autoApproveIn,
  askApproveIn,
  colorMode,
}: {
  history: Message[];
  thinking: boolean;
  showIO: boolean;
  setShowIO: (show: boolean) => void;
  code: string | null;
  chatRoundState: ChatRoundState;
  approverOut: Approver;
  autoApproveOut: boolean;
  askApproveOut: boolean;
  codeResult: string | null;
  error: string | null;
  approverIn: Approver;
  autoApproveIn: boolean;
  askApproveIn: boolean;
  colorMode: string;
}) => {
  return (
    <div className={`${code == null ? "hidden" : "flex mt-4"}`}>
      <div className="mr-4 mt-2 min-w-[36px] relative">
        <img src="./bot.png" alt="robot" width={36} />
        {thinking && (
          <img
            src="./thinking.gif"
            alt="thinking"
            className="absolute block w-[30px] top-[-20px] right-[-30px] z-10"
          />
        )}
      </div>

      <div
        className={
          "bg-white dark:bg-textContainerDark h-max-content drop-shadow-sm rounded-md p-4 whitespace-pre-wrap dark:text-white"
        }
      >
        {/* button to toggle visibility of the section */}
        <button
          autoFocus
          className="border dark:shadow-lg m-2 px-4 py-2 dark:border-gray-900 border-gray-300 bg-gray-100 dark:text-gray-200 dark:bg-cardDark text-black  rounded-full"
          onClick={() => setShowIO(!showIO)} // Toggle the state on button click
        >
          {showIO ? "Hide Code" : "Show Code"}
        </button>

        {/* the section itself */}
        <div
          className={` w-full h-auto px-4 transition-all duration-500 ${
            showIO ? "flex flex-col" : "hidden"
          }`}
        >
          <div className="flex-1 flex flex-col h-0">
            <div className="flex-1 h-0">
              <InterpreterIO
                title="Code"
                content={code}
                askApprove={askApproveIn}
                autoApprove={autoApproveIn}
                approver={approverIn}
                disabled={error !== null}
                busy={false}
                language="python"
                colorMode={colorMode}
              />
            </div>
          </div>
          <div className="flex-1 flex flex-col h-0">
            <div className="flex-1 h-0">
              <InterpreterIO
                title="Result"
                content={codeResult}
                askApprove={askApproveOut}
                autoApprove={autoApproveOut}
                approver={approverOut}
                disabled={error !== null}
                busy={chatRoundState === "waiting for interpreter"}
                language="text"
                colorMode={colorMode}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ChatHistory({
  history,
  thinking,
  showIO,
  setShowIO,
  code,
  chatRoundState,
  approverOut,
  autoApproveOut,
  askApproveOut,
  codeResult,
  error,
  approverIn,
  autoApproveIn,
  askApproveIn,
  colorMode,
}: {
  history: Message[];
  thinking: boolean;
  showIO: boolean;
  setShowIO: (show: boolean) => void;
  code: string | null;
  chatRoundState: ChatRoundState;
  approverOut: Approver;
  autoApproveOut: boolean;
  askApproveOut: boolean;
  codeResult: string | null;
  error: string | null;
  approverIn: Approver;
  autoApproveIn: boolean;
  askApproveIn: boolean;
  colorMode: string;
}) {
  const historyFiltered = history.filter(
    (msg, idx) =>
      msg.role === "user" ||
      (msg.role === "model" &&
        (msg.text !== undefined || (thinking && idx == history.length - 1))),
  );

  console.log("historyFiltered: ", historyFiltered);
  return (
    <div className="flex flex-col gap-4 mt-10 mb-10">
      {/*------------- code generation section------------------------ */}

      {historyFiltered.map((msg, idx) => (
        <>
          <div key={idx} className="flex mt-4">
            {msg.role === "model" ? (
              <div className="mr-4 mt-2 min-w-[36px] relative">
                <img src="./bot.png" alt="robot" width={36} />
                {thinking && idx === historyFiltered.length - 1 && (
                  <img
                    src="./thinking.gif"
                    alt="thinking"
                    className="absolute block w-[30px] top-[-20px] right-[-30px] z-10"
                  />
                )}
              </div>
            ) : (
              <div className="flex-1 min-w-[20px]" />
            )}
            <div
              className={
                "flex flex-col h-max-content drop-shadow-sm rounded-md p-4 whitespace-pre-wrap " +
                (msg.role === "user"
                  ? "bg-blue-100 dark:bg-userContainerDark dark:text-white"
                  : "bg-white dark:bg-textContainerDark dark:text-white")
              }
            >
              {/* generated text */}

              {msg.text === "" || msg.text === undefined ? "..." : msg.text}
            </div>
            {msg.role === "user" ? (
              <div className="ml-4 mt-2 dark:text-gray-300">
                <TbUser size={36} />
              </div>
            ) : (
              <div className="flex-1 min-w-[20px]" />
            )}
          </div>
          {/* Check if this is the second-to-last message */}
          {idx === historyFiltered.length - 1 && (
            <CodeGenerationSection
              history={history}
              thinking={thinking}
              showIO={showIO}
              setShowIO={setShowIO}
              code={code}
              chatRoundState={chatRoundState}
              approverOut={approverOut}
              autoApproveOut={autoApproveOut}
              askApproveOut={askApproveOut}
              codeResult={codeResult}
              error={error}
              approverIn={approverIn}
              autoApproveIn={autoApproveIn}
              askApproveIn={askApproveIn}
              colorMode={colorMode}
            />
          )}
        </>
      ))}
    </div>
  );
}
