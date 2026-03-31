# WatchYourself Architecture

## Final Decision

WatchYourself will launch as a mobile-first product using Expo and Supabase.

Visual diagrams for the system are available in [docs/architecture-diagrams.md](/Users/riazahmed/Documents/MVP/watch-yourself/docs/architecture-diagrams.md).

## Tech Stack

### Mobile App

- Expo
- React Native
- TypeScript
- Expo Router for navigation
- TanStack Query for server-state fetching and caching
- Zustand for lightweight client-only state
- React Hook Form plus Zod for form handling and validation

### Backend and Data

- Supabase Postgres as the primary database
- Supabase Auth for email, OTP, and social login expansion
- Supabase Storage for avatars and future media assets
- Supabase Edge Functions for privileged or scheduled workflows
- Row Level Security for user data protection

### Third-Party Integrations

- TMDb for title metadata ingestion
- Sentry for crash and error monitoring
- Expo Notifications for push notifications

## Why This Stack

### Why Expo

- one codebase for iOS and Android
- fast iteration for MVP
- mature app build and submission workflow through EAS
- over-the-air updates for non-native changes

### Why Supabase

- managed Postgres fits the relational model of logs, moods, titles, episodes, twins, and summaries
- auth, storage, and database are integrated
- edge functions cover secure background logic without adding a separate always-on backend
- RLS helps keep user-generated diary data safe by default

### Why Not Next.js for MVP

- the product is mobile-first, so a separate web backend layer would add cost and complexity
- most MVP needs can be handled with Supabase policies, SQL, and edge functions
- we can add a Next.js web app later for marketing, admin, or desktop usage without changing the core backend

## System Design

### Client Responsibilities

The mobile app handles:

- onboarding
- title search and detail views
- logging flow
- diary and timeline browsing
- mood-based discovery requests
- Taste DNA and twin profile rendering

### Backend Responsibilities

Supabase handles:

- user accounts
- relational storage
- authorization rules
- media storage
- edge functions for trusted operations
- scheduled jobs and aggregation

### Data Ownership

TMDb is an import source, not the live source of truth.

WatchYourself stores its own:

- normalized titles
- episodes and seasons
- mood mappings
- watch logs
- reviews
- Taste DNA dimensions
- twin matches
- timeline summaries

## Recommended Project Structure

### Mobile App

- `app/` for Expo Router screens and navigation groups
- `components/` for reusable UI
- `features/` for domain modules such as logging, mood discovery, diary, DNA, and twins
- `lib/` for Supabase client, query client, utilities, and config
- `hooks/` for reusable app hooks
- `types/` for shared TypeScript types

### Backend

- `supabase/migrations/` for schema changes
- `supabase/functions/` for edge functions
- `supabase/seed.sql` for local seed data

## Environments

Use 3 environments:

- local
- staging
- production

Each environment should have:

- separate Supabase project
- separate Expo environment variables
- separate EAS build profile and update channel where appropriate

## Environment Variables

### Mobile App

- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`
- `EXPO_PUBLIC_SENTRY_DSN`
- `EXPO_PUBLIC_ENV`

### Edge Functions and Server Secrets

- `SUPABASE_SERVICE_ROLE_KEY`
- `TMDB_API_KEY`
- `SENTRY_AUTH_TOKEN` if release automation is added

## Deployment Plan

### Mobile Release Workflow

1. merge approved code into the release branch
2. run tests and type checks
3. create a staging build with EAS Build
4. validate staging on internal devices
5. publish JS-only changes with EAS Update when safe
6. create production iOS and Android builds with EAS Build
7. submit via EAS Submit to TestFlight and Google Play
8. promote store releases after validation

### Backend Release Workflow

1. apply Supabase migrations
2. deploy edge functions
3. update secrets in the target environment
4. validate scheduled jobs and logs

## Scheduled Jobs

Use scheduled edge functions for:

- TMDb ingestion and refresh
- title mood score refresh
- Taste DNA recomputation
- Movie Twin recomputation
- weekly and monthly timeline summary generation

These jobs should be idempotent so reruns are safe.

## Security Rules

- enable RLS on all user-owned tables
- restrict writes so users can only create and modify their own logs, reviews, and profile data
- use edge functions for any privileged write or secret-bearing integration
- never expose TMDb or service-role secrets to the mobile client

## Scaling Notes

This architecture is strong for MVP and early growth.

If the app grows significantly, we can later add:

- a dedicated recommendation service
- a Next.js admin or marketing site
- a search layer for more advanced discovery
- analytics warehousing for richer Taste DNA modeling

## Final Recommendation

Build version 1 with:

- Expo for the app
- Supabase for the backend
- Postgres as the source of truth
- TMDb as the metadata ingestion source

This keeps the stack lean while preserving room for a much richer product later.
