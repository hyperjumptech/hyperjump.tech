const AI_WORKSHOP_CONTACT_EMAIL = "solution@hyperjump.tech";

export type BuildAiWorkshopMailtoOptions = {
  /** Email subject line */
  subject: string;
  /** Prefilled message body */
  body: string;
  /** Recipient address; defaults to solution@hyperjump.tech */
  recipient?: string;
};

/**
 * Builds a mailto URL for AI workshop inquiries with encoded subject and body.
 *
 * @param options - Subject, body, and optional recipient override
 * @returns Encoded mailto href ready for anchor elements
 */
export function buildAiWorkshopMailto({
  subject,
  body,
  recipient = AI_WORKSHOP_CONTACT_EMAIL
}: BuildAiWorkshopMailtoOptions): string {
  return `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export { AI_WORKSHOP_CONTACT_EMAIL };
