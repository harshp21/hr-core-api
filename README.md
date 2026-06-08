# Employee Salary Management Tool (HR Core API)

Backend service for managing employee salary data and generating compensation analytics.

This project is built as a modular monolith with a feature-based structure and a layered backend flow:

`Route -> Controller -> Service -> Repository -> Prisma -> PostgreSQL`

## Highlights

- Employee CRUD with soft delete
- Search, filtering, sorting, and pagination
- Salary analytics by country and job title
- PostgreSQL + Prisma for data access and aggregation
- TypeScript + Express backend
- Jest + Supertest test suite
- Seed script for 10,000 employees

## Tech Stack

- Node.js (>= 18)
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- Jest + Supertest

## Project Structure

```txt
src/
  modules/
    employee/
    analytics/
    health/
  shared/
  config/
  app.ts
  server.ts
prisma/
  schema.prisma
  seed.ts
docs/
```

## API Base URL

Local default:

```txt
http://localhost:4000
```

Main route groups:

- `GET /` (health)
- `/api/v1/employees`
- `/api/v1/analytics`

## Environment Variables

Create a `.env` file at repository root.

Example:

```dotenv
NODE_ENV=development
PORT=4000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/salary_management
APP_NAME=employee-salary-tool
CORS_ORIGINS=http://localhost:5173
```

Notes:

- `DATABASE_URL` is required and validated at startup.
- `CORS_ORIGINS` supports comma-separated values.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npm run prisma:generate
```

3. Run database migrations (development):

```bash
npx prisma migrate dev
```

4. Start development server:

```bash
npm run dev
```

Server will run on `PORT` (default `4000`).

## Seeding Data (10,000 Employees)

This project includes a deterministic seed workflow for realistic local testing and analytics checks.

Run seed:

```bash
npm run seed
```

What the seed process does:

1. Connects to PostgreSQL using `DATABASE_URL`.
2. Deletes existing employee rows (`deleteMany`) to avoid duplicate records.
3. Loads first and last names from:
   - `prisma/data/first-names.txt`
   - `prisma/data/last-names.txt`
4. Generates 10,000 employee records in memory.
5. Inserts records in batches of 1,000 with `createMany` for better insert performance.
6. Disconnects Prisma client cleanly.

Why batching is used:

- Fewer database round-trips than one-by-one inserts
- Better performance for large seed sets
- Safer and more predictable local setup for analytics endpoints

Important behavior:

- Seeding is destructive for employee data in the target DB because it clears existing employees before insert.
- Use a development database, not production.

## Available Scripts

- `npm run dev` - run API in development with auto-reload
- `npm run build` - compile TypeScript to `dist`
- `npm run start` - run compiled app
- `npm run start:prod` - build then start
- `npm run test` - run all tests
- `npm run test:watch` - run tests in watch mode
- `npm run lint` - lint TypeScript files
- `npm run typecheck` - TypeScript type check
- `npm run prisma:generate` - generate Prisma client
- `npm run prisma:studio` - open Prisma Studio
- `npm run seed` - run Prisma seed script

## Testing

Run all tests:

```bash
npm run test
```

The test suite includes module-level coverage for employee, analytics, health, and shared middleware behavior.

## Documentation

Detailed project documentation is available in `docs/`:

- `01-requirements.md`
- `02-planning-and-design-notes.md`
- `03-architecture-diagrams.md`
- `04-ai-assisted-development.md`
- `05-solution-design.md`
- `06-tradeoff-explanations.md`
- `07-performance-considerations.md`

## Postman

Postman files are available in `postman/`:

- `hr-core-api.postman_collection.json`
- `hr-core-api.local.postman_environment.json`

Import both to quickly test endpoints locally.
