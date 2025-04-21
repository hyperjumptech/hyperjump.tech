"use client";

import { useEffect, useState } from "react";

export default function StickyNavigation({
  children,
  isMenuOpen = false
}: {
  children: (params: {
    isScrolled: boolean;
    shouldBeWhite: boolean;
  }) => React.ReactNode;
  isMenuOpen?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBeWhite = isScrolled || isMenuOpen;

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-[100] transition-all duration-500 ${
        shouldBeWhite
          ? "bg-white shadow-sm backdrop-blur-[3px]"
          : "bg-transparent"
      }`}>
      {children({ isScrolled, shouldBeWhite })}
    </nav>
  );
}
