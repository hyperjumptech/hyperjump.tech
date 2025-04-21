"use client";

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
import { useEffect, useRef, useState } from "react";
import data from "../inferenceai-data.json";
import { motion } from "framer-motion";

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
  classNameCard,
  customBorderClass
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
            className={cn(
              `flex flex-col overflow-hidden rounded-2xl transition-colors duration-300 ease-in-out hover:bg-white/5 hover:shadow-md hover:shadow-white/10`,
              classNameCard,
              customBorderClass ?? "card-border-gradient"
            )}>
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
                <p className="mb-2 w-28 rounded-3xl bg-white/10 px-2 py-1.5 text-center text-sm font-medium text-white">
                  {category}
                </p>
              )}
              {url ? (
                <Link
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline">
                  <CardTitle className="text-xl font-semibold text-white md:text-[22px]">
                    {title}
                  </CardTitle>
                </Link>
              ) : (
                <CardTitle className="text-xl font-semibold text-white md:text-[22px]">
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
                    "text-[#CDCED8] transition-all duration-300",
                    expandedIndex !== idx ? "line-clamp-4" : ""
                  )}>
                  {description}
                </CardDescription>

                {overflowMap[idx] && (
                  <button
                    onClick={() =>
                      setExpandedIndex((prev) => (prev === idx ? null : idx))
                    }
                    className="mt-1 text-gray-600 hover:underline">
                    {expandedIndex === idx ? "See Less" : "See More"}
                  </button>
                )}
              </div>
            </CardContent>
          </CardWrapper>
        );
      })}
    </div>
  );
}

export const ScheduleConsultationButton = () => {
  const { cta } = data;

  return (
    <Button
      asChild
      variant="default"
      size="lg"
      className="transform rounded-full text-white transition-all duration-200 ease-in-out hover:scale-[1.02] hover:shadow-md"
      style={{
        border: "#6D5697",
        background: `radial-gradient(50% 50% at 50% 50%, #413AA3 0%, #332C95 100%), linear-gradient(177.61deg, rgba(255, 255, 255, 0) 2%, rgba(255, 255, 255, 0.12) 98.17%)`
      }}>
      <Link href={cta.link} className="px-7 py-4 text-lg font-semibold">
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
  children
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
                "linear-gradient(0deg, #050013, #050013), linear-gradient(180deg, #1513374D 0%, #15133700 23.58%)"
            }
          : undefined
      }>
      <motion.div
        className="mx-auto flex max-w-5xl flex-wrap items-center justify-center px-4 py-5 md:px-6 md:py-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}>
        {description ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={cn(
              "w-full",
              isHorizontal
                ? "flex flex-col flex-wrap justify-between gap-4 md:flex-row"
                : "flex flex-col md:items-center"
            )}>
            <h2
              className={cn(
                "flex-1 text-4xl font-medium leading-tight text-white md:text-[40px]",
                isHorizontal ? "text-left" : "mb-4 text-left md:text-center"
              )}>
              {title}
            </h2>
            <p
              className={cn(
                "flex-1 text-base text-[#AFB0C3] md:text-lg",
                isHorizontal
                  ? "max-w-lg text-left"
                  : `w-full text-left md:w-2/3 md:text-center xl:w-3/4 ${descriptionStyle}`
              )}>
              {description}
            </p>
          </motion.div>
        ) : (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="w-full text-center text-4xl font-medium leading-tight text-white md:text-[40px]">
            {title}
          </motion.h1>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full">
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};
