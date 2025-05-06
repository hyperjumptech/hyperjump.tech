import InferenceAILangLayout from "./[lang]/layout";
import InferenceAIPage from "./[lang]/page";

export default function NoLangInferenceAI() {
  return (
    <InferenceAILangLayout params={Promise.resolve({ lang: "en" })}>
      <InferenceAIPage params={Promise.resolve({ lang: "en" })} />
    </InferenceAILangLayout>
  );
}
