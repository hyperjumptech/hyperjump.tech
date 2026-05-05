import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { supportedLanguages } from "@/locales/.generated/types";
import data from "@/data.json";

const { url } = data;

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true
  },
  alternates: {
    canonical: `${url}/${supportedLanguages[0]}/searchpoint`
  }
};

export default function Page() {
  redirect(`/${supportedLanguages[0]}/searchpoint`);
}
