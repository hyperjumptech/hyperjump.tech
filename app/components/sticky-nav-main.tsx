import type { ReactNode } from "react";

type StickyNavigationProps = {
  children: ReactNode;
};

export default function StickyNavigationMain({
  children
}: StickyNavigationProps) {
  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] shadow-sm backdrop-blur-[3px] transition duration-300 group-[[data-scroll=false]]:bg-transparent group-[[data-scroll=true]]:bg-white">
      {children}
    </nav>
  );
}
