# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Development server
npm run build            # prisma generate + next build
npm run start            # Production server on port 3008
npm run lint             # ESLint
npm run prettier         # Prettier format all files
npm run test:e2e         # Playwright E2E tests
npm run test:e2e:ui      # Playwright with interactive UI
npm run migrate-dev      # Prisma migrate dev + seed triggers
npm run prisma:generate  # Copy schema from package + prisma generate
```

**Prisma schema** is sourced from the private npm package `@InRealArt/prisma-schema`. To update it locally:
```bash
npm run prisma:copy-schema   # cp node_modules/@InRealArt/prisma-schema/schema.prisma prisma/schema.prisma
npm run prisma:generate      # then generate the client
```

**Node.js >= 22** is required (see `.nvmrc`). Use `--legacy-peer-deps` when installing packages.

## Architecture

### Stack
- **Next.js 16** (App Router) with **React 19**
- **TypeScript** strict mode, path alias `@/*` → `./src/*`
- **Tailwind CSS 3** + **shadcn/ui** (Radix UI) + **NextUI**
- **Prisma 5** on PostgreSQL with multi-schema support

### App Router Structure (`src/app/`)
- Server Components by default; `'use client'` only where needed
- Server Actions in `src/lib/` (files marked `'use server'`) handle all Prisma queries
- API routes under `src/app/api/` are for external webhooks and integrations only (Stripe, Shippo, Brevo)
- Auth handled by **better-auth** at `src/app/api/auth/[...all]/`

### Database (Prisma Multi-Schema)
Eight schemas: `auth`, `public`, `landing`, `marketplace`, `blockchain`, `landingUi`, `backoffice`, `statistics`. The Prisma client singleton is in `src/lib/prisma.ts`. All DB operations go through Server Actions, not API routes.

### State Management (Dual)
- **Zustand** (primary): `src/store/` — cart, items/catalog, modals, artists, collections
- **Redux Toolkit** (secondary): `src/redux/` — collections, modals, orders
- **React Query** (@tanstack/react-query): client-side data caching

### Authentication
**better-auth** (`src/lib/auth.ts`) with Prisma adapter. Providers: email/password, Google, Twitter. Use `src/lib/auth-client.ts` for client-side and `src/lib/auth-session.ts` for server-side session access.

### Component Organization
- `src/components/client/` — client components (header, cart, artwork displays, modals)
- `src/components/server/` — server components
- `src/components/ui/` — shadcn/ui primitive components
- `src/components/checkout/` and `src/components/stripe/` — payment flow

### Key Integrations
| Service | Purpose | Entry point |
|---|---|---|
| Stripe | Payments & webhooks | `src/app/api/stripe/`, `src/lib/stripe/` |
| Shippo + UPS | Shipping rates | `src/lib/shippo-client.ts`, `src/lib/ups/` |
| Brevo | Transactional email | `src/lib/brevo/`, `src/app/api/mailing/` |
| Coinbase Wallet | Web3 NFT purchases | `src/components/CoinbaseWallet/`, `src/web3/` |
| Shopify | Product sync/revalidation | `src/lib/shopify/` |

### Vercel Deployment
`scripts/prepare-vercel-install.js` runs as `preinstall` to handle the private `@InRealArt/prisma-schema` package on Vercel (the package must NOT be installed on Vercel directly — the schema is copied pre-build).

### E2E Tests
Playwright tests in `tests/e2e/`. Default base URL: `http://127.0.0.1:3100`. Run against a local dev server.

## Workflow Guidelines

### Local server
Never start a local dev server yourself. Ask the user to start it if needed.

### Code review after implementation
After completing or implementing a feature, always invoke the `code-refactoring-specialist` subagent to review the code and ensure high quality.

### Delegation to subagents
As the main agent, prefer delegating implementation work to the appropriate coding subagents (e.g. `nextjs-app-router-architect`, `nextjs-perf-engineer`, `tailwind-css-architect`, `code-refactoring-specialist`) rather than implementing features directly. Launch them in the background and in parallel whenever possible to maximize efficiency.
