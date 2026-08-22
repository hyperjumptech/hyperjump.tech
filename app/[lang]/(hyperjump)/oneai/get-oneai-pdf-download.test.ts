import { describe, expect, it } from "vitest";

import {
  getOneaiPdfDownloadFileName,
  getOneaiPdfDownloadLink,
  getOneaiPdfPath,
  ONEAI_PDF_PATHS
} from "./get-oneai-pdf-download";

describe("ONEAI_PDF_PATHS", () => {
  it("points to locale-specific public documents", () => {
    expect(ONEAI_PDF_PATHS.en).toBe("/documents/oneai-promo-en.pdf");
    expect(ONEAI_PDF_PATHS.id).toBe("/documents/oneai-promo-id.pdf");
  });
});

describe("getOneaiPdfPath", () => {
  it("returns the English PDF path", () => {
    expect(getOneaiPdfPath("en")).toBe("/documents/oneai-promo-en.pdf");
  });

  it("returns the Indonesian PDF path", () => {
    expect(getOneaiPdfPath("id")).toBe("/documents/oneai-promo-id.pdf");
  });

  it("uses an injected path map when provided", () => {
    expect(
      getOneaiPdfPath("en", {
        en: "/custom-en.pdf",
        id: "/custom-id.pdf"
      })
    ).toBe("/custom-en.pdf");
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
  it("returns English href and localized download filename", () => {
    expect(getOneaiPdfDownloadLink({ lang: "en" })).toEqual({
      href: "/documents/oneai-promo-en.pdf",
      download: "OneAI-overview.pdf"
    });
  });

  it("returns Indonesian href and localized download filename", () => {
    expect(getOneaiPdfDownloadLink({ lang: "id" })).toEqual({
      href: "/documents/oneai-promo-id.pdf",
      download: "OneAI-ringkasan.pdf"
    });
  });

  it("uses injected loaders when provided", () => {
    expect(
      getOneaiPdfDownloadLink({
        lang: "id",
        getFileName: () => "test.pdf",
        pdfPaths: { en: "/en.pdf", id: "/id.pdf" }
      })
    ).toEqual({
      href: "/id.pdf",
      download: "test.pdf"
    });
  });
});
