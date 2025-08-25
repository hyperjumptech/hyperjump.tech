"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
    `${String(process.env.NEXT_PUBLIC_INFERENCEAI_GET_CHATS_WEBHOOK)}/${sessionId}`
  );
  url.searchParams.set("outputType", "html");

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
  const url = String(process.env.NEXT_PUBLIC_INFERENCEAI_POST_CHATS_WEBHOOK);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chatInput,
      sessionId,
      outputType: "html"
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
export default function InferenceAIAgent() {
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [text, setText] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

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

  // Effect to get session ID from cookie or generate a new one
  useEffect(() => {
    if (typeof document !== "undefined") {
      // Get session ID from cookie
      const sessionIdFromCookie = getCookie("INFERENCE_AI_SESSIONID");

      // If there is a session ID in the cookie, set it from Cookie
      if (sessionIdFromCookie) {
        setSessionId(sessionIdFromCookie);
      } else {
        // If not, generate a new session ID
        const newSessionId = crypto.randomUUID();
        setSessionId(newSessionId);
        setCookie("INFERENCE_AI_SESSIONID", newSessionId, 3);
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

  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl bg-[#49495EF2]">
      {/* Message threads */}
      <div
        id="chat-container"
        className="flex max-h-48 min-h-48 flex-col gap-4 overflow-y-auto p-4"
        ref={chatContainerRef}>
        {messages.length < 10 && (
          <div className="flex w-1/2 flex-row items-center gap-2 rounded-lg bg-white p-4 text-black">
            <div className="flex flex-col">
              <div className="text-sm">Hello 👋</div>
            </div>
          </div>
        )}
        {messages.map((message, index) => (
          <div className="flex flex-col gap-4" key={index}>
            <div className="flex w-10/12 flex-row items-center gap-2 self-end rounded-lg bg-white p-4 text-black md:w-1/2">
              <div className="flex flex-col">
                <MarkdownContent input={message.human} />
              </div>
            </div>
            <div className="flex w-10/12 flex-row items-center gap-2 rounded-lg bg-white p-4 text-black md:w-1/2">
              <div className="flex flex-col">
                {isSubmitting && index === messages.length - 1 ? (
                  <div className="flex flex-row gap-1">
                    <span className="sr-only">Loading...</span>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                  </div>
                ) : (
                  <MarkdownContent input={message.ai} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Separator */}
      <Separator />
      {/* Input */}
      <div className="flex flex-col gap-2 p-4">
        <div className="relative flex w-full">
          <input
            ref={inputRef}
            type="text"
            className="h-10 w-full rounded-lg bg-white pr-12 pl-4 text-sm text-black"
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
            className="absolute top-1.5 right-4 m-0 h-7 w-7 rounded-full p-2"
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
        {/* Button */}
        <div className="flex space-x-2 overflow-x-auto whitespace-nowrap">
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
  );
}

const MarkdownContent = ({ input }: { input: string }) => {
  return (
    <div
      className="prose prose-ul:list-disc prose-ol:list-decimal prose-strong:font-black text-sm"
      dangerouslySetInnerHTML={{ __html: input }}
    />
  );
};
