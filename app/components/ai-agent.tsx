"use client";

import { Button } from "@/components/ui/button";
import config from "@/lib/config";
import { createChat } from "@n8n/chat";
import { useEffect, useRef, useState } from "react";

import "@n8n/chat/style.css";
import "../styles/ai-agent.css";
import { LoaderCircle, SparklesIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useMedia from "@/hooks/use-media";

const DEFAULT_MESSAGES = [
  { id: 1, text: "What services does Hyperjump offer?" },
  { id: 2, text: "Show me examples of past projects" },
  { id: 3, text: "Schedule a free consultation" }
];

export default function AIAgent() {
  const isDesktop = useMedia("(min-width: 992px)");
  const [text, setText] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(true);

  // Refs to store DOM elements
  const chatDivRef = useRef<HTMLElement | null>(null);
  const chatWindowRef = useRef<HTMLElement | null>(null);
  const chatFABRef = useRef<HTMLElement | null>(null);

  // Helper function to trigger click event
  const triggerClick = (element: Element) => {
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window
    });
    element.dispatchEvent(clickEvent);
  };

  // Helper function to initialize chat elements
  const initializeChatElements = () => {
    const chatDiv = document.querySelector("#n8n-chat");
    if (!chatDiv) return;

    chatDivRef.current = chatDiv as HTMLElement;
    chatWindowRef.current = chatDiv.querySelector(
      ".chat-window-wrapper"
    ) as HTMLElement;
    chatFABRef.current = chatDiv.querySelector(
      ".chat-window-toggle"
    ) as HTMLElement;

    if (chatWindowRef.current) {
      chatWindowRef.current.classList.toggle("chat-window-minimized");
    }
  };

  // Effect to create the chat widget
  useEffect(() => {
    if (config.AI_AGENT_URL) {
      const chat = createChat({
        webhookUrl: config.AI_AGENT_URL,
        initialMessages: [
          `Hi there! 👋`,
          `I’m HyperBot — your guide to everything about Hyperjump: our services, success stories, and how we solve real tech problems.`,
          `To see how we can support you with your tech problems, just say: “Can Hyperjump help me with my tech problem?”`
        ],
        showWelcomeScreen: false,
        // Currently, only EN is supported.
        i18n: {
          en: {
            title: "Hi there! 👋",
            subtitle: "Start a chat. We're here to help you 24/7.",
            footer: "",
            getStarted: "New Conversation",
            inputPlaceholder: "Type your question...",
            closeButtonTooltip: "Close"
          }
        }
      });
      initializeChatElements();

      // Create chat controls
      const chatHeader = chatDivRef.current?.querySelector(".chat-header");
      if (chatHeader) {
        const createButton = (
          title: string,
          icon: string,
          marginRight: string,
          onClick: () => void
        ) => {
          const button = document.createElement("button");
          button.classList.add(
            "absolute",
            "flex",
            "items-center",
            "justify-center",
            "right-0",
            "top-0",
            "text-white",
            "border",
            "border-white",
            "mt-4",
            marginRight,
            "h-7",
            "w-7",
            "rounded-full",
            "bg-transparent",
            "hover:bg-gray-100",
            "hover:text-black",
            "transition-all",
            "duration-300"
          );
          button.type = "button";
          button.title = title;
          button.innerHTML = icon;
          button.onclick = onClick;
          return button;
        };

        // Add minimize button
        chatHeader.appendChild(
          createButton(
            "Minimize",
            `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg>`,
            "mr-4",
            () => {
              if (chatFABRef.current) {
                triggerClick(chatFABRef.current);
                setIsChatOpen(false);
                if (!isDesktop) {
                  chatFABRef.current.setAttribute("style", "display:flex;");
                } else if (chatWindowRef.current) {
                  chatWindowRef.current.classList.add("chat-window-right");
                  chatWindowRef.current.classList.toggle(
                    "chat-window-minimized"
                  );
                }
              }
            }
          )
        );

        // Add maximize button for desktop
        if (isDesktop) {
          chatHeader.appendChild(
            createButton(
              "Full screen",
              `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2"><path d="M15 3h6v6"></path><path d="m21 3-7 7"></path><path d="m3 21 7-7"></path><path d="M9 21H3v-6"></path></svg>`,
              "mr-12",
              () => {
                if (chatWindowRef.current) {
                  if (chatWindowRef.current) {
                    if (
                      chatWindowRef.current.classList.contains(
                        "chat-window-right"
                      )
                    ) {
                      chatWindowRef.current.classList.remove(
                        "chat-window-right"
                      );
                      chatWindowRef.current.classList.add(
                        "chat-window-centered"
                      );
                    } else {
                      chatWindowRef.current.classList.remove(
                        "chat-window-centered"
                      );
                      chatWindowRef.current.classList.add("chat-window-right");
                    }
                  }
                }
              }
            )
          );
        }
      }

      return () => {
        chat.unmount();
      };
    }
  }, [isDesktop]);

  // Effect to handle mobile FAB
  useEffect(() => {
    if (!isDesktop && chatFABRef.current) {
      chatFABRef.current.addEventListener("click", () => {
        chatFABRef.current?.setAttribute("style", "display:none;");
      });
    }

    return () => {
      if (!isDesktop && chatFABRef.current) {
        chatFABRef.current.removeEventListener("click", () => {
          chatFABRef.current?.setAttribute("style", "display:block;");
        });
      }
    };
  }, [isDesktop]);

  const handleSubmit = async (text: string) => {
    if (!text.length || !chatDivRef.current) return;

    setIsSubmitted(true);
    const textarea = chatDivRef.current.querySelector("textarea");
    if (!textarea) return;

    textarea.value = text;
    textarea.dispatchEvent(new Event("input", { bubbles: true }));

    const waitForSendButton = setInterval(() => {
      const sendButton = chatDivRef.current?.querySelector(
        ".chat-input-send-button"
      );
      if (sendButton && !sendButton.hasAttribute("disabled")) {
        clearInterval(waitForSendButton);
        triggerClick(sendButton);

        if (chatWindowRef.current) {
          chatWindowRef.current.classList.toggle("chat-window-minimized");
          chatWindowRef.current.classList.toggle("chat-window-centered");
        }

        if (chatFABRef.current) {
          triggerClick(chatFABRef.current);
          textarea.value = "";
          setText("");
          setIsSubmitted(true);
          setIsChatOpen(true);
        }
      }
    }, 100);

    setTimeout(() => clearInterval(waitForSendButton), 5000);
  };

  return (
    <>
      <div
        className={cn(
          "animate-fade-in-up fixed bottom-0 z-50 mb-8 hidden w-full items-center px-4 transition-all",
          isSubmitted ? "hidden" : "lg:flex"
        )}>
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-2 rounded-xl bg-[url('/images/ai-agent.png')] bg-contain bg-center p-4 shadow-xl">
          <div className="flex flex-row items-center gap-2">
            <div className="relative flex w-full items-center">
              <SparklesIcon
                strokeWidth={1.5}
                className="absolute left-0 z-10 ml-4 h-6 w-6 text-[#3276F5]"
              />
              <input
                type="text"
                className="z-0 h-[52px] w-full max-w-7xl rounded-lg bg-white p-2 pr-12 pl-12 text-gray-800 placeholder:text-gray-400"
                value={text}
                onChange={({ target }) => setText(target.value)}
                aria-describedby="Ask me about services, success stories, or your challenges"
                placeholder="Ask me about services, success stories, or your challenges"
              />
              <Button
                id="desktop-ai-submit"
                type="button"
                className="absolute right-0 z-10 mr-4 ml-4 h-7 w-7 rounded-full bg-[#3276F5] p-2 hover:cursor-pointer hover:bg-[#3276F5DD]"
                onClick={() => handleSubmit(text)}
                disabled={isSubmitted}>
                <div className="flex items-center justify-center">
                  {isSubmitted ? (
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  ) : (
                    <Image
                      alt="Send message to AI"
                      src="/icons/ai-agent-button.svg"
                      width={16}
                      height={16}
                    />
                  )}
                </div>
              </Button>
            </div>
          </div>
          <div className="flex shrink-0 flex-row gap-2 overflow-auto">
            {DEFAULT_MESSAGES.map(({ text, id }) => (
              <Button
                key={id}
                className="rounded-md border border-white bg-transparent hover:cursor-pointer"
                onClick={() => setText(text)}>
                {text}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <Button
        onClick={() => {
          const chatFAB = document.querySelector(
            "#n8n-chat .chat-window-toggle"
          );
          if (chatFAB) {
            const clickEvent = new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window
            });
            chatFAB.dispatchEvent(clickEvent);

            // Open the n8n chat window
            const chatDiv = document.querySelector("#n8n-chat");
            if (chatDiv) {
              const chatWindow = chatDiv.querySelector(".chat-window-wrapper");
              if (chatWindow) {
                chatWindow.classList.toggle("chat-window-minimized");
              }
            }

            setIsChatOpen(true);
          }
        }}
        className={cn(
          isChatOpen ? "hidden" : "lg:flex",
          "fixed right-0 bottom-0 z-50 mr-8 mb-4 hidden rounded-full bg-[#3276F5] p-2 px-4 font-bold hover:cursor-pointer hover:bg-[#3276F5DD]"
        )}>
        <div className="flex items-center justify-center">Ask HyperBot</div>
      </Button>
    </>
  );
}
