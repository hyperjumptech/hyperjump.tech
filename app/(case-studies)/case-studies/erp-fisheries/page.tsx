import ErpFisheriesLangLayout from "./[lang]/layout";
import ErpFisheriesPage from "./[lang]/page";

export default function NoLangErpFisheries() {
  return (
    <ErpFisheriesLangLayout params={Promise.resolve({ lang: "en" })}>
      <ErpFisheriesPage params={Promise.resolve({ lang: "en" })} />
    </ErpFisheriesLangLayout>
  );
}
