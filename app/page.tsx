"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const supportedLocales = ["en", "id"];

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    const userLang = navigator.language.slice(0, 2);
    const locale = supportedLocales.includes(userLang) ? userLang : "en";
    router.replace(`/${locale}`);
  }, [router]);

  return null;
}
