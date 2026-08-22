import { describe, expect, it } from "vitest";

import data from "@/data.json";

import { DEFAULT_OPENGRAPH, dynamicOpengraph } from "./default-metadata";

const { title, url } = data;

describe("dynamicOpengraph", () => {
  it("uses the default OG image when no override is provided", () => {
    const meta = dynamicOpengraph({
      title: "Custom title",
      description: "Custom description"
    });

    expect(meta.title).toBe("Custom title");
    expect(meta.description).toBe("Custom description");
    expect(meta.openGraph?.images).toEqual({
      url: `${url}/images/hyperjump-og.png`,
      width: 1200,
      height: 630,
      alt: "Custom title"
    });
    expect(meta.twitter?.images).toEqual({
      url: `${url}/images/hyperjump-og.png`,
      width: 1200,
      height: 630,
      alt: "Custom title"
    });
  });

  it("falls back to site defaults when title and description are omitted", () => {
    const meta = dynamicOpengraph({});

    expect(meta.title).toBe(title);
    expect(meta.description).toBe(DEFAULT_OPENGRAPH.description);
  });

  it("uses a custom image when provided", () => {
    const customImage = {
      url: `${url}/images/oneai/og.png`,
      width: 1200,
      height: 630,
      alt: "OneAI"
    };

    const meta = dynamicOpengraph({
      title: "OneAI",
      description: "Enterprise AI",
      image: customImage
    });

    expect(meta.openGraph?.images).toEqual(customImage);
    expect(meta.twitter?.images).toEqual(customImage);
  });

  it("preserves page-specific alternates and openGraph fields", () => {
    const alternates = {
      canonical: `${url}/en/oneai`,
      languages: { en: `${url}/en/oneai`, id: `${url}/id/oneai` }
    };

    const meta = dynamicOpengraph({
      title: "OneAI",
      description: "Enterprise AI",
      alternates,
      openGraph: {
        url: `${url}/en/oneai`,
        locale: "en_US"
      }
    });

    expect(meta.alternates).toEqual(alternates);
    expect(meta.openGraph?.url).toBe(`${url}/en/oneai`);
    expect(meta.openGraph?.locale).toBe("en_US");
  });
});
