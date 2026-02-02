"use client";

import { MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import markdownit from "markdown-it";
import { v4 as uuid } from "uuid";
import { sendGAEvent } from "@next/third-parties/google";

import { Button } from "@/components/ui/button";
import {
  hyperbotAskHyperBot,
  hyperbotCommonFollowUp,
  hyperbotCommonLoading,
  hyperbotDefaultMessages,
  hyperbotHeaderGreeting,
  hyperbotHeaderSupportAvailability,
  hyperbotInputPlaceholder
} from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

// Types
type PrefillAIAgentEvent = CustomEvent<{ message: string }>;
type ShowFollowUpMessagesEvent = CustomEvent<{ sessionId: string }>;

type TMessageResponse = {
  messages: TMessage[];
  messageCount: number;
};

type TMessage = {
  ai: string;
  human: string;
};

const ENABLE_STREAMING = true;

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

const fetchAskStream = async (
  payload: {
    chatInput: string;
    sessionId: string;
  },
  onChunk: (chunk: string) => void
): Promise<void> => {
  const { chatInput, sessionId } = payload;
  const url = new URL(
    String(process.env.NEXT_PUBLIC_LANDING_POST_CHATS_WEBHOOK)
  );
  url.searchParams.set("stream", "true");

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
    throw new Error("Failed to ask question");
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  if (!reader) {
    throw new Error("No response body");
  }

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");

    // Keep the last incomplete line in the buffer
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        try {
          const jsonStr = line.slice(6); // Remove "data: " prefix
          const data = JSON.parse(jsonStr) as { chunk: string; done: boolean };

          if (data.chunk) {
            onChunk(data.chunk);
          }

          if (data.done) {
            return;
          }
        } catch (error) {
          console.error("Failed to parse SSE data:", error);
        }
      }
    }
  }
};

const fetchFollowUpMessages = async (sessionId: string): Promise<string[]> => {
  const url = new URL(
    `${String(process.env.NEXT_PUBLIC_LANDING_GET_FOLLOWUP_WEBHOOK)}`
  );
  url.searchParams.set("sessionId", sessionId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data.data;
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

type GAEvent = {
  event: string;
  category: string;
  label: string;
};

type HyperBotProps = {
  gaEvent: GAEvent;
  lang: SupportedLanguage;
};

export default function HyperBot({ gaEvent, lang }: HyperBotProps) {
  const defaultMessages = [
    { id: 1, text: hyperbotDefaultMessages(lang)[0] },
    { id: 2, text: hyperbotDefaultMessages(lang)[1] },
    { id: 3, text: hyperbotDefaultMessages(lang)[2] }
  ];
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [followUpMessages, setFollowUpMessages] = useState<string[]>([]);
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

  // Effect to scroll to bottom when follow-up messages are loaded
  useEffect(() => {
    if (!chatContainerRef.current) return;
    if (followUpMessages.length === 0) return;

    // Use requestAnimationFrame to ensure DOM has updated
    requestAnimationFrame(() => {
      scrollToBottom();
    });
  }, [followUpMessages]);

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
    async (text: string, useStreaming: boolean = true) => {
      if (!text.length) return;
      if (!text.length || !inputRef.current) return;

      // Set chat input and clear input field
      const chatInput = text.trim();
      setText("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }

      // Set follow up messages to be empty
      // as it will be populated again when the AI agent responds
      setFollowUpMessages([]);

      setIsSubmitting(true);
      try {
        const prevMessages = messages;
        const newMessages = [...prevMessages, { human: chatInput, ai: "" }];
        setMessages(newMessages);

        if (useStreaming) {
          let accumulatedOutput = "";

          await fetchAskStream(
            {
              chatInput,
              sessionId: sessionId as string
            },
            (chunk) => {
              accumulatedOutput += chunk;
              const updatedMessages = [
                ...prevMessages,
                { human: chatInput, ai: accumulatedOutput }
              ];
              setMessages(updatedMessages);
            }
          );
        } else {
          const { output } = await fetchAsk({
            chatInput,
            sessionId: sessionId as string
          });

          const newMessagesFromAI = [
            ...prevMessages,
            { human: chatInput, ai: output }
          ];
          setMessages(newMessagesFromAI);
        }

        scrollToBottom();
      } catch (error) {
        toast("Failed to ask question. Please try again later.");
      } finally {
        setIsSubmitting(false);
        window.dispatchEvent(
          new CustomEvent("showFollowUpMessages", { detail: { sessionId } })
        );
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
        handleSubmit(message, ENABLE_STREAMING);
      }, 300);
    };

    window.addEventListener("prefillAIAgent", handlePrefillAndSubmit);

    return () => {
      window.removeEventListener("prefillAIAgent", handlePrefillAndSubmit);
    };
  }, [handleSubmit]);

  // Listen for custom event to show follow up messages
  useEffect(() => {
    const handleShowFollowUpMessages = (event: Event) => {
      const customEvent = event as ShowFollowUpMessagesEvent;
      const { sessionId } = customEvent.detail;

      if (sessionId) {
        fetchFollowUpMessages(sessionId)
          .then((followUpMessages) => {
            setFollowUpMessages(followUpMessages);
          })
          .catch(() => {
            setFollowUpMessages([]);
          });
      }
    };

    window.addEventListener("showFollowUpMessages", handleShowFollowUpMessages);

    return () => {
      window.removeEventListener(
        "showFollowUpMessages",
        handleShowFollowUpMessages
      );
    };
  }, [sessionId]);

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
            className="fixed right-6 bottom-32 z-60 flex w-full flex-col overflow-hidden rounded-md bg-white shadow-xl max-[720px]:inset-0 max-[720px]:bottom-0 max-[720px]:h-full max-[720px]:w-full max-[720px]:rounded-none md:max-w-sm lg:max-w-sm xl:max-w-md">
            <div className="relative shrink-0 bg-[#101330] px-4 py-5 text-white">
              <button
                onClick={() => setClosed(true)}
                className="absolute top-4 right-4 min-[720px]:hidden"
                aria-label="Close chat">
                <X className="h-6 w-6" />
              </button>
              <p className="text-lg font-bold">
                {hyperbotHeaderGreeting(lang)}
              </p>
              <p className="text-sm">
                {hyperbotHeaderSupportAvailability(lang)}
              </p>
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
                      <MarkdownContent input={m.ai} />
                    </div>
                  )}
                  {!m.ai && isSubmitting && i === messages.length - 1 && (
                    <div className="max-w-[80%] self-start rounded-xl bg-white p-3">
                      <div className="flex gap-1">
                        <span className="sr-only">
                          {hyperbotCommonLoading(lang)}...
                        </span>
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]" />
                        <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500" />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Follow up messages */}
              {followUpMessages.length > 0 && !isSubmitting && (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-800">
                    {hyperbotCommonFollowUp(lang)}
                  </p>
                  {followUpMessages.map((text, id) => (
                    <button
                      key={id}
                      type="button"
                      className="cursor-pointer text-left text-sm whitespace-normal text-gray-600 hover:underline"
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("prefillAIAgent", {
                            detail: { message: text }
                          })
                        );
                      }}>
                      {text}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <div className="shrink-0 bg-[#f2f4f8] p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:bg-white">
              {messages.length === 0 && (
                <div className="mb-3 flex flex-wrap gap-2 md:hidden">
                  {defaultMessages.map(({ text, id }) => (
                    <Button
                      key={id}
                      variant="outline"
                      disabled={isSubmitting}
                      className="rounded-md border border-gray-400 bg-transparent text-gray-600"
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("prefillAIAgent", {
                            detail: { message: text }
                          })
                        );
                      }}>
                      {text}
                    </Button>
                  ))}
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
                      handleSubmit(text, ENABLE_STREAMING);
                    }
                  }}
                  placeholder={hyperbotInputPlaceholder(lang)}
                  aria-describedby={hyperbotInputPlaceholder(lang)}
                />
                <Button
                  className="absolute top-2 right-2 h-8 w-8 rounded-full bg-blue-500 p-2"
                  variant="default"
                  disabled={isSubmitting}
                  onClick={() => {
                    handleSubmit(text, ENABLE_STREAMING);
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
                  {defaultMessages.map(({ text, id }) => (
                    <Button
                      key={id}
                      variant="outline"
                      disabled={isSubmitting}
                      className="rounded-md border border-gray-200 bg-transparent text-gray-600"
                      onClick={() => {
                        window.dispatchEvent(
                          new CustomEvent("prefillAIAgent", {
                            detail: { message: text }
                          })
                        );
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
        className="md:xp-6 fixed right-6 bottom-16 z-50 m-0 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 font-semibold text-white shadow-md hover:bg-blue-500/80 max-[720px]:hidden md:h-12 md:w-auto"
        onClick={() => {
          setClosed((prev) => {
            const nextState = !prev;

            if (nextState === false && gaEvent) {
              sendGAEvent(gaEvent);
            }

            return nextState;
          });
        }}>
        {closed ? (
          <>
            <span className="hidden lg:block">{hyperbotAskHyperBot(lang)}</span>
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
          className="fixed right-6 bottom-16 z-50 m-0 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 font-semibold text-white shadow-md hover:bg-blue-500/80 min-[720px]:hidden">
          <MessageCircle className="h-10 w-10" />
        </Button>
      )}
    </>
  );
}

const MarkdownContent = ({ input }: { input: string }) => (
  <div
    className="prose prose-sm text-sm"
    dangerouslySetInnerHTML={{
      __html: markdownit({ html: true }).render(input)
    }}
  />
);
