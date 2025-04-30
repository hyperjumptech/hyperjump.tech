"use client";

import { createChat } from "@n8n/chat";
import config from "@/lib/config";
import { useEffect } from "react";

import "@n8n/chat/style.css";
import "../styles/ai-agent.css";

export const AIAgent = () => {
  useEffect(() => {
    createChat({
      webhookUrl: config.AI_AGENT_URL,
      initialMessages: [
        `Hello! 👋`,
        `I'm HyperBot, here to help you learn more about Hyperjump - including our services, case studies, and how we can assist with your tech challenges`,
        `How can I assist you today?`
      ],
      showWelcomeScreen: false,
      // Currently, only EN is supported.
      i18n: {
        en: {
          title: "Hi there! 👋",
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: "",
          getStarted: "New Conversation",
          inputPlaceholder: "Type your question...",
          closeButtonTooltip: "Close"
        }
      }
    });
  }, []);

  return <></>;
};
