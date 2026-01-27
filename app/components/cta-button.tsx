"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ButtonCTAProps = {
  children: ReactNode;
  message: string;
};

export default function ButtonCTA({ children, message }: ButtonCTAProps) {
  return (
    <Button
      className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-full"
      data-testid="request-demo-button"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("prefillAIAgent", {
            detail: {
              message
            }
          })
        );
      }}
      size="lg"
      variant="default">
      {children}
    </Button>
  );
}
