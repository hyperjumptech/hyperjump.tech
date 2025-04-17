"use client";

import ClientOnly from "./client-only";

const messages = [
  "👨‍💻 Suka ngoprek JavaScript/CSS/TypeScript/Node.js/React/Vue.js/Kotlin/Go/Swift?",
  "🏃‍♂️‍➡️ Pengen maju bersama tukang coding yang menggandrungi dunia open-source?",
  "👨‍🔬 Ingin eksplorasi teknologi keren kayak CI/CD, Docker, microservice, dkk?",
  "✅ UDAH DEH: Gabung kita aja",
  "👉 https://hyperjump.tech/jobs"
];

export default function Console() {
  return (
    <ClientOnly>
      <Print />
    </ClientOnly>
  );
}

const Print = () => {
  const style =
    "background-color: darkblue; color: white; font-style: italic; border: 5px solid hotpink; font-size: 2em;";
  console.log(`%cHalo Hacker!`, style);
  const style2 = "background-color: black; color: white; ";
  messages.forEach((message) => {
    console.log(`%c${message}`, style2);
  });
  return null;
};
