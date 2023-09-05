import React, { useEffect } from "react";
import { Message } from "@/app/session/communication/message";
import ChatInput from "@/app/session/chat/chat_input";
import ChatHistory from "@/app/session/chat/chat_history";
import InterpreterIO from "@/app/session/approval/interpreter_io";
import Interpreter from "@/app/session/communication/interpreter";
import { useApprover } from "@/app/session/approval/approver";
import {
  ChatRound,
  ChatRoundState,
} from "@/app/session/communication/chat_round";
import { Header } from "@/app/session/chat/header";
import Brand from "@/app/session/chat/brand";
import useScroller from "@/app/helper/scroller";
import { AUTH_ERROR_MSG, AuthContext } from "@/app/authentication";
import CardRow from "./card_examples/card_row";
import useColorMode from "../hooks/useColorMode";
import { MdNightlightRound } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";

export default function Session({
  refreshSession,
  version,
}: {
  refreshSession: () => void;
  version: string;
}) {
  const [history, setHistory] = React.useState<Message[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [showIO, setShowIO] = React.useState<boolean>(false);

  const [chatRoundState, setChatRoundState] =
    React.useState<ChatRoundState>("not active");
  const [approverIn, askApproveIn, autoApproveIn] = useApprover();
  const [approverOut, askApproveOut, autoApproveOut] = useApprover();

  const [codeResult, setCodeResult] = React.useState<string | null>(null);
  const chatInputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const interpreterRef = React.useRef<Interpreter | null>(null);
  if (interpreterRef.current === null) {
    interpreterRef.current = new Interpreter();
  }

  const [colorMode, setColorMode] = useColorMode();

  useEffect(() => {
    console.log("colorMode2: ", colorMode);
    // Rest of your code
  }, [colorMode]);

  const authToken = React.useContext(AuthContext);

  const code = history.findLast((msg) => msg.code !== undefined)?.code ?? null;
  React.useEffect(() => {
    if (code !== null) {
      setShowIO(true);
    }
  }, [code]);

  const focusChatInput = () => {
    setTimeout(() => chatInputRef.current && chatInputRef.current.focus(), 100);
  };
  React.useEffect(focusChatInput, []);

  const startChatRound = (message: string) => {
    if (authToken === null) {
      setError(AUTH_ERROR_MSG);
      return;
    }
    const chatRound = new ChatRound(
      history,
      setHistory,
      approverIn,
      approverOut,
      interpreterRef.current!,
      setChatRoundState,
      setCodeResult,
      authToken,
    );
    chatRound
      .run(message)
      .then(focusChatInput)
      .catch((e) => {
        setError(e.message);
      });
  };

  const scrollRef = useScroller(history);

  const toggleTheme = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  return (
    <div className="flex relative h-screen bg-main_bg_light overflow-x-hidden w-screen dark:bg-main_bg_dark">
      <div className="absolute top-0 left-0 ">
        <Header
          error={error}
          onNew={refreshSession}
          showNew={history.length > 0}
        />
      </div>
      {/* side menu */}
      <div
        className={`hidden md:block w-72 bg-sidemenu_bg_light rounded-2xl m-3 h-full shadow-sm dark:bg-sidemenu_bg_dark`}
      >
        {/* toggle theme */}
        <button
          onClick={toggleTheme}
          className="flex m-2 p-2 bg-slate-200 rounded-xl hover:text-purple-200 hover:bg-slate-700 transition ease-in duration-200 dark:hover:bg-cardDark dark:bg-slate-700 dark:text-gray-200 dark:hover:text-purple-700"
        >
          {colorMode === "light" ? (
            <MdNightlightRound size={24} />
          ) : (
            <BsFillSunFill size={24} />
          )}
          <span className="ml-2">Toggle Theme</span>
        </button>
      </div>

      {/* right side main content */}
      <div className={`flex items-center flex-col w-full`}>
        <div
          className="flex-1 h-2 overflow-y-auto px-2 flex-col w-full max-w-6xl"
          ref={scrollRef}
        >
          {history.length === 0 ? (
            <Brand />
          ) : (
            <ChatHistory
              history={history}
              thinking={chatRoundState === "waiting for model"}
            />
          )}
          {/* ---------------example cards----------------- */}
          <div className="hidden lg:block mt-8 mb-4 w-full">
            <CardRow colorMode={colorMode} />
          </div>
        </div>

        {/* ------------chat input------------------------ */}
        <div className="mt-8 mb-4 px-8 w-full max-w-4xl md:px-2">
          <ChatInput
            colorMode={colorMode}
            innerRef={chatInputRef}
            disabled={chatRoundState !== "not active" || error !== null}
            onMessage={startChatRound}
          />
        </div>
      </div>
    </div>
  );
}

/**
 * 
 * 
 *  {/* <div
        className={`absolute top-0 right-0 w-1/2 h-full flex flex-col px-4 bg-blue-100 shadow-[0_0_25px_10px_rgba(0,0,0,0.15)] transition-all duration-500 ${
          showIO
            ? ""
            : "translate-x-[calc(100%-100px)] opacity-50 hover:transition-none hover:opacity-100 cursor-pointer"
        }`}
       
      >
        <button
        autoFocus
          className="self-start mt-2 mr-2 p-2 bg-gray-500 text-white rounded-full"
          onClick={() => setShowIO(!showIO)} // Toggle the state on button click
        >
          {showIO ?'>>' : '<<'}
        </button>
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
            />
          </div>
        </div>
      </div> } */
