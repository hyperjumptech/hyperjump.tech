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
  mainNavItems3Label
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

function menu(lang: SupportedLanguage) {
  return [
    {
      label: mainNavItems0Label(lang),
      href: `/${lang}/services`
    },
    { label: mainNavItems1Label(lang), href: `/${lang}/case-studies` },
    { label: mainNavItems2Label(lang), href: `/${lang}/#open-source` },
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
          "w-full transition",
          isTransparent && !isOpen
            ? "group-data-[scroll=false]:bg-transparent group-data-[scroll=true]:bg-white"
            : "bg-transparent",
          isOpen && "bg-white"
        )}>
        <div className="mx-auto flex w-5xl items-center justify-between px-4 md:px-20 xl:px-0">
          <Link
            className="text-2xl font-bold no-underline transition hover:no-underline lg:text-4xl"
            href={`/${lang}`}>
            <Logo isTransparent={isTransparent} isOpen={isOpen} />
          </Link>
          <CenterNavItems>
            <NavigationMenu className="mx-8 xl:mx-0">
              <NavigationMenuList className="flex items-center space-x-8">
                {menu(lang).map(({ href, label }) => (
                  <NavigationMenuItem key={label} className="flex items-center">
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-xl font-medium transition duration-300",
                        isTransparent
                          ? "group-data-[scroll=true]:text-hyperjump-black hover:group-data-[scroll=true]:text-hyperjump-blue group-data-[scroll=false]:text-white hover:group-data-[scroll=false]:border-b-2"
                          : "text-hyperjump-black hover:text-hyperjump-blue"
                      )}>
                      {label}
                    </Link>
                  </NavigationMenuItem>
                ))}
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
            {menu(lang).map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-hyperjump-black text-2xl transition hover:text-gray-400"
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
