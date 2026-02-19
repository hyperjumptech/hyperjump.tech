import type { ReactNode } from "react";

type StickyNavigationProps = {
  children: ReactNode;
};

export default function StickyNavigationMain({
  children
}: StickyNavigationProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-50 shadow-xs transition-colors duration-300 group-data-[scroll=false]:bg-transparent group-data-[scroll=true]:bg-white">
      {children}
    </header>
  );
}
