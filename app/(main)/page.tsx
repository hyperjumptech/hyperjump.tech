import MainLangLayout from "./[lang]/layout";
import MainPage from "./[lang]/page";

export default function NoLangMain() {
  return (
    <MainLangLayout params={{ lang: "en" }}>
      <MainPage params={{ lang: "en" }} />
    </MainLangLayout>
  );
}
