type HeroProps = { subtitle: string; title: string };

export function Hero({ subtitle, title }: HeroProps) {
  return (
    <section
      id="hero"
      className="bg-services-hero text-hyperjump-black relative w-full px-4 py-10 text-center md:py-16">
      <div className="mx-auto flex h-full max-w-3xl flex-col items-center justify-center pt-12">
        <div
          className="text-hyperjump-black mb-4 text-3xl font-medium sm:text-4xl md:text-[40px]"
          dangerouslySetInnerHTML={{
            __html: title
          }}
        />
        <p className="text-hyperjump-gray text-base sm:text-lg">{subtitle}</p>
      </div>
    </section>
  );
}
