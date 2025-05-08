import RagChatbotLangLayout from "./[lang]/layout";
import RagChatbotPage from "./[lang]/page";

export default function NoLangRagChatbot() {
  return (
    <RagChatbotLangLayout params={Promise.resolve({ lang: "en" })}>
      <RagChatbotPage params={Promise.resolve({ lang: "en" })} />
    </RagChatbotLangLayout>
  );
}
