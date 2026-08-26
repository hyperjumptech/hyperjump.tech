import { describe, expect, it } from "vitest";

import {
  getAiWorkshopAudience,
  getAiWorkshopFeedback,
  getAiWorkshopLogistics,
  getAiWorkshopOutcomes,
  getAiWorkshopProofs,
  getAiWorkshopSessions,
  getAiWorkshopStarIndexes,
  getAiWorkshopStarRatingLabel,
  getDefaultAiWorkshopFaqs
} from "./get-ai-workshop-content";

describe("getAiWorkshopProofs", () => {
  it("returns three English proof lines about typing, real work, and catching failures", () => {
    // Act
    const proofs = getAiWorkshopProofs({ lang: "en" });

    // Assert
    expect(proofs).toHaveLength(3);
    expect(proofs[0]).toContain("Everyone types");
    expect(proofs[1]).toContain("actual work");
    expect(proofs[2]).toContain("failures");
  });

  it("returns Indonesian proof lines when locale is id", () => {
    // Act
    const proofs = getAiWorkshopProofs({ lang: "id" });

    // Assert
    expect(proofs[0]).toContain("mengetik");
    expect(proofs[1]).toContain("kerja Anda");
  });

  it("uses injected loaders instead of locale defaults", () => {
    // Act
    const proofs = getAiWorkshopProofs({
      lang: "en",
      loaders: [() => "Custom proof"]
    });

    // Assert
    expect(proofs).toEqual(["Custom proof"]);
  });
});

describe("getAiWorkshopLogistics", () => {
  it("returns four English logistics items including laptop and a free-tier login", () => {
    // Act
    const items = getAiWorkshopLogistics({ lang: "en" });

    // Assert
    expect(items).toHaveLength(4);
    expect(items[0]).toContain("laptop");
    expect(items[1]).toContain("Free tier");
  });

  it("returns Indonesian logistics copy", () => {
    // Act
    const items = getAiWorkshopLogistics({ lang: "id" });

    // Assert
    expect(items[0]).toContain("Laptop");
    expect(items[1]).toContain("gratis");
  });
});

describe("getAiWorkshopAudience", () => {
  it("returns three English audience blocks", () => {
    // Act
    const audience = getAiWorkshopAudience({ lang: "en" });

    // Assert
    expect(audience).toHaveLength(3);
    expect(audience[0]?.title).toBe("Leadership teams");
    expect(audience[1]?.title).toContain("ChatGPT");
  });

  it("returns Indonesian audience titles", () => {
    // Act
    const audience = getAiWorkshopAudience({ lang: "id" });

    // Assert
    expect(audience[0]?.title).toBe("Tim pimpinan");
  });
});

describe("getAiWorkshopOutcomes", () => {
  it("returns three English outcomes including personal AI rules", () => {
    // Act
    const outcomes = getAiWorkshopOutcomes({ lang: "en" });

    // Assert
    expect(outcomes).toHaveLength(3);
    expect(outcomes[1]?.title).toContain("own rules");
  });

  it("returns Indonesian outcome titles", () => {
    // Act
    const outcomes = getAiWorkshopOutcomes({ lang: "id" });

    // Assert
    expect(outcomes[1]?.title).toContain("Aturan Anda sendiri");
  });
});

describe("getAiWorkshopFeedback", () => {
  it("returns the English participant quote with an anonymous role", () => {
    // Act
    const feedback = getAiWorkshopFeedback({ lang: "en" });

    // Assert
    expect(feedback).toHaveLength(1);
    expect(feedback[0]?.quote).toContain("understanding and knowledge of AI");
    expect(feedback[0]?.credit).toBe(
      "Head of Education of a prominent charity foundation"
    );
    expect(feedback[0]?.credit).not.toMatch(/Agustina|Eka Tjipta/i);
    expect(feedback[0]?.rating).toBe(5);
  });

  it("returns the Indonesian participant quote with an anonymous role", () => {
    // Act
    const feedback = getAiWorkshopFeedback({ lang: "id" });

    // Assert
    expect(feedback).toHaveLength(1);
    expect(feedback[0]?.quote).toContain("pemahaman dan pengetahuan kami");
    expect(feedback[0]?.credit).toBe(
      "Kepala Pendidikan sebuah yayasan amal terkemuka"
    );
    expect(feedback[0]?.credit).not.toMatch(/Agustina|Eka Tjipta/i);
  });

  it("uses injected feedback loaders", () => {
    // Act
    const feedback = getAiWorkshopFeedback({
      lang: "en",
      loaders: [
        {
          quote: () => "Quoted",
          credit: () => "Credit"
        }
      ]
    });

    // Assert
    expect(feedback).toEqual([
      { quote: "Quoted", credit: "Credit", rating: 5 }
    ]);
  });
});

describe("getAiWorkshopStarIndexes", () => {
  it("returns five indexes for a five-star rating", () => {
    // Act
    const indexes = getAiWorkshopStarIndexes({ rating: 5 });

    // Assert
    expect(indexes).toEqual([0, 1, 2, 3, 4]);
  });

  it("clamps ratings above the maximum", () => {
    // Act
    const indexes = getAiWorkshopStarIndexes({ rating: 9, max: 5 });

    // Assert
    expect(indexes).toHaveLength(5);
  });
});

describe("getAiWorkshopStarRatingLabel", () => {
  it("returns English and Indonesian accessible labels", () => {
    // Act / Assert
    expect(getAiWorkshopStarRatingLabel({ lang: "en", rating: 5 })).toBe(
      "5 out of 5 stars"
    );
    expect(getAiWorkshopStarRatingLabel({ lang: "id", rating: 5 })).toBe(
      "5 dari 5 bintang"
    );
  });
});

describe("getAiWorkshopSessions", () => {
  it("returns four English sessions with kickers and durations", () => {
    // Act
    const sessions = getAiWorkshopSessions({ lang: "en" });

    // Assert
    expect(sessions).toHaveLength(4);
    expect(sessions[0]?.kicker).toBe("Session 1");
    expect(sessions[0]?.title).toContain("really work");
    expect(sessions[3]?.kicker).toBe("Session 4");
    expect(sessions[3]?.title).toBe("Your work");
  });

  it("returns Indonesian session kickers", () => {
    // Act
    const sessions = getAiWorkshopSessions({ lang: "id" });

    // Assert
    expect(sessions).toHaveLength(4);
    expect(sessions[0]?.kicker).toBe("Sesi 1");
    expect(sessions[3]?.kicker).toBe("Sesi 4");
  });

  it("uses injected session loaders", () => {
    // Act
    const sessions = getAiWorkshopSessions({
      lang: "en",
      loaders: [
        {
          kicker: () => "S",
          title: () => "T",
          duration: () => "D",
          text: () => "X"
        }
      ]
    });

    // Assert
    expect(sessions).toEqual([
      { kicker: "S", title: "T", duration: "D", text: "X" }
    ]);
  });
});

describe("getDefaultAiWorkshopFaqs", () => {
  it("returns six English FAQ entries covering tools, format, and language", () => {
    // Act
    const faqs = getDefaultAiWorkshopFaqs({ lang: "en" });

    // Assert
    expect(faqs).toHaveLength(6);
    expect(faqs[0]?.question).toContain("buy a tool");
    expect(faqs[0]?.answer).toContain("ChatGPT");
    expect(faqs[2]?.answer).toContain("two hands-on half-days");
    expect(faqs[2]?.answer).not.toMatch(/follow-up/i);
    expect(faqs[5]?.question).toContain("remote");
    expect(faqs[5]?.answer).toContain("in person");
  });

  it("returns Indonesian FAQ copy", () => {
    // Act
    const faqs = getDefaultAiWorkshopFaqs({ lang: "id" });

    // Assert
    expect(faqs[0]?.question).toContain("tool");
    expect(faqs[5]?.question).toContain("daring");
    expect(faqs[5]?.answer).toContain("tatap muka");
  });
});
