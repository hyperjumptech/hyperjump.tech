import {
  NavContainer,
  HyperjumpLogo,
  RightNavItems,
} from "@/app/components/nav";
import StickyNavigation from "@/app/components/sticky-nav";
import LanguagePicker from "./language-picker";
import { SupportedLanguage } from "@/locales/.generated/types";

export default function Nav({ lang }: { lang: SupportedLanguage }) {
  return (
    <StickyNavigation>
      <NavContainer>
        <HyperjumpLogo />

        <RightNavItems>
          <li className="mr-3">
            <LanguagePicker lang={lang} />
          </li>
        </RightNavItems>
      </NavContainer>

      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </StickyNavigation>
  );
}
