"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import ContentEditable from "react-contenteditable";
import {
  FaCheck,
  FaChevronDown,
  FaChevronUp,
  FaEllipsis,
  FaPaperPlane,
} from "react-icons/fa6";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { twMerge } from "tailwind-merge";
import * as Select from "@radix-ui/react-select";

export type MessageType =
  | "free"
  | "to pt-br"
  | "to en"
  | "synonyms"
  | "correct";

const options: { label: string; value: MessageType }[] = [
  {
    label: "Free conversation",
    value: "free",
  },
  {
    label: "Translate to Portuguese",
    value: "to pt-br",
  },
  {
    label: "Translate to English",
    value: "to en",
  },
  {
    label: "Synonyms",
    value: "synonyms",
  },
  {
    label: "Correct something",
    value: "correct",
  },
];

type Message = {
  who: "bot" | "user";
  messageType: string;
  message: string;
};

export function TeacherChat() {
  const message = useRef<string>("");
  const msgType = useRef<string>("free");

  const [messageType, setMessageType] = useState<string>("free");

  const [chat, setChat] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  if (!message.current) {
    message.current = "";
  }

  useEffect(() => {
    if (msgType.current) {
      msgType.current = messageType;
    }
  }, [messageType]);

  async function handleGo() {
    try {
      const msg = message.current;

      message.current = "";

      setLoading(true);

      setChat((current) => [
        ...current,
        {
          who: "user",
          messageType: options.find((x) => x.value === msgType.current)?.label!,
          message: msg,
        },
      ]);

      const { data: response } = await axios.post("/api/bot", {
        message: msg,
        messageType: msgType.current,
      });

      setChat((current) => [
        ...current,
        {
          who: "bot",
          messageType: options.find((x) => x.value === msgType.current)?.label!,
          message: response,
        },
      ]);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  }

  const handleOnContentChange = (evt: any) => {
    message.current = evt.target.value;
  };

  async function handleOnKeyUp(e: any) {
    const keyCode = e.which || e.keyCode;

    if (keyCode === 13 && message.current) {
      e.preventDefault();
      await handleGo();
    }
  }

  return (
    <aside className="hidden h-screen flex-col border border-slate-800 bg-zinc-900 bg-opacity-50 shadow-md shadow-black md:flex md:w-[400px]">
      {/* Header */}
      <div className="p-5">
        <div className="font-bol text-3xl">Chat</div>

        <div className="text-sm font-light">
          Our virtual teacher is here to help!
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 justify-end overflow-y-auto">
        <div className="flex h-full flex-col">
          {chat.map((message, idx) => (
            <div key={idx} className="flex space-x-3 px-4 py-2">
              {message.who === "bot" && (
                <AvatarPrimitive.Root className="relative inline-flex h-10 w-10">
                  <AvatarPrimitive.Image
                    src={"./teacher.png"}
                    alt="Avatar"
                    className={twMerge(
                      "h-full w-full rounded-full bg-primary object-cover shadow-md shadow-black"
                    )}
                  />
                </AvatarPrimitive.Root>
              )}

              <div
                className={twMerge(
                  "flex-1 rounded-md p-2 shadow-md shadow-black",
                  message.who === "user"
                    ? "bg-emerald-600 text-gray-200"
                    : "bg-slate-600 text-gray-200"
                )}
              >
                <div className="text-sm font-bold">{message.messageType}</div>
                <div>{message.message}</div>
              </div>

              {message.who === "user" && (
                <AvatarPrimitive.Root className="relative inline-flex h-10 w-10">
                  <AvatarPrimitive.Image
                    src={"https://github.com/ronymmoura.png"}
                    alt="Avatar"
                    className="h-full w-full rounded-full bg-primary object-cover shadow-md shadow-black"
                  />
                  <AvatarPrimitive.Fallback
                    className={twMerge(
                      "flex h-full w-full items-center justify-center rounded-full bg-gray-700"
                    )}
                  >
                    <span className="bg-gray-700 text-sm font-medium text-gray-200">
                      You
                    </span>
                  </AvatarPrimitive.Fallback>
                </AvatarPrimitive.Root>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex space-x-3 px-4 py-2">
              <AvatarPrimitive.Root className="relative inline-flex h-10 w-10">
                <AvatarPrimitive.Image
                  src={"./teacher.png"}
                  alt="Avatar"
                  className={twMerge(
                    "h-full w-full rounded-full bg-purple-400 object-cover"
                  )}
                />
              </AvatarPrimitive.Root>

              <div
                className={twMerge(
                  "flex-1 rounded-md bg-slate-600 p-2 text-gray-200"
                )}
              >
                <div className="animate-pulse">
                  <FaEllipsis size={30} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Types Select */}
      <div className="flex w-full items-center border-t border-slate-800">
        <div className="flex h-full items-center bg-slate-800 p-2">
          Message type:
        </div>

        <Select.Root value={messageType} onValueChange={setMessageType}>
          <Select.Trigger className="flex h-full flex-1 items-center space-x-3 p-2 text-lg outline-none transition-colors hover:bg-slate-800">
            <div className="flex-1 text-left">
              <Select.Value />
            </div>

            <Select.Icon className="ml-2">
              <FaChevronDown />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content>
              <Select.ScrollUpButton className="flex items-center justify-center text-gray-300">
                <FaChevronUp />
              </Select.ScrollUpButton>

              <Select.Viewport className="rounded-lg bg-gray-800 p-2 shadow-lg">
                <Select.Group>
                  {options.map((item) => (
                    <Select.Item
                      key={item.value}
                      value={item.value}
                      className={twMerge(
                        "relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-gray-300 focus:bg-gray-900",
                        "radix-disabled:opacity-50",
                        "select-none focus:outline-none"
                      )}
                    >
                      <Select.ItemText>{item.label}</Select.ItemText>

                      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                        <FaCheck />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              </Select.Viewport>

              <Select.ScrollDownButton className="flex items-center justify-center text-gray-300">
                <FaChevronDown />
              </Select.ScrollDownButton>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      {/* Input */}
      <div className="flex border-t border-slate-800">
        <ContentEditable
          onChange={handleOnContentChange}
          onBlur={handleOnContentChange}
          onKeyDownCapture={handleOnKeyUp}
          html={message.current}
          placeholder="Say something here..."
          className="flex-1 overflow-x-auto bg-transparent p-3 pr-0 text-zinc-200 outline-none"
        />

        <div
          className="flex h-full w-[50px] cursor-pointer items-center justify-center transition-colors hover:bg-slate-800"
          onClick={handleGo}
        >
          <FaPaperPlane />
        </div>
      </div>
    </aside>
  );
}
