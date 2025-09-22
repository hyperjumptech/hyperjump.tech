# About

The repository for Hyperjump Technology's landing page. [https://hyperjump.tech](https://hyperjump.tech)

# Getting Started

- Clone the repository
- Install dependencies using [Bun](https://bun.sh): `bun install`
- Run the development server: `bun dev`

# Tech Stack

- [Next.js](https://nextjs.org) with App Router.
- [Tailwind CSS](https://tailwindcss.com) and [Shadcn/UI](https://ui.shadcn.com/).
- [simple-i18n-next](https://github.com/nicnocquee/simple-i18n-next#readme).
- [TypeScript](https://www.typescriptlang.org).

# Pull Request Preview

When a pull request is opened or updated, a preview of the changes will be generated and uploaded as an artifact. This allows you to review the changes before merging.

# Deployment

The website is deployed to GitHub Pages using the [export output](https://nextjs.org/docs/app/building-your-application/deploying/static-exports#configuration) of Next.js.

# End-to-End (E2E) Testing

This project uses [Playwright](https://playwright.dev/) for end-to-end tests.

## Local Setup

- Ensure dependencies are installed with Bun: `bun install`
- Install Playwright browsers (one-time): `bunx playwright install`

## Running Tests

- Headless run (recommended): `bun run test:e2e`
- Headed (debug) run: `bun run test:e2e:headed`
- View the latest HTML report: `bun run test:e2e:report`

By default, tests will:

- Start the Next.js app automatically using `bun run build` then `bun run start` on port 3000.
- Run in headless mode.
- Print progress to the terminal. On CI, GitHub annotations will be shown for failures.

## Interpreting Results

- On success, you will see a summary with passed tests in the terminal.
- On failure, Playwright prints the failing steps to the console. Open the HTML report for details:
  - `bun run test:e2e:report` (after a run)
- Traces, screenshots, and videos are captured on retry/failure and can be explored in the HTML report.

## CI

A GitHub Actions workflow at `.github/workflows/e2e.yml` runs E2E tests on every pull request and on pushes to `main`. Results are printed to the build log, and the HTML report is uploaded as a build artifact for deeper inspection.

# License

MIT
