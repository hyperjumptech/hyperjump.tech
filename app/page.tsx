import { redirect } from "next/navigation";
import { supportedLanguages } from "@/locales/.generated/types";

export default function Index() {
  redirect(supportedLanguages[0]);
}
