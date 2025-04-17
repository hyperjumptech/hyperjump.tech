export default function StickyNavigation({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="group sticky top-0 z-50">
      <div className="flex h-16 items-center justify-between transition-colors duration-300 group-[[data-scroll='true']]:bg-white group-[[data-scroll='true']]:shadow-md">
        {children}
      </div>
    </nav>
  );
}
