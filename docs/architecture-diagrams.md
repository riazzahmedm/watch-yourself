# WatchYourself Architecture Diagrams

This document visualizes the mobile, backend, and mood-intelligence architecture for WatchYourself.

## 1. System Architecture

```mermaid
flowchart TB
    user["User"]

    subgraph mobile["Mobile App (Expo + React Native)"]
        ui["UI Screens<br/>Onboarding<br/>Home<br/>Search<br/>Log Flow<br/>Diary<br/>Taste DNA<br/>Timeline"]
        state["Client State<br/>TanStack Query<br/>Zustand"]
        notifications["Expo Notifications"]
        sentry_client["Sentry SDK"]
    end

    subgraph backend["Supabase Backend"]
        auth["Supabase Auth"]
        db["Postgres Database"]
        storage["Supabase Storage"]
        rls["RLS Policies"]
        edge["Edge Functions"]
        cron["Scheduled Jobs"]
    end

    subgraph data_services["External Services"]
        tmdb["TMDb API"]
        eas["EAS Build / Update / Submit"]
        sentry["Sentry"]
        stores["App Store / Play Store"]
    end

    user --> ui
    ui --> state
    state --> auth
    state --> db
    state --> storage
    state --> edge
    state --> notifications
    state --> sentry_client

    auth --> rls
    db --> rls
    edge --> db
    edge --> storage
    cron --> edge
    edge --> tmdb

    sentry_client --> sentry
    eas --> stores
```

## 2. Core Product Data Flow

```mermaid
flowchart LR
    tmdb["TMDb Metadata"] --> ingest["Catalog Ingestion Function"]
    ingest --> titles["Titles / Seasons / Episodes"]
    titles --> title_moods["Title Mood Scores"]

    user["User"] --> onboarding["Onboarding"]
    user --> logging["Logging Flow"]
    user --> discovery["Mood Discovery"]

    onboarding --> preferences["Initial Preferences"]
    logging --> watch_logs["Watch Logs"]
    logging --> emotion["Emotion Signals"]
    logging --> context["Watch Context"]

    preferences --> taste_jobs["Taste DNA Jobs"]
    watch_logs --> taste_jobs
    emotion --> taste_jobs
    context --> taste_jobs

    watch_logs --> twin_jobs["Twin Matching Jobs"]
    emotion --> twin_jobs

    watch_logs --> timeline_jobs["Timeline Summary Jobs"]
    context --> timeline_jobs
    emotion --> timeline_jobs

    title_moods --> discovery_ranker["Discovery Ranker"]
    taste_jobs --> taste_profile["User Taste Profile"]
    twin_jobs --> twins["Twin Matches"]
    timeline_jobs --> timeline["Timeline Summaries"]

    taste_profile --> discovery_ranker
    twins --> discovery_ranker
    discovery --> discovery_ranker
    discovery_ranker --> recommendations["Mood-Based Recommendations"]
```

## 3. Mood Intelligence Pipeline

```mermaid
flowchart TB
    subgraph inputs["Emotion Inputs"]
        pre["Pre-Watch Intent<br/>primary mood<br/>optional secondary mood"]
        post["Post-Watch Outcome<br/>primary feeling<br/>optional secondary feeling"]
        context["Context<br/>with whom<br/>attention level<br/>private life note"]
        behavior["Behavior<br/>rating<br/>rewatch<br/>completion<br/>repeat patterns"]
    end

    subgraph modeling["Modeling Layer"]
        normalize["Normalize to Emotional Axes<br/>valence<br/>energy<br/>intensity"]
        fulfillment["Fulfillment Score<br/>intended emotion vs actual outcome"]
        title_fit["Title Mood Fit"]
        user_traits["Taste DNA Traits"]
        similarity["Movie Twin Similarity"]
        reflection["Reflection Signals"]
    end

    subgraph outputs["User-Facing Outputs"]
        recs["Mood Recommendations"]
        dna["Taste DNA"]
        twins["Movie Twin"]
        timeline["Watch Timeline"]
    end

    pre --> normalize
    post --> normalize
    context --> reflection
    behavior --> fulfillment
    normalize --> fulfillment
    normalize --> title_fit
    normalize --> user_traits
    behavior --> user_traits
    fulfillment --> user_traits
    user_traits --> similarity
    title_fit --> recs
    user_traits --> recs
    similarity --> twins
    user_traits --> dna
    reflection --> timeline
    fulfillment --> timeline
```

## 4. Runtime Request Flow

```mermaid
sequenceDiagram
    participant U as User
    participant A as Expo App
    participant S as Supabase Auth
    participant D as Postgres
    participant F as Edge Functions
    participant T as TMDb

    U->>A: Open app and sign in
    A->>S: Authenticate user
    S-->>A: Session token

    U->>A: Search for a title
    A->>D: Query cached catalog
    alt Title exists locally
        D-->>A: Return title data
    else Title missing or stale
        A->>F: Request catalog fetch
        F->>T: Fetch title metadata
        T-->>F: Title payload
        F->>D: Store normalized catalog data
        D-->>A: Return fresh title data
    end

    U->>A: Log watch with mood and rating
    A->>D: Insert watch log, mood signals, context
    D-->>A: Success

    F->>D: Scheduled recompute for Taste DNA and twins
    D-->>F: Aggregated behavior signals
    F->>D: Update taste profiles, twin matches, summaries

    U->>A: Open Mood Discovery
    A->>D: Fetch recommendations inputs
    D-->>A: Mood scores, taste profile, twin context
    A-->>U: Personalized recommendations
```

## 5. Deployment Architecture

```mermaid
flowchart LR
    dev["Developer Workflow"] --> git["Git Repository"]
    git --> ci["CI Checks<br/>lint<br/>types<br/>tests"]

    ci --> eas_build["EAS Build"]
    ci --> supabase_deploy["Supabase Migrations + Functions"]

    eas_build --> internal["Internal Builds"]
    eas_build --> prod_binary["Production Binaries"]
    prod_binary --> testflight["TestFlight"]
    prod_binary --> play["Google Play"]

    git --> eas_update["EAS Update Channels"]
    eas_update --> staging["Staging Channel"]
    eas_update --> production["Production Channel"]

    supabase_deploy --> staging_db["Staging Supabase"]
    supabase_deploy --> prod_db["Production Supabase"]
```

## Notes

- The app client should talk directly to Supabase for standard user-scoped operations protected by RLS.
- Edge Functions should handle any privileged workflows, secret-bearing integrations, and scheduled recomputation.
- The emotional modeling layer should be explainable, confidence-based, and resilient to sparse early data.
