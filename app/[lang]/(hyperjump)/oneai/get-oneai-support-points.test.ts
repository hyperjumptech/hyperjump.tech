import { describe, expect, it } from "vitest";

import {
  getOneaiSupportPoints,
  ONEAI_SUPPORT_IMAGE_PATH
} from "./get-oneai-support-points";

describe("ONEAI_SUPPORT_IMAGE_PATH", () => {
  it("points to the public support photo", () => {
    // Act
    const path = ONEAI_SUPPORT_IMAGE_PATH;

    // Assert
    expect(path).toBe("/images/oneai/support-engineers.jpg");
  });
});

describe("getOneaiSupportPoints", () => {
  it("returns three English proof points", () => {
    // Act
    const points = getOneaiSupportPoints({ lang: "en" });

    // Assert
    expect(points).toHaveLength(3);
    expect(points[0]).toEqual({
      title: "Same timezone, same workday",
      text: "Replies during Indonesian office hours, not after your team has gone home."
    });
    expect(points[1]?.title).toContain("Bahasa Indonesia");
    expect(points[2]?.title).toContain("On-site");
  });

  it("returns three Indonesian proof points", () => {
    // Act
    const points = getOneaiSupportPoints({ lang: "id" });

    // Assert
    expect(points).toHaveLength(3);
    expect(points[0]?.title).toContain("Zona waktu");
    expect(points[1]?.title).toContain("Bahasa Indonesia");
    expect(points[2]?.title).toContain("kantor");
  });

  it("uses injected point loaders when provided", () => {
    // Act
    const points = getOneaiSupportPoints({
      lang: "en",
      pointLoaders: [
        { title: () => "Title A", text: () => "Text A" },
        { title: () => "Title B", text: () => "Text B" }
      ]
    });

    // Assert
    expect(points).toEqual([
      { title: "Title A", text: "Text A" },
      { title: "Title B", text: "Text B" }
    ]);
  });

  it("returns an empty list when no loaders are provided", () => {
    // Act
    const points = getOneaiSupportPoints({ lang: "en", pointLoaders: [] });

    // Assert
    expect(points).toEqual([]);
  });
});
