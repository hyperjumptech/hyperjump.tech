"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, GitFork, Star } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  SectionReveal,
  StaggerContainer,
  StaggerItem
} from "../components/motion-wrappers";
import type { OpenSourceProduct } from "./data";
import {
  mainAndMore,
  mainBuiltInTheOpen,
  mainBuiltInTheOpenDesc,
  mainOpenSourceLabel
} from "@/locales/.generated/strings";
import type { SupportedLanguage } from "@/locales/.generated/types";

type RepoStats = { stars: number; forks: number };

type OSSSectionProps = {
  lang: SupportedLanguage;
  products: OpenSourceProduct[];
};

/**
 * Dark-themed section for open-source products, fetching live GitHub stats
 * and rendering cards with hover micro-interactions.
 */
export function OSSSection({ lang, products }: OSSSectionProps) {
  const [stats, setStats] = useState<Record<string, RepoStats>>({});

  useEffect(() => {
    async function fetchStats() {
      const results = await Promise.all(
        products.map(async (p) => {
          if (!p.repo) return null;
          try {
            const res = await fetch(
              `https://api.github.com/repos/hyperjumptech/${p.repo}`
            );
            const data = await res.json();
            return {
              repo: p.repo,
              stars: data.stargazers_count || 0,
              forks: data.forks_count || 0
            };
          } catch {
            return null;
          }
        })
      );

      const newStats: Record<string, RepoStats> = {};
      for (const r of results) {
        if (r) newStats[r.repo] = { stars: r.stars, forks: r.forks };
      }
      setStats(newStats);
    }

    fetchStats();
  }, [products]);

  return (
    <section className="bg-hyperjump-navy relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      />
      <div className="hero-glow animate-glow top-0 left-1/4 [animation-delay:0.5s]" />
      <div className="hero-glow animate-glow right-1/4 -bottom-32 [animation-delay:2s]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20 md:px-20 md:py-28 xl:px-0">
        <SectionReveal>
          <div className="mb-14 text-center">
            <span className="mb-5 inline-block text-xs font-semibold tracking-[0.2em] text-yellow-300 uppercase">
              {mainOpenSourceLabel(lang)}
            </span>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {mainBuiltInTheOpen(lang)}
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/60">
              {mainBuiltInTheOpenDesc(lang)}
            </p>
          </div>
        </SectionReveal>

        <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const s = stats[product.repo] || { stars: 0, forks: 0 };
            return (
              <StaggerItem key={product.title}>
                <div className="oss-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-white/20 hover:bg-white/6">
                  <div className="flex aspect-video items-center justify-center overflow-hidden bg-white/5">
                    <Image
                      src={product.image}
                      alt={product.title}
                      className="oss-hover-pulse-grow h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.06]"
                      width={400}
                      height={225}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <Link
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link">
                      <h3 className="mb-2 text-xl font-semibold tracking-tight text-white transition-colors group-hover/link:text-[#00D4AA]">
                        {product.title}
                      </h3>
                    </Link>
                    <p
                      className="mb-6 flex-1 text-[15px] leading-relaxed text-white/50"
                      dangerouslySetInnerHTML={{
                        __html: product.description
                      }}
                    />
                    <div className="flex gap-3">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-xl border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white">
                        <Link
                          href={product.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer">
                          <Star className="h-3.5 w-3.5" />
                          <span>{s.stars.toLocaleString()}</span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="flex-1 rounded-xl border-white/15 bg-white/5 text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white">
                        <Link
                          href={`${product.repoUrl}/fork`}
                          target="_blank"
                          rel="noopener noreferrer">
                          <GitFork className="h-3.5 w-3.5" />
                          <span>{s.forks.toLocaleString()}</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <SectionReveal delay={0.2}>
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 bg-white/5 px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10 hover:text-white">
              <Link
                href="https://github.com/hyperjumptech"
                target="_blank"
                rel="noopener noreferrer">
                {mainAndMore(lang)}
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
