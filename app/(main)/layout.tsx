import Hero from "@/app/components/hero";
import Nav from "@/app/components/nav";
import ScrollObserver from "@/app/components/scroll-observer";
import Footer from "../components/footer";

export default function MainLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollObserver />
      <Nav />
      <Hero />
      {children}
      <Footer />
    </>
  );
}
