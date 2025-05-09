import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import data from "@/data.json";
import { cn } from "@/app/utils/tailwind";
import Console from "@/app/components/console";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import { AIAgent } from "@/app/components/ai-agent";
import { figtree, geistMono, geistSans, switzer } from "./fonts";

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  authors: [
    {
      name: "Nico Prananta",
      url: "https://nico.fyi"
    }
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/icons/icon-192x192.png"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1C1F2E" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <title>Hyperjump Technology</title>
        <meta
          name="description"
          content="Open source first. Cloud native. DevOps excellence."
        />

        <meta property="og:url" content="https://hyperjump.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Hyperjump Technology" />
        <meta
          property="og:description"
          content="Open source first. Cloud native. DevOps excellence."
        />
        <meta property="og:image" content="https://hyperjump.tech" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="hyperjump.tech" />
        <meta property="twitter:url" content="https://hyperjump.tech" />
        <meta name="twitter:title" content="Hyperjump Technology" />
        <meta
          name="twitter:description"
          content="Open source first. Cloud native. DevOps excellence."
        />
        <meta name="twitter:image" content="" />

        <GoogleAnalytics gaId={data.GTM_ID} />
      </head>
      <body
        data-scroll="false"
        className={cn(
          "group",
          `${geistSans.variable} ${geistMono.variable} ${switzer.variable} ${figtree.variable} antialiased`,
          "bg-black leading-normal tracking-normal text-white"
        )}>
        {children}
        <Console />
        <Toaster />
        <AIAgent />
        <Script src="https://kit.fontawesome.com/f6999a3218.js" />
      </body>
    </html>
  );
}
