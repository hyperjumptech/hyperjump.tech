import { describe, expect, it } from "vitest";

import {
  DEFAULT_ROW_LOADERS,
  DEFAULT_WHY_LOADERS,
  getOneaiComparisonRows,
  getOneaiComparisonWhy,
  isNegativeComparisonValue
} from "./get-oneai-comparison-rows";

describe("isNegativeComparisonValue", () => {
  it("detects English negative values", () => {
    expect(isNegativeComparisonValue("No")).toBe(true);
    expect(isNegativeComparisonValue("Limited")).toBe(true);
    expect(isNegativeComparisonValue("Not ZDR")).toBe(true);
    expect(isNegativeComparisonValue("Depends on individual")).toBe(true);
  });

  it("detects Indonesian negative values", () => {
    expect(isNegativeComparisonValue("Tidak")).toBe(true);
    expect(isNegativeComparisonValue("Terbatas")).toBe(true);
    expect(isNegativeComparisonValue("Bukan ZDR")).toBe(true);
    expect(isNegativeComparisonValue("Tergantung orang")).toBe(true);
  });

  it("returns false for positive or neutral values", () => {
    expect(isNegativeComparisonValue("Yes · all models")).toBe(false);
    expect(isNegativeComparisonValue("Rp12,400,000")).toBe(false);
  });
});

describe("getOneaiComparisonRows", () => {
  it("returns ten localized rows for English", () => {
    const rows = getOneaiComparisonRows({ lang: "en" });

    expect(rows).toHaveLength(10);
    expect(rows[0]?.feature).toBe("20 users");
    expect(rows[0]?.advantage).toBeNull();
    expect(rows[1]?.advantage).toBe("price");
    expect(rows[9]?.oneai).toBe("Yes");
    expect(rows[9]?.advantage).toBe("capability");
  });

  it("returns ten localized rows for Indonesian", () => {
    const rows = getOneaiComparisonRows({ lang: "id" });

    expect(rows).toHaveLength(10);
    expect(rows[0]?.feature).toBe("20 pengguna");
    expect(rows[1]?.oneai).toContain("harga tetap");
    expect(rows[3]?.advantage).toBe("price");
  });

  it("uses injected row loaders when provided", () => {
    const rows = getOneaiComparisonRows({
      lang: "en",
      rowLoaders: [
        {
          feature: () => "Feature A",
          stipend: () => "Stipend A",
          chatgpt: () => "ChatGPT A",
          oneai: () => "OneAI A",
          advantage: "price"
        }
      ]
    });

    expect(rows).toEqual([
      {
        feature: "Feature A",
        stipend: "Stipend A",
        chatgpt: "ChatGPT A",
        oneai: "OneAI A",
        advantage: "price"
      }
    ]);
  });

  it("exports default row loaders for each comparison row", () => {
    expect(DEFAULT_ROW_LOADERS).toHaveLength(10);
    expect(
      DEFAULT_ROW_LOADERS.filter((row) => row.advantage === "price")
    ).toHaveLength(2);
    expect(
      DEFAULT_ROW_LOADERS.filter((row) => row.advantage === "capability")
    ).toHaveLength(7);
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
