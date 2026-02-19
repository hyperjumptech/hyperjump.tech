"use client";

import { useEffect, useRef } from "react";

/**
 * Each ribbon is a tight bundle of lines that share a common base curve
 * with tiny per-line offsets, creating a surface/sheet look.
 */
type Ribbon = {
  lineCount: number;
  /** Vertical center of the ribbon (0–1 fraction of height) */
  baseY: number;
  /** Max vertical spread between lines in the bundle (px) */
  spread: number;
  /** Base amplitude of the swooping curve */
  amplitude: number;
  /** Unique phase seed */
  phase: number;
  /** Color stops: from → to across lines in the bundle */
  colorFrom: string;
  colorTo: string;
  strokeWidth: number;
};

const RIBBONS: Ribbon[] = [
  {
    lineCount: 28,
    baseY: 0.52,
    spread: 30,
    amplitude: 80,
    phase: 0,
    colorFrom: "rgba(255, 160, 80, 0.5)",
    colorTo: "rgba(200, 80, 255, 0.4)",
    strokeWidth: 0.7
  },
  {
    lineCount: 22,
    baseY: 0.55,
    spread: 24,
    amplitude: 60,
    phase: 1.8,
    colorFrom: "rgba(180, 80, 255, 0.45)",
    colorTo: "rgba(120, 60, 255, 0.3)",
    strokeWidth: 0.6
  },
  {
    lineCount: 16,
    baseY: 0.48,
    spread: 18,
    amplitude: 45,
    phase: 3.6,
    colorFrom: "rgba(99, 91, 255, 0.35)",
    colorTo: "rgba(99, 91, 255, 0.15)",
    strokeWidth: 0.5
  }
];

const TOTAL_LINES = RIBBONS.reduce((s, r) => s + r.lineCount, 0);

type FlatLine = {
  ribbonIdx: number;
  /** 0–1 position within its ribbon bundle */
  t: number;
  gradId: string;
  strokeWidth: number;
};

function buildFlatLines(): FlatLine[] {
  const lines: FlatLine[] = [];
  RIBBONS.forEach((ribbon, ri) => {
    for (let i = 0; i < ribbon.lineCount; i++) {
      lines.push({
        ribbonIdx: ri,
        t: ribbon.lineCount === 1 ? 0.5 : i / (ribbon.lineCount - 1),
        gradId: `ribbon-${ri}-line-${i}`,
        strokeWidth: ribbon.strokeWidth
      });
    }
  });
  return lines;
}

function lerpColor(a: number[], b: number[], t: number): string {
  return `rgba(${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(a[1] + (b[1] - a[1]) * t)}, ${Math.round(a[2] + (b[2] - a[2]) * t)}, ${(a[3] + (b[3] - a[3]) * t).toFixed(3)})`;
}

function parseRgba(s: string): number[] {
  const m = s.match(/[\d.]+/g);
  return m ? m.map(Number) : [0, 0, 0, 0];
}

/**
 * Build a swooping curve for one line within a ribbon.
 * All lines in a ribbon share the same base curve shape;
 * only a small per-line vertical offset separates them.
 */
function buildPath(
  ribbon: Ribbon,
  lineT: number,
  width: number,
  height: number,
  time: number
): string {
  const points: string[] = [];
  const step = 5;
  const t = time / 1000;
  const lineOffset = (lineT - 0.5) * ribbon.spread;

  for (let x = 0; x <= width; x += step) {
    const nx = x / width;

    const envelope = Math.pow(Math.sin(nx * Math.PI), 0.8);

    const base =
      Math.sin(nx * 2.8 + ribbon.phase) * ribbon.amplitude * 0.7 +
      Math.sin(nx * 1.2 + ribbon.phase * 0.6) * ribbon.amplitude * 0.3;

    const breathe =
      Math.sin(t * 0.25 + ribbon.phase + nx * 1.5) * ribbon.amplitude * 0.12 +
      Math.sin(t * 0.18 + ribbon.phase * 1.4 + nx * 3.0) *
        ribbon.amplitude *
        0.06;

    const perLineWiggle =
      Math.sin(nx * 6 + lineT * 12 + t * 0.14) * ribbon.spread * 0.08;

    const y =
      height * ribbon.baseY +
      (base + breathe) * envelope +
      lineOffset +
      perLineWiggle;

    points.push(x === 0 ? `M ${x} ${y}` : `L ${x} ${y}`);
  }
  return points.join(" ");
}

/**
 * Detects Chromium-based browsers (excluding Edge) via user agent.
 */
function isChromeBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  return /Chrome\//.test(ua) && !/Edg\//.test(ua);
}

/**
 * Renders tightly-bundled flowing ribbon lines as an SVG overlay,
 * inspired by Stripe's surface-like animated gradient lines.
 *
 * Animation is disabled on Chrome to avoid scroll performance issues
 * caused by the per-frame SVG path recomputation competing with
 * Chrome's compositor thread.
 */
export function AnimatedLines({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const flatLines = useRef<FlatLine[]>(buildFlatLines());
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const chrome = isChromeBrowser();
    let cachedWidth = 0;
    let cachedHeight = 0;

    function drawStatic(width: number, height: number) {
      for (let i = 0; i < flatLines.current.length; i++) {
        const fl = flatLines.current[i];
        const path = pathsRef.current[i];
        if (path) {
          path.setAttribute(
            "d",
            buildPath(RIBBONS[fl.ribbonIdx], fl.t, width, height, 0)
          );
        }
      }
    }

    const resizeObserver = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      cachedWidth = width;
      cachedHeight = height;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
      if (chrome && width > 0 && height > 0) {
        drawStatic(width, height);
      }
    });
    resizeObserver.observe(svg);

    if (chrome) {
      return () => {
        resizeObserver.disconnect();
      };
    }

    let startTime: number | null = null;
    let isVisible = false;

    function animate(timestamp: number) {
      if (!isVisible) return;
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (cachedWidth === 0 || cachedHeight === 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }

      for (let i = 0; i < flatLines.current.length; i++) {
        const fl = flatLines.current[i];
        const path = pathsRef.current[i];
        if (path) {
          path.setAttribute(
            "d",
            buildPath(
              RIBBONS[fl.ribbonIdx],
              fl.t,
              cachedWidth,
              cachedHeight,
              elapsed
            )
          );
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    const visObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );

    visObserver.observe(svg);
    return () => {
      visObserver.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const parsedColors = RIBBONS.map((r) => ({
    from: parseRgba(r.colorFrom),
    to: parseRgba(r.colorTo)
  }));

  return (
    <svg
      ref={svgRef}
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true">
      <defs>
        {flatLines.current.map((fl) => {
          const c = parsedColors[fl.ribbonIdx];
          const midColor = lerpColor(c.from, c.to, fl.t);
          const edgeColor = lerpColor(c.from, c.to, fl.t).replace(
            /[\d.]+\)$/,
            "0)"
          );

          return (
            <linearGradient
              key={fl.gradId}
              id={fl.gradId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%">
              <stop offset="0%" stopColor={edgeColor} />
              <stop offset="25%" stopColor={midColor} />
              <stop offset="75%" stopColor={midColor} />
              <stop offset="100%" stopColor={edgeColor} />
            </linearGradient>
          );
        })}
      </defs>
      {flatLines.current.map((fl, i) => (
        <path
          key={fl.gradId}
          ref={(el) => {
            if (el) pathsRef.current[i] = el;
          }}
          fill="none"
          stroke={`url(#${fl.gradId})`}
          strokeWidth={fl.strokeWidth}
        />
      ))}
    </svg>
  );
}
