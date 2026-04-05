# WatchYourself Module Map

This document defines the major product and engineering modules for WatchYourself so the app can be built in a deliberate order without losing its core idea.

## Guiding Principle

WatchYourself should not be built as a generic movie app with moods sprinkled on top.

The module map should reinforce the real product promise:

- log what you watched
- capture why you chose it
- understand how it made you feel
- turn that into identity, discovery, and reflection over time

## Product Modules

### 1. Auth and Profile

Purpose:

- create user identity
- persist personal history
- support private emotional data safely

Includes:

- sign up
- sign in
- session persistence
- profile basics

Priority:

- MVP required

### 2. Onboarding

Purpose:

- reduce cold start
- initialize emotional and taste signals early

Includes:

- favorite titles
- common moods
- what the user usually wants from watching

Priority:

- MVP required

### 3. Home

Purpose:

- be the emotional entry point into the app

Includes:

- quick mood shortcuts
- personal summary card
- shortcut to logging
- shortcut to Taste DNA
- later: twin activity and continue watching

Priority:

- MVP required

### 4. Catalog

Purpose:

- own the title metadata layer locally
- support movies and episodic content

Includes:

- titles
- seasons
- episodes
- local metadata cache from TMDb

Priority:

- MVP required

### 5. Search and Title Detail

Purpose:

- let users find a title and understand its mood fit

Includes:

- search
- title metadata
- mood fit
- community mood signals
- log entry point

Priority:

- MVP required

### 6. Logging

Purpose:

- create the core behavioral and emotional event

Includes:

- movie log
- series episode log
- watched date
- rating
- review
- rewatch
- pre-watch mood
- post-watch feeling
- optional life note

Priority:

- MVP required

### 7. Mood Discovery

Purpose:

- make discovery start from intent instead of genre

Includes:

- mood shelves
- mood recommendation results
- fulfillment-aware ranking later

Priority:

- MVP required

### 8. Diary

Purpose:

- make logging visible and revisitable

Includes:

- chronological logs
- filters by mood, rating, format, rewatch

Priority:

- MVP required

### 9. Taste DNA

Purpose:

- translate user behavior into identity

Includes:

- taste dimensions
- explanations
- recent shifts

Priority:

- MVP required

### 10. Movie Twin

Purpose:

- create shareability and network effect

Includes:

- match score
- shared traits
- aligned titles
- later: follow and activity

Priority:

- MVP-lite

For version 1, a simple twin card or top matches list is enough.

### 11. Timeline and Reflection

Purpose:

- create emotional attachment and long-term retention

Includes:

- weekly summaries
- monthly summaries
- reflective prompts
- later: yearly identity recap

Priority:

- MVP-lite

### 12. Notifications

Purpose:

- improve retention without becoming spammy

Includes:

- recap availability
- mood prompts
- twin activity later

Priority:

- post-MVP

## Backend Modules

### 1. Auth Module

- Supabase Auth
- profile creation trigger
- session-safe client access

### 2. Catalog Module

- TMDb ingestion
- title, season, and episode storage
- refresh jobs

### 3. Mood Intelligence Module

- mood tags
- emotional axes
- title mood scores
- fulfillment modeling later

### 4. Logging Module

- watch logs
- emotion signals
- watch context

### 5. Taste DNA Module

- taste dimensions
- profile recomputation jobs
- explanations

### 6. Twin Matching Module

- similarity calculation
- shared trait explanations
- cached match results

### 7. Timeline Module

- weekly and monthly summaries
- reflective phrasing layer

### 8. Security Module

- RLS
- public-safe reads
- privileged writes through functions where needed

## Recommended MVP Build Order

Build in this order:

1. Auth and Profile
2. Onboarding
3. Catalog
4. Search and Title Detail
5. Logging
6. Diary
7. Mood Discovery
8. Taste DNA
9. Movie Twin
10. Timeline and Reflection

This order keeps the product loops intact:

- you cannot build meaningful discovery without logging data
- you cannot build DNA without logs
- you cannot build twins or timeline without DNA and logs

## Current Module Status

### Implemented or Started

- Auth and Profile
- Home
- Mood Discovery shell
- Logging first pass
- Taste DNA placeholder
- backend schema
- seed data

### Missing or Not Yet Mature

- Onboarding
- Search and Title Detail
- Diary
- Movie Twin
- Timeline and Reflection
- real catalog ingestion
- real Taste DNA job logic
- real twin matching logic

## Recommended Mobile Folder Structure

The Expo app should move toward this feature-oriented structure:

```text
mobile/
  app/
    _layout.tsx
    index.tsx
    auth.tsx
    onboarding/
    search/
    title/
    log/
    diary/
    dna/
    twins/
    timeline/
  features/
    auth/
      api.ts
      hooks.ts
      types.ts
    onboarding/
      components/
      state/
    catalog/
      api.ts
      hooks.ts
      types.ts
    mood/
      api.ts
      mood-data.ts
      helpers.ts
      types.ts
    logging/
      api.ts
      components/
      hooks.ts
      schema.ts
      types.ts
    diary/
      api.ts
      components/
    discovery/
      api.ts
      components/
    dna/
      api.ts
      components/
    twins/
      api.ts
      components/
    timeline/
      api.ts
      components/
  components/
    ui/
  lib/
    env.ts
    query-client.ts
    supabase.ts
  providers/
  hooks/
  types/
```

## Ownership Rules

To keep the codebase clean:

- route files in `app/` should stay thin
- business logic should live in `features/`
- shared infrastructure should live in `lib/` or `providers/`
- one feature should own its own API calls, types, and UI components where possible

## Immediate Recommendation

Before adding more screens, align work to these 4 near-term modules:

1. Onboarding
2. Search and Title Detail
3. Logging refinement
4. Diary

That gives the product a real usable loop before we spend time on richer DNA or social layers.
