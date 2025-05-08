import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  text: string;
  desc: string;
  items: string[];
  image: string;
  icon: string;
  url?: string;
  reverse?: boolean;
  seeMoreText?: string;
  withBorder?: boolean;
}

export function ServiceCard({
  title,
  text,
  desc,
  items,
  image,
  icon,
  reverse,
  seeMoreText,
  url = "#",
  withBorder = true
}: ServiceCardProps) {
  return (
    <div
      className={`mb-14 flex flex-col gap-6 ${
        withBorder ? "border-b border-gray-200 pb-7 md:pb-14" : ""
      } md:flex-row ${reverse ? "md:flex-row-reverse" : ""} items-center`}>
      <div className="relative w-full md:w-1/2">
        <Image
          src={image}
          alt={title}
          className="h-auto w-full rounded-[20px]"
          width={660}
          height={400}
        />
        <div className="absolute -bottom-1 left-1 rounded-md">
          <Image src={icon} alt={`${title} icon`} width={80} height={80} />
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <div className="text-left">
          <h3 className="text-hyperjump-black mb-4 text-[28px] font-medium md:text-4xl">
            {title}
          </h3>
          <p className="mb-4 text-lg text-gray-700">{text}</p>
          <p className="mb-6 inline-block border-b-2 border-gray-200 text-lg text-gray-700">
            {desc}
          </p>
        </div>

        <ul className="list-none text-base text-gray-700 md:text-lg">
          {items.map((point, i) => (
            <li key={i} className="mb-4 flex items-start gap-2">
              <Image
                src="/images/checklist.svg"
                alt="icon"
                width={24}
                height={24}
              />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
