# Mobile App Setup

The Expo app lives in [mobile/](/Users/riazahmed/Documents/MVP/watch-yourself/mobile).

## What Is Included

- Expo Router app shell
- home, discovery, Taste DNA, and logging screens
- Supabase client setup
- React Query provider
- starter mood data

## Run The App

From [mobile/](/Users/riazahmed/Documents/MVP/watch-yourself/mobile):

```bash
npm install
npm run start
```

Then open the project in:

- iOS Simulator
- Android Emulator
- Expo Go

## Environment Variables

Create `.env` or use EAS secrets later with:

```bash
EXPO_PUBLIC_SUPABASE_URL=...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

The example file is [mobile/.env.example](/Users/riazahmed/Documents/MVP/watch-yourself/mobile/.env.example).

## Current Scope

The current scaffold is intentionally focused on:

- emotional-first home screen
- mood discovery entry points
- initial Taste DNA presentation
- first-pass emotional logging UX

## Recommended Next Steps

1. Add real auth screens and Supabase session handling.
2. Fetch mood tags from Supabase instead of local constants.
3. Wire the log flow to insert into `watch_logs`, `watch_log_emotion_signals`, and `watch_log_context`.
4. Add title search backed by the cached catalog.
