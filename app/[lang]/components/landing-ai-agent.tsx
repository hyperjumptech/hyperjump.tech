"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Maximize2, MessageCircle, Minimize2, MinusIcon } from "lucide-react";
import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

// Types
type TMessageResponse = {
  messages: TMessage[];
  messageCount: number;
};

type TMessage = {
  ai: string;
  human: string;
};

// Constants
const DEFAULT_MESSAGES = [
  { id: 1, text: "What services do you offer?" },
  { id: 2, text: "Show me examples of past projects" },
  { id: 3, text: "Schedule a free consultation" }
];

// Functions
// APIs
const fetchPreviousMessages = async (
  sessionId: string
): Promise<TMessageResponse> => {
  const url = new URL(
    `${String(process.env.NEXT_PUBLIC_LANDING_GET_CHATS_WEBHOOK)}/${sessionId}`
  );
  url.searchParams.set("output", "html");

  const response = await fetch(url);
  if (!response.ok) {
    return {
      messages: [],
      messageCount: 0
    };
  }

  const data = await response.json();

  return data;
};

const fetchAsk = async (payload: {
  chatInput: string;
  sessionId: string;
}): Promise<{ output: string }> => {
  const { chatInput, sessionId } = payload;
  const url = new URL(
    String(process.env.NEXT_PUBLIC_LANDING_POST_CHATS_WEBHOOK)
  );
  url.searchParams.set("output", "html");

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chatInput,
      sessionId
    })
  });

  if (!response.ok) {
    return {
      output: "Failed to ask question"
    };
  }

  const data = await response.json();
  return data;
};

// Cookies
function setCookie(cname: string, cvalue: string, exdays: number) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000); // Expiry days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname: string) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

// Main component
export default function LandingAIAgent() {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [text, setText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Window state
  const [windowState, setWindowState] = useState<{
    mode: "entrypoint" | "chat";
    closed: boolean;
    maximized: boolean;
  }>({
    mode: "entrypoint",
    closed: false,
    maximized: false
  });

  // UI Refs
  const inputRef = useRef<HTMLInputElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Function to scroll to bottom of chat window
  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth"
    });
  };

  const generateNewSessionId = () => {
    const newSessionId = crypto.randomUUID();
    setSessionId(newSessionId);
    setCookie("LANDING_PAGE_SESSION_ID", newSessionId, 3);
  };

  // Effect to get session ID from cookie or generate a new one
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Get session ID from cookie
      const sessionIdFromCookie = getCookie("LANDING_PAGE_SESSION_ID");

      // If there is a session ID in the cookie, set it from Cookie
      if (sessionIdFromCookie) {
        setSessionId(sessionIdFromCookie);
      } else {
        // If not, generate a new session ID
        generateNewSessionId();
      }
    }
  }, []);

  // Effect to fetch previous messages
  useEffect(() => {
    // If there is a session ID, fetch the previous messages
    if (sessionId !== undefined) {
      setIsSubmitting(true);
      // Fetch previous messages
      fetchPreviousMessages(sessionId)
        .then((response) => {
          setMessages(response.messages);
        })
        .catch(() => {
          setMessages([]);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  }, [sessionId]);

  // Effect to scroll to bottom of chat window on updated messages
  useEffect(() => {
    if (!chatContainerRef.current) return;

    scrollToBottom();
  }, [messages]);

  // Function to handle form submission
  const handleSubmit = async (text: string) => {
    if (!text.length || !inputRef.current) return;

    // Set chat input and clear input field
    const chatInput = text.trim();
    setText("");
    inputRef.current.value = "";

    // If this is the first message, set the window state to maximized
    setWindowState((prevState) => ({
      ...prevState,
      mode: "chat",
      maximized: true
    }));

    setIsSubmitting(true);
    try {
      const prevMessages = messages;
      const newMessages = [...prevMessages, { human: chatInput, ai: "" }];
      setMessages(newMessages);
      const { output } = await fetchAsk({
        chatInput,
        sessionId: sessionId as string
      });

      const newMessagesFromAI = [
        ...prevMessages,
        { human: chatInput, ai: output }
      ];
      setMessages(newMessagesFromAI);

      scrollToBottom();
    } catch (error) {
      toast("Failed to ask question. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Floating action button
  if (windowState.closed)
    return (
      <div className="fixed right-4 bottom-4 z-50 transition-all duration-300">
        <Button
          variant="default"
          size="icon"
          className="!m-0 h-12 w-12 rounded-full bg-blue-500 px-4 font-semibold shadow-md lg:w-full"
          onClick={() => {
            setWindowState((prevState) => ({
              ...prevState,
              closed: false
            }));
          }}>
          <span className="hidden lg:block">Ask HyperBot</span>
          <span className="block lg:hidden">
            <MessageCircle className="h-16 w-16 fill-white text-white" />
          </span>
        </Button>
      </div>
    );

  // Entrypoint UI (Just input and predefined messages)
  if (windowState.mode === "entrypoint") {
    return (
      <Fragment>
        {/* Mobile FAB */}
        <div className="fixed right-4 bottom-4 z-50 flex transition-all duration-300 lg:hidden">
          <Button
            variant="default"
            size="lg"
            className="!m-0 h-12 w-12 rounded-full bg-blue-500 !p-0 font-semibold shadow-md"
            onClick={() => {
              setWindowState((prevState) => ({
                ...prevState,
                mode: "chat"
              }));
            }}>
            <MessageCircle className="h-16 w-16 fill-white text-white" />
          </Button>
        </div>
        {/* Desktop Floating UI */}
        <div className="sticky bottom-8 z-40 mb-8 hidden transition-all duration-300 lg:flex">
          <div className="mx-auto flex flex-col items-end justify-end gap-1 transition-all duration-300 lg:max-w-4xl">
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7 self-end rounded-full bg-[#49495EF2]"
              onClick={() => {
                setWindowState((prevState) => ({
                  ...prevState,
                  closed: true
                }));
              }}>
              <MinusIcon className="h-4 w-4" />
            </Button>
            <div className="w-full rounded-xl bg-[#49495EF2] p-4">
              {/* Chat container */}
              <div
                className={cn(
                  "flex h-full w-full flex-col gap-2 shadow-xl transition-all duration-300"
                )}>
                {/* Input */}
                <div
                  className={cn(
                    "flex flex-col gap-2 rounded-b-xl transition-all duration-300"
                  )}>
                  <div className="relative flex w-full">
                    <input
                      ref={inputRef}
                      type="text"
                      className="h-13 w-full rounded-xl bg-white pr-16 pl-4 text-sm text-black outline-0"
                      value={text}
                      disabled={isSubmitting}
                      onChange={({ target }) => setText(target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(text);
                        }
                      }}
                      placeholder="Ask me about services, success stories, or your challenges"
                      aria-describedby="Ask me about services, success stories, or your challenges"
                    />
                    <Button
                      className="absolute top-3 right-4 m-0 h-7 w-7 rounded-full bg-blue-500 p-2"
                      variant="default"
                      disabled={isSubmitting}
                      onClick={() => {
                        handleSubmit(text);
                      }}>
                      <Image
                        alt="Send message to AI"
                        src="/icons/ai-agent-button.svg"
                        width={10}
                        height={10}
                      />
                    </Button>
                  </div>
                  {/* Default messages */}
                  <div
                    className={cn(
                      "flex space-x-2 overflow-x-auto whitespace-nowrap"
                    )}>
                    {DEFAULT_MESSAGES.map(({ text, id }) => (
                      <Button
                        key={id}
                        variant="outline"
                        disabled={isSubmitting}
                        className="rounded-md border border-white bg-transparent hover:cursor-pointer"
                        onClick={() => {
                          setText(text);
                          inputRef.current?.focus();
                        }}>
                        {text}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }

  // Chat UI
  return (
    <div
      className={cn(
        "sticky bottom-4 z-40 mb-4 transition-all duration-300 lg:mb-0",
        windowState.maximized
          ? "lg:mx-auto lg:max-w-4xl"
          : "lg:ml-auto lg:max-w-lg"
      )}>
      <div className="mx-auto max-h-full w-full px-4 transition-all duration-300 lg:mx-auto lg:max-w-4xl">
        <div
          className={cn(
            "mb-1 flex items-end justify-end",
            windowState.mode === "chat" ? "hidden" : "flex"
          )}>
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 self-end rounded-full bg-[#49495EF2]"
            onClick={() => {
              setWindowState((prevState) => ({
                ...prevState,
                closed: true
              }));
            }}>
            <MinusIcon className="h-4 w-4" />
          </Button>
        </div>
        {/* Chat header*/}
        <div
          className={cn(
            "flex flex-row items-start justify-between gap-4 rounded-t-xl bg-[#101330]",
            messages.length === 0 ? "hidden" : "flex p-6"
          )}>
          {/* Chat header content */}
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold lg:text-3xl">Hi there! 👋</p>
            <p className="lg:text-normal text-sm text-white">
              Start a chat. We are here to help you 24/7.
            </p>
          </div>
          {/* Chat header actions */}
          <div className="flex h-full min-h-full flex-col items-end justify-between gap-10">
            {/* Maximize/Minimize and Minimize buttons */}
            <div className="flex flex-row gap-x-2 gap-y-0">
              <Button
                variant="outline"
                size="icon"
                className="hidden h-7 w-7 rounded-full bg-transparent lg:flex"
                onClick={() => {
                  setWindowState((prevState) => ({
                    ...prevState,
                    maximized: !prevState.maximized
                  }));
                }}>
                {windowState.maximized ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7 rounded-full bg-transparent"
                onClick={() => {
                  setWindowState((prevState) => ({
                    ...prevState,
                    maximized: false,
                    closed: true
                  }));
                }}>
                <MinusIcon className="h-4 w-4" />
              </Button>
            </div>
            {/* Clear chat button at the bottom */}
            <div className="w-full">
              <Button
                variant="link"
                className="m-0 h-max w-full p-0 text-right text-xs text-white lg:text-sm"
                onClick={() => {
                  generateNewSessionId();
                  setMessages([]);
                  setWindowState((prevState) => ({
                    ...prevState,
                    mode: "entrypoint"
                  }));
                }}>
                Clear chat
              </Button>
            </div>
          </div>
        </div>
        {/* Chat container */}
        <div
          className={cn(
            "flex h-full w-full flex-col gap-2 shadow-xl transition-all duration-300",
            // Change the theme based on the number of messages
            messages.length === 0
              ? "rounded-xl bg-[#49495EF2]"
              : "rounded-none bg-[#f2f4f8]"
          )}>
          {/* Message threads */}
          <div
            id="chat-container"
            className={cn(
              "h-auto max-h-80 flex-col gap-4 overflow-y-auto transition-all duration-300 md:max-h-96",
              messages.length === 0
                ? "hidden h-0 p-0"
                : "flex min-h-80 p-4 md:min-h-96"
            )}
            ref={chatContainerRef}>
            {/* Message threads */}
            {messages.map((message, index) => (
              <div className="flex flex-col gap-4" key={index}>
                {message.human && (
                  <div
                    className={cn(
                      "flex w-10/12 flex-row items-center gap-2 self-end rounded-xl bg-[#20b69e] p-4",
                      windowState.maximized ? "lg:w-1/2" : "lg:w-10/12"
                    )}>
                    <div className="flex flex-col">
                      <MarkdownContent
                        className="!text-white"
                        input={message.human}
                      />
                    </div>
                  </div>
                )}
                {message.ai && (
                  <div
                    className={cn(
                      "flex w-10/12 flex-row items-center gap-2 rounded-xl bg-white p-4",
                      windowState.maximized ? "lg:w-1/2" : "lg:w-10/12"
                    )}>
                    <div className="flex flex-col">
                      {isSubmitting && index === messages.length - 1 ? (
                        <div className="flex flex-row gap-1">
                          <span className="sr-only">Loading...</span>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                        </div>
                      ) : (
                        <MarkdownContent
                          className="!text-black"
                          input={message.ai}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Loading state */}
            {isSubmitting && (
              <div className="flex w-10/12 flex-row items-center gap-2 rounded-xl bg-white p-4 md:w-1/2">
                <span className="sr-only">Loading...</span>
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
              </div>
            )}
          </div>
          {/* Separator */}
          <Separator
            className={cn(
              "transition-all duration-300",
              messages.length === 0 ? "hidden" : "-my-2 flex"
            )}
          />
          {/* Input */}
          <div
            className={cn(
              "flex flex-col gap-2 rounded-b-xl transition-all duration-300",
              messages.length === 0
                ? "rounded-t-xl bg-[#49495EF2] p-4"
                : "bg-white"
            )}>
            <div className="flex flex-col gap-2">
              <div className="relative flex w-full">
                <input
                  ref={inputRef}
                  type="text"
                  className="h-13 w-full rounded-xl bg-white pr-16 pl-4 text-sm text-black outline-0"
                  value={text}
                  disabled={isSubmitting}
                  onChange={({ target }) => setText(target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(text);
                    }
                  }}
                  placeholder="Ask me about services, success stories, or your challenges"
                  aria-describedby="Ask me about services, success stories, or your challenges"
                />
                <Button
                  className="absolute top-3 right-4 m-0 h-7 w-7 rounded-full bg-blue-500 p-2"
                  variant="default"
                  disabled={isSubmitting}
                  onClick={() => {
                    handleSubmit(text);
                  }}>
                  <Image
                    alt="Send message to AI"
                    src="/icons/ai-agent-button.svg"
                    width={10}
                    height={10}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MarkdownContent = ({
  input,
  className
}: {
  input: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "prose prose-ul:list-disc prose-ol:list-decimal prose-strong:font-semibold text-sm",
        className
      )}
      dangerouslySetInnerHTML={{ __html: input }}
    />
  );
};
