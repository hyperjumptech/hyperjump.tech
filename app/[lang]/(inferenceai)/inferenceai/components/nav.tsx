"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import StickyNavigationMain from "@/app/components/sticky-nav-main";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import type { SupportedLanguage } from "@/locales/.generated/types";

type Menu = { label: string; href?: string; children?: Menu[] };
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
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between transition-all duration-300 group-data-[scroll='false']:border-none">
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

          <div className="hidden items-center justify-center space-x-8 xl:flex">
            <NavigationMenu className="mx-8 xl:mx-0">
              <NavigationMenuList className="flex gap-5">
                {menus.map(({ href, label, children }) => (
                  <NavigationMenuItem key={label} className="text-center">
                    {children ? (
                      <>
                        <NavigationMenuTrigger
                          className={cn(
                            "relative cursor-pointer text-xl font-medium no-underline transition",
                            "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
                            "bg-transparent hover:!bg-transparent",
                            "bg-transparent hover:!bg-transparent data-[active]:!bg-transparent data-[state=open]:!bg-transparent",
                            "data-[state=open]:group-data-[scroll=true]:!text-hyperjump-blue",
                            "data-[state=open]:group-data-[scroll=false]:!text-hyperjump-blue hover:text-hyperjump-blue group-data-[scroll=true]:!text-hyperjump-black"
                          )}>
                          {label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-52 rounded-xl bg-white p-4 shadow-lg">
                          <ul className="flex flex-col gap-2">
                            {children.map((child) => (
                              <li key={child.label}>
                                <Link
                                  href={child.href || "#"}
                                  className="hover:text-hyperjump-blue text-base text-gray-700">
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        href={href || "#"}
                        className="group-data-[scroll=true]:text-inferenceai-indigo hover:group-data-[scroll=false]:text-hyperjump-blue hover:group-data-[scroll=true]:text-hyperjump-blue text-lg font-medium transition-colors group-data-[scroll=false]:text-white xl:text-xl">
                        {label}
                      </Link>
                    )}
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
            {menus.map((item, idx) =>
              item.children ? (
                <div key={idx} className="flex flex-col">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="text-inferenceai-indigo flex w-full items-center justify-between py-2 text-2xl transition hover:text-gray-400">
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
                      {item.children.map((child, cIdx) => (
                        <Link
                          key={cIdx}
                          href={child.href || "#"}
                          className="text-hyperjump-black space-y-2 text-xl transition hover:text-gray-400"
                          onClick={() => setIsOpen(false)}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={idx}
                  href={item.href || "#"}
                  className="text-hyperjump-black text-2xl transition hover:text-gray-400"
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
