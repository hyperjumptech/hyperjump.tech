import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  AI_WORKSHOP_FACILITATOR_IMAGE_PATH,
  AI_WORKSHOP_OG_IMAGE_HEIGHT,
  AI_WORKSHOP_OG_IMAGE_PATH,
  AI_WORKSHOP_OG_IMAGE_PATHS,
  AI_WORKSHOP_OG_IMAGE_WIDTH,
  AI_WORKSHOP_PARTICIPANTS_IMAGE_PATH,
  AI_WORKSHOP_ROOM_IMAGE_PATH,
  getAiWorkshopFacilitatorPhoto,
  getAiWorkshopOgImage,
  getAiWorkshopOgImagePath,
  getAiWorkshopParticipantsPhoto,
  getAiWorkshopRoomPhoto,
  getAiWorkshopStructuredImages
} from "./get-ai-workshop-assets";

/**
 * Reads width and height from a PNG file's IHDR chunk.
 *
 * @param buffer - PNG file bytes
 * @returns Pixel dimensions
 */
function getPngSize(buffer: Buffer) {
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

describe("getAiWorkshopFacilitatorPhoto", () => {
  it("returns the facilitator JPEG path and native dimensions", () => {
    // Act
    const photo = getAiWorkshopFacilitatorPhoto();

    // Assert
    expect(photo).toEqual({
      src: AI_WORKSHOP_FACILITATOR_IMAGE_PATH,
      width: 1024,
      height: 768
    });
  });
});

describe("getAiWorkshopParticipantsPhoto", () => {
  it("returns the participants JPEG path and native dimensions", () => {
    // Act
    const photo = getAiWorkshopParticipantsPhoto();

    // Assert
    expect(photo).toEqual({
      src: AI_WORKSHOP_PARTICIPANTS_IMAGE_PATH,
      width: 1024,
      height: 769
    });
  });
});

describe("getAiWorkshopRoomPhoto", () => {
  it("returns the room JPEG path and native dimensions", () => {
    // Act
    const photo = getAiWorkshopRoomPhoto();

    // Assert
    expect(photo).toEqual({
      src: AI_WORKSHOP_ROOM_IMAGE_PATH,
      width: 1024,
      height: 576
    });
  });
});

describe("AI_WORKSHOP_OG_IMAGE_PATH", () => {
  it("points to a 1200x630 PNG in public/", () => {
    // Setup
    expect(AI_WORKSHOP_OG_IMAGE_PATH).toBe("/images/ai-workshop/og.png");
    const ogPng = readFileSync(
      join(
        process.cwd(),
        "public",
        AI_WORKSHOP_OG_IMAGE_PATH.replace(/^\//, "")
      )
    );

    // Act
    const size = getPngSize(ogPng);

    // Assert
    expect(size).toEqual({
      width: AI_WORKSHOP_OG_IMAGE_WIDTH,
      height: AI_WORKSHOP_OG_IMAGE_HEIGHT
    });
  });

  it("ships locale-specific 1200x630 Open Graph cards", () => {
    // Act / Assert
    for (const path of Object.values(AI_WORKSHOP_OG_IMAGE_PATHS)) {
      const png = readFileSync(
        join(process.cwd(), "public", path.replace(/^\//, ""))
      );
      expect(getPngSize(png)).toEqual({ width: 1200, height: 630 });
    }
  });

  it("reads IHDR dimensions from a PNG buffer", () => {
    // Setup
    const png = Buffer.alloc(24);
    png.writeUInt32BE(1600, 16);
    png.writeUInt32BE(900, 20);

    // Act
    const size = getPngSize(png);

    // Assert
    expect(size).toEqual({ width: 1600, height: 900 });
  });
});

describe("getAiWorkshopOgImagePath", () => {
  it("returns the English card for en and the Indonesian card for id", () => {
    // Act / Assert
    expect(getAiWorkshopOgImagePath("en")).toBe(
      "/images/ai-workshop/og-en.png"
    );
    expect(getAiWorkshopOgImagePath("id")).toBe(
      "/images/ai-workshop/og-id.png"
    );
  });
});

describe("getAiWorkshopOgImage", () => {
  it("returns an absolute 1200x630 image for the active locale", () => {
    // Act
    const image = getAiWorkshopOgImage({
      lang: "id",
      siteUrl: "https://hyperjump.tech",
      alt: "Workshop AI"
    });

    // Assert
    expect(image).toEqual({
      url: "https://hyperjump.tech/images/ai-workshop/og-id.png",
      width: 1200,
      height: 630,
      alt: "Workshop AI"
    });
  });
});

describe("getAiWorkshopStructuredImages", () => {
  it("lists the OG card first, then the three workshop photos", () => {
    // Act
    const images = getAiWorkshopStructuredImages({
      lang: "en",
      siteUrl: "https://hyperjump.tech"
    });

    // Assert
    expect(images[0]).toBe(
      "https://hyperjump.tech/images/ai-workshop/og-en.png"
    );
    expect(images).toHaveLength(4);
    expect(images[1]).toContain(AI_WORKSHOP_FACILITATOR_IMAGE_PATH);
    expect(images[2]).toContain(AI_WORKSHOP_PARTICIPANTS_IMAGE_PATH);
    expect(images[3]).toContain(AI_WORKSHOP_ROOM_IMAGE_PATH);
  });
});
