import CTOAsAServiceLangLayout from "./[lang]/layout";
import CTOAsAServicePage from "./[lang]/page";

export default function NoLangCTOAsAService() {
  return (
    <CTOAsAServiceLangLayout params={Promise.resolve({ lang: "en" })}>
      <CTOAsAServicePage params={Promise.resolve({ lang: "en" })} />
    </CTOAsAServiceLangLayout>
  );
}
