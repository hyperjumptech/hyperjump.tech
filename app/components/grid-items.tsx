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
import { motion } from "framer-motion";
import React, { Children, isValidElement, useEffect, useState } from "react";
import { GitFork, Star } from "lucide-react";
import { SupportedLanguage } from "@/locales/.generated/types";
import { mainCaseStudiesButton } from "@/locales/.generated/server";

type GridItemsTitleProps = {
  id?: string;
  className?: string;
  title: string;
  description?: string;
  layout?: "horizontal" | "vertical";
  descriptionClassname?: string;
  children?: React.ReactNode;
};

export function GridItemsTitle({
  title,
  className = "bg-white",
  description,
  layout = "horizontal",
  descriptionClassname
}: GridItemsTitleProps) {
  const isHorizontal = layout === "horizontal";

  return !description ? (
    <h1 className="font-menium text-hyperjump-black my-2 w-full text-center text-4xl leading-tight">
      {title}
    </h1>
  ) : (
    <div
      className={cn(
        "w-full scroll-mt-20 pt-4 pb-7",
        className,
        isHorizontal
          ? "flex flex-wrap justify-between gap-4"
          : "flex flex-col md:items-center md:text-center"
      )}>
      <h2
        className={cn(
          "text-hyperjump-black text-4xl font-medium",
          isHorizontal ? "mb-0 text-left" : "mb-6"
        )}>
        {title}
      </h2>
      <p
        className={cn(
          "text-hyperjump-gray text-base md:text-lg",
          isHorizontal
            ? "max-w-lg text-left"
            : `w-full text-left md:w-2/3 md:text-center xl:w-3/4 ${descriptionClassname}`
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
  icon?: string | React.ReactElement<any>;
  button?: boolean;
  repo?: string;
  urlCaseStudy?: string;
};

export function GridItems({
  items,
  columns = { base: 1, md: 2, xl: 3 },
  withCard = true,
  cardClassName = "border-[#D9D9D9] bg-white",
  borderClassName = "",
  categoryClassName = "bg-hyperjump-black/10 text-hyperjump-black",
  titleClassName = "text-hyperjump-black",
  lang
}: {
  items: Item[];
  cardClassName?: string;
  columns?: {
    base?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  withCard?: boolean;
  borderClassName?: string;
  categoryClassName?: string;
  titleClassName?: string;
  lang: SupportedLanguage;
}) {
  const [repoStats, setRepoStats] = useState<
    Record<number, { stars: number; forks: number }>
  >({});

  useEffect(() => {
    const fetchRepoStats = async () => {
      const fetches = items.map(async (item, index) => {
        if (!item.repo) return null;
        try {
          const res = await fetch(
            `https://api.github.com/repos/hyperjumptech/${item.repo}`
          );
          const data = await res.json();
          return {
            index,
            stars: data.stargazers_count || 0,
            forks: data.forks_count || 0
          };
        } catch (error) {
          console.error("Failed fetching stats:", error);
          return null;
        }
      });

      const results = await Promise.all(fetches);

      const newStats = results.reduce(
        (acc, stat) => {
          if (stat) {
            acc[stat.index] = {
              stars: stat.stars,
              forks: stat.forks
            };
          }
          return acc;
        },
        {} as Record<number, { stars: number; forks: number }>
      );

      setRepoStats(newStats);
    };

    fetchRepoStats();
  }, [items]);

  const getColumnClass = (prefix: string, count?: number) =>
    count ? `${prefix}grid-cols-${count}` : "";

  const columnClasses = cn(
    "grid gap-6",
    getColumnClass("", columns.base),
    getColumnClass("sm:", columns.sm),
    getColumnClass("md:", columns.md),
    getColumnClass("lg:", columns.lg),
    getColumnClass("xl:", columns.xl)
  );

  const CardWrapper = withCard
    ? Card
    : ({ children }: { children: React.ReactNode }) => <div>{children}</div>;

  return (
    <div className={columnClasses}>
      {items.map((item, idx) => {
        const {
          image,
          title,
          description,
          url,
          category,
          icon,
          button,
          urlCaseStudy
        } = item;
        const stats = repoStats[idx] || { stars: 0, forks: 0 };
        const isReactIcon = isValidElement(icon);
        const isStringIcon = typeof icon === "string";
        return (
          <CardWrapper
            key={idx}
            className={cn(
              "flex flex-col overflow-hidden rounded-2xl transition-colors duration-300 ease-in-out hover:bg-white/5 hover:shadow-md hover:shadow-white/10",
              cardClassName,
              borderClassName
            )}>
            {image && (
              <div className="relative aspect-22/9 w-full md:aspect-16/9">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            )}

            <CardHeader>
              {isReactIcon && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-[#2E2B3F] to-white/20 shadow-md">
                  {icon}
                </div>
              )}

              {isStringIcon && (
                <Avatar className="mb-6 h-14 w-14">
                  <AvatarImage src={icon as string} alt={title} />
                </Avatar>
              )}
              {category && (
                <p
                  className={cn(
                    "mb-2 w-36 rounded-3xl px-2 py-1.5 text-center text-sm font-medium",
                    categoryClassName
                  )}>
                  {category}
                </p>
              )}
              {url ? (
                <Link
                  href={`/${lang}${url}`}
                  className="transition hover:underline">
                  <CardTitle
                    className={cn(
                      "text-xl font-semibold md:text-[22px]",
                      titleClassName
                    )}>
                    {title}
                  </CardTitle>
                </Link>
              ) : (
                <CardTitle
                  className={cn(
                    "text-xl font-semibold md:text-[22px]",
                    titleClassName
                  )}>
                  {title}
                </CardTitle>
              )}
            </CardHeader>

            <CardContent className="-mt-3 flex flex-1 flex-col justify-between gap-4">
              <CardDescription className="text-base font-medium transition-all duration-300">
                {description}
              </CardDescription>

              {urlCaseStudy && (
                <Button
                  asChild
                  variant="outline"
                  className="text-hyperjump-blue hover:bg-hyperjump-blue w-full border-gray-300 hover:text-white">
                  <Link href={urlCaseStudy}>{mainCaseStudiesButton(lang)}</Link>
                </Button>
              )}

              {url && button ? (
                <div className="mx-auto flex w-full flex-row gap-2 md:flex-col md:gap-4 xl:flex-row xl:justify-between">
                  <Button
                    asChild
                    variant="outline"
                    className="border-hyperjump-blue text-hyperjump-blue hover:bg-hyperjump-blue w-full hover:text-white">
                    <Link href={url} target="_blank" rel="noopener noreferrer">
                      <Star className="h-4 w-4" />
                      <span>Star ({stats.stars})</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="border-hyperjump-blue text-hyperjump-blue hover:bg-hyperjump-blue w-full hover:text-white">
                    <Link
                      href={`${url}/fork`}
                      target="_blank"
                      rel="noopener noreferrer">
                      <GitFork className="h-4 w-4" />
                      <span>Fork ({stats.forks})</span>
                    </Link>
                  </Button>
                </div>
              ) : null}
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
  type?: "hyperjump" | "inferenceai";
};

export const GridItemsMoreButton = ({
  href,
  text,
  variant = "default",
  gaEvent,
  type = "hyperjump"
}: GridItemsMoreButtonProps) => {
  const hyperjump = cn("font-semibold", {
    "bg-hyperjump-blue hover:bg-hyperjump-blue/90": variant === "default",
    "text-hyperjump-blue border-hyperjump-blue hover:bg-hyperjump-blue hover:text-white":
      variant === "outline"
  });

  const inferenceai = cn(
    "color-gradient-purple transform rounded-full text-white transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md"
  );

  return (
    <div className="mt-10 flex w-full items-center justify-center">
      <Button
        asChild
        className={type === "hyperjump" ? hyperjump : inferenceai}
        variant={variant}>
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

  return (
    <section id={id} className={cn("scroll-mt-20 bg-white", className)}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center px-4 py-5 md:px-20 md:py-14 xl:px-0">
        {title}
        <div>{body || others}</div>
        {more}
      </div>
    </section>
  );
}

interface GridItemsContainerProps {
  id?: string;
  className?: string;
  bgClassName?: string;
  children: React.ReactNode;
}

export const GridItemsContainerBlack = ({
  id,
  className = "max-w-5xl",
  bgClassName = "bg-red-500",
  children
}: GridItemsContainerProps) => {
  return (
    <section
      id={id}
      className={cn(
        "flex w-full scroll-mt-20 flex-wrap items-center justify-center",
        bgClassName
      )}>
      <motion.div
        className={cn(className, "px-4 py-7 md:px-6 md:py-[60px]")}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}>
        {children}
      </motion.div>
    </section>
  );
};

export const GridItemsTitleBlack = ({
  title,
  description,
  layout = "horizontal",
  descriptionClassname
}: GridItemsTitleProps) => {
  const isHorizontal = layout === "horizontal";
  const sharedMotionProps = {
    viewport: { once: true, amount: 0.3 },
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return description ? (
    <motion.div
      {...sharedMotionProps}
      className={cn(
        "w-full",
        isHorizontal
          ? "flex flex-col flex-wrap justify-between gap-4 md:flex-row"
          : "flex flex-col md:items-center"
      )}>
      <h2
        className={cn(
          "flex-1 text-4xl leading-tight font-medium text-white md:text-[40px]",
          isHorizontal ? "text-left" : "mb-4 text-left md:text-center"
        )}>
        {title}
      </h2>
      <p
        className={cn(
          "w-full flex-1 text-base leading-8 text-[#AFB0C3] md:max-w-xl md:text-lg",
          isHorizontal
            ? "max-w-lg text-left"
            : `w-full text-left md:w-2/3 md:text-center xl:w-3/4 ${descriptionClassname}`
        )}>
        {description}
      </p>
    </motion.div>
  ) : (
    <motion.h1
      {...sharedMotionProps}
      className="w-full text-center text-4xl leading-tight font-medium text-white md:text-[40px]">
      {title}
    </motion.h1>
  );
};
