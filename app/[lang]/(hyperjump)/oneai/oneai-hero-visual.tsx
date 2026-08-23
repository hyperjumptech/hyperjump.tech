import Image from "next/image";

import type { SupportedLanguage } from "@/locales/.generated/types";
import {
  oneaiHeroVisualAdminLabel,
  oneaiHeroVisualChatLabel
} from "@/locales/.generated/strings";

type OneaiHeroVisualProps = {
  lang: SupportedLanguage;
  productName: string;
};

/**
 * Hero product shots shown side by side: admin dashboard and team chat.
 *
 * @param props - Locale for captions and product name for alt text
 */
export function OneaiHeroVisual({ lang, productName }: OneaiHeroVisualProps) {
  const chatLabel = oneaiHeroVisualChatLabel(lang);
  const adminLabel = oneaiHeroVisualAdminLabel(lang);

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3 lg:gap-4"
      data-testid="oneai-hero-visual">
      <div className="overflow-hidden rounded-2xl border border-white/20 bg-[#0d1117] shadow-2xl ring-1 shadow-black/40 ring-[#635BFF]/30">
        <div className="border-b border-white/10 bg-white/5 px-3 py-2">
          <span className="text-[11px] font-semibold tracking-wide text-white/80 uppercase">
            {adminLabel}
          </span>
        </div>
        <Image
          src="/images/oneai/avenu-dashboard.png"
          alt={`${productName}: ${adminLabel}`}
          width={1200}
          height={720}
          className="h-auto w-full"
          priority
        />
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/15 bg-white shadow-2xl shadow-black/35">
        <div className="border-b border-black/5 bg-[#F6F8F9] px-3 py-2">
          <span className="text-hyperjump-black text-[11px] font-semibold tracking-wide uppercase">
            {chatLabel}
          </span>
        </div>
        <Image
          src="/images/oneai/startgpt-chat.png"
          alt={`${productName}: ${chatLabel}`}
          width={1200}
          height={720}
          className="h-auto w-full"
          priority
        />
      </div>
    </div>
  );
}
