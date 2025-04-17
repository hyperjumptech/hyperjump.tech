"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import data from "@/data.json";
import Image from "next/image";

export function CaseStudiesCTA() {
  const { gaEventName, label, link } = data.cta;

  return (
    <div className="relative mt-10 w-full max-w-5xl overflow-hidden rounded">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/swatch.svg"
          alt="Footer background"
          width={1440}
          height={308}
          className="pointer-events-none h-full select-none object-cover"
          style={{
            background:
              "linear-gradient(134.7deg, #5954DA 3.43%, #0B0B0D 48.93%)"
          }}
        />
      </div>
      <div className="relative flex flex-col items-center justify-center px-6 py-11 text-center">
        <h3 className="text-3xl font-medium">
          Solve What&apos;s Holding You Back
        </h3>
        <p className="mt-3 max-w-xl">
          Whether you&apos;re dealing with legacy systems, operational
          bottlenecks, or scaling pains. We&apos;re here to help you untangle
          the mess and build what&apos;s next.
        </p>
        <Button
          asChild
          variant="outline"
          className="mt-8 bg-transparent font-semibold text-white hover:bg-white">
          <Link
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            onClick={() => {
              sendGAEvent({
                event: gaEventName,
                category: "engagement",
                label: "Case Study CTA"
              });
            }}>
            {label}
          </Link>
        </Button>
      </div>
    </div>
  );
}
