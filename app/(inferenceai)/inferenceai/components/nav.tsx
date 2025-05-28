"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import StickyNavigationMain from "@/app/components/sticky-nav-main";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/locales/.generated/types";

import { navInferenceai } from "../[lang]/data";
import { navRagChatbot } from "../rag-chatbot/[lang]/data";

type NavProps = {
  lang: SupportedLanguage;
  type?: "inferenceai" | "rag-chatbot";
};

export default function Nav({ lang, type = "inferenceai" }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StickyNavigationMain>
      <div className={cn("w-full px-4 py-5 md:px-8", isOpen && "bg-white")}>
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between transition-all duration-300 group-data-[scroll='false']:border-none">
          <Link
            href={
              type === "inferenceai"
                ? "/inferenceai"
                : "/inferenceai/rag-chatbot"
            }
            className="flex items-center">
            <Image
              src="/images/inferenceai/inference-ai-white.svg"
              alt="Inference AI Logo"
              width={187}
              height={32}
              className={cn(
                "h-8 group-data-[scroll='true']:hidden",
                isOpen && "hidden"
              )}
            />
            <Image
              src="/images/inferenceai/inference-ai-black.svg"
              alt="Inference AI Logo"
              width={187}
              height={32}
              className={cn(
                "hidden h-8 group-data-[scroll='true']:block",
                isOpen && "block"
              )}
            />
          </Link>

          <div className="hidden items-center justify-center space-x-8 xl:flex">
            <NavigationMenu className="mx-8 xl:mx-0">
              <NavigationMenuList className="flex gap-5">
                {(type === "inferenceai"
                  ? navInferenceai(lang)
                  : navRagChatbot(lang)
                ).map(({ href, label }) => (
                  <NavigationMenuItem key={href} className="text-center">
                    <Link
                      href={href}
                      className="group-data-[scroll=true]:text-inferenceai-indigo hover:group-data-[scroll=false]:text-hyperjump-blue hover:group-data-[scroll=true]:text-hyperjump-blue text-lg font-medium transition-colors group-data-[scroll=false]:text-white xl:text-xl">
                      {label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-3 p-2"
              aria-label="Toggle menu">
              <svg
                className={cn(
                  "h-6 w-6",
                  isOpen
                    ? "stroke-black"
                    : "stroke-white group-data-[scroll=true]:stroke-black"
                )}
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white shadow-md xl:hidden">
          <div className="mx-auto flex w-full flex-col space-y-4 px-4 py-5 md:px-8">
            {(type === "inferenceai"
              ? navInferenceai(lang)
              : navRagChatbot(lang)
            ).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-inferenceai-indigo hover:text-hyperjump-blue text-2xl"
                onClick={() => setIsOpen(false)}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </StickyNavigationMain>
  );
}
