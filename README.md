# WatchYourself

WatchYourself is a movie and series diary that understands not only what people watched, but why they watched it, how it felt, and how their taste changes over time.

## Finalized Stack

WatchYourself is planned as a mobile-first app with this baseline architecture:

- mobile app: Expo + React Native + TypeScript
- navigation: Expo Router
- backend: Supabase
- database: PostgreSQL
- auth: Supabase Auth
- storage: Supabase Storage
- server-side logic: Supabase Edge Functions
- async jobs: scheduled functions for TMDb sync, Taste DNA updates, twin matching, and timeline summaries

Deployment is handled through:

- Expo Application Services for builds, over-the-air updates, and store submission
- Supabase for database, auth, storage, and edge runtime hosting

## Core Product Idea

Letterboxd tracks viewing history.

WatchYourself tracks:

- what you watched
- why you chose it
- what mood you were in
- how it changed your taste profile over time
- who shares your emotional viewing pattern

## Product Pillars

### 1. Logging

Users can:

- log movies
- log series episode by episode
- rate entries
- write reviews
- mark rewatches

### 2. Mood-Based Discovery

Discovery starts with emotional intent instead of genre filters.

Examples:

- Feeling low
- Need intensity
- Comfort watch
- Mind blown
- Existential

### 3. Taste DNA

Each user has a live profile generated from their behavior.

Example signals:

- Drama Affinity
- Slow Pace Tolerance
- Twist Dependency
- Comfort Rewatcher

Social layer:

- find your Movie Twin
- compare match score
- follow similar viewers
- explore what your twins are watching

### 4. Watch Timeline

The app turns logs into a reflective viewing timeline.

Examples:

- weekly summaries
- monthly phases
- yearly mood identity
- long-term taste evolution

The differentiator is life context. A timeline entry should answer not only "what were you watching?" but also "what was happening in your life then?"

## Differentiation

Letterboxd = what you watched

WatchYourself = why you watched + how it felt + who you are

## Product Loops

### Logging Loop

Watch -> Log -> Review -> Repeat

### Mood Loop

Feel -> Discover -> Watch -> Validate mood -> Improve engine

### Social Loop

Log -> Taste DNA updates -> Match users -> Explore others

### Reflection Loop

Log -> Timeline grows -> Reflect -> Emotional attachment deepens

## Data Strategy

Do not depend fully on a third-party API at runtime.

Recommended pattern:

1. fetch metadata from TMDb
2. store normalized titles in our database
3. enrich records with WatchYourself-specific signals such as mood tags, user behavior, and derived taste metrics

This gives us:

- faster reads
- more control over the catalog experience
- proprietary recommendation and identity features

## Deployment Direction

The release path is:

1. build iOS and Android apps with EAS Build
2. test internal builds through EAS distribution
3. ship safe app changes via EAS Update channels
4. submit production builds to TestFlight and Google Play
5. run backend services on Supabase

See the full architecture and deployment decisions in [docs/architecture.md](/Users/riazahmed/Documents/MVP/watch-yourself/docs/architecture.md).
System diagrams are available in [docs/architecture-diagrams.md](/Users/riazahmed/Documents/MVP/watch-yourself/docs/architecture-diagrams.md).

## MVP Focus

The first version should prove 3 things:

1. users are willing to log with mood and reflection context
2. mood-led discovery produces better engagement than genre-first browsing
3. Taste DNA + Movie Twin gives users a reason to return and share

Read the docs in [`docs/`](/Users/riazahmed/Documents/MVP/watch-yourself/docs) for the MVP scope, finalized architecture, data model, and recommendation design.
The product and engineering module map is in [docs/module-map.md](/Users/riazahmed/Documents/MVP/watch-yourself/docs/module-map.md).

The emotion system is further defined in [docs/mood-intelligence.md](/Users/riazahmed/Documents/MVP/watch-yourself/docs/mood-intelligence.md).
The backend scaffold and setup instructions are in [docs/backend-setup.md](/Users/riazahmed/Documents/MVP/watch-yourself/docs/backend-setup.md).
The mobile app scaffold lives in [mobile/](/Users/riazahmed/Documents/MVP/watch-yourself/mobile) with setup notes in [mobile/docs/mobile-setup.md](/Users/riazahmed/Documents/MVP/watch-yourself/mobile/docs/mobile-setup.md).
