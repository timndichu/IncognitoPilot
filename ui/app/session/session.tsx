import React, { useEffect, useState } from "react";
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
import { IoMdAddCircle } from "react-icons/io";

import { HiMenuAlt1 } from "react-icons/hi";
import { Drawer } from "@material-tailwind/react";
import SideDrawer from "./drawer/side_drawer";
import { PiWarningDiamondDuotone } from "react-icons/pi";

import { useResponseContext } from "../contexts/responseContext";

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

  const { isGeneratingResponse, toggleResponseGeneration } =
    useResponseContext();

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
  // React.useEffect(() => {
  //   if (code !== null) {
  //     setShowIO(true);
  //   }
  // }, [code]);

  const focusChatInput = () => {
    setTimeout(() => chatInputRef.current && chatInputRef.current.focus(), 100);
  };
  React.useEffect(focusChatInput, []);

  const startChatRound = (message: string) => {
    if (authToken === null) {
      setError(AUTH_ERROR_MSG);
      return;
    }
    toggleResponseGeneration(true);
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

  const iconColor = colorMode === "dark" ? "#FFC300" : "#865E42";

  const toggleTheme = () => {
    setColorMode(colorMode === "light" ? "dark" : "light");
  };

  const [open, setOpen] = React.useState(false);

  const [exampleMessage, setExampleMessage] = useState("");

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const handleSetExampleMessage = (message: string) => {
    setExampleMessage(message);
    console.log("message: ", message);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden">
      {/* mobile nav bar */}
      <div className="flex justify-between items-center w-full bg-brown-600  h-12 shadow-sm dark:bg-cardDark md:hidden ">
        {/* new chat btn */}
        <button className=" text-gray-200 ml-2" onClick={openDrawer}>
          <HiMenuAlt1 size={28} />
        </button>
        <span className="text-gray-200 font-semibold text-xl ">New chat</span>
        <button onClick={refreshSession} className=" text-gray-200 mr-2 ">
          <IoMdAddCircle size={28} />
        </button>
      </div>

      {/* drawer for mobile */}
      <Drawer
        open={open}
        onClose={closeDrawer}
        className="flex flex-col w-72 p-4 bg-sidemenu_bg_light h-full gap-4 shadow-sm dark:bg-sidemenu_bg_dark md:hidden"
      >
        <SideDrawer
          colorMode={colorMode}
          closeDrawer={closeDrawer}
          toggleTheme={toggleTheme}
          refreshSession={refreshSession}
        />
      </Drawer>

      <div className="flex relative h-screen bg-main_bg_light overflow-x-hidden w-screen dark:bg-main_bg_dark">
        <div className="absolute top-0 left-0 ">
          <Header
            error={error}
            onNew={refreshSession}
            showNew={history.length > 0}
          />
        </div>

        {/*------------- side menu----------------- */}
        <div
          className={`hidden md:flex flex-col w-72 p-4 bg-sidemenu_bg_light rounded-2xl m-3 h-full gap-4 shadow-sm dark:bg-sidemenu_bg_dark`}
        >
          <SideDrawer
            colorMode={colorMode}
            toggleTheme={toggleTheme}
            refreshSession={refreshSession}
          />
        </div>

        {/*----------------------- right side main content------------------------------------------- */}
        <div className={`flex items-center flex-col w-full`}>
          <div
            className="flex-1 h-2 overflow-y-auto px-2 flex-col w-full max-w-6xl"
            ref={scrollRef}
          >
            {/* afrineuron logo */}
            {history.length === 0 ? (
              <Brand />
            ) : (
              <ChatHistory
                history={history}
                thinking={chatRoundState === "waiting for model"}
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
            {/* ---------------example cards----------------- */}
            <div
              className={`hidden lg:block mt-8 mb-4 w-full ${
                isGeneratingResponse ? "lg:hidden" : "lg:block"
              }`}
            >
              <CardRow
                setExampleMessage={handleSetExampleMessage}
                colorMode={colorMode}
              />
            </div>

            {/* ---------------mobile only content----------------- */}

            <div
              className={`flex flex-col items-center mt-4 lg:hidden gap-4 ${
                isGeneratingResponse ? "hidden" : "block"
              }`}
            >
              {/* limitations */}

              <div className="h-auto w-auto mx-4 flex items-center bg-cardLight rounded-xl border border-gray-200 p-4 dark:bg-cardDark dark:border-gray-900">
                <div className="w-11/12 flex flex-col">
                  <h2 className="text-gray-800 text-xl font-semibold mb-2 dark:text-white">
                    Limitations
                  </h2>
                  <p className="text-gray-800 text-sm dark:text-white">
                    The AI model is currently under development.
                  </p>
                  <p className="text-gray-800 text-sm dark:text-white">
                    Potential for bias responses
                  </p>
                  <p className="text-gray-800 text-sm dark:text-white">
                    Limited knowledge of events past 2021
                  </p>
                </div>
                {/* icon */}
                <div className="ml-4">
                  <PiWarningDiamondDuotone size={48} color={iconColor} />
                </div>
              </div>

              {/* bot icon */}
              <div className="w-16 flex justify-center items-center mt-4">
                <img src="/bot.png" alt="Brand" />
              </div>
            </div>
          </div>

          {/* examples column */}
          <div
            className={`px-8 w-full max-w-4xl flex flex-col items-center gap-4 lg:hidden ${
              isGeneratingResponse ? "hidden" : "block"
            }`}
          >
            <button
              onClick={() =>
                handleSetExampleMessage(
                  "Make up a story about Sharky, a baby shark in a pond",
                )
              }
              className="h-auto w-full mx-4 flex flex-col bg-cardLight rounded-lg border border-gray-200 p-2 hover:cursor-pointer dark:bg-cardDark dark:border-gray-900"
            >
              <p className="text-gray-800 text-md font-semibold mb-1 dark:text-white">
                Make up a story
              </p>
              <p className="text-gray-800 text-sm dark:text-white">
                about Sharky, a baby shark in a pond
              </p>
            </button>

            <button
              onClick={() =>
                setExampleMessage(
                  "Analyze my pdf and plot a graph from the data",
                )
              }
              className="h-auto w-full mx-4 flex flex-col bg-cardLight rounded-lg border border-gray-200 p-2 hover:cursor-pointer dark:bg-cardDark dark:border-gray-900"
            >
              <p className="text-gray-800 text-md font-semibold mb-1 dark:text-white">
                Analyze my pdf
              </p>
              <p className="text-gray-800 text-sm dark:text-white">
                and plot a graph from the data
              </p>
            </button>
          </div>

          <hr className="w-full my-2 border-t-2 dark:border-gray-900 lg:hidden" />
          {/* ------------chat input------------------------ */}
          <div className="mb-4 px-8 w-full max-w-4xl md:px-2">
            <ChatInput
              colorMode={colorMode}
              innerRef={chatInputRef}
              disabled={chatRoundState !== "not active" || error !== null}
              onMessage={startChatRound}
              exampleMessage={exampleMessage}
              handleSetExampleMessage={handleSetExampleMessage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 
 * 
 *  
 *  <div
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
      </div>  */
