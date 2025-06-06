import Image from "next/image";

export function Hero({ heading }: { heading: string }) {
  return (
    <section
      id="hero"
      className="bg-hyperjump-black relative h-[351px] overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          alt="Hero background"
          blurDataURL="/images/case-studies/banner.jpg"
          className="object-cover object-center"
          fill
          placeholder="blur"
          priority
          src="/images/case-studies/banner.jpg"
        />
      </div>

      <div className="relative z-10 mt-10 flex h-[351px] items-center justify-center">
        <h1
          className="mb-4 max-w-3xl px-4 text-center text-2xl font-medium text-white sm:text-4xl md:px-20 md:text-[40px]"
          dangerouslySetInnerHTML={{
            __html: heading
          }}
        />
      </div>
    </section>
  );
}
