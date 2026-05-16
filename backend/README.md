# Medium Backend

A Cloudflare Workers backend built with Hono, Prisma, and JWT authentication for a Medium-style blog API.

## Features

- User signup and signin with hashed passwords
- JWT-based authentication for protected blog routes
- Prisma ORM with Cloudflare Accelerate support
- Blog CRUD for authenticated users
- Hono routing with JSON validation using Zod

## Technology stack

- Node.js / npm
- Vite
- Hono
- Prisma
- Cloudflare Workers / Wrangler
- Zod
- bcryptjs

## Setup

1. Install dependencies:

```bash
npm install
```

2. Set required environment variables for Cloudflare Workers:

- `ACCELERATE_URL` — Prisma Accelerate endpoint
- `JWT_Secret` — JWT signing secret

3. Configure your database connection in `prisma/schema.prisma` and run Prisma commands as needed:

```bash
npx prisma generate
npx prisma db push
```

> If you are deploying to Cloudflare Workers, keep database credentials and secrets out of source control.

## Development

Run the app locally with Vite:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

Deploy the Worker with Wrangler:

```bash
npm run deploy
```

Generate/synchronize Cloudflare Worker type bindings:

```bash
npm run cf-typegen
```

## API Endpoints

### Public

- `POST /v1/api/users/signup` — create a new user
- `POST /v1/api/users/signin` — authenticate and return JWT

### Protected (requires `Authorization: Bearer <token>`)

- `POST /v1/api/blogs` — create a new blog post
- `PUT /v1/api/blogs` — update an existing blog post
- `GET /v1/api/blogs` — list all posts for the authenticated user
- `GET /v1/api/blogs/:id` — fetch a single blog post by ID

## Notes

- The backend uses `Hono` routes defined in `src/routes/user.routes.ts` and `src/routes/blog.routes.ts`.
- JSON request validation is handled with Zod schemas.
- Ensure the `JWT_Secret` is set in your Worker environment so authentication works correctly.
- In `src/index.ts`, the app routes are registered under `/v1/api/users` and `/v1/api/blogs`.

## Example Hono initialization

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```

