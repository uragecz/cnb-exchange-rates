# CNB Exchange Rates

A small React app that fetches the latest daily foreign exchange rates from the
Czech National Bank, displays them in a table, and lets you convert an amount in
CZK to any of the listed currencies.

## Tech stack

- React 19 + TypeScript (strict)
- Vite
- React Query (data fetching + caching)
- React Hook Form (form state + validation)
- styled-components (theming, light/dark mode)
- Radix UI Select (accessible currency dropdown)
- Vitest + Testing Library (parser unit tests)

## Getting started

```bash
npm install
npm run dev
```

The dev server proxies `/api/cnb/*` to `https://www.cnb.cz/*` (see
[vite.config.ts](vite.config.ts)) to avoid CORS issues during development.

### Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with the CNB proxy |
| `npm run build` | Type-check and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over `**/*.{ts,tsx}` |
| `npx vitest run` | Run the unit test suite |

## CORS

The CNB endpoint does not include CORS headers for arbitrary origins, so the
app cannot fetch it from the browser directly. Both environments solve this
with a same-origin proxy that rewrites `/api/cnb/*` to `https://www.cnb.cz/*`:

- **Development:** Vite dev server proxy in [vite.config.ts](vite.config.ts).
- **Production:** rewrite in [vercel.json](vercel.json).

## Tests

`src/api/cnb.test.ts` covers the parser: JPY/EUR rate-per-unit math, header
skipping, CRLF line endings, malformed rows, zero/non-numeric amounts and empty
input. Run with `npx vitest run`.

## Project structure

```
src/
  api/cnb.ts            Parser + fetch for the CNB daily.txt feed
  hooks/useExchangeRates.ts  React Query wrapper
  pages/RatesPage.tsx   Page composition (header + form + table)
  components/           UI atoms (Paper, Spinner, ErrorBox, ThemeToggle…)
  providers/ThemeModeProvider.tsx  Light/dark theme + localStorage persistence
  lib/format.ts         Intl number formatters
  theme.ts              Design tokens
```
