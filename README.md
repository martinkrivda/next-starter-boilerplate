# Next Starter Boilerplate

Modern Next.js 16 starter with Prisma 7 integration, pnpm, and other tools for rapid project setup.

## Requirements

- Git and native build tooling
- [nvm](https://github.com/nvm-sh/nvm) to manage Node.js versions (`.nvmrc` is included)
- Node.js `22.20.0` (`nvm use` ensures everyone runs the same version)
- pnpm `10.20.0` managed through [Corepack](https://nodejs.org/docs/latest-v22.x/api/corepack.html#corepack)
- Database reachable via a PostgreSQL connection string for Prisma (`DATABASE_URL`)

## Environment setup

1. Install and use the Node.js version from `.nvmrc`
   ```bash
   nvm install
   nvm use
   ```
2. Enable Corepack and install the pinned pnpm release
   ```bash
   corepack enable
   corepack install
   ```
3. Install dependencies
   ```bash
   pnpm install
   ```
4. Create your `.env` from the template
   ```bash
   cp .env.example .env
   ```

## Environment configuration

- `src/lib/env.ts` validates `process.env` with `zod` and throws early if something important (like `DATABASE_URL`) is missing.
- Import `{ env }` from `@/lib/env` instead of reading from `process.env` directly so you get typed, validated values everywhere.
- `TIME_ZONE` defaults to `Europe/Prague` (recommended in `docs/best-practices.md`) but can be overridden in `.env` if your deployment lives elsewhere.

## Database & Prisma configuration

- `prisma/schema.prisma` ships with a PostgreSQL datasource and Prisma v7 client generator.
- `src/lib/db/client.ts` exports a shared `PrismaClient` that survives hot reloads in development.
- Set `DATABASE_URL` in `.env` to point to your database (local Postgres, Neon, Supabase, etc.).

Helpful scripts:

```bash
pnpm prisma:generate   # generate Prisma Client
pnpm prisma:migrate    # create/apply a migrate dev migration
pnpm prisma:studio     # launch Prisma Studio for data browsing
```

## Global providers

- `src/providers/app-providers.tsx` composes locale, theme, and internationalization providers. Add future providers here to keep layouts slim and maintain ordering in one place.
- Individual providers (e.g., `ThemeProvider`, `LocaleProvider`) remain accessible through `@/providers` when you need them in isolation.
- `AppProviders` receives the validated `timeZone` so `NextIntlClientProvider` always has an explicit configuration (required since Next.js 13+ to avoid hydration mismatches).

## Development workflow

1. Make sure the database is running and migrations are applied (`pnpm prisma:migrate`).
2. Start the dev server
   ```bash
   pnpm dev
   ```
3. Additional commands:
   - `pnpm lint` – run ESLint
   - `pnpm format` / `pnpm format:check` – run Prettier
   - `pnpm build` – create a production build of Next.js

Stick to the `.nvmrc` Node version, use pnpm through Corepack, and keep the Prisma schema in sync with your database to ensure every teammate works against the same environment.

For additional conventions and folder structure guidelines, read `docs/best-practices.md`.
