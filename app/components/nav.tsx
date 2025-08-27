"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ReactNode, useState } from "react";
import WhiteLogo from "@/public/images/hyperjump-white.png";
import BlackLogo from "@/public/images/hyperjump-black.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent
} from "@/components/ui/navigation-menu";
import StickyNavigationMain from "./sticky-nav-main";
import ClientOnly from "./client-only";
import IconOnlyLogo from "@/public/images/hyperjump-icon-only.png";
import SVGLogo from "@/public/images/hyperjump-svg.svg";
import ColoredLogo from "@/public/images/hyperjump-colored.png";
import LogoWithContextMenu from "./logo-with-context-menu";
import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";
import { mainNav } from "../[lang]/data";
import { usePathname } from "next/navigation";
import { data } from "../[lang]/jobs/data";

const SOLID_NAV_PATHS = [
  "/case-studies",
  "/jobs",
  "/inferenceai",
  "/inferenceai/rag-chatbot",
  "/services",
  ...data.jobs.map(({ id }) => `/jobs/${id}`)
];
const SOLID_NAV_PATHS_WITH_LOCALE = supportedLanguages.reduce(
  (acc, locale) => [
    ...acc,
    ...SOLID_NAV_PATHS.map((path) => `/${locale}${path}`)
  ],
  SOLID_NAV_PATHS
);

type NavProps = {
  lang: SupportedLanguage;
};

export default function Nav({ lang }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const pathname = usePathname();
  const isTransparent = Boolean(
    !SOLID_NAV_PATHS_WITH_LOCALE.find((path) => path === pathname)
  );

  return (
    <StickyNavigationMain>
      <NavContainer
        className={cn(
          "w-full transition",
          isTransparent && !isOpen
            ? "group-data-[scroll=false]:bg-transparent group-data-[scroll=true]:bg-white"
            : "bg-transparent"
        )}>
        <div className="mx-auto flex w-5xl items-center justify-between px-4 md:px-20 xl:px-0">
          <HyperjumpLogo
            isTransparent={isTransparent}
            isOpen={isOpen}
            lang={lang}
            onClose={() => setIsOpen(!isOpen)}
          />

          <CenterNavItems>
            <NavigationMenu className="mx-8 xl:mx-0">
              <NavigationMenuList className="flex gap-5">
                {mainNav(lang).map((item, idx) =>
                  item.children ? (
                    <NavigationMenuItem key={idx}>
                      <NavigationMenuTrigger
                        className={cn(
                          "relative cursor-pointer text-xl font-medium no-underline transition",
                          "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none",
                          "bg-transparent hover:!bg-transparent",
                          "bg-transparent hover:!bg-transparent data-[active]:!bg-transparent data-[state=open]:!bg-transparent",
                          "data-[state=open]:group-data-[scroll=true]:!text-hyperjump-blue",
                          isTransparent
                            ? "data-[state=open]:group-data-[scroll=false]:!text-hyperjump-blue hover:text-hyperjump-blue group-data-[scroll=true]:!text-hyperjump-black"
                            : "data-[state=open]:text-hyperjump-blue text-hyperjump-black"
                        )}>
                        <Link href={item.href} className="no-underline">
                          {item.label}
                        </Link>
                      </NavigationMenuTrigger>

                      <NavigationMenuContent className="min-w-52 rounded-md bg-white p-4 shadow-lg">
                        <ul className="grid w-full gap-2">
                          {item.children.map((child, cIdx) => (
                            <li key={cIdx}>
                              <Link
                                href={child.href}
                                className="text-hyperjump-black hover:text-hyperjump-blue block transition">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={idx}>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-xl font-medium transition",
                          isTransparent
                            ? "group-data-[scroll=true]:text-hyperjump-black hover:group-data-[scroll=true]:text-hyperjump-blue group-data-[scroll=false]:text-white hover:group-data-[scroll=false]:border-b-2"
                            : "text-hyperjump-black hover:text-hyperjump-blue"
                        )}>
                        {item.label}
                      </Link>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </CenterNavItems>

          {/* Mobile Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 p-0 lg:hidden"
              aria-label="Toggle menu">
              <svg
                className={cn(
                  "h-6 w-6",
                  isTransparent && !isOpen
                    ? "stroke-white group-data-[scroll=true]:stroke-black"
                    : "stroke-black"
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
      </NavContainer>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="bg-white shadow-md lg:hidden">
          <div className="mx-auto flex w-full flex-col space-y-4 px-4 py-5 md:px-20 xl:px-0">
            {mainNav(lang).map((item, idx) =>
              item.children ? (
                <div key={idx} className="flex flex-col">
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="text-hyperjump-black flex w-full items-center justify-between py-2 text-2xl transition hover:text-gray-400">
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
                          href={child.href}
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
                  href={item.href}
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

function NavContainer({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto mt-0 flex w-full flex-wrap items-center justify-between border border-transparent py-3 transition duration-300 group-data-[scroll='true']:border-white/10 md:py-5",
        className
      )}>
      {children}
    </div>
  );
}

function CenterNavItems({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden flex-1 items-center justify-end space-x-8 lg:flex">
      {children}
    </div>
  );
}

type HyperjumpLogoProps = {
  isOpen: boolean;
  isTransparent: boolean;
  lang: SupportedLanguage;
  onClose?: () => void;
};

function HyperjumpLogo({
  isOpen,
  isTransparent,
  lang,
  onClose
}: HyperjumpLogoProps) {
  return (
    <div className="flex items-center">
      <Link
        className="toggleColour text-2xl font-bold no-underline transition hover:no-underline lg:text-4xl"
        href={`/${lang}`}
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
            <Logo isOpen={isOpen} isTransparent={isTransparent} />
          </LogoWithContextMenu>
        </ClientOnly>
      </Link>
    </div>
  );
}

type LogoProps = {
  isOpen: boolean;
  isTransparent: boolean;
};

function Logo({ isOpen, isTransparent }: LogoProps) {
  const logos = isTransparent ? [ColoredLogo, WhiteLogo] : [ColoredLogo];

  return logos.map((image) => {
    const { src } = image;

    return (
      <Image
        key={src}
        className={cn("h-8", isTransparent && logoClassNames({ isOpen, src }))}
        src={image}
        alt="Hyperjump Logo"
        width={187}
        height={32}
      />
    );
  });
}

type LogoClassNamesProps = {
  isOpen: boolean;
  src: string;
};

function logoClassNames({ isOpen, src }: LogoClassNamesProps): string {
  if (src.includes("white")) {
    return cn(
      "group-data-[scroll=false]:block group-data-[scroll=true]:hidden",
      isOpen && "group-data-[scroll=false]:hidden"
    );
  }

  if (src.includes("colored")) {
    return cn(
      "group-data-[scroll=false]:hidden group-data-[scroll=true]:block",
      isOpen && "group-data-[scroll=false]:block group-data-[scroll=true]:block"
    );
  }

  return "";
}
