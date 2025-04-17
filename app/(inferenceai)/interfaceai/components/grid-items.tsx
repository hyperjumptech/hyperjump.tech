"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Children, isValidElement, useEffect, useRef, useState } from "react";
import { GitFork, Star } from "lucide-react";
import data from "../interfaceai-data.json";

type GridItemsTitleProps = {
  className?: string;
  title: string;
  description?: string;
  layout?: "horizontal" | "vertical";
  descriptionStyle?: React.HTMLAttributes<HTMLDivElement>["className"];
};

export function GridItemsTitle({
  title,
  description,
  className = "",
  layout = "horizontal",
  descriptionStyle,
}: GridItemsTitleProps) {
  const isHorizontal = layout === "horizontal";
  const hasBgClass = /\bbg-/.test(className);
  const finalClass = cn(
    "scroll-mt-20",
    !hasBgClass && "bg-interface-ai-indigo text-white",
    className
  );

  if (!description) {
    return (
      <h1 className="w-full text-4xl md:text-[40px] font-menium leading-tight text-center text-white">
        {title}
      </h1>
    );
  }

  return (
    <div
      className={cn(
        finalClass,
        "w-full mb-8 flex",
        isHorizontal
          ? "flex flex-wrap justify-between gap-4 flex-1"
          : "flex flex-col md:items-center md:text-center"
      )}
    >
      <h2
        className={cn(
          "text-4xl md:text-[40px] font-medium leading-tight flex-1",
          isHorizontal ? "mb-0 text-left" : "mb-4"
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          "text-[#AFB0C3] text-base md:text-lg flex-1",
          isHorizontal
            ? "text-left max-w-lg"
            : `w-full md:w-2/3 xl:w-3/4 text-left md:text-center ${descriptionStyle}`
        )}
      >
        {description}
      </p>
    </div>
  );
}

type Item = {
  image?: string;
  title: string;
  description: string;
  url?: string;
  category?: string;
  icon?: string;
};

export function GridItems({
  items,
  columns = {
    base: 1,
    md: 2,
    xl: 3,
  },
  withCard = true,
  classNameCard,
  customBorderClass,
}: {
  items: Item[];
  classNameCard?: string;
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  withCard?: boolean;
  customBorderClass?: string;
}) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [overflowMap, setOverflowMap] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const newOverflowMap: Record<number, boolean> = {};
    textRefs.current.forEach((el, index) => {
      if (el) {
        newOverflowMap[index] = el.scrollHeight > el.clientHeight;
      }
    });
    setOverflowMap(newOverflowMap);
  }, [items]);

  const columnClassMap = (prefix: string, count?: number) => {
    if (!count) return "";
    return `${prefix}grid-cols-${count}`;
  };

  const columnClasses = [
    columnClassMap("", columns.base ?? 1),
    columnClassMap("sm:", columns.sm),
    columnClassMap("md:", columns.md),
    columnClassMap("lg:", columns.lg),
    columnClassMap("xl:", columns.xl),
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`grid gap-6 ${columnClasses}`}>
      {items.map((item, idx) => {
        const { image, title, description, url, category, icon } = item;

        const CardWrapper = withCard
          ? Card
          : ({ children }: { children: React.ReactNode }) => (
              <div>{children}</div>
            );

        return (
          <CardWrapper
            key={idx}
            className={cn(
              `flex flex-col overflow-hidden ${classNameCard}`,
              customBorderClass ?? "card-border-gradient"
            )}
          >
            {image ? (
              <div className="relative w-full aspect-[16/9]">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            ) : null}

            <CardHeader>
              {icon ? (
                <Avatar className="mb-6 w-14 h-14">
                  <AvatarImage className="w-14 h-14" src={icon} alt={title} />
                </Avatar>
              ) : null}
              {category && (
                <p className="text-white font-medium mb-2 w-28 rounded-3xl text-center bg-white/10 px-2 py-1.5 text-sm">
                  {category}
                </p>
              )}
              {url ? (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <CardTitle className="md:text-[22px] text-xl font-semibold text-white">
                    {title}
                  </CardTitle>
                </Link>
              ) : (
                <CardTitle className="md:text-[22px] text-xl font-semibold text-white">
                  {title}
                </CardTitle>
              )}
            </CardHeader>

            <CardContent className="flex flex-col justify-between flex-1 gap-4 -mt-3">
              <div>
                <CardDescription
                  ref={(el) => {
                    textRefs.current[idx] = el;
                  }}
                  className={cn(
                    "transition-all duration-300 text-[#CDCED8]",
                    expandedIndex !== idx ? "line-clamp-4" : ""
                  )}
                >
                  {description}
                </CardDescription>

                {overflowMap[idx] && (
                  <button
                    onClick={() =>
                      setExpandedIndex((prev) => (prev === idx ? null : idx))
                    }
                    className="mt-1 text-gray-600 hover:underline"
                  >
                    {expandedIndex === idx ? "See Less" : "See More"}
                  </button>
                )}
              </div>
              {url && (
                <div className="flex flex-row justify-between gap-4 space-x-4">
                  {/* Star Button */}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full text-hyperjump-blue font-semibold items-center gap-2 rounded-md border border-[#D1D5DB] px-auto py-3 justify-center text-sm shadow-sm transition hover:bg-gray-50"
                  >
                    <Star className="h-4 w-4 " />
                    <span>Star</span>
                  </a>

                  {/* Fork Button */}
                  <a
                    href={`${url}/fork`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full text-hyperjump-blue font-semibold items-center gap-2 rounded-md border border-[#D1D5DB] px-auto py-3 justify-center text-sm shadow-sm transition hover:bg-gray-50"
                  >
                    <GitFork className="h-4 w-4 text-[#0056D2]" />
                    <span>Fork</span>
                  </a>
                </div>
              )}
            </CardContent>
          </CardWrapper>
        );
      })}
    </div>
  );
}

type GridItemsMoreButtonProps = {
  href: string;
  text?: string;
  variant?: "default" | "outline" | "link";
};

export const GridItemsMoreButton = ({
  href,
  text,
  variant = "default",
}: GridItemsMoreButtonProps) => {
  const customClass = cn(
    "py-3 mt-10 px-5 transition-all duration-200 ease-in-out transform hover:shadow-md hover:scale-[1.02]",
    {
      // Primary (default)
      "bg-hyperjump-blue text-white hover:bg-hyperjump-blue/90 hover:text-white":
        variant === "default",

      // Outline
      "border border-hyperjump-blue text-hyperjump-blue hover:bg-hyperjump-blue/10 hover:text-hyperjump-blue":
        variant === "outline",

      // Link
      "text-hyperjump-blue hover:underline hover:text-hyperjump-blue":
        variant === "link",
    }
  );

  return (
    <div className="w-full flex items-center justify-center">
      <Button variant="ghost" className={customClass} asChild>
        <Link
          className="font-semibold"
          href={href}
          target="_blank"
          rel="noreferrer noopener"
        >
          {text}
        </Link>
      </Button>
    </div>
  );
};

export default function GridItemsContainer({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const childrenArray = Children.toArray(children);

  const title = childrenArray.find(
    (child) => isValidElement(child) && child.type === GridItemsTitle
  );

  const body = childrenArray.find(
    (child) => isValidElement(child) && child.type === GridItems
  );

  const more = childrenArray.find(
    (child) => isValidElement(child) && child.type === GridItemsMoreButton
  );

  const others = childrenArray.filter(
    (child) => child !== title && child !== body && child !== more
  );

  const hasBgClass = /\bbg-/.test(className);
  const finalClass = cn("scroll-mt-20", className);

  return (
    <section
      id={id}
      className={finalClass}
      style={
        !hasBgClass
          ? {
              background:
                "linear-gradient(0deg, #050013, #050013), linear-gradient(180deg, #1513374D 0%, #15133700 23.58%)",
            }
          : undefined
      }
    >
      <div className="mx-auto flex py-5 md:py-8 px-4 md:px-20 flex-wrap justify-center items-center">
        {title}
        <div>{body || others}</div>
        {more}
      </div>
    </section>
  );
}

export const ScheduleConsultationButton = () => {
  const { cta } = data;

  return (
    <Button
      asChild
      variant="default"
      size="lg"
      className="transition-all rounded-full duration-200 ease-in-out transform hover:shadow-md hover:scale-[1.02] text-white"
      style={{
        background: `radial-gradient(50% 50% at 50% 50%, #413AA3 0%, #332C95 100%), linear-gradient(177.61deg, rgba(255, 255, 255, 0) 2%, rgba(255, 255, 255, 0.12) 98.17%)`,
      }}
    >
      <Link href={cta.link} className="py-4 px-7 text-lg font-semibold">
        {cta.label}
      </Link>
    </Button>
  );
};

type GridItemsSectionProps = {
  id?: string;
  className?: string;
  title: string;
  description?: string;
  layout?: "horizontal" | "vertical";
  descriptionStyle?: string;
  children?: React.ReactNode;
};

export const GridItemsSection = ({
  id,
  className = "",
  title,
  description,
  layout = "horizontal",
  descriptionStyle,
  children,
}: GridItemsSectionProps) => {
  const isHorizontal = layout === "horizontal";
  const hasBgClass = /\bbg-/.test(className);

  const finalClass = cn("scroll-mt-20", className);

  return (
    <section
      id={id}
      className={finalClass}
      style={
        !hasBgClass
          ? {
              background:
                "linear-gradient(0deg, #050013, #050013), linear-gradient(180deg, #1513374D 0%, #15133700 23.58%)",
            }
          : undefined
      }
    >
      <div className="mx-auto flex py-5 md:py-8 px-4 md:px-20 flex-wrap justify-center items-center">
        {description ? (
          <div
            className={cn(
              "w-full",
              isHorizontal
                ? "flex flex-col md:flex-row flex-wrap justify-between gap-4"
                : "flex flex-col md:items-center"
            )}
          >
            <h2
              className={cn(
                "text-4xl md:text-[40px] font-medium leading-tight flex-1 text-white",
                isHorizontal ? "text-left" : "mb-4 md:text-center text-left"
              )}
            >
              {title}
            </h2>
            <p
              className={cn(
                "text-[#AFB0C3] text-base md:text-lg flex-1",
                isHorizontal
                  ? "text-left max-w-lg"
                  : `w-full md:w-2/3 xl:w-3/4 text-left md:text-center ${descriptionStyle}`
              )}
            >
              {description}
            </p>
          </div>
        ) : (
          <h1 className="w-full text-4xl md:text-[40px] font-medium leading-tight text-center text-white">
            {title}
          </h1>
        )}

        {/* Content */}
        <div className="w-full">{children}</div>
      </div>
    </section>
  );
};
