"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";

type Theme = "light" | "dark";

type LightboxState =
  | { isOpen: false }
  | { isOpen: true; src: string; alt: string };

const IMAGE_BASE = "/images/searchpoint";

const IMAGES = {
  feature1: `${IMAGE_BASE}/feature-sp-1-trimmed.webp`,
  feature2: `${IMAGE_BASE}/feature-sp-2-trimmed.webp`,
  related: `${IMAGE_BASE}/sp-3.png.webp`,
  autoOrg: `${IMAGE_BASE}/sp-4.png.webp`,
  manualOrg: `${IMAGE_BASE}/sp-5.png.webp`,
  connects: `${IMAGE_BASE}/sp-connects.png.webp`,
  noWarehouse: `${IMAGE_BASE}/sp-6.png.webp`,
  permissions: `${IMAGE_BASE}/sp-7.png.webp`,
  onPrem: `${IMAGE_BASE}/sp-8.png.webp`
} as const;

function getInitialTheme(): Theme {
  try {
    const stored = localStorage.getItem("searchpoint-theme");
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // ignore
  }

  const prefersLight =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-color-scheme: light)").matches;
  return prefersLight ? "light" : "dark";
}

function setHtmlTheme(theme: Theme) {
  document.documentElement.setAttribute("data-searchpoint-theme", theme);
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem("searchpoint-theme", theme);
  } catch {
    // ignore
  }
}

export function SearchpointPage() {
  const lightboxId = useId();
  const lightboxRef = useRef<HTMLDivElement | null>(null);
  const lightboxImgRef = useRef<HTMLImageElement | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [lightbox, setLightbox] = useState<LightboxState>({ isOpen: false });
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const initial = getInitialTheme();
    setTheme(initial);
    setHtmlTheme(initial);
  }, []);

  useEffect(() => {
    setHtmlTheme(theme);
    persistTheme(theme);
  }, [theme]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      setLightbox({ isOpen: false });
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!lightbox.isOpen) {
      document.body.classList.remove("searchpoint-lightbox-open");
      return;
    }

    document.body.classList.add("searchpoint-lightbox-open");
    const t = window.setTimeout(() => lightboxRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [lightbox.isOpen]);

  const themeToggleLabel =
    theme === "light" ? "Switch to dark mode" : "Switch to light mode";

  const inquiryMailtoHref = useMemo(() => {
    const to = "solution@hyperjump.tech";
    const subject = "SearchPoint Inquiry";
    const body =
      "Hi, I'm interested in SearchPoint and would like to see the demo.\n\nName:\nCompany:\nPhone:\nPrefered date time:";

    return `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, []);

  function openLightbox(src: string, alt: string) {
    setLightbox({ isOpen: true, src, alt });
  }

  function closeLightbox() {
    setLightbox({ isOpen: false });
  }

  return (
    <div className="searchpoint-root">
      <style jsx global>{`
        :root {
          color-scheme: dark;
          --sp-bg: #0a0b0d;
          --sp-surface: #12151c;
          --sp-border: rgba(255, 255, 255, 0.08);
          --sp-text: #eceef2;
          --sp-muted: #939aad;
          --sp-accent: #4a9d86;
          --sp-accent-btn: #3d7f6e;
          --sp-btn-primary-fg: #f8fcfa;
          --sp-btn-primary-hover-bg: #458f7c;
          --sp-btn-primary-border: rgba(255, 255, 255, 0.1);
          --sp-btn-ghost-hover-border: rgba(255, 255, 255, 0.15);
          --sp-feature-slot-dash: rgba(255, 255, 255, 0.12);
          --sp-inset-highlight: rgba(255, 255, 255, 0.04);
          --sp-line-mid: rgba(255, 255, 255, 0.25);
          --sp-max: 880px;
          --sp-max-wide: 1080px;
          --sp-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
          --sp-font: system-ui, -apple-system, Segoe UI, sans-serif;
          --sp-font-head: system-ui, -apple-system, Segoe UI, sans-serif;
        }

        html[data-searchpoint-theme="light"] {
          color-scheme: light;
          --sp-bg: #f4f6f8;
          --sp-surface: #ffffff;
          --sp-border: rgba(15, 20, 30, 0.1);
          --sp-text: #12151c;
          --sp-muted: #5a6270;
          --sp-accent: #2d7a65;
          --sp-accent-btn: #256b58;
          --sp-btn-primary-fg: #fbfdfc;
          --sp-btn-primary-hover-bg: #1f5c4a;
          --sp-btn-primary-border: rgba(0, 0, 0, 0.1);
          --sp-btn-ghost-hover-border: rgba(0, 0, 0, 0.14);
          --sp-feature-slot-dash: rgba(15, 20, 30, 0.12);
          --sp-inset-highlight: rgba(0, 0, 0, 0.04);
          --sp-line-mid: rgba(15, 20, 30, 0.22);
        }

        .searchpoint-root {
          background: var(--sp-bg);
          color: var(--sp-text);
          font-family: var(--sp-font);
          font-size: 17px;
          line-height: 1.6;
          min-height: 100vh;
        }

        .searchpoint-root * {
          box-sizing: border-box;
        }

        .searchpoint-root a {
          color: inherit;
          text-decoration: none;
        }

        .sp-wrap {
          max-width: var(--sp-max);
          margin: 0 auto;
          padding: 0 20px;
        }

        .sp-wrap-wide {
          max-width: var(--sp-max-wide);
          margin: 0 auto;
          padding: 0 20px;
        }

        .sp-header {
          padding: 20px 0;
          border-bottom: 1px solid var(--sp-border);
        }

        .sp-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: calc(var(--sp-max) + 80px);
          margin: 0 auto;
          padding: 0 20px;
        }

        .sp-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--sp-font-head);
          font-weight: 600;
          font-size: 16px;
        }

        .sp-logo-mark {
          width: 8px;
          height: 8px;
          border-radius: 2px;
          background: var(--sp-accent);
        }

        .sp-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sp-theme-toggle {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          padding: 0;
          border-radius: 999px;
          border: 1px solid var(--sp-border);
          background: transparent;
          color: var(--sp-muted);
          cursor: pointer;
          transition:
            color 150ms ease,
            border-color 150ms ease,
            background-color 150ms ease,
            transform 150ms var(--sp-ease-out);
        }

        .sp-theme-toggle svg {
          width: 20px;
          height: 20px;
        }

        .sp-theme-toggle:focus-visible,
        .sp-btn:focus-visible {
          outline: 2px solid var(--sp-accent);
          outline-offset: 3px;
        }

        @media (hover: hover) and (pointer: fine) {
          .sp-theme-toggle:hover {
            color: var(--sp-text);
            border-color: var(--sp-btn-ghost-hover-border);
            background: rgba(127, 127, 127, 0.08);
          }
        }

        .sp-theme-toggle:active,
        .sp-btn:active {
          transform: scale(0.96);
        }

        .sp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 11px 22px;
          border-radius: 999px;
          font-family: var(--sp-font);
          font-weight: 600;
          font-size: 15px;
          border: 1px solid transparent;
          cursor: pointer;
          transition:
            transform 150ms var(--sp-ease-out),
            background-color 150ms ease,
            border-color 150ms ease;
        }

        @media (hover: hover) and (pointer: fine) {
          .sp-btn:hover {
            transform: translateY(-1px);
          }
        }

        .sp-btn-primary {
          background: var(--sp-accent-btn);
          color: var(--sp-btn-primary-fg);
          border-color: var(--sp-btn-primary-border);
        }

        @media (hover: hover) and (pointer: fine) {
          .sp-btn-primary:hover {
            background: var(--sp-btn-primary-hover-bg);
          }
        }

        .sp-hero {
          padding: 56px 0 72px;
          text-align: center;
        }

        .sp-hero h1 {
          font-family: var(--sp-font-head);
          font-size: clamp(1.85rem, 5vw, 2.65rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.03em;
          margin: 0 auto 16px;
          max-width: 18ch;
        }

        .sp-hero-lead {
          margin: 0 auto 28px;
          max-width: 46ch;
          color: var(--sp-muted);
          font-size: 1.05rem;
        }

        .sp-hero-note {
          margin: 16px 0 0;
          font-size: 14px;
          color: var(--sp-muted);
        }

        .sp-section {
          padding: 56px 0;
        }

        .sp-section h2 {
          font-family: var(--sp-font-head);
          font-size: clamp(1.35rem, 3vw, 1.65rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0 0 8px;
          text-align: center;
        }

        .sp-section-kicker {
          text-align: center;
          font-size: 14px;
          color: var(--sp-muted);
          margin: 0 0 36px;
        }

        .sp-feature-intro {
          padding-bottom: 24px;
        }

        .sp-feature-section {
          padding: 48px 0;
          border-top: 1px solid var(--sp-border);
        }

        .sp-feature-split {
          display: grid;
          gap: 28px;
          align-items: center;
        }

        @media (min-width: 900px) {
          .sp-feature-split {
            grid-template-columns: 1fr 1fr;
            gap: 48px;
          }
          .sp-feature-split--reverse .sp-feature-copy {
            order: 2;
          }
          .sp-feature-split--reverse .sp-feature-visual {
            order: 1;
          }
        }

        .sp-feature-copy h3 {
          font-family: var(--sp-font-head);
          font-size: clamp(1.15rem, 2.5vw, 1.35rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          margin: 0 0 12px;
          text-align: left;
        }

        .sp-feature-copy p {
          margin: 0;
          font-size: 16px;
          color: var(--sp-muted);
          line-height: 1.6;
          max-width: 42ch;
        }

        .sp-feature-copy p + p {
          margin-top: 14px;
        }

        .sp-feature-visual {
          margin: 0;
        }

        .sp-feature-visual-img {
          display: block;
          width: 100%;
          height: auto;
          border-radius: 12px;
          border: 1px solid var(--sp-border);
          cursor: zoom-in;
        }

        @media (hover: hover) and (pointer: fine) {
          .sp-feature-visual-img:hover {
            border-color: var(--sp-line-mid);
          }
        }

        .sp-lightbox {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(5, 8, 12, 0.82);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          cursor: zoom-out;
        }

        html[data-searchpoint-theme="light"] .sp-lightbox {
          background: rgba(18, 22, 30, 0.72);
        }

        .sp-lightbox__img {
          display: block;
          max-width: min(100%, 96vw);
          max-height: min(88vh, 1200px);
          width: auto;
          height: auto;
          object-fit: contain;
          border-radius: 12px;
          border: 1px solid var(--sp-border);
          box-shadow:
            0 24px 80px rgba(0, 0, 0, 0.45),
            0 0 0 1px rgba(255, 255, 255, 0.06);
          cursor: default;
        }

        body.searchpoint-lightbox-open {
          overflow: hidden;
        }

        .sp-sources {
          display: grid;
          gap: 1px;
          background: var(--sp-border);
          border: 1px solid var(--sp-border);
          border-radius: 12px;
          overflow: hidden;
          margin-top: 8px;
          grid-template-columns: 1fr;
          margin-bottom: 24px;
        }

        @media (min-width: 520px) {
          .sp-sources {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 900px) {
          .sp-sources {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .sp-source {
          background: var(--sp-surface);
          padding: 22px 20px;
          text-align: center;
        }

        .sp-source strong {
          display: block;
          font-family: var(--sp-font-head);
          font-size: 15px;
          margin-bottom: 6px;
        }

        .sp-source span {
          font-size: 14px;
          color: var(--sp-muted);
          line-height: 1.45;
        }

        .sp-knowledge-intro {
          text-align: center;
          max-width: 54ch;
          margin: 0 auto 28px;
          color: var(--sp-muted);
          font-size: 16px;
          line-height: 1.65;
        }

        .sp-cta {
          text-align: center;
          padding: 64px 0 80px;
        }

        .sp-cta p {
          margin: 0 auto 24px;
          max-width: 42ch;
          color: var(--sp-muted);
          font-size: 1rem;
        }

        .sp-footer {
          padding: 24px 20px 40px;
          border-top: 1px solid var(--sp-border);
          text-align: center;
          font-size: 13px;
          color: var(--sp-muted);
        }

        .sp-footer strong {
          color: var(--sp-text);
        }
      `}</style>

      <header className="sp-header">
        <div className="sp-nav-inner">
          <a className="sp-logo" href="#top">
            <span className="sp-logo-mark" aria-hidden="true" />
            SearchPoint
          </a>
          <div className="sp-nav-actions">
            <button
              type="button"
              className="sp-theme-toggle"
              aria-label={themeToggleLabel}
              title={themeToggleLabel}
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true">
                {theme === "light" ? (
                  <>
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                  </>
                ) : (
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                )}
              </svg>
            </button>
            <a className="sp-btn sp-btn-primary" href={inquiryMailtoHref}>
              Contact
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="sp-hero">
          <div className="sp-wrap">
            <h1>Unified search for your files and Microsoft 365.</h1>
            <p className="sp-hero-lead">
              Stop jumping between File Explorer, browser tabs, and SharePoint
              to find the same document. SearchPoint searches local folders,
              OneDrive, and site libraries in one place.
            </p>
            <p>
              <a className="sp-btn sp-btn-primary" href={inquiryMailtoHref}>
                Request a demo
              </a>
            </p>
            <p className="sp-hero-note">
              Related files, Q&amp;A with citations, email and chat: same bar,
              when your connectors are on.
            </p>
          </div>
        </section>

        <section className="sp-section sp-feature-intro" id="features">
          <div className="sp-wrap">
            <h2>More than a search box</h2>
            <p className="sp-section-kicker">
              One query surface for content that usually sits in different apps.
            </p>
          </div>
        </section>

        <section className="sp-feature-section" id="feature-unified">
          <div className="sp-wrap-wide">
            <div className="sp-feature-split sp-feature-split--reverse">
              <div className="sp-feature-copy">
                <h3>Search across PCs and cloud</h3>
                <p>
                  One search across local folders, OneDrive, SharePoint,
                  and—when you connect them—mail and messaging, instead of
                  hopping between File Explorer, browser tabs, and Outlook for
                  the same answer.
                </p>
                <p>
                  Find the files you need quickly with filters such as type,
                  author or sender, source (which library or account), date
                  range, and other facets so you can land on the exact item
                  fast.
                </p>
              </div>
              <figure className="sp-feature-visual">
                <img
                  className="sp-feature-visual-img"
                  src={IMAGES.feature1}
                  alt="SearchPoint showing unified results across local and Microsoft 365 sources."
                  width={1368}
                  height={736}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    openLightbox(
                      IMAGES.feature1,
                      "SearchPoint showing unified results across local and Microsoft 365 sources."
                    )
                  }
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="sp-feature-section" id="feature-related">
          <div className="sp-wrap-wide">
            <div className="sp-feature-split">
              <div className="sp-feature-copy">
                <h3>Related context next to the hit</h3>
                <p>
                  Related files surface next to each hit so you see how they
                  connect—same case or topic, and what else is worth opening for
                  context.
                </p>
              </div>
              <figure className="sp-feature-visual">
                <img
                  className="sp-feature-visual-img"
                  src={IMAGES.related}
                  alt="SearchPoint results with file details and a related files column for the selected item."
                  width={1408}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    openLightbox(
                      IMAGES.related,
                      "SearchPoint results with file details and a related files column for the selected item."
                    )
                  }
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="sp-feature-section" id="feature-organization">
          <div className="sp-wrap-wide">
            <div className="sp-feature-split sp-feature-split--reverse">
              <div className="sp-feature-copy">
                <h3>Automatic organization</h3>
                <p>
                  SearchPoint automatically groups files, notes, and messages
                  into the work you are <strong>RUNNING</strong> right now, the{" "}
                  <strong>AREAS</strong> you own and responsible for (marketing
                  department, engineering team, etc), <strong>MATERIAL</strong>{" "}
                  that is useful, you find interesting, and worth keeping on
                  hand, and an <strong>ARCHIVE</strong> lane for what is no
                  longer relevant.
                </p>
              </div>
              <figure className="sp-feature-visual">
                <img
                  className="sp-feature-visual-img"
                  src={IMAGES.autoOrg}
                  alt="SearchPoint board with Running, Areas, Material, and Archive columns grouping work across sources."
                  width={1408}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    openLightbox(
                      IMAGES.autoOrg,
                      "SearchPoint board with Running, Areas, Material, and Archive columns grouping work across sources."
                    )
                  }
                />
              </figure>
            </div>
          </div>
        </section>

        <section
          className="sp-feature-section"
          id="feature-manual-organization">
          <div className="sp-wrap-wide">
            <div className="sp-feature-split">
              <div className="sp-feature-copy">
                <h3>Manual organization</h3>
                <p>
                  SearchPoint also lets you curate what matters: bookmark or
                  favorite files, rename them yourself or with AI assistance,
                  add notes, adjust permissions, assign items to projects, and
                  keep your own structure on top of automatic grouping.
                </p>
              </div>
              <figure className="sp-feature-visual">
                <img
                  className="sp-feature-visual-img"
                  src={IMAGES.manualOrg}
                  alt="SearchPoint manual organization panel with rename, notes, permissions, projects, and custom tags."
                  width={1408}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    openLightbox(
                      IMAGES.manualOrg,
                      "SearchPoint manual organization panel with rename, notes, permissions, projects, and custom tags."
                    )
                  }
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="sp-section" id="sources">
          <div className="sp-wrap sp-wrap-wide">
            <h2>Where SearchPoint looks</h2>
            <p className="sp-section-kicker">
              Connect PCs, Microsoft 365, file hosts, code, and messaging.
            </p>
            <figure
              className="sp-feature-visual"
              style={{ margin: "24px 0 20px" }}>
              <img
                className="sp-feature-visual-img"
                src={IMAGES.connects}
                alt="Diagram showing SearchPoint connected to OneDrive, SharePoint, Outlook, WhatsApp, Dropbox, Slack, GitHub, Azure DevOps, and local storage."
                width={1408}
                height={768}
                loading="lazy"
                decoding="async"
                onClick={() =>
                  openLightbox(
                    IMAGES.connects,
                    "Diagram showing SearchPoint connected to OneDrive, SharePoint, Outlook, WhatsApp, Dropbox, Slack, GitHub, Azure DevOps, and local storage."
                  )
                }
              />
            </figure>
            <div className="sp-sources">
              <div className="sp-source">
                <strong>Local storage</strong>
                <span>
                  PC and network folders your users actually save into.
                </span>
              </div>
              <div className="sp-source">
                <strong>OneDrive</strong>
                <span>Personal and shared cloud files in Microsoft 365.</span>
              </div>
              <div className="sp-source">
                <strong>SharePoint</strong>
                <span>Team sites, libraries, and published records.</span>
              </div>
              <div className="sp-source">
                <strong>Outlook</strong>
                <span>
                  Mail, calendars, and shared mailboxes you connect for search.
                </span>
              </div>
              <div className="sp-source">
                <strong>WhatsApp</strong>
                <span>Approved WhatsApp accounts.</span>
              </div>
              <div className="sp-source">
                <strong>Dropbox</strong>
                <span>
                  Team folders and synced files in connected Dropbox spaces.
                </span>
              </div>
              <div className="sp-source">
                <strong>Slack</strong>
                <span>
                  Channels, direct messages, and file shares from linked
                  workspaces.
                </span>
              </div>
              <div className="sp-source">
                <strong>GitHub</strong>
                <span>
                  Repos, issues, discussions, and wikis from repositories you
                  index.
                </span>
              </div>
              <div className="sp-source">
                <strong>Azure DevOps</strong>
                <span>
                  Boards, repos, wikis, and pipelines in your Azure DevOps
                  projects.
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="sp-section sp-feature-intro" id="security">
          <div className="sp-wrap">
            <h2>Security and deployment</h2>
            <p className="sp-section-kicker">
              Your files stay where you run them. We do not warehouse full
              copies on our side.
            </p>
          </div>
        </section>

        <section className="sp-feature-section">
          <div className="sp-wrap-wide">
            <div className="sp-feature-split">
              <div className="sp-feature-copy">
                <h3>No warehouse of raw files on our side</h3>
                <p>
                  We index file metadata and search keywords derived from your
                  content; keywords are sanitized to strip sensitive information
                  under your rules. Full documents and extracted text are not
                  stored on our side—
                  <strong>your files stay where you already keep them</strong>.
                </p>
              </div>
              <figure className="sp-feature-visual">
                <img
                  className="sp-feature-visual-img"
                  src={IMAGES.noWarehouse}
                  alt="Diagram: tags, keywords, date, and author are extracted from a source file into an index database; full file warehouse storage is not used."
                  width={1408}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    openLightbox(
                      IMAGES.noWarehouse,
                      "Diagram: tags, keywords, date, and author are extracted from a source file into an index database; full file warehouse storage is not used."
                    )
                  }
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="sp-feature-section">
          <div className="sp-wrap-wide">
            <div className="sp-feature-split sp-feature-split--reverse">
              <div className="sp-feature-copy">
                <h3>Permissions carry through</h3>
                <p>
                  Results honor Microsoft 365 ACLs and filesystem rights. If you
                  cannot open it at the source,{" "}
                  <strong>you CANNOT see it here</strong>.
                </p>
              </div>
              <figure className="sp-feature-visual">
                <img
                  className="sp-feature-visual-img"
                  src={IMAGES.permissions}
                  alt="Diagram: Microsoft 365 ACLs and filesystem permissions carry through to SearchPoint—users only see what they can open at the source."
                  width={1408}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    openLightbox(
                      IMAGES.permissions,
                      "Diagram: Microsoft 365 ACLs and filesystem permissions carry through to SearchPoint—users only see what they can open at the source."
                    )
                  }
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="sp-feature-section">
          <div className="sp-wrap-wide">
            <div className="sp-feature-split">
              <div className="sp-feature-copy">
                <h3>On-premise install</h3>
                <p>
                  Run SearchPoint inside your network on your hardware and your
                  retention standards. We work with your team to plan capacity
                  and how SearchPoint should be deployed so it fits your
                  environment.
                </p>
              </div>
              <figure className="sp-feature-visual">
                <img
                  className="sp-feature-visual-img"
                  src={IMAGES.onPrem}
                  alt="Diagram: SearchPoint running on your network, on your hardware, with your retention and deployment choices."
                  width={1408}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    openLightbox(
                      IMAGES.onPrem,
                      "Diagram: SearchPoint running on your network, on your hardware, with your retention and deployment choices."
                    )
                  }
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="sp-section" id="ai-knowledge">
          <div className="sp-wrap sp-wrap-wide">
            <h2>The knowledge layer for AI apps and agents</h2>
            <p className="sp-section-kicker">
              Ground assistants in the same documents your people already
              search—not a separate silo.
            </p>
            <p className="sp-knowledge-intro">
              Large models and agents need fast, trustworthy context.
              SearchPoint sits underneath them as a retrieval layer: one index
              across PCs, Microsoft 365, and the connectors you enable, with
              permissions enforced end to end.
            </p>

            <div className="sp-sources">
              <div className="sp-source">
                <strong>One corpus, many clients</strong>
                <span>
                  Build once: desktop search, mobile, and any AI surface all
                  query the same indexed knowledge.
                </span>
              </div>
              <div className="sp-source">
                <strong>Provenance you can show</strong>
                <span>
                  Return snippets, titles, and locations so apps can cite
                  sources and users can verify.
                </span>
              </div>
              <div className="sp-source">
                <strong>Same rules as search</strong>
                <span>
                  Agents inherit ACLs and filesystem rights—no accidental
                  exposure across teams.
                </span>
              </div>
            </div>
            <p className="sp-knowledge-intro">
              Your copilots, internal bots, and automation can call into that
              layer so answers stay tied to real files, mail, and chats in your
              environment—not a generic snapshot of the public web.
            </p>
          </div>
        </section>

        <section className="sp-feature-section" id="feature-answers">
          <div className="sp-wrap-wide">
            <div className="sp-feature-split sp-feature-split--reverse">
              <div className="sp-feature-copy">
                <h3>Answers you can verify</h3>
                <p>
                  By using SearchPoint's MCP, you can ask in plain language—for
                  example, “What was the invoice amount for company X last
                  month?”—and open the proof: document owners, quoted excerpts,
                  and links to the exact files and folders behind the answer so
                  anyone can re-check the same trail.
                </p>
              </div>
              <figure className="sp-feature-visual">
                <img
                  className="sp-feature-visual-img"
                  src={IMAGES.feature2}
                  alt="SearchPoint answer with cited sources and proof from SharePoint documents and Outlook."
                  width={1371}
                  height={735}
                  loading="lazy"
                  decoding="async"
                  onClick={() =>
                    openLightbox(
                      IMAGES.feature2,
                      "SearchPoint answer with cited sources and proof from SharePoint documents and Outlook."
                    )
                  }
                />
              </figure>
            </div>
          </div>
        </section>

        <section className="sp-cta" id="contact">
          <div className="sp-wrap">
            <h2>Get started</h2>
            <p>
              Share your M365 setup and constraints. We’ll respond with a clear
              next step and a tailored demo.
            </p>
            <a className="sp-btn sp-btn-primary" href={inquiryMailtoHref}>
              Email us
            </a>
          </div>
        </section>
      </main>

      <footer className="sp-footer">
        <div className="sp-wrap">
          <p>
            <strong>SearchPoint</strong> — Search across PCs and Microsoft 365.
            © {year}
          </p>
        </div>
      </footer>

      {lightbox.isOpen && (
        <div
          id={lightboxId}
          className="sp-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged image"
          tabIndex={-1}
          ref={lightboxRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeLightbox();
          }}>
          <img
            ref={lightboxImgRef}
            className="sp-lightbox__img"
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
          <button type="button" onClick={closeLightbox} className="sr-only">
            Close image
          </button>
        </div>
      )}
    </div>
  );
}
