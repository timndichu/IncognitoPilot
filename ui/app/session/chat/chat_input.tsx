import React, { useCallback, useEffect } from "react";
import { BiSend } from "react-icons/bi";
import { RiAttachment2 } from "react-icons/ri";

export default function ChatInput({
  innerRef,
  disabled,
  onMessage,
  exampleMessage,
  colorMode,
  handleSetExampleMessage,
}: {
  innerRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  disabled: boolean;
  onMessage: (message: string) => void;
  handleSetExampleMessage: (message: string) => void;
  colorMode: string;
  exampleMessage: string;
}) {
  const [message, setMessage] = React.useState<string>(exampleMessage);
  const [exampleMsgExists, setExampleMsgExists] = React.useState<boolean>(
    exampleMessage.length > 0 === true,
  );

  const canSend = !disabled && message.length > 0;

  const iconColor = colorMode === "dark" ? "#FFC300" : "#865E42";

  const adjustSize = useCallback(() => {
    const el = innerRef.current;
    if (el !== null) {
      el.style.height = "0";
      el.style.height = Math.min(el.scrollHeight, 24 * 4) + "px";
    }
  }, [innerRef]);

  const onSend = useCallback(() => {
    if (canSend) {
      onMessage(message);
      setMessage("");
      innerRef.current!.value = "";
      adjustSize();
    }
  }, [adjustSize, canSend, innerRef, message, onMessage]);

  const onSendExample = useCallback(() => {
    if (canSend) {
      console.log("trying to send example message");
      onMessage(exampleMessage);
      handleSetExampleMessage("");
      setMessage("");
      setExampleMsgExists(false);
      innerRef.current!.value = "";
      adjustSize();
    }
  }, [
    adjustSize,
    canSend,
    exampleMessage,
    handleSetExampleMessage,
    innerRef,
    onMessage,
  ]);

  useEffect(() => {
    setExampleMsgExists(exampleMessage.length > 0 === true);
    setMessage(exampleMessage);
    return () => {
      console.log("unmounting");
    };
  }, [exampleMessage]);

  useEffect(() => {
    if (exampleMsgExists === true) {
      console.log("mesg exists");
      onSendExample();
    }
  }, [exampleMsgExists, onSendExample]);

  return (
    <div>
      <div className="flex gap-2 items-center bg-white drop-shadow-md border border-neutral-400 rounded-md p-4 focus-within:border-neutral-500 dark:bg-textContainerDark dark:border-black">
        <button className="flex justify-center h-auto w-auto items-center p-1 bg-white rounded-full drop-shadow-lg mr-2 dark:bg-userContainerDark">
          <RiAttachment2 size={26} color={iconColor} />
        </button>

        <div className="flex-1">
          <textarea
            ref={innerRef}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              adjustSize();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") onSend();
            }}
            disabled={disabled}
            placeholder={disabled ? "Please wait..." : "Send a message"}
            className="block w-full focus:outline-0 disabled:bg-transparent resize-none overflow-hidden dark:bg-textContainerDark dark:caret-white dark:text-white"
            rows={1}
          />
        </div>
        <button onClick={onSend} disabled={!canSend}>
          <BiSend size={24} color={canSend ? iconColor : "#aaa"} />
        </button>
      </div>
    </div>
  );
}
