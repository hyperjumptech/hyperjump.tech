# About

The repository for Hyperjump Technology's landing page. [https://hyperjump.tech](https://hyperjump.tech)

## Tech Stack

- [Next.js](https://nextjs.org) with App Router.
- [Bun](https://bun.sh).
- [Tailwind CSS](https://tailwindcss.com) and [Shadcn/UI](https://ui.shadcn.com/).
- [simple-i18n-next](https://github.com/nicnocquee/simple-i18n-next#readme).
- [TypeScript](https://www.typescriptlang.org).
- [Playwright](https://playwright.dev/).

## Development Workflows

### Running the App Locally

1. Install Bun: `curl -fsSL https://bun.sh/install | bash`
2. Install dependencies: `bun install --frozen-lockfile`
3. Start development server: `bun dev`

### Adding a New Translation

1. Add the key and value to `locales/en/*.json` and `locales/id/*.json`.
2. Run `bun run generate-locales`.
3. Use the generated function in your component:

```tsx
import { myNewKey } from "@/locales/.generated/strings";
// ...
<span>{myNewKey(lang)}</span>;
```

### Running Tests

We use [Playwright](https://playwright.dev/) for end-to-end testing to ensure language switching and responsive layouts don't break.

- `bunx playwright install`: Install Playwright browsers
- `bun run test:e2e`: Run all tests headlessly.
- `bun run test:e2e:ui`: Open the Playwright UI to debug tests.
- `bun run test:e2e:headed`: Run all tests in headed mode.
- `bun run test:e2e:report`: View the latest HTML report.

By default, tests will start the Next.js app automatically using `bun run build` then `bun run start` on port `3000`.

## Pull Request Preview

When a pull request is opened or updated, a preview of the changes will be generated and uploaded as an artifact. This allows you to review the changes before merging.

## CI

A GitHub Actions workflow at `.github/workflows/e2e.yml` runs E2E tests on every pull request. Results are printed to the build log, and the HTML report is uploaded as a build artifact for deeper inspection.

## Deployment

1. After pull request merges to the `main` branch.
2. GitHub Actions will trigger:
   - Linting & Prettier check.
   - Playwright E2E tests.
   - [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#configuration) via `bun run build`.
   - Deployment to the `gh-pages` branch.

## License

MIT
