# Medium Clone Project

A full-stack Medium-style blogging web app with a React + Vite frontend and a Cloudflare Workers backend.

## Project Overview

This repository contains two main parts:

- `frontend/` — React + TypeScript + Vite web application with an editor, authentication UI, blog list, publish flow, user profile, and protected dashboard pages.
- `backend/` — Cloudflare Workers backend built with Hono, Prisma, JWT authentication, Redis-like Cloudflare KV for OTP, Resend email delivery, and AWS S3 signed uploads.

The app supports:

- user signup and signin with OTP-based email verification
- JWT authentication for protected API routes
- profile management and password update
- blog creation, editing, publishing, and soft deletion
- public blog listing and detail views
- image upload support via AWS S3 signed URLs
- Prisma ORM with Cloudflare Accelerate support

---

## Repository Structure

- `backend/`
  - `package.json` — backend scripts and dependencies
  - `prisma/` — Prisma schema and migrations
  - `src/` — Worker app, routes, and utilities
  - `wrangler.jsonc` — Cloudflare Worker deployment config
- `frontend/`
  - `package.json` — frontend scripts and dependencies
  - `src/` — React pages, components, hooks, editor integration, and styling
  - `config.ts` — backend API base URL for the frontend

---

## Backend Overview (`backend/`)

The backend is a Cloudflare Worker using:

- `Hono` for routing and middleware
- `Prisma` with `@prisma/extension-accelerate` for database access
- `hono/jwt` for JWT signing and verification
- `Zod` for request validation
- `bcryptjs` for password hashing
- `Resend` for email OTP delivery
- `aws4fetch` for AWS S3 signed upload URL generation

### Main API routes

- `POST /v1/api/users/signup` — register a new user with name, email, password, and OTP
- `POST /v1/api/users/signin` — login with email and password, receive JWT
- `POST /v1/api/users/sendotp` — generate and email a one-time OTP for signup
- `GET /v1/api/users/me` — fetch authenticated user profile
- `PUT /v1/api/users/me` — update profile name and description
- `PUT /v1/api/users/me/password` — change password with current password verification
- `POST /v1/api/blogs` — create a blog post (authenticated)
- `PUT /v1/api/blogs` — update a blog post (authenticated)
- `PATCH /v1/api/blogs` — toggle publish status (authenticated)
- `GET /v1/api/blogs/myblogs` — list current user blogs (authenticated)
- `DELETE /v1/api/blogs/:id` — soft-delete a blog post (authenticated)
- `POST /v1/api/blogs/generate-upload-url` — request an AWS S3 signed image upload URL
- `GET /v1/api/publicblogs` — list public published blogs
- `GET /v1/api/publicblogs/:id` — fetch one published blog by ID

### Environment Variables

The backend requires these environment values in Cloudflare Workers:

- `ACCELERATE_URL` — Prisma Accelerate endpoint
- `JWT_Secret` — secret used to sign JWT tokens
- `RESEND_API_KEY` — Resend API key for email delivery
- `AWS_ACCESS_KEY_ID` — AWS IAM access key for S3 signed URLs
- `AWS_SECRET_ACCESS_KEY` — AWS secret key for S3 signed URLs
- `AWS_BUCKET_NAME` — S3 bucket name for uploads
- `AWS_REGION` — AWS region for the S3 bucket
- `KV` — Cloudflare KV binding for OTP storage

> The backend also depends on the `prisma` database schema in `backend/prisma/schema.prisma` and existing migrations in `backend/prisma/migrations/`.

### Backend Scripts

From `backend/`:

- `npm run dev` — run the backend locally with Vite
- `npm run build` — build the backend for production
- `npm run preview` — preview the production build locally
- `npm run deploy` — deploy to Cloudflare Workers using Wrangler
- `npm run cf-typegen` — generate Cloudflare Worker bindings types

---

## Frontend Overview (`frontend/`)

The frontend is a TypeScript React application built with Vite. It includes:

- authentication pages: signup, signin
- blog feed page showing published posts
- my blogs page for authenticated user posts
- publish/edit page for blog creation and updates
- profile/user settings page
- a rich text editor built with TipTap and custom editor components
- Axios API integration with JWT bearer tokens
- React Router for client-side routing

### Key frontend files

- `src/App.tsx` — app route definitions
- `src/AuthContext.tsx` — authentication state and current user loader
- `src/config.ts` — backend API base URL
- `src/hooks/index.ts` — API hook wrappers for blog and public blog fetching
- `src/pages/Publish.tsx` — blog editor and publish flow
- `src/components/Auth.tsx` — signup/signin forms and request flow

### Frontend Scripts

From `frontend/`:

- `npm run dev` — start Vite dev server
- `npm run build` — build the production frontend
- `npm run preview` — preview the built frontend locally
- `npm run lint` — run ESLint over the frontend codebase

---

## Local Setup

### 1. Install dependencies

```bash
cd backend
npm install
cd ../frontend
npm install
```

### 2. Configure backend environment

Update Cloudflare Worker environment values and Wrangler config with your own secrets.

If you want to run locally, set the same variables via a `.env` file or local Wrangler config.

### 3. Set frontend backend URL

By default, `frontend/src/config.ts` points at the deployed backend:

```ts
export const BACKEND_URL = "https://backend.yash-medium-api.workers.dev"
```

Change this to your local backend address if running locally, for example:

```ts
export const BACKEND_URL = "http://localhost:5173"
```

> Note: The frontend expects the backend API to be available at `/v1/api/...`.

### 4. Run locally

Open two terminals:

Terminal 1 (backend):

```bash
cd backend
npm run dev
```

Terminal 2 (frontend):

```bash
cd frontend
npm run dev
```

---

## Deployment

### Backend

Deploy the Cloudflare Worker from `backend/`:

```bash
cd backend
npm run deploy
```

### Frontend

The frontend can be deployed through any static hosting service that supports Vite output.

---

## Notes and Planned Improvements

Current enhancements in progress or planned:

- better frontend state management
- pagination support for blog feeds
- search bar for blogs
- improved mobile UI and responsive design
- expanded validation and error handling

---

## Useful Commands

From `backend/`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run deploy`
- `npm run cf-typegen`

From `frontend/`:

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run lint`

---

## License

MIT License


## feature to be expanded

- Update state management
- Pagination
- Searchbar