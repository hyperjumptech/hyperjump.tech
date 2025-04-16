"use client";

import { useEffect, useState } from "react";

export default function StickyNavigationMain({
  children,
  isMenuOpen = false,
}: {
  children: (params: {
    isScrolled: boolean;
    shouldBeWhite: boolean;
  }) => React.ReactNode;
  isMenuOpen?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setIsScrolled(window.scrollY > 0);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBeWhite = isScrolled || isMenuOpen;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        shouldBeWhite
          ? "bg-white backdrop-blur-[3px] shadow-sm"
          : "bg-transparent"
      }`}
    >
      {children({ isScrolled, shouldBeWhite })}
    </nav>
  );
}
