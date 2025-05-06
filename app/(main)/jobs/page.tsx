import Jobs from "@/app/components/jobs";
import type { SupportedLanguage } from "@/locales/.generated/types";

type JobProps = {
  params: Promise<{ lang: SupportedLanguage }>;
};

export default async function Home({ params }: JobProps) {
  return <Jobs lang={(await params).lang} />;
}
