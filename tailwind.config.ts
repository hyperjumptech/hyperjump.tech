import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        figtree: ["var(--font-figtree)", "sans-serif"],
        switzer: ["var(--font-switzer)", "sans-serif"],
        geist: ["var(--font-geist-sans)", "sans-serif"],
        "geist-mono": ["var(--font-geist-mono)", "sans-serif"]
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "smdd-red": "#cb3635",
        "hyperjump-blue": "#3276F5",
        "hyperjump-black": "#020F15",
        "hyperjump-gray": "#73767E",
        "inferenceai-indigo": "#050013",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0"
          },
          to: {
            height: "var(--radix-accordion-content-height)"
          }
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)"
          },
          to: {
            height: "0"
          }
        },
        "fade-in-up": {
          from: {
            opacity: 0,
            transform: "translateY(128px)"
          },
          to: {
            opacity: 1,
            transform: "translateY(0)"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 1s ease-in-out forwards"
      },
      backgroundImage: {
        "section-gradient":
          "linear-gradient(0deg, #050013, #050013), linear-gradient(180deg, #1513374D 0%, #15133700 23.58%)",
        "services-hero":
          " linear-gradient(180deg, rgba(50, 118, 245, 0.3) 0%, rgba(50, 118, 245, 0) 65.67%)"
      }
    }
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")]
};
export default config;
