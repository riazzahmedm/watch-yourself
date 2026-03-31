# WatchYourself Backend Setup

This project uses Supabase as the backend foundation.

## What Is Included

The backend scaffold now includes:

- Supabase local config in [supabase/config.toml](/Users/riazahmed/Documents/MVP/watch-yourself/supabase/config.toml)
- initial schema migration in [supabase/migrations/20260331170000_initial_schema.sql](/Users/riazahmed/Documents/MVP/watch-yourself/supabase/migrations/20260331170000_initial_schema.sql)
- seed data in [supabase/seed.sql](/Users/riazahmed/Documents/MVP/watch-yourself/supabase/seed.sql)
- edge function stubs in [supabase/functions/sync-tmdb-catalog/index.ts](/Users/riazahmed/Documents/MVP/watch-yourself/supabase/functions/sync-tmdb-catalog/index.ts), [supabase/functions/recompute-taste-dna/index.ts](/Users/riazahmed/Documents/MVP/watch-yourself/supabase/functions/recompute-taste-dna/index.ts), [supabase/functions/recompute-twin-matches/index.ts](/Users/riazahmed/Documents/MVP/watch-yourself/supabase/functions/recompute-twin-matches/index.ts), and [supabase/functions/generate-timeline-summaries/index.ts](/Users/riazahmed/Documents/MVP/watch-yourself/supabase/functions/generate-timeline-summaries/index.ts)

## Schema Coverage

The initial schema covers:

- user profiles
- titles, seasons, and episodes
- mood tags and emotional axes
- watch logs and attached emotion/context records
- taste dimensions and user taste profiles
- twin matches
- timeline summaries

It also includes:

- starter indexes
- `updated_at` triggers
- automatic profile creation on signup
- row level security for user-owned data

## Local Prerequisites

Install the Supabase CLI:

```bash
brew install supabase/tap/supabase
```

If you want to run or test edge functions locally, install Deno:

```bash
brew install deno
```

## Local Development Flow

From the project root:

```bash
supabase start
```

This should boot the local database, auth, storage, studio, and edge runtime using [supabase/config.toml](/Users/riazahmed/Documents/MVP/watch-yourself/supabase/config.toml).

Apply migrations and seed:

```bash
supabase db reset
```

Serve edge functions locally:

```bash
supabase functions serve --env-file .env.local
```

## Required Secrets

For local or hosted functions, set:

- `TMDB_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Suggested Next Backend Tasks

1. Add a second migration for RPCs and materialized views used by discovery and Taste DNA.
2. Implement the TMDb ingestion function so search misses can hydrate the local catalog.
3. Add database functions or jobs to maintain `user_title_stats`.
4. Implement the first Taste DNA recomputation pipeline.
5. Add a minimal Expo client that writes to `watch_logs`, `watch_log_emotion_signals`, and `watch_log_context`.
