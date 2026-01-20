"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type GetInTouchButtonProps = {
  children: React.ReactNode;
};

function getTopic(pathname: string): string {
  const isBahasa = pathname.startsWith("/id");

  return isBahasa
    ? "Saya ingin mengajukan permintaan demo untuk layanan CTO-as-a-Service."
    : "I want to request a demo for CTO-as-a-Service.";
}

export default function ButtonGetInTouch({ children }: GetInTouchButtonProps) {
  const pathname = usePathname();

  return (
    <Button
      variant="default"
      size="lg"
      className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 w-3/4 md:w-auto"
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent("prefillAIAgent", {
            detail: {
              message: getTopic(pathname)
            }
          })
        );
      }}>
      {children}
    </Button>
  );
}
