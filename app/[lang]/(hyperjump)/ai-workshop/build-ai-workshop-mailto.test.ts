import { describe, expect, it } from "vitest";

import {
  AI_WORKSHOP_CONTACT_EMAIL,
  buildAiWorkshopMailto
} from "./build-ai-workshop-mailto";

describe("buildAiWorkshopMailto", () => {
  it("builds a mailto link with default recipient and encoded query params", () => {
    // Setup
    const subject = "AI workshop inquiry";
    const body = "Company:\nName:\n";

    // Act
    const href = buildAiWorkshopMailto({ subject, body });

    // Assert
    expect(href).toBe(
      `mailto:${AI_WORKSHOP_CONTACT_EMAIL}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`
    );
  });

  it("uses a custom recipient when provided", () => {
    // Act
    const href = buildAiWorkshopMailto({
      subject: "Test",
      body: "Body",
      recipient: "custom@example.com"
    });

    // Assert
    expect(href.startsWith("mailto:custom@example.com?")).toBe(true);
  });

  it("encodes special characters in subject and body", () => {
    // Setup
    const subject = "Minat workshop AI: 8–15 orang";
    const body = "Halo & selamat?";

    // Act
    const href = buildAiWorkshopMailto({ subject, body });

    // Assert
    expect(href).toContain(encodeURIComponent(subject));
    expect(href).toContain(encodeURIComponent(body));
  });
});

describe("AI_WORKSHOP_CONTACT_EMAIL", () => {
  it("points to the Hyperjump solutions inbox", () => {
    // Act
    const email = AI_WORKSHOP_CONTACT_EMAIL;

    // Assert
    expect(email).toBe("solution@hyperjump.tech");
  });
});
