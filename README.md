# KAFS Training Module

A full-stack training platform built with **React + Vite** (frontend) and **Express + Prisma** (backend), using **Supabase** for authentication and **PostgreSQL** for data storage.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [1. Clone the Repository](#1-clone-the-repository)
- [2. Frontend Setup](#2-frontend-setup)
- [3. Backend Setup](#3-backend-setup)
- [4. Supabase Setup](#4-supabase-setup)
- [5. Running the Application](#5-running-the-application)
- [6. Deployment](#6-deployment)
- [7. Available Scripts](#7-available-scripts)

---

## Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** — [Download](https://git-scm.com/)
- A **Supabase** account — [Sign up](https://supabase.com/)
- A **PostgreSQL** database (Supabase provides one, or use your own)

---

## Project Structure

```
kafs-training-module/
├── src/                  # React frontend source code
│   ├── components/       # Reusable UI components
│   ├── services/         # API service layer (axios)
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── constants/        # Module data and constants
│   └── assets/           # Static assets
├── backend/              # Express.js backend
│   ├── src/
│   │   ├── config/       # Database & environment config
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/    # Auth & validation middleware
│   │   ├── routes/       # API route definitions
│   │   ├── schemas/      # Zod validation schemas
│   │   └── services/     # Business logic services
│   ├── prisma/           # Prisma schema & migrations
│   └── server.js         # Express server entry point
├── public/               # Static files (PDFs, training modules)
├── package.json          # Frontend dependencies
└── vite.config.js        # Vite configuration
```

---

## 1. Clone the Repository

```bash
git clone https://github.com/Aliyah-Sterry-git/kafs-training-module.git
cd kafs-training-module
```

---

## 2. Frontend Setup

### Step 1: Install frontend dependencies

From the project root directory:

```bash
npm install
```

### Step 2: Create a `.env` file in the project root

Create a `.env` file in the root of the project with the following variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_URL=http://localhost:3000/api
```

| Variable | Description |
|---|---|
| `VITE_SUPABASE_URL` | Your Supabase project URL (found in Supabase Dashboard → Settings → API) |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key (found in Supabase Dashboard → Settings → API) |
| `VITE_API_URL` | Backend API base URL (defaults to `http://localhost:3000/api`) |

---

## 3. Backend Setup

### Step 1: Navigate to the backend directory

```bash
cd backend
```

### Step 2: Install backend dependencies

```bash
npm install
```

### Step 3: Create a `.env` file in the `backend/` directory

Create a `.env` file inside the `backend/` folder:

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/database_name
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRY=7d
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
CORS_ORIGIN=http://localhost:5173
ANTHROPIC_API_KEY=your_anthropic_api_key
GEMINI_API_KEY=your_gemini_api_key
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string (use the one from Supabase Dashboard → Settings → Database → Connection string) |
| `JWT_SECRET` | A strong random secret for signing JWT tokens |
| `JWT_EXPIRY` | Token expiry duration (default: `7d`) |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |
| `CORS_ORIGIN` | Frontend URL for CORS (default: `http://localhost:5173`) |
| `ANTHROPIC_API_KEY` | *(Optional)* Anthropic API key for AI quiz generation |
| `GEMINI_API_KEY` | *(Optional)* Google Gemini API key for AI quiz generation |

### Step 4: Generate the Prisma client

```bash
npx prisma generate
```

### Step 5: Run database migrations

This creates all the required tables in your PostgreSQL database:

```bash
npx prisma migrate dev
```

### Step 6: (Optional) Seed the database

If a seed file is available:

```bash
npm run db:seed
```

### Step 7: (Optional) View the database with Prisma Studio

```bash
npx prisma studio
```

This opens a visual database editor at `http://localhost:5555`.

---

## 4. Supabase Setup

### Step 1: Create a Supabase Project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) and create a new project.
2. Note down your **Project URL** and **Anon Key** from **Settings → API**.
3. Note down the **Database Connection String** from **Settings → Database**.

### Step 2: Configure Authentication

1. In Supabase Dashboard, go to **Authentication → URL Configuration**.
2. Set your **Site URL** to:
   - `http://localhost:5173` (for local development)
3. Add the following **Redirect URLs**:
   - `http://localhost:5173/auth/callback`
   - `http://localhost:5173/reset-password`
   - Your production URLs (if deploying)

### Step 3: Enable Email Provider

1. Go to **Authentication → Providers**.
2. Ensure the **Email** provider is enabled.

### Step 4: (Optional) Enable OAuth Providers

To enable social login (Google, GitHub, etc.):

1. Go to **Authentication → Providers**.
2. Enable your desired providers and add OAuth credentials.

> For detailed Supabase auth configuration, see [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

---

## 5. Running the Application

### Start the backend server

From the `backend/` directory:

```bash
npm run dev
```

The backend will start at **http://localhost:3000**. You can verify it's running by visiting `http://localhost:3000/health`.

### Start the frontend dev server

From the project root (in a separate terminal):

```bash
npm run dev
```

The frontend will start at **http://localhost:5173**.

### Run both simultaneously (from the project root)

Open two terminals:

```bash
# Terminal 1 — Backend
npm run dev:backend

# Terminal 2 — Frontend
npm run dev
```

---

## 6. Deployment

### Frontend (Vercel)

The frontend is configured for Vercel deployment. The [vercel.json](vercel.json) handles SPA routing:

1. Connect your GitHub repo to Vercel.
2. Set the **Root Directory** to the project root.
3. Add your `VITE_*` environment variables in Vercel project settings.
4. Deploy.

### Backend (Vercel Serverless)

The backend has its own [backend/vercel.json](backend/vercel.json) for serverless deployment:

1. Create a separate Vercel project for the backend.
2. Set the **Root Directory** to `backend/`.
3. Add all backend environment variables in Vercel project settings.
4. Set `VERCEL=1` as an environment variable.
5. Deploy.

---

## 7. Available Scripts

### Frontend (root directory)

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run dev:backend` | Start backend from root |

### Backend (`backend/` directory)

| Command | Description |
|---|---|
| `npm run dev` | Start backend with nodemon (auto-reload) |
| `npm start` | Start backend (production) |
| `npm test` | Run tests with Jest |
| `npx prisma studio` | Open Prisma Studio (database GUI) |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma generate` | Regenerate Prisma client |
| `npm run db:seed` | Seed the database |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, React Router v7 |
| Backend | Express 5, Prisma ORM, PostgreSQL |
| Auth | Supabase Auth |
| AI | Anthropic Claude, Google Gemini |
| Deployment | Vercel |
