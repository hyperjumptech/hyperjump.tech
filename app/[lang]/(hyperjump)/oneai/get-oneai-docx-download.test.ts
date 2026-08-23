import { describe, expect, it } from "vitest";

import {
  getOneaiDocxDownloadFileName,
  getOneaiDocxDownloadLink,
  getOneaiDocxPath,
  ONEAI_DOCX_PATHS
} from "./get-oneai-docx-download";

describe("ONEAI_DOCX_PATHS", () => {
  it("points to locale-specific public documents", () => {
    // Act
    const paths = ONEAI_DOCX_PATHS;

    // Assert
    expect(paths.en).toBe("/documents/oneai-leadership-memo-en.docx");
    expect(paths.id).toBe("/documents/oneai-leadership-memo-id.docx");
  });
});

describe("getOneaiDocxPath", () => {
  it("returns the English DOCX path", () => {
    // Act
    const path = getOneaiDocxPath("en");

    // Assert
    expect(path).toBe("/documents/oneai-leadership-memo-en.docx");
  });

  it("returns the Indonesian DOCX path", () => {
    // Act
    const path = getOneaiDocxPath("id");

    // Assert
    expect(path).toBe("/documents/oneai-leadership-memo-id.docx");
  });

  it("uses an injected path map when provided", () => {
    // Setup
    const docxPaths = {
      en: "/custom-en.docx",
      id: "/custom-id.docx"
    };

    // Act
    const path = getOneaiDocxPath("en", docxPaths);

    // Assert
    expect(path).toBe("/custom-en.docx");
  });
});

describe("getOneaiDocxDownloadFileName", () => {
  it("returns an English memo filename", () => {
    // Act
    const fileName = getOneaiDocxDownloadFileName({ lang: "en" });

    // Assert
    expect(fileName).toBe("OneAI-leadership-memo.docx");
  });

  it("returns an Indonesian memo filename", () => {
    // Act
    const fileName = getOneaiDocxDownloadFileName({ lang: "id" });

    // Assert
    expect(fileName).toBe("OneAI-memo-pimpinan.docx");
  });

  it("uses an injected filename loader when provided", () => {
    // Act
    const fileName = getOneaiDocxDownloadFileName({
      lang: "en",
      getFileName: () => "custom.docx"
    });

    // Assert
    expect(fileName).toBe("custom.docx");
  });
});

describe("getOneaiDocxDownloadLink", () => {
  it("returns English href and localized download filename", () => {
    // Act
    const link = getOneaiDocxDownloadLink({ lang: "en" });

    // Assert
    expect(link).toEqual({
      href: "/documents/oneai-leadership-memo-en.docx",
      download: "OneAI-leadership-memo.docx"
    });
  });

  it("returns Indonesian href and localized download filename", () => {
    // Act
    const link = getOneaiDocxDownloadLink({ lang: "id" });

    // Assert
    expect(link).toEqual({
      href: "/documents/oneai-leadership-memo-id.docx",
      download: "OneAI-memo-pimpinan.docx"
    });
  });

  it("uses injected loaders when provided", () => {
    // Act
    const link = getOneaiDocxDownloadLink({
      lang: "id",
      getFileName: () => "test.docx",
      docxPaths: { en: "/en.docx", id: "/id.docx" }
    });

    // Assert
    expect(link).toEqual({
      href: "/id.docx",
      download: "test.docx"
    });
  });
});
