"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export default function ButtonGetInTouch({
  index,
  buttonChatbotMessage,
  children
}: {
  index: string;
  children: React.ReactNode;
  buttonChatbotMessage: string;
}) {
  return (
    <Button
      variant="default"
      size="lg"
      className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-3/4 md:w-auto"
      onClick={() => {
        // Open Chatbot with question regarding the index of the Study Case
        let topic = "";
        switch (index) {
          case "erp-fisheries":
            topic =
              "Transforming a fisheries tech team into a scalable product engine";
            break;
          case "ctoaas-media":
            topic =
              "Elevating a media-tech engineering team from feature factory to innovation powerhouse";
            break;
          default:
            break;
        }

        window.dispatchEvent(
          new CustomEvent("prefillAIAgent", {
            detail: {
              message: `${buttonChatbotMessage} ${topic}`
            }
          })
        );
      }}>
      {children}
    </Button>
  );
}
