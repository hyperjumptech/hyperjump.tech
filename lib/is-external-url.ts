/**
 * Returns whether a URL should open in a new tab (external http/https).
 *
 * @param url - Absolute or site-relative URL
 * @returns True when the URL is an external http(s) link
 */
export function isExternalUrl(url: string): boolean {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return true;
  }

  return false;
}
