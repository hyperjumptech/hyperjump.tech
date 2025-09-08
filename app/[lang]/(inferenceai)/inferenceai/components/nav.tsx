"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import StickyNavigationMain from "@/app/components/sticky-nav-main";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/locales/.generated/types";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type Menu = {
  key: string;
  label: string;
  href?: string;
  children?: Menu[];
  description?: string;
};
type NavProps = {
  lang: SupportedLanguage;
  menus: Menu[];
};

export default function Nav({ lang, menus }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <StickyNavigationMain>
      <div className={cn("w-full px-4 py-5 md:px-8", isOpen && "bg-white")}>
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between transition-all duration-300">
          {/* Logo */}
          <Link href={`/${lang}/inferenceai`} className="flex items-center">
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

          <nav className="hidden items-center justify-center space-x-8 xl:flex">
            <ul className="flex items-center gap-5">
              {menus.map(({ href, label, children, key }) =>
                children ? (
                  <li key={key} className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={cn(
                            "m-0 flex items-center gap-1 bg-transparent p-0 text-xl font-medium outline-none", // ⬅️ tanpa padding/margin
                            "group-data-[scroll=true]:text-hyperjump-black",
                            "hover:group-data-[scroll=true]:text-hyperjump-blue",
                            "hover:group-data-[scroll=false]:text-hyperjump-blue group-data-[scroll=false]:text-white"
                          )}>
                          {label}
                          <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                        </button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="start"
                        side="bottom"
                        sideOffset={8}
                        className="hidden min-w-52 rounded-md bg-white p-4 shadow-lg xl:flex">
                        <ul className="grid w-full gap-2">
                          {children.map(({ href, label, description, key }) => (
                            <li key={key}>
                              <Link
                                href={href || "#"}
                                className="hover:text-hyperjump-blue block transition">
                                {label}
                                {description && (
                                  <div className="text-sm font-normal text-[#565656]">
                                    {description}
                                  </div>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </li>
                ) : (
                  <li key={key}>
                    <Link
                      href={href || "#"}
                      className={cn(
                        "text-xl font-medium transition duration-300",
                        "group-data-[scroll=true]:text-hyperjump-black hover:group-data-[scroll=true]:text-hyperjump-blue",
                        "group-data-[scroll=false]:text-white hover:group-data-[scroll=false]:border-b-2"
                      )}>
                      {label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

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
            {menus.map((item, idx) =>
              item.children ? (
                <div key={item.key} className="flex flex-col">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="text-inferenceai-indigo hover:text-hyperjump-blue flex w-full items-center justify-between py-2 text-2xl transition">
                    {item.label}
                    <svg
                      className={cn(
                        "h-5 w-5 transition-transform",
                        openIndex === idx && "rotate-180"
                      )}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {openIndex === idx && (
                    <div className="ml-4 flex flex-col space-y-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          href={child.href || "#"}
                          onClick={() => setIsOpen(false)}
                          className="hover:text-hyperjump-blue text-hyperjump-black block text-base transition">
                          {child.label}
                          {child.description && (
                            <span className="block text-sm text-gray-500">
                              {child.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href || "#"}
                  className="text-hyperjump-black hover:text-hyperjump-blue text-2xl transition"
                  onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      )}
    </StickyNavigationMain>
  );
}
