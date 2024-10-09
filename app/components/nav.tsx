"use client";

import Image from "next/image";
import data from "@/data.json";
import StickyNavigation from "@/app/components/sticky-nav";
import { cn } from "@/app/utils/tailwind";
import { ReactNode } from "react";
import LogoWithContextMenu from "./logo-with-context-menu";
import Link from "next/link";
import ClientOnly from "./client-only";

export default function Nav() {
  return (
    <StickyNavigation>
      <NavContainer>
        <HyperjumpLogo />

        <RightNavItems>
          <li className="mr-3">
            <a
              className="flex flex-row space-x-2 items-center no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
              target="blank"
              rel="noopener noreferrer"
              href={data.github}
            >
              <i className="fa fa-github" aria-hidden="true"></i>
              <span>Github</span>
            </a>
          </li>
        </RightNavItems>
      </NavContainer>

      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </StickyNavigation>
  );
}

export function NavContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full group-[[data-scroll='true']]:text-black group-[[data-scroll='false']]:text-white container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
      {children}
    </div>
  );
}

export function RightNavItems({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="w-full flex-grow lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent p-4 lg:p-0 z-20"
      id="nav-content"
    >
      <ul className="list-reset lg:flex justify-end flex-1 items-center">
        {children}
      </ul>
    </div>
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
                url: "/images/hyperjump-colored.png",
                fileName: "hyperjump-logo-colored.png",
              },
              {
                text: "Download Black and White logo",
                url: "/images/hyperjump-black.png",
                fileName: "hyperjump-logo-bw.png",
              },
              {
                text: "Download icon",
                url: "/images/hyperjump-icon-only.png",
                fileName: "hyperjump-icon-only.png",
              },
              {
                text: "Download SVG logo",
                url: "/images/hyperjump-svg.svg",
                fileName: "hyperjump-svg.svg",
              },
            ]}
          >
            {[
              "/images/hyperjump-white.png",
              "/images/hyperjump-colored.png",
            ].map((src, i) => (
              <Image
                key={i}
                id="brandlogo"
                className={cn(
                  "w-32",
                  src === "/images/hyperjump-white.png"
                    ? `group-[[data-scroll='false']]:block group-[[data-scroll='true']]:hidden`
                    : `group-[[data-scroll='true']]:block group-[[data-scroll='false']]:hidden`
                )}
                src={src}
                alt="Hyperjump Logo"
                width={128}
                height={32}
              />
            ))}
          </LogoWithContextMenu>
        </ClientOnly>
      </Link>
    </div>
  );
}
