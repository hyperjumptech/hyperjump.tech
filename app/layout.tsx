import type { Metadata } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import localFont from "next/font/local";
import "./globals.css";
import data from "@/data.json";
import { cn } from "@/app/utils/tailwind";
import Footer from "@/app/components/footer";
import Console from "@/app/components/console";
import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";

const geistSans = localFont({
  src: "../public/fonts/Switzer-Regular.woff2",
  variable: "--font-geist-sans",
  weight: "400 500",
});
const geistMono = localFont({
  src: "/../public/fonts/Switzer-Semibold.woff2",
  variable: "--font-geist-mono",
  weight: "600 700",
});

export const metadata: Metadata = {
  title: data.title,
  description: data.description,
  authors: [
    {
      name: "Nico Prananta",
      url: "https://nico.fyi",
    },
  ],
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1C1F2E" />
        <link rel="icon" href="/icons/icon-192x192.png" />
        <GoogleTagManager gtmId={data.GTM_ID} />
      </head>
      <body
        data-scroll="false"
        className={cn(
          "group",
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "leading-normal tracking-normal text-white bg-black"
        )}
      >
        {children}
        <Console />
        <Footer />
        <Toaster />
        <Script src="https://kit.fontawesome.com/f6999a3218.js" />
      </body>
    </html>
  );
}
