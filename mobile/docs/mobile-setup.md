# Mobile App Setup

The Expo app lives in [mobile/](/Users/riazahmed/Documents/MVP/watch-yourself/mobile).

The broader product and engineering breakdown is documented in [docs/module-map.md](/Users/riazahmed/Documents/MVP/watch-yourself/docs/module-map.md).

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

For local Supabase, get the anon key from:

```bash
supabase status
```

Then place that value into `EXPO_PUBLIC_SUPABASE_ANON_KEY`.

## Current Scope

The current scaffold is intentionally focused on:

- emotional-first home screen
- mood discovery entry points
- initial Taste DNA presentation
- first-pass emotional logging UX

## Recommended Next Steps

1. Build onboarding so new users can seed taste and mood signals immediately.
2. Replace the seeded title picker with real search and title detail flows.
3. Refine logging with richer context fields and validation.
4. Add diary/history queries so saved logs are visible in-app.

## Auth and Profile Test Flow

To validate the Auth and Profile module end to end:

1. Start local Supabase from the repo root with `supabase start`.
2. Make sure [mobile/.env.example](/Users/riazahmed/Documents/MVP/watch-yourself/mobile/.env.example) is copied to `.env` with the correct local URL and publishable key.
3. Run the app from [mobile/](/Users/riazahmed/Documents/MVP/watch-yourself/mobile) with `npm run start`.
4. Open `/auth` in the app and create an account with:
   - display name
   - username
   - email
   - password
5. Confirm you are redirected into the signed-in experience.
6. Open `/profile`, edit the profile fields, and save.
7. Sign out and sign back in to confirm session persistence and profile retrieval both work.
