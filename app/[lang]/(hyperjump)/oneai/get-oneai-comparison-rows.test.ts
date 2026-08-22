import { describe, expect, it } from "vitest";

import {
  DEFAULT_ROW_LOADERS,
  DEFAULT_WHY_LOADERS,
  getOneaiComparisonRows,
  getOneaiComparisonWhy
} from "./get-oneai-comparison-rows";

describe("getOneaiComparisonRows", () => {
  it("returns ten localized rows for English", () => {
    const rows = getOneaiComparisonRows({ lang: "en" });

    expect(rows).toHaveLength(10);
    expect(rows[0]?.feature).toBe("20 users");
    expect(rows[9]?.oneai).toBe("Yes");
  });

  it("returns ten localized rows for Indonesian", () => {
    const rows = getOneaiComparisonRows({ lang: "id" });

    expect(rows).toHaveLength(10);
    expect(rows[0]?.feature).toBe("20 pengguna");
    expect(rows[1]?.oneai).toContain("harga tetap");
  });

  it("uses injected row loaders when provided", () => {
    const rows = getOneaiComparisonRows({
      lang: "en",
      rowLoaders: [
        {
          feature: () => "Feature A",
          stipend: () => "Stipend A",
          chatgpt: () => "ChatGPT A",
          oneai: () => "OneAI A"
        }
      ]
    });

    expect(rows).toEqual([
      {
        feature: "Feature A",
        stipend: "Stipend A",
        chatgpt: "ChatGPT A",
        oneai: "OneAI A"
      }
    ]);
  });

  it("exports default row loaders for each comparison row", () => {
    expect(DEFAULT_ROW_LOADERS).toHaveLength(10);
  });
});

describe("getOneaiComparisonWhy", () => {
  it("returns three localized explanation blocks for English", () => {
    const columns = getOneaiComparisonWhy({ lang: "en" });

    expect(columns).toHaveLength(3);
    expect(columns[0]?.title).toContain("Stipends");
    expect(columns[2]?.text).toContain("OneAI");
  });

  it("returns three localized explanation blocks for Indonesian", () => {
    const columns = getOneaiComparisonWhy({ lang: "id" });

    expect(columns).toHaveLength(3);
    expect(columns[1]?.title).toContain("Kursi");
  });

  it("uses injected why loaders when provided", () => {
    const columns = getOneaiComparisonWhy({
      lang: "en",
      whyLoaders: [{ title: () => "Title", text: () => "Body" }]
    });

    expect(columns).toEqual([{ title: "Title", text: "Body" }]);
  });

  it("exports default why loaders", () => {
    expect(DEFAULT_WHY_LOADERS).toHaveLength(3);
  });
});
