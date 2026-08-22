const ONEAI_CONTACT_EMAIL = "solution@hyperjump.tech";

export type BuildOneaiMailtoOptions = {
  /** Email subject line */
  subject: string;
  /** Prefilled message body */
  body: string;
  /** Recipient address; defaults to solution@hyperjump.tech */
  recipient?: string;
};

/**
 * Builds a mailto URL for OneAI plan inquiries with encoded subject and body.
 *
 * @param options - Subject, body, and optional recipient override
 * @returns Encoded mailto href ready for anchor elements
 */
export function buildOneaiMailto({
  subject,
  body,
  recipient = ONEAI_CONTACT_EMAIL
}: BuildOneaiMailtoOptions): string {
  return `mailto:${recipient}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
}

export { ONEAI_CONTACT_EMAIL };
