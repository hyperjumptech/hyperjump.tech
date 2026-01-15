"use client";

import { Button } from "@/components/ui/button";

type GetInTouchButtonProps = {
  index: string;
  buttonChatbotMessage: string;
  children: React.ReactNode;
};

function getTopic(index: string): string {
  switch (index) {
    case "erp-fisheries":
      return "Transforming a fisheries tech team into a scalable product engine";
    case "ctoaas-media":
      return "Elevating a media-tech engineering team from feature factory to innovation powerhouse";
    default:
      return "";
  }
}

export default function ButtonGetInTouch({
  index,
  buttonChatbotMessage,
  children
}: GetInTouchButtonProps) {
  return (
    <Button
      variant="default"
      size="lg"
      className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-3/4 md:w-auto"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("prefillAIAgent", {
            detail: {
              message: `${buttonChatbotMessage} ${getTopic(index)}`
            }
          })
        );
      }}>
      {children}
    </Button>
  );
}
