import { describe, expect, it } from "vitest";

import { AI_WORKSHOP_OG_IMAGE_PATHS } from "./get-ai-workshop-assets";
import { getAiWorkshopJsonLd } from "./get-ai-workshop-json-ld";

describe("getAiWorkshopJsonLd", () => {
  const siteUrl = "https://hyperjump.tech";
  const pageUrl = `${siteUrl}/en/ai-workshop`;

  it("builds breadcrumb, webpage, course, and FAQ graphs without a price offer", () => {
    // Act
    const graph = getAiWorkshopJsonLd({
      lang: "en",
      pageUrl,
      siteUrl,
      getTitle: () => "Hands-on AI Workshop | Hyperjump",
      getCourseName: () => "Hands-on AI Workshop",
      getDescription: () => "An in-person workshop.",
      getImages: () => [
        `${siteUrl}${AI_WORKSHOP_OG_IMAGE_PATHS.en}`,
        `${siteUrl}/images/ai-workshop/facilitator.jpg`
      ],
      getFaqs: () => [
        { question: "Q1", answer: "A1" },
        { question: "Q2", answer: "A2" }
      ]
    });

    // Assert
    expect(graph["@graph"]).toHaveLength(4);

    const breadcrumb = graph["@graph"][0];
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
    expect(breadcrumb.itemListElement?.[0]?.name).toBe("Home");
    expect(breadcrumb.itemListElement).toHaveLength(2);

    const webPage = graph["@graph"][1];
    expect(webPage["@type"]).toBe("WebPage");
    expect(webPage.primaryImageOfPage?.url).toBe(
      `${siteUrl}${AI_WORKSHOP_OG_IMAGE_PATHS.en}`
    );
    expect(webPage.primaryImageOfPage?.width).toBe(1200);

    const course = graph["@graph"][2];
    expect(course["@type"]).toBe("Course");
    expect(course.name).toBe("Hands-on AI Workshop");
    expect(course.inLanguage).toBe("en");
    expect(course.image).toEqual([
      `${siteUrl}${AI_WORKSHOP_OG_IMAGE_PATHS.en}`,
      `${siteUrl}/images/ai-workshop/facilitator.jpg`
    ]);
    expect(course.provider?.name).toBe("Hyperjump Technology");
    expect(course.provider?.logo).toContain("hyperjump-colored.png");
    expect(course.hasCourseInstance?.courseMode).toBe("Onsite");
    expect(course).not.toHaveProperty("offers");

    const faqPage = graph["@graph"][3];
    expect(faqPage["@type"]).toBe("FAQPage");
    expect(faqPage.mainEntity).toHaveLength(2);
  });

  it("uses Indonesian breadcrumb and language labels for id locale", () => {
    // Act
    const graph = getAiWorkshopJsonLd({
      lang: "id",
      pageUrl: `${siteUrl}/id/ai-workshop`,
      siteUrl
    });

    // Assert
    const breadcrumb = graph["@graph"][0];
    expect(breadcrumb.itemListElement?.[0]?.name).toBe("Beranda");
    expect(graph["@graph"][1].inLanguage).toBe("id");
    expect(graph["@graph"][2].inLanguage).toBe("id");
    expect(graph["@graph"][2].image?.[0]).toContain("og-id.png");
  });
});
