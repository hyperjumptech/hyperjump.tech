"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Children, isValidElement, useEffect, useRef, useState } from "react";
import { GitFork, Star } from "lucide-react";

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
  descriptionStyle
}: GridItemsTitleProps) {
  const isHorizontal = layout === "horizontal";
  const hasBgClass = /\bbg-/.test(className);
  const finalClass = cn("scroll-mt-20", !hasBgClass && "bg-white", className);

  if (!description) {
    return (
      <h1 className="font-menium my-2 w-full text-center text-4xl leading-tight text-hyperjump-black">
        {title}
      </h1>
    );
  }

  return (
    <div
      className={cn(
        finalClass,
        "w-full pb-7 pt-4",
        isHorizontal
          ? "flex flex-wrap justify-between gap-4"
          : "flex flex-col md:items-center md:text-center"
      )}>
      <h2
        className={cn(
          "text-4xl font-medium text-hyperjump-black",
          isHorizontal ? "mb-0 text-left" : "mb-6"
        )}>
        {title}
      </h2>
      <p
        className={cn(
          "text-base text-hyperjump-gray md:text-lg",
          isHorizontal
            ? "max-w-lg text-left"
            : `w-full text-left md:w-2/3 md:text-center xl:w-3/4 ${descriptionStyle}`
        )}>
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
    xl: 3
  },
  withCard = true,
  classNameCard
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
    columnClassMap("xl:", columns.xl)
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
            className={
              withCard
                ? cn(
                    classNameCard,
                    "flex flex-col overflow-hidden border-[#D9D9D9] bg-white"
                  )
                : undefined
            }>
            {image ? (
              <div className="relative aspect-[16/9] w-full">
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
                <Avatar className="mb-6 h-14 w-14">
                  <AvatarImage className="h-14 w-14" src={icon} alt={title} />
                </Avatar>
              ) : null}
              {category && (
                <p className="mb-2 w-28 rounded-3xl bg-hyperjump-black/10 px-2 py-1.5 text-center text-sm font-medium text-hyperjump-black">
                  {category}
                </p>
              )}
              {url ? (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:underline">
                  <CardTitle className="text-xl font-semibold text-hyperjump-black md:text-[22px]">
                    {title}
                  </CardTitle>
                </Link>
              ) : (
                <CardTitle className="text-xl font-semibold text-hyperjump-black md:text-[22px]">
                  {title}
                </CardTitle>
              )}
            </CardHeader>

            <CardContent className="-mt-3 flex flex-1 flex-col justify-between gap-4">
              <div>
                <CardDescription
                  ref={(el) => {
                    textRefs.current[idx] = el;
                  }}
                  className={cn(
                    "transition-all duration-300",
                    expandedIndex !== idx ? "line-clamp-4" : ""
                  )}>
                  {description}
                </CardDescription>

                {overflowMap[idx] && (
                  <button
                    onClick={() =>
                      setExpandedIndex((prev) => (prev === idx ? null : idx))
                    }
                    className="mt-1 text-gray-600 transition hover:underline">
                    {expandedIndex === idx ? "See Less" : "See More"}
                  </button>
                )}
              </div>
              {url && (
                <div className="flex flex-row justify-between gap-4 space-x-4">
                  {/* Star Button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-hyperjump-blue text-hyperjump-blue hover:bg-hyperjump-blue hover:text-white">
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      <Star className="h-4 w-4" />
                      <span>Star</span>
                    </Link>
                  </Button>

                  {/* Fork Button */}
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-hyperjump-blue text-hyperjump-blue hover:bg-hyperjump-blue hover:text-white">
                    <Link
                      href={`${url}/fork`}
                      target="_blank"
                      rel="noopener noreferrer">
                      <GitFork className="h-4 w-4" />
                      <span>Fork</span>
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </CardWrapper>
        );
      })}
    </div>
  );
}

type GAEvent = {
  event: string;
  category: string;
  label: string;
};

export type GridItemsMoreButtonProps = {
  href: string;
  text?: string;
  variant?: "default" | "outline";
  gaEvent?: GAEvent;
};

export const GridItemsMoreButton = ({
  href,
  text,
  variant = "default",
  gaEvent
}: GridItemsMoreButtonProps) => {
  const customClass = cn("font-semibold", {
    "bg-hyperjump-blue hover:bg-hyperjump-blue/90": variant === "default",
    "text-hyperjump-blue border-hyperjump-blue hover:bg-hyperjump-blue hover:text-white":
      variant === "outline"
  });

  return (
    <div className="mt-10 flex w-full items-center justify-center">
      <Button asChild className={customClass} variant={variant}>
        <Link
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => {
            if (gaEvent) {
              sendGAEvent(gaEvent);
            }
          }}>
          {text}
        </Link>
      </Button>
    </div>
  );
};

export default function GridItemsContainer({
  children,
  className = "",
  id
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
  const finalClass = cn("scroll-mt-20", !hasBgClass && "bg-white", className);

  return (
    <section id={id} className={finalClass}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center px-4 py-5 md:px-20 md:py-14 xl:px-0">
        {title}
        <div>{body || others}</div>
        {more}
      </div>
    </section>
  );
}
