"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuid } from "uuid";

// Types
type PrefillAIAgentEvent = CustomEvent<{ message: string }>;

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

  return {
    messages: data.messages || [],
    messageCount: data.messageCount || 0
  };
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
  const [closed, setClosed] = useState(true);

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
    const newSessionId = uuid();
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

  // Effect to lock body scroll on mobile when chat is open
  useEffect(() => {
    // Only apply on mobile (< 720px)
    const isMobile = window.innerWidth < 720;

    if (!closed && isMobile) {
      // Lock body scroll
      document.body.style.overflow = "hidden";
    } else {
      // Unlock body scroll
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [closed]);

  // Function to handle form submission
  const handleSubmit = useCallback(
    async (text: string) => {
      if (!text.length) return;
      if (!text.length || !inputRef.current) return;

      // Set chat input and clear input field
      const chatInput = text.trim();
      setText("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }

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
    },
    [messages, sessionId]
  );

  // Listen for custom event to prefill and submit
  useEffect(() => {
    const handlePrefillAndSubmit = (event: Event) => {
      const customEvent = event as PrefillAIAgentEvent;
      const { message } = customEvent.detail;
      setClosed(false);
      setText(message);

      // Wait for the chat to open and then submit
      setTimeout(() => {
        handleSubmit(message);
      }, 300);
    };

    window.addEventListener("prefillAIAgent", handlePrefillAndSubmit);

    return () => {
      window.removeEventListener("prefillAIAgent", handlePrefillAndSubmit);
    };
  }, [handleSubmit]);

  return (
    <>
      {/* Chat window with animation */}
      <AnimatePresence>
        {!closed && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed right-6 bottom-32 z-[60] flex w-full flex-col overflow-hidden rounded-md bg-white shadow-xl max-[720px]:inset-0 max-[720px]:bottom-0 max-[720px]:h-full max-[720px]:w-full max-[720px]:rounded-none md:max-w-sm lg:max-w-sm xl:max-w-md">
            <div className="relative flex-shrink-0 bg-[#101330] px-4 py-5 text-white">
              <button
                onClick={() => setClosed(true)}
                className="absolute top-4 right-4 min-[720px]:hidden"
                aria-label="Close chat">
                <X className="h-6 w-6" />
              </button>
              <p className="text-lg font-bold">Hi there! 👋</p>
              <p className="text-sm">Start a chat. We are here to help 24/7.</p>
            </div>

            {/* Messages */}
            <div
              ref={chatContainerRef}
              className="flex h-60 flex-col gap-4 overflow-y-auto bg-[#f2f4f8] p-4 max-[720px]:flex-1 md:h-72">
              {messages.map((m, i) => (
                <div key={i} className="flex flex-col gap-2">
                  {m.human && (
                    <div className="max-w-[80%] self-end rounded-xl bg-[#20b69e] p-3 text-white">
                      <MarkdownContent input={m.human} />
                    </div>
                  )}
                  {m.ai && (
                    <div className="max-w-[80%] self-start rounded-xl bg-white p-3">
                      {isSubmitting && i === messages.length - 1 ? (
                        <div className="flex gap-1">
                          <span className="sr-only">Loading...</span>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500" />
                        </div>
                      ) : (
                        <MarkdownContent input={m.ai} />
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="flex-shrink-0 bg-[#f2f4f8] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:bg-white">
              {messages.length === 0 && (
                <div className="mb-3 flex flex-wrap gap-2 md:hidden">
                  {DEFAULT_MESSAGES.map(({ text, id }) => (
                    <Button
                      key={id}
                      variant="outline"
                      disabled={isSubmitting}
                      className="rounded-md border border-gray-400 bg-transparent text-gray-600 hover:cursor-pointer"
                      onClick={() => {
                        setText(text);
                        inputRef.current?.focus();
                      }}>
                      {text}
                    </Button>
                  ))}
                </div>
              )}

              {isSubmitting && (
                <div className="mt-3 mb-5 flex items-center gap-2 bg-transparent text-xs text-gray-500">
                  <span className="sr-only">Loading...</span>
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
                  <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500" />
                </div>
              )}

              <div className="relative flex w-full items-center">
                <input
                  ref={inputRef}
                  type="text"
                  className="h-12 w-full truncate rounded-md border bg-white pr-12 pl-4 text-sm text-black outline-0"
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
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-blue-500 p-2"
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

              {/* Default messages desktop */}
              {messages.length === 0 && (
                <div className="mt-3 hidden space-x-2 overflow-x-auto whitespace-nowrap md:flex">
                  {DEFAULT_MESSAGES.map(({ text, id }) => (
                    <Button
                      key={id}
                      variant="outline"
                      disabled={isSubmitting}
                      className="rounded-md border border-gray-200 bg-transparent text-gray-600 hover:cursor-pointer"
                      onClick={() => {
                        setText(text);
                        inputRef.current?.focus();
                      }}>
                      {text}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop/Tablet button */}
      <Button
        variant="default"
        onClick={() => setClosed((prev) => !prev)}
        className="md:xp-6 fixed right-6 bottom-16 z-50 !m-0 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 font-semibold text-white shadow-md hover:bg-blue-500/80 max-[720px]:hidden md:h-12 md:w-auto">
        {closed ? (
          <>
            <span className="hidden lg:block">Ask HyperBot</span>
            <span className="block lg:hidden">
              <MessageCircle className="h-10 w-10 md:h-6 md:w-6" />
            </span>
          </>
        ) : (
          <X className="h-10 w-10 md:h-6 md:w-6" />
        )}
      </Button>

      {/* Mobile-only button */}
      {closed && (
        <Button
          variant="default"
          onClick={() => setClosed(false)}
          className="fixed right-6 bottom-16 z-50 !m-0 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 font-semibold text-white shadow-md hover:bg-blue-500/80 min-[720px]:hidden">
          <MessageCircle className="h-10 w-10" />
        </Button>
      )}
    </>
  );
}

const MarkdownContent = ({ input }: { input: string }) => (
  <div
    className="prose prose-sm text-sm"
    dangerouslySetInnerHTML={{ __html: input }}
  />
);
