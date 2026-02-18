"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  mainNavItems0Label,
  mainNavItems1Label,
  mainNavItems2Label,
  mainNavItems3Label,
  mainNavItems4Label
} from "@/locales/.generated/server";
import {
  type SupportedLanguage,
  supportedLanguages
} from "@/locales/.generated/types";
import ColoredLogo from "@/public/images/hyperjump-colored.png";
import WhiteColoredLogo from "@/public/images/hyperjump-white-colored.png";
import StickyNavigationMain from "../../../components/sticky-nav-main";
import { data } from "../jobs/data";

const SOLID_NAV_PATHS = [
  "/case-studies",
  "/jobs",
  "/products",
  ...data.jobs.map(({ id }) => `/jobs/${id}`)
];
const SOLID_NAV_PATHS_WITH_LOCALE = supportedLanguages.reduce(
  (acc, locale) => [
    ...acc,
    ...SOLID_NAV_PATHS.map((path) => `/${locale}${path}`)
  ],
  SOLID_NAV_PATHS
);

function menu(lang: SupportedLanguage) {
  return [
    { label: mainNavItems0Label(lang), href: `/${lang}/services` },
    { label: mainNavItems2Label(lang), href: `/${lang}/products` },
    { label: mainNavItems1Label(lang), href: `/${lang}/case-studies` },
    { label: mainNavItems4Label(lang), href: `/${lang}/team` },
    { label: mainNavItems3Label(lang), href: `/${lang}/#faqs` }
  ];
}

type NavProps = {
  lang: SupportedLanguage;
};

export default function Nav({ lang }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isTransparent = Boolean(
    !SOLID_NAV_PATHS_WITH_LOCALE.find((path) => path === pathname)
  );

  return (
    <StickyNavigationMain>
      <NavContainer
        className={cn(
          "w-full transition-all duration-500",
          isTransparent && !isOpen
            ? "group-data-[scroll=true]:glass group-data-[scroll=false]:bg-transparent group-data-[scroll=true]:border-b group-data-[scroll=true]:border-black/6"
            : "bg-transparent",
          isOpen && "glass border-b border-black/6",
          !isTransparent &&
            "group-data-[scroll=true]:glass group-data-[scroll=true]:border-b group-data-[scroll=true]:border-black/6"
        )}>
        <div className="mx-auto flex w-5xl items-center justify-between px-4 md:px-20 xl:px-0">
          <Link
            className="text-2xl font-bold no-underline transition hover:no-underline lg:text-4xl"
            href={`/${lang}`}>
            <Logo isTransparent={isTransparent} isOpen={isOpen} />
          </Link>
          <CenterNavItems>
            <NavigationMenu className="mx-8 xl:mx-0">
              <NavigationMenuList className="flex items-center gap-1">
                {menu(lang).map(({ href, label }) => {
                  const isActive = pathname.startsWith(href);

                  return (
                    <NavigationMenuItem
                      key={label}
                      className="flex items-center">
                      <Link
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "rounded-full px-4 py-1.5 text-[15px] font-medium tracking-tight transition-all duration-300",
                          isTransparent &&
                            isActive &&
                            "group-data-[scroll=true]:bg-hyperjump-blue/10 group-data-[scroll=true]:text-hyperjump-blue group-data-[scroll=false]:bg-white/15 group-data-[scroll=false]:text-white",
                          isTransparent &&
                            !isActive &&
                            "group-data-[scroll=true]:text-hyperjump-black group-data-[scroll=false]:text-white/80 hover:group-data-[scroll=false]:bg-white/10 hover:group-data-[scroll=false]:text-white hover:group-data-[scroll=true]:bg-black/4",
                          !isTransparent &&
                            isActive &&
                            "bg-hyperjump-blue/10 text-hyperjump-blue",
                          !isTransparent &&
                            !isActive &&
                            "text-hyperjump-black hover:bg-black/4"
                        )}>
                        {label}
                      </Link>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </CenterNavItems>

          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="ml-2 rounded-lg p-1.5 transition-colors hover:bg-black/4 lg:hidden"
              aria-label="Toggle menu">
              <svg
                className={cn(
                  "h-5 w-5 transition-colors",
                  isTransparent && !isOpen
                    ? "group-data-[scroll=true]:stroke-hyperjump-black stroke-white"
                    : "stroke-hyperjump-black"
                )}
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </NavContainer>

      {isOpen && (
        <div className="glass border-b border-black/6 lg:hidden">
          <div className="mx-auto flex w-full flex-col gap-1 px-4 py-4 md:px-20 xl:px-0">
            {menu(lang).map(({ href, label }) => {
              const isActive = pathname.startsWith(href);
              return (
                <Link
                  key={label}
                  href={href}
                  className={cn(
                    "rounded-xl px-4 py-3 text-lg font-medium tracking-tight transition-all duration-200",
                    isActive
                      ? "bg-hyperjump-blue/10 text-hyperjump-blue"
                      : "text-hyperjump-black hover:bg-black/3"
                  )}
                  onClick={() => setIsOpen(false)}>
                  {label}
                </Link>
              );
            })}
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
        "mx-auto mt-0 flex w-full flex-wrap items-center justify-between border border-transparent py-2.5 transition-all duration-500 md:py-3.5",
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

type LogoProps = {
  isOpen: boolean;
  isTransparent: boolean;
};

function Logo({ isOpen, isTransparent }: LogoProps) {
  const logos = isTransparent ? [ColoredLogo, WhiteColoredLogo] : [ColoredLogo];

  return logos.map((image) => {
    const { src } = image;

    return (
      <Image
        key={src}
        className={cn(
          "h-7 transition-opacity duration-300",
          isTransparent && logoClassNames({ isOpen, src })
        )}
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
