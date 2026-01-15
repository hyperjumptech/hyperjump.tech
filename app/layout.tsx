import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";

import data from "@/data.json";
import { cn } from "@/lib/utils";
import { supportedLanguages } from "@/locales/.generated/types";
import Console from "@/app/components/console";
import { Toaster } from "@/components/ui/sonner";
import { figtree, geistMono, geistSans, switzer } from "./fonts";

import "./globals.css";
import { DEFAULT_OPENGRAPH } from "@/lib/default-metadata";

const { gaId } = data;

export const metadata: Metadata = DEFAULT_OPENGRAPH;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={supportedLanguages[0]}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1C1F2E" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <GoogleAnalytics gaId={gaId} />
      </head>
      <body
        data-scroll="false"
        className={cn(
          "group",
          `${geistSans.variable} ${geistMono.variable} ${switzer.variable} ${figtree.variable} antialiased`,
          "font-switzer bg-black leading-normal tracking-normal text-white"
        )}>
        {children}
        <Console />
        <Toaster />
      </body>
    </html>
  );
}
