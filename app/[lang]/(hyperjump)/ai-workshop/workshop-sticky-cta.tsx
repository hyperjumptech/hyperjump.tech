"use client";

import Link from "next/link";
import { MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type WorkshopStickyCtaProps = {
  href: string;
  label: string;
};

/**
 * Fixed mobile mailto bar shown below the hero on small viewports.
 *
 * @param props - Prefilled mailto href and button label
 */
export function WorkshopStickyCta({ href, label }: WorkshopStickyCtaProps) {
  return (
    <div className="border-hyperjump-blue/20 bg-hyperjump-navy/95 fixed right-0 bottom-0 left-0 z-40 border-t p-4 backdrop-blur-md md:hidden">
      <Button
        asChild
        className="bg-hyperjump-blue hover:bg-hyperjump-blue/90 h-12 w-full rounded-full text-base font-semibold shadow-lg">
        <Link href={href} data-testid="ai-workshop-sticky-cta">
          <MailIcon className="mr-2 h-4 w-4" aria-hidden />
          {label}
        </Link>
      </Button>
    </div>
  );
}
