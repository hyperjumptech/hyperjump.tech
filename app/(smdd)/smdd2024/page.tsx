import SmddLangLayout from "./[lang]/layout";
import Home from "./[lang]/page";

export default function NoLangSmdd2024() {
  return (
    <SmddLangLayout params={Promise.resolve({ lang: "en" })}>
      <Home params={Promise.resolve({ lang: "en" })} />
    </SmddLangLayout>
  );
}
