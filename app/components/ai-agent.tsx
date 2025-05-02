"use client";

import { createChat } from "@n8n/chat";
import config from "@/lib/config";
import { useEffect } from "react";

import "@n8n/chat/style.css";
import "../styles/ai-agent.css";

export const AIAgent = () => {
  useEffect(() => {
    if (config.AI_AGENT_URL) {
      createChat({
        webhookUrl: config.AI_AGENT_URL,
        initialMessages: [
          `Hi there! 👋`,
          `I’m HyperBot — your guide to everything about Hyperjump: our services, success stories, and how we solve real tech problems.`,
          `To see how we can support you with your tech problems, just say: “Can Hyperjump help me with my tech problem?”`
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
    }
  }, []);

  return <></>;
};
