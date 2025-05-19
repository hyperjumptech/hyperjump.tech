"use client";

import { Button } from "@/components/ui/button";
import config from "@/lib/config";
import { createChat } from "@n8n/chat";
import { useEffect, useState } from "react";

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

      // Append minimize button to the chat window
      const chatDiv = document.querySelector("#n8n-chat");
      if (chatDiv) {
        const chatWindow = chatDiv.querySelector(".chat-window-wrapper");
        if (chatWindow) {
          chatWindow.classList.toggle("chat-window-minimized");
        }

        const chatHeader = chatDiv.querySelector(".chat-header");
        if (chatHeader) {
          const minimizeButton = document.createElement("button");
          minimizeButton.classList?.add(
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
            "mr-4",
            "h-7",
            "w-7",
            "rounded-full",
            "bg-transparent",
            "hover:bg-gray-100",
            "flex",
            "items-center",
            "justify-center",
            "hover:text-black",
            "transition-all",
            "duration-300"
          );
          minimizeButton.type = "button";
          minimizeButton.title = "Minimize";
          minimizeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus">
              <path d="M5 12h14"/>
            </svg>
          `;
          minimizeButton.onclick = () => {
            const chatFAB = chatDiv.querySelector(".chat-window-toggle");

            if (chatFAB) {
              const clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
              });
              chatFAB.dispatchEvent(clickEvent);
              setIsChatOpen(false);

              if (!isDesktop) {
                chatFAB.setAttribute("style", "display:flex;");
                chatFAB;
              } else {
                chatWindow?.classList.add("chat-window-right");
                chatWindow?.classList.toggle("chat-window-minimized");
              }
            }
          };
          chatHeader.appendChild(minimizeButton);

          if (isDesktop) {
            const maximizeButton = document.createElement("button");
            maximizeButton.classList?.add(
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
              "mr-12",
              "h-7",
              "w-7",
              "rounded-full",
              "bg-transparent",
              "hover:bg-gray-100",
              "flex",
              "items-center",
              "justify-center",
              "hover:text-black",
              "transition-all",
              "duration-300"
            );
            maximizeButton.type = "button";
            maximizeButton.title = "Full screen";
            maximizeButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize-2">
              <path d="M15 3h6v6"></path>
              <path d="m21 3-7 7"></path>
              <path d="m3 21 7-7"></path>
              <path d="M9 21H3v-6"></path>
            </svg>
          `;
            maximizeButton.onclick = () => {
              const chatWrapper = chatDiv.querySelector(".chat-window-wrapper");
              if (chatWrapper) {
                if (chatWrapper.classList.contains("chat-window-right")) {
                  chatWrapper.classList.remove("chat-window-right");
                  chatWrapper.classList.add("chat-window-centered");
                } else {
                  chatWrapper.classList.remove("chat-window-centered");
                  chatWrapper.classList.add("chat-window-right");
                }
              }
            };
            chatHeader.appendChild(maximizeButton);
          }
        }
      }

      return () => {
        chat.unmount();
      };
    }
  }, [isDesktop]);

  // Event listener for mobile chat FAB
  useEffect(() => {
    if (!isDesktop) {
      const chatFAB = document.querySelector(".chat-window-toggle");
      if (chatFAB) {
        chatFAB.addEventListener("click", () => {
          console.log("Nicely");
          chatFAB.setAttribute("style", "display:none;");
        });
      }
    }

    return () => {
      if (!isDesktop) {
        const chatFAB = document.querySelector(".chat-window-toggle");
        if (chatFAB) {
          chatFAB.removeEventListener("click", () => {
            console.log("Done");
            chatFAB.setAttribute("style", "display:block;");
          });
        }
      }
    };
  }, [isDesktop]);

  const handleSubmit = (text: string) => {
    if (text.length > 0) {
      setIsSubmitted(true);
      const chatDiv = document.querySelector("#n8n-chat");
      if (chatDiv) {
        const textarea = chatDiv.querySelector("textarea");
        if (textarea) {
          // Set the value and trigger input event
          textarea.value = text;
          const inputEvent = new Event("input", { bubbles: true });
          textarea.dispatchEvent(inputEvent);

          // Wait for the send button to be enabled
          const waitForSendButton = setInterval(() => {
            const sendButton = chatDiv.querySelector(".chat-input-send-button");
            if (sendButton && !sendButton.hasAttribute("disabled")) {
              clearInterval(waitForSendButton);

              // Trigger click event on the enabled button
              const clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window
              });
              sendButton.dispatchEvent(clickEvent);

              // Open the n8n chat window
              const chatWindow = chatDiv.querySelector(".chat-window-wrapper");
              if (chatWindow) {
                chatWindow.classList.toggle("chat-window-minimized");
                chatWindow.classList.toggle("chat-window-centered");
              }
              const chatFAB = chatDiv.querySelector(".chat-window-toggle");
              if (chatFAB) {
                const clickEvent = new MouseEvent("click", {
                  bubbles: true,
                  cancelable: true,
                  view: window
                });
                chatFAB.dispatchEvent(clickEvent);

                // Clear the textarea
                textarea.value = "";
                setText("");
                setIsSubmitted(true);
                setIsChatOpen(true);
              }
            }
          }, 100);

          // Add a timeout to prevent infinite waiting
          setTimeout(() => {
            clearInterval(waitForSendButton);
          }, 5000);
        }
      }
    }
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
