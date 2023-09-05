import React from "react";
import { BiSend } from "react-icons/bi";

export default function ChatInput({
  innerRef,
  disabled,
  onMessage,
  colorMode
}: {
  innerRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  disabled: boolean;
  onMessage: (message: string) => void;
  colorMode: string;

}) {
  const [message, setMessage] = React.useState<string>("");

  const canSend = !disabled && message.length > 0;

  const iconColor = colorMode === "dark" ? "#FFC300" : "#865E42";

  const adjustSize = () => {
    const el = innerRef.current;
    if (el !== null) {
      el.style.height = "0";
      el.style.height = Math.min(el.scrollHeight, 24 * 4) + "px";
    }
  };

  const onSend = () => {
    if (canSend) {
      onMessage(message);
      setMessage("");
      innerRef.current!.value = "";
      adjustSize();
    }
  };

  return (
    <div>
      <div className="flex gap-2 bg-white drop-shadow-md border border-neutral-400 rounded-md p-4 focus-within:border-neutral-500 dark:bg-textContainerDark dark:border-black">
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
