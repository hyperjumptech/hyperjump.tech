import { describe, expect, it } from "vitest";

import { isExternalUrl } from "./is-external-url";

describe("isExternalUrl", () => {
  it("returns true for https URLs", () => {
    expect(isExternalUrl("https://example.com")).toBe(true);
  });

  it("returns true for http URLs", () => {
    expect(isExternalUrl("http://example.com/path")).toBe(true);
  });

  it("returns false for relative paths", () => {
    expect(isExternalUrl("/en/oneai")).toBe(false);
  });

  it("returns false for mailto links", () => {
    expect(isExternalUrl("mailto:test@example.com")).toBe(false);
  });
});
