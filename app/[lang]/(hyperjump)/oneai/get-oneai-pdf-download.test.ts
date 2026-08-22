import { describe, expect, it } from "vitest";

import {
  getOneaiPdfDownloadFileName,
  getOneaiPdfDownloadLink,
  ONEAI_PDF_PATH
} from "./get-oneai-pdf-download";

describe("ONEAI_PDF_PATH", () => {
  it("points to the public documents folder", () => {
    expect(ONEAI_PDF_PATH).toBe("/documents/oneai-promo.pdf");
  });
});

describe("getOneaiPdfDownloadFileName", () => {
  it("returns an English overview filename", () => {
    expect(getOneaiPdfDownloadFileName({ lang: "en" })).toBe(
      "OneAI-overview.pdf"
    );
  });

  it("returns an Indonesian overview filename", () => {
    expect(getOneaiPdfDownloadFileName({ lang: "id" })).toBe(
      "OneAI-ringkasan.pdf"
    );
  });

  it("uses an injected filename loader when provided", () => {
    expect(
      getOneaiPdfDownloadFileName({
        lang: "en",
        getFileName: () => "custom.pdf"
      })
    ).toBe("custom.pdf");
  });
});

describe("getOneaiPdfDownloadLink", () => {
  it("returns href and localized download filename", () => {
    expect(getOneaiPdfDownloadLink({ lang: "en" })).toEqual({
      href: ONEAI_PDF_PATH,
      download: "OneAI-overview.pdf"
    });
  });

  it("uses an injected filename loader when provided", () => {
    expect(
      getOneaiPdfDownloadLink({
        lang: "id",
        getFileName: () => "test.pdf"
      })
    ).toEqual({
      href: ONEAI_PDF_PATH,
      download: "test.pdf"
    });
  });
});
