import ScrollObserver from "@/app/components/scroll-observer";
import Nav from "./components/nav";
import Hero from "./components/hero";
import Footer from "./components/footer";

export default function MainInferenceAILayout({
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
