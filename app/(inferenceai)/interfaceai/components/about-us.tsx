import Image from "next/image";
import intefaceAIData from "../interfaceai-data.json";
import { GridItemsSection } from "./grid-items";

export default function AboutUs() {
  const { header, subheader, image } = intefaceAIData.aboutUs;

  return (
    <GridItemsSection id="about-us" title={header} description={subheader}>
      <div className="relative w-full mt-9 flex justify-center">
        <div className="relative w-full max-w-[1280px] aspect-[1280/603.7735595703125] rounded-[24.15px] overflow-hidden">
          <Image src={image} alt="image" fill className="object-cover" />
        </div>
      </div>
    </GridItemsSection>
  );
}
