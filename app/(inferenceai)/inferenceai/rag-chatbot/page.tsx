"use client";

import RagChatbotLangLayout from "./[lang]/layout";
import RagChatbotPage from "./[lang]/page";

export default function NoLangRagChatbot() {
  return (
    <RagChatbotLangLayout params={{ lang: "en" }}>
      <RagChatbotPage params={{ lang: "en" }} />
    </RagChatbotLangLayout>
  );
}
