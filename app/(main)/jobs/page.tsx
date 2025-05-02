import Jobs from "@/app/components/jobs";
import { SupportedLanguage } from "@/locales/.generated/types";

export default function Home({
  params
}: {
  params: { lang: SupportedLanguage };
}) {
  const lang = params.lang;

  return (
    <>
      <Jobs lang={lang} />
    </>
  );
}
