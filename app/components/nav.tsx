"use client";

import { sendGAEvent } from "@next/third-parties/google";
import Image from "next/image";
import Link from "next/link";
import data from "@/data.json";
import { cn } from "@/app/utils/tailwind";
import { type ReactNode, useState } from "react";
import WhiteLogo from "@/public/images/hyperjump-white.png";
import BlackLogo from "@/public/images/hyperjump-black.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import StickyNavigationMain from "./sticky-nav-main";
import ClientOnly from "./client-only";
import IconOnlyLogo from "@/public/images/hyperjump-icon-only.png";
import SVGLogo from "@/public/images/hyperjump-svg.svg";
import ColoredLogo from "@/public/images/hyperjump-colored.png";
import LogoWithContextMenu from "./logo-with-context-menu";
import { Button } from "@/components/ui/button";
import { SupportedLanguage } from "@/locales/.generated/types";
import { mainNav } from "../(main)/[lang]/data";
import { mainCtaLabel } from "@/locales/.generated/server";
import {
  LanguagePicker,
  LanguagePickerServices
} from "../(main)/[lang]/language-picker";

type NavProps = {
  type?: "default" | "services";
  className?: string;
  lang: SupportedLanguage;
};

export default function Nav({
  lang,
  type = "default",
  className = "max-w-5xl"
}: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const forceWhite = type === "services";
  const { gaEventName, link } = data.cta;

  return (
    <StickyNavigationMain isMenuOpen={isOpen}>
      {({ shouldBeWhite }) => {
        const isWhite = forceWhite || shouldBeWhite;
        return (
          <>
            <NavContainer
              className={cn(
                "w-full transition-colors",
                isWhite ? "bg-white" : "bg-transparent"
              )}>
              <div
                className={cn(
                  className,
                  "mx-auto flex w-full items-center justify-between px-4 md:px-20 xl:px-0"
                )}>
                {type === "default" && (
                  <HyperjumpLogo
                    type="hyperjump"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                  />
                )}
                {type === "services" && (
                  <HyperjumpLogo
                    type="services"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                  />
                )}

                <CenterNavItems>
                  <NavigationMenu className="mx-8 xl:mx-0">
                    <NavigationMenuList className="flex gap-5">
                      {mainNav(lang).map((item, idx) => (
                        <NavigationMenuItem key={idx} className="text-center">
                          <Link
                            href={item.href}
                            className={cn(
                              isWhite
                                ? "text-hyperjump-black hover:text-hyperjump-blue"
                                : "text-white hover:border-b-2",
                              "text-xl font-medium transition-colors"
                            )}>
                            {item.label}
                          </Link>
                        </NavigationMenuItem>
                      ))}
                    </NavigationMenuList>
                  </NavigationMenu>
                </CenterNavItems>

                <RightNavItems>
                  {type === "services" ? (
                    <LanguagePickerServices isOpen={isOpen} lang={lang} />
                  ) : (
                    <LanguagePicker isOpen={isOpen} lang={lang} />
                  )}

                  <Button
                    asChild
                    variant="outline"
                    className={cn(
                      isWhite
                        ? "bg-hyperjump-blue text-white hover:bg-hyperjump-blue/90"
                        : "bg-transparent text-white",
                      "font-semibold"
                    )}
                    onClick={() => {
                      sendGAEvent({
                        event: gaEventName,
                        category: "engagement",
                        label: "Navigation CTA"
                      });
                    }}>
                    <Link href={link} target="_blank" rel="noreferrer noopener">
                      {mainCtaLabel(lang)}
                    </Link>
                  </Button>
                </RightNavItems>

                {/* Mobile Toggle */}
                <div className="flex items-center lg:hidden">
                  {type === "services" ? (
                    <LanguagePickerServices isOpen={isOpen} lang={lang} />
                  ) : (
                    <LanguagePicker isOpen={isOpen} lang={lang} />
                  )}

                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="ml-2 p-0 lg:hidden"
                    aria-label="Toggle menu">
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      stroke={isWhite ? "black" : "white"}
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
            </NavContainer>
            {/* Mobile Menu */}
            {isOpen && (
              <div className="bg-white shadow-md lg:hidden">
                <div className="mx-auto flex w-full flex-col space-y-4 px-4 py-5 md:px-20 xl:px-0">
                  {mainNav(lang).map((item, idx) => (
                    <Link
                      key={idx}
                      href={item.href}
                      className="text-2xl text-hyperjump-black transition hover:text-gray-400"
                      onClick={() => setIsOpen(false)}>
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href={link}
                    className="mt-2 rounded border border-hyperjump-black py-3 text-center text-base text-hyperjump-black transition hover:border-gray-400 hover:text-gray-400"
                    onClick={() => {
                      sendGAEvent({
                        event: gaEventName,
                        category: "engagement",
                        label: "Navigation CTA"
                      });
                    }}>
                    {mainCtaLabel(lang)}
                  </Link>
                </div>
              </div>
            )}
          </>
        );
      }}
    </StickyNavigationMain>
  );
}

export function NavContainer({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        className,
        "mx-auto mt-0 flex w-full flex-wrap items-center justify-between py-3 md:py-5",
        "border border-transparent transition-colors duration-300",
        "group-data-[scroll='true']:border-white/10"
      )}>
      {children}
    </div>
  );
}

function CenterNavItems({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden flex-1 items-center justify-center space-x-8 lg:flex">
      {children}
    </div>
  );
}

export function RightNavItems({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden items-center justify-end space-x-4 lg:flex">
      {children}
    </div>
  );
}

export function HyperjumpLogo({
  isOpen,
  type,
  onClose
}: {
  isOpen?: boolean;
  type?: "hyperjump" | "smdd2024" | "services";
  onClose?: () => void;
}) {
  return (
    <div className="flex items-center">
      <Link
        className="toggleColour text-2xl font-bold no-underline transition hover:no-underline lg:text-4xl"
        href={"/"}
        {...(isOpen ? { onClick: onClose } : {})}>
        <ClientOnly>
          <LogoWithContextMenu
            downloadables={[
              {
                text: "Download colored logo",
                url: ColoredLogo.src,
                fileName: "hyperjump-logo-colored.png"
              },
              {
                text: "Download Black and White logo",
                url: BlackLogo.src,
                fileName: "hyperjump-logo-bw.png"
              },
              {
                text: "Download icon",
                url: IconOnlyLogo.src,
                fileName: "hyperjump-icon-only.png"
              },
              {
                text: "Download SVG logo",
                url: SVGLogo.src,
                fileName: "hyperjump-svg.svg"
              }
            ]}>
            {type === "services" ? (
              <Image
                id="brandlogo"
                className="h-8"
                src={BlackLogo}
                alt="Hyperjump Logo"
                width={187}
                height={32}
              />
            ) : (
              [WhiteLogo, type === "hyperjump" ? BlackLogo : ColoredLogo].map(
                (image, i) => {
                  const isWhite = image.src.includes("hyperjump-white");

                  return (
                    <Image
                      key={i}
                      id="brandlogo"
                      className={cn(
                        "h-8",
                        isWhite
                          ? [
                              "group-[[data-scroll='false']]:block",
                              "group-[[data-scroll='true']]:hidden",
                              isOpen && "group-[[data-scroll='false']]:hidden"
                            ]
                          : [
                              "group-[[data-scroll='true']]:block",
                              "group-[[data-scroll='false']]:hidden",
                              isOpen && "group-[[data-scroll='false']]:block"
                            ]
                      )}
                      src={image}
                      alt="Hyperjump Logo"
                      width={187}
                      height={32}
                    />
                  );
                }
              )
            )}
          </LogoWithContextMenu>
        </ClientOnly>
      </Link>
    </div>
  );
}
