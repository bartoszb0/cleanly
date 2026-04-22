# Cleanly

A full-stack two-sided marketplace for booking professional cleaning services. Built to learn and demonstrate Next.js App Router, server-side rendering, and modern full-stack patterns - with Supabase handling the backend so the focus stays entirely on the frontend.

---

## Tech Stack

| Layer              | Technology                              |
| ------------------ | --------------------------------------- |
| Framework          | Next.js 16 (App Router)                 |
| Language           | TypeScript                              |
| Database & Auth    | Supabase (PostgreSQL + Auth + Realtime) |
| Styling            | Tailwind CSS v4                         |
| UI Components      | shadcn/ui + Radix UI                    |
| Forms & Validation | React Hook Form + Zod                   |
| Date Handling      | date-fns + date-fns-tz                  |
| Notifications      | Sonner                                  |

---

## Features

### Customer

- Browse and filter cleaners by city, price range, rating, experience, and whether supplies are included
- Book a cleaner with an interactive date/time picker that checks cleaner availability in real time
- View booking history with status tracking (pending → confirmed → completed)
- Cancel pending or confirmed bookings
- Leave reviews and rate cleaners after a completed job
- Real-time chat with cleaners via Supabase Realtime

### Cleaner

- Dashboard with today's jobs, earnings summary, and recent activity
- Full job list with per-job earnings and month grouping
- Job detail page with same-day conflict detection - see the day's schedule before confirming a pending request
- Confirm or cancel incoming booking requests
- Schedule management - mark days off, browse jobs by date on an interactive calendar
- Reviews page with rating breakdown and sort/filter controls
- Profile page with bio, city, hourly rate, and stats

### Shared

- Email/password authentication with email verification
- Role-based onboarding (separate flows for customers and cleaners)
- Password reset flow
- Toast notifications for all user actions

---

## Context & Purpose

### Why Supabase

Using Supabase as a backend-as-a-service meant skipping infrastructure setup entirely. Supabase provides a type-safe PostgreSQL client, built-in auth with email verification flows, row-level security policies, and a Realtime WebSocket layer for chat. This kept the focus on the frontend.

### Why Server Actions over API Routes

Next.js Server Actions let you call a TypeScript function directly from a component - no `fetch('/api/...')`, no HTTP method handling, no request body parsing. They keep sensitive logic off the client, and integrate natively with Next.js cache invalidation via `revalidatePath`. They're also type-safe end-to-end since there's no HTTP boundary where type information is lost. For a frontend-focused project they removed an entire layer of boilerplate without any tradeoffs.

---

## Architecture Overview

```
app/
├── (auth)/              # Login, sign-up, password reset, email confirm
├── (protected)/         # Role-aware entry point post-login
├── onboarding/          # Branching onboarding: customer vs cleaner
├── customer/            # Customer-facing pages
│   ├── page.tsx         # Browse & filter cleaners
│   ├── cleaner/[id]/    # Cleaner profile + reviews
│   ├── my-bookings/     # Booking history with status tabs
│   └── messages/[id]/   # Realtime chat
└── cleaner/             # Cleaner dashboard
    ├── page.tsx          # Dashboard overview
    ├── jobs/[id]/        # Job detail + conflict detection + confirmation
    ├── schedule/         # Calendar + availability management
    ├── reviews/          # Opinion list with filtering
    └── messages/[id]/   # Realtime chat

lib/
├── actions/   # Server Actions - all mutations and client side data fetches (bookings, schedule, opinions, auth)
├── data/      # Server-side read functions - Supabase queries, React cache()
├── schemas/   # Zod validation schemas
└── supabase/  # Typed Supabase client setup (server + client)
```

**Read vs. write split:** `lib/data/` contains read-only server functions, many wrapped in React `cache()` to deduplicate identical queries within a single render pass. `lib/actions/` contains Server Actions for all mutations, calling `revalidatePath()` on success to keep the UI in sync without manual state management.

**Auth & RLS:** Supabase Row Level Security policies enforce data access at the database level - customers can only see their own bookings, cleaners can only update their own jobs. The application layer doesn't need to re-implement these checks.

**Realtime chat:** Supabase Realtime subscriptions are established on the client inside the messages page. Messages are sent via Server Action (persisted to the database immediately) and received via WebSocket subscription, giving instant delivery without polling.

---

## Technical Highlights

### Same-day conflict detection

When a cleaner opens a pending booking request, the page fetches their existing confirmed jobs for that day and runs an overlap check. If the incoming job would overlap an existing one, the confirm button is disabled and the day's timeline highlights the conflict visually. The check also runs server-side on confirmation as a safety net.

### Live availability during booking

The customer booking form fetches the selected cleaner's schedule for the chosen date as you pick it, displaying booked time slots before you select a start time. Combined with a server-side conflict check on submission, double-bookings are structurally prevented.

### Role-based routing

Customers and cleaners share one auth system but have entirely separate route groups (`/customer/`, `/cleaner/`) with their own layouts and middleware-level route protection. Onboarding branches immediately after signup based on role selection and is shown exactly once.

### Interactive schedule management

The schedule page uses a client-side calendar that fetches days-off and job data per month and per selected day via Server Actions. Navigating to a new month re-fetches availability in the background while the calendar stays interactive. Marking or removing a day off updates immediately and revalidates the calendar state.

---

## Current State

### Complete

- Full authentication flow (signup, login, email verification, password reset)
- **Role redirect** - smart post-login redirect to the correct dashboard based on role
- Customer browsing, filtering, booking, cancellation, reviews, and realtime chat
- Cleaner dashboard, job management, conflict detection, schedule, and reviews

### Planned

- **Avatar upload**
- **Notifications** - no push or email notification system yet
- **Payment integration** - prices are recorded but no payment flow exists
