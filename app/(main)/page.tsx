import MainLangLayout from "./[lang]/layout";
import MainPage from "./[lang]/page";

export default function NoLangMain() {
  return (
    <MainLangLayout params={Promise.resolve({ lang: "en" })}>
      <MainPage params={Promise.resolve({ lang: "en" })} />
    </MainLangLayout>
  );
}
