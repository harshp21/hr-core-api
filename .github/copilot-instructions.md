# Project Guidelines

Prioritize:

* Simplicity
* Readability
* Maintainability
* Testability
* Production readiness

Avoid introducing unnecessary complexity.

Do NOT introduce:

* Microservices
* CQRS
* Event Sourcing
* Message Queues
* Redis
* Domain Driven Design patterns
* Generic repositories
* Premature abstractions

Only implement what is required by the current requirements.

---

# Development Methodology

Follow strict Test Driven Development (TDD).

For every feature:

1. Write failing tests first.
2. Implement the minimum code required to pass tests.
3. Refactor while keeping tests green.
4. Keep commits small and focused.

Always generate tests before implementation unless explicitly requested otherwise.

Follow:

RED → GREEN → REFACTOR

---

# Tech Stack

Backend:

* Node.js
* Express.js
* TypeScript
* PostgreSQL
* Prisma
* Jest
* Supertest
* Zod

Frontend:

* React
* Vite
* TypeScript
* Material UI
* TanStack Query
* React Router
* React Testing Library

---

# Architecture

Use a feature-based modular monolith architecture.

Business modules:

* employee
* analytics
* health

Backend flow:

Route
→ Controller
→ Service
→ Repository
→ Prisma
→ PostgreSQL

Never bypass layers.

Controllers must never access Prisma directly.

---

# Folder Structure

Use feature-based organization.

Backend:

src/
├── modules/
│   ├── employee/
│   ├── analytics/
│   └── health/
├── shared/
├── config/
├── app.ts
└── server.ts

Frontend:

src/
├── features/
│   ├── employees/
│   └── analytics/
├── shared/
├── app/
└── test/

---

# Node.js Best Practices

Always use async/await.

Prefer:

const employee = await repository.findById(id);

Avoid unnecessary .then() chains.

Never block the event loop.

Avoid:

* fs.readFileSync()
* CPU-intensive work in request handlers
* Long-running synchronous operations

Use asynchronous APIs whenever possible.

---

# Error Handling

Never swallow errors.

Bad:

try {
...
} catch (error) {}

Good:

* Log error
* Transform error if needed
* Re-throw or return appropriate response

Use centralized error handling middleware.

Create domain-specific errors:

* ValidationError
* NotFoundError
* ConflictError

Do not throw generic errors unless unavoidable.

---

# Configuration

Never hardcode:

* URLs
* Ports
* Secrets
* Credentials

Use environment variables.

Validate configuration during application startup.

Fail fast if required configuration is missing.

Keep configuration centralized under:

src/config

---

# Express.js Standards

Controllers should:

* Parse requests
* Validate input
* Call services
* Return responses

Controllers should NOT:

* Contain business logic
* Access Prisma directly
* Execute complex queries

Keep controllers thin.

---

# Service Layer Standards

Services contain business logic.

Services should:

* Be framework agnostic
* Be independently testable
* Coordinate repositories

Services must NOT depend on:

* Request
* Response
* Express objects

---

# Repository Standards

Repositories are responsible only for data access.

Repositories should:

* Use Prisma
* Encapsulate queries
* Return domain data

Repositories must NOT:

* Contain business rules
* Perform validation
* Handle HTTP concerns

---

# TypeScript Standards

Enable strict mode.

Never use any unless explicitly justified.

Prefer explicit types.

Use interfaces and type aliases where appropriate.

Prefer readability over type complexity.

---

# Validation Standards

Use Zod for all request validation.

Validate:

* Request body
* Query parameters
* Route parameters

Never trust client input.

Keep validation schemas close to the feature module.

Example:

employee.schema.ts

---

# Database Standards

Use PostgreSQL.

Use Prisma migrations.

Use UUID primary keys.

Use Decimal for salary fields.

Example:

salary Decimal

Never use floating-point types for monetary values.

---

# Database Indexing

Only create indexes required by business use cases.

Approved indexes:

UNIQUE(employeeCode)

UNIQUE(email)

INDEX(country)

INDEX(country, jobTitle)

Do not add additional indexes without justification.

Avoid over-indexing.

---

# Query Standards

Always paginate list endpoints.

Never return unbounded result sets.

Support:

?page=1
&pageSize=20

Default page size:

20

Maximum page size:

100

Only select required fields from the database.

Avoid fetching unnecessary data.

---

# Analytics Standards

Perform analytics in PostgreSQL.

Use aggregation queries.

Examples:

AVG(salary)

MIN(salary)

MAX(salary)

COUNT(*)

GROUP BY country

Do not load large datasets into memory for calculations.

---

# Performance Requirements

The application must support:

10,000 employees

Use:

* Pagination
* Filtering
* Sorting
* Database aggregations

Avoid:

* In-memory analytics
* Full dataset retrieval
* N+1 query patterns

Always think about query count.

---

# Seed Script Standards

Generate 10,000 employees.

Use batch inserts.

Prefer:

createMany()

Use batches of approximately 1000 records.

Avoid inserting records one at a time.

---

# Logging Standards

Use structured logging.

Log:

* Startup events
* Shutdown events
* Errors
* Important business events

Do not log:

* Passwords
* Secrets
* Sensitive employee information
* Entire request bodies

Avoid console.log in production code.

---

# Security Standards

Use:

* Helmet
* CORS
* Input validation

Never expose:

* Stack traces
* Internal database errors
* Sensitive information

Sanitize and validate all user input.

---

# Testing Standards

Testing is mandatory.

Every feature must have tests.

Preferred order:

1. Service tests
2. Repository tests
3. API tests

Tests must be:

* Fast
* Deterministic
* Independent
* Readable

Mock only external dependencies.

Do not mock business logic.

Test behavior, not implementation details.

---

# Code Quality

Prefer:

* Small functions
* Small files
* Clear naming
* Self-documenting code

Avoid:

* Large classes
* Deep nesting
* Excessive comments
* Clever code

Optimize for maintainability.

Assume another engineer will maintain this code one year from now.

---

# Documentation

When generating code:

* Keep documentation updated
* Follow existing architecture
* Do not introduce new dependencies unless necessary
* Do not refactor unrelated code

Favor consistency with the existing codebase.

---

# AI Assistance Rules

Act as a senior software engineer.

When generating code:

* Follow project architecture
* Respect TDD workflow
* Generate minimal code necessary
* Prefer maintainability over cleverness
* Prefer simplicity over abstraction
* Keep solutions production-ready
* Keep commits small and focused
