import { describe, expect, it } from "vitest";

import {
  buildOneaiMailto,
  ONEAI_CONTACT_EMAIL
} from "./build-oneai-mailto";

describe("buildOneaiMailto", () => {
  it("builds a mailto link with default recipient and encoded query params", () => {
    const href = buildOneaiMailto({
      subject: "OneAI plan inquiry — up to 40 users",
      body: "Company:\nName:\n"
    });

    expect(href).toBe(
      `mailto:${ONEAI_CONTACT_EMAIL}?subject=${encodeURIComponent(
        "OneAI plan inquiry — up to 40 users"
      )}&body=${encodeURIComponent("Company:\nName:\n")}`
    );
  });

  it("uses a custom recipient when provided", () => {
    const href = buildOneaiMailto({
      subject: "Test",
      body: "Body",
      recipient: "custom@example.com"
    });

    expect(href.startsWith("mailto:custom@example.com?")).toBe(true);
  });

  it("encodes special characters in subject and body", () => {
    const href = buildOneaiMailto({
      subject: "Minat paket OneAI — hingga 40 pengguna",
      body: "Halo & selamat?"
    });

    expect(href).toContain(
      encodeURIComponent("Minat paket OneAI — hingga 40 pengguna")
    );
    expect(href).toContain(encodeURIComponent("Halo & selamat?"));
  });
});

describe("ONEAI_CONTACT_EMAIL", () => {
  it("points to the Hyperjump solutions inbox", () => {
    expect(ONEAI_CONTACT_EMAIL).toBe("solution@hyperjump.tech");
  });
});
