"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/app/utils/tailwind";
import { ReactNode, useEffect, useState } from "react";
import WhiteLogo from "@/public/images/hyperjump-white.png";
import BlackLogo from "@/public/images/hyperjump-black.png";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import StickyNavigationMain from "./sticky-nav-main";
import IconOnlyLogo from "@/public/images/hyperjump-icon-only.png";
import SVGLogo from "@/public/images/hyperjump-svg.svg";
import ColoredLogo from "@/public/images/hyperjump-colored.png";
import ClientOnly from "@/app/components/client-only";
import LogoWithContextMenu from "@/app/components/logo-with-context-menu";
import intefaceAIData from "../interfaceai-data.json";
import { ScheduleConsultationButton } from "./grid-items";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const { navLinks } = intefaceAIData;

  return (
    <StickyNavigationMain isMenuOpen={isOpen}>
      {({ shouldBeWhite }) => (
        <>
          <NavContainer>
            <Link href="/" className="flex items-center">
              <HyperjumpLogoMain isOpen={isOpen} />
            </Link>

            <CenterNavItems>
              <NavigationMenu>
                <NavigationMenuList className="flex gap-8">
                  {navLinks.map((item, idx) => (
                    <NavigationMenuItem key={idx}>
                      <Link
                        href={item.href}
                        className={cn(
                          shouldBeWhite
                            ? "text-hyperjump-black hover:text-hyperjump-blue"
                            : "text-white hover:border-b-2",
                          "font-medium text-xl transition-colors"
                        )}
                      >
                        {item.label}
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </CenterNavItems>

            <RightNavItems>
              <ScheduleConsultationButton />
            </RightNavItems>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke={shouldBeWhite ? "black" : "white"}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
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
          </NavContainer>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="lg:hidden bg-white shadow-md">
              <div className="flex flex-col px-4 md:px-20 mx-auto py-6 space-y-4">
                {navLinks.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.href}
                    className="text-hyperjump-black text-2xl hover:text-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <ScheduleConsultationButton />
              </div>
            </div>
          )}
        </>
      )}
    </StickyNavigationMain>
  );
}

export function NavContainer({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBorder = isScrolled ? "boder border-b-2" : "boder-none2";

  return (
    <div
      className={cn(
        showBorder,
        "w-full px-4 md:px-20 mx-auto flex flex-wrap items-center justify-between mt-0 py-5"
      )}
    >
      {children}
    </div>
  );
}

function CenterNavItems({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden lg:flex items-center justify-center space-x-8 flex-1">
      {children}
    </div>
  );
}

export function RightNavItems({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden lg:flex items-center justify-end space-x-4">
      {children}
    </div>
  );
}

function HyperjumpLogoMain({ isOpen }: { isOpen: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBlack = isOpen || isScrolled;

  const logoSrc = showBlack ? BlackLogo : WhiteLogo;

  return (
    <Image
      src={logoSrc}
      alt="Hyperjump Logo"
      width={187}
      height={32}
      className="h-8"
    />
  );
}

export function HyperjumpLogo() {
  return (
    <div className="pl-4 flex items-center">
      <Link
        className="toggleColour no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
        href={"/"}
      >
        <ClientOnly>
          <LogoWithContextMenu
            downloadables={[
              {
                text: "Download colored logo",
                url: ColoredLogo.src,
                fileName: "hyperjump-logo-colored.png",
              },
              {
                text: "Download Black and White logo",
                url: BlackLogo.src,
                fileName: "hyperjump-logo-bw.png",
              },
              {
                text: "Download icon",
                url: IconOnlyLogo.src,
                fileName: "hyperjump-icon-only.png",
              },
              {
                text: "Download SVG logo",
                url: SVGLogo.src,
                fileName: "hyperjump-svg.svg",
              },
            ]}
          >
            {[WhiteLogo, ColoredLogo].map((image, i) => {
              return (
                <Image
                  key={i}
                  id="brandlogo"
                  className={cn(
                    "w-32",
                    image.src.includes("hyperjump-white")
                      ? `group-[[data-scroll='false']]:block group-[[data-scroll='true']]:hidden`
                      : `group-[[data-scroll='true']]:block group-[[data-scroll='false']]:hidden`
                  )}
                  src={image}
                  alt="Hyperjump Logo"
                  width={128}
                  height={32}
                />
              );
            })}
          </LogoWithContextMenu>
        </ClientOnly>
      </Link>
    </div>
  );
}
