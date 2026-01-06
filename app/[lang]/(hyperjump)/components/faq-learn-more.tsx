"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function FaqLearnMore({
  index,
  learnMoreChatbotMessage,
  children
}: {
  index: number;
  children: React.ReactNode;
  learnMoreChatbotMessage: string;
}) {
  return (
    <Button
      variant="link"
      className="flex w-max cursor-pointer flex-row items-center justify-center gap-1 rounded-none border-b border-black px-0 text-black hover:no-underline lg:text-lg"
      onClick={() => {
        // Open Chatbot with question regarding the index of the FAQ
        let topic = "";
        switch (index) {
          case 0:
            topic = "CTO as a Service";
            break;
          case 1:
            topic = "ERP Implementation";
            break;
          case 2:
            topic = "Tech Due Diligence";
            break;
          case 3:
            topic = "Software as a Service";
            break;
          default:
            break;
        }

        window.dispatchEvent(
          new CustomEvent("prefillAIAgent", {
            detail: {
              message: `${learnMoreChatbotMessage} ${topic}`
            }
          })
        );
      }}>
      {children}
      <span>
        <ArrowRightIcon className="h-4 w-4" />
      </span>
    </Button>
  );
}
