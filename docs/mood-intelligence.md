# WatchYourself Mood Intelligence

## Goal

Mood and emotion data is the core product advantage, so it must be:

- easy for users to express
- structured enough for modeling
- respectful of privacy
- useful for recommendations, reflection, and social matching

The app should not ask users to perform emotional labor on every log. It should capture just enough signal, then learn intelligently over time.

## Core Principle

Do not treat mood as a single tag.

For WatchYourself, emotional understanding should combine:

- intent before watching
- feeling after watching
- context around the watch
- behavior over time

This creates a richer model than "I watched this because I was sad."

## What We Need To Capture

### 1. Pre-Watch Intent

Why the user chose something.

Examples:

- I need comfort
- I want intensity
- I want something reflective
- I want to escape
- I want to feel surprised

This is the strongest signal for discovery.

### 2. Post-Watch Outcome

How the title actually landed emotionally.

Examples:

- comforting
- draining
- cathartic
- disturbing
- inspiring
- mind-blowing

This is the strongest signal for title mood fit.

### 3. Viewing Context

The circumstances around the watch.

Examples:

- alone or with someone
- late night or weekend afternoon
- fully attentive or background watch
- rough day or celebratory mood

This is what makes timeline reflection feel human rather than statistical.

### 4. Behavioral Evidence

What users do matters as much as what they say.

Examples:

- rewatches
- completion patterns
- ratings
- how often a mood leads to the same kinds of titles
- whether a title fulfilled the intended mood

This is the strongest signal for Taste DNA.

## Capture Model For MVP

The MVP should use a layered capture model.

### Layer A: Fast Mood Selection

In the logging flow, ask:

1. "What did you need?"
2. "How did it leave you feeling?"

Each answer should allow:

- one primary mood
- optional secondary mood

Do not require more than 2 taps per step for most users.

### Layer B: Optional Context

Allow optional lightweight context fields:

- watching alone / with partner / with friends / family
- full attention / partial attention / background
- optional private life note

This should always feel skippable and safe.

### Layer C: Passive Learning

Infer additional emotional signals from:

- rewatch behavior
- rating patterns
- title attributes
- repeated mood-title pairings
- review sentiment later in the roadmap

The app should get smarter without asking longer forms.

## Mood Taxonomy Design

### Rule 1: Use Human Phrases, Not Clinical Language

Good:

- Feeling low
- Need intensity
- Comfort watch
- Existential

Avoid:

- dysphoric
- hyperaroused
- affect regulation

The product should feel personal and emotionally intelligent, not medicalized.

### Rule 2: Separate Intent From Outcome

Pre-watch and post-watch vocabularies should overlap, but not be identical.

Examples:

- pre-watch: comfort, escape, intensity, catharsis, reflection
- post-watch: soothed, energized, disturbed, moved, overwhelmed

This lets us learn whether a title fulfilled the user's goal.

### Rule 3: Limit the Surface Area

Too many mood tags will reduce data quality.

Recommended MVP:

- 8 to 12 pre-watch moods
- 10 to 14 post-watch feelings
- 3 normalized emotional axes behind the scenes

## Recommended MVP Mood Set

### Pre-Watch

- Feeling low
- Need intensity
- Comfort watch
- Want to escape
- Want something deep
- Want to feel inspired
- Want to laugh
- Want to be surprised

### Post-Watch

- Comforted
- Energized
- Moved
- Disturbed
- Drained
- Mind blown
- Reflective
- Inspired
- Let down
- Warm

## Emotional Axes

Tags alone are not enough. Behind the scenes, every mood should also map to emotional axes.

### 1. Valence

How emotionally positive or negative the state feels.

### 2. Energy

How activated or calm the state feels.

### 3. Intensity

How emotionally strong or overwhelming the experience feels.

These axes help us:

- compare related moods
- handle sparse data
- cluster similar users
- avoid brittle one-tag matching

## How The App Should Use This Data

### Discovery

Use pre-watch intent first.

If a user selects `Comfort watch`, ranking should favor:

- high comfort-fit titles
- titles previously successful for similar users in that mood
- lower challenge content unless the user historically likes mixed comfort-plus-depth experiences

### Fulfillment Modeling

Track whether the post-watch outcome matched the pre-watch intent.

Examples:

- wanted comfort -> felt comforted = strong fulfillment
- wanted intensity -> felt bored = weak fulfillment

This becomes a powerful recommendation input because it measures whether a title worked for the job.

### Taste DNA

Taste DNA should include emotional behavior traits such as:

- Comfort Seeker
- Catharsis Chaser
- Emotional Risk Tolerance
- Mood Recovery Pattern
- Rewatches for Regulation

These are more distinctive than genre-only traits.

### Timeline

Timeline summaries should reflect:

- what moods the user sought
- what emotions they actually experienced
- how that changed week to week or month to month

Example:

"You kept reaching for comfort this month, but your highest-rated watches were the ones that challenged you."

## UX Rules For Better Data Quality

- ask for mood at moments that feel natural, not clinical
- use tappable phrases, not long forms
- keep optional fields clearly optional
- separate private reflection from public review
- never require a life note to complete a log
- show users how their answers improve recommendations

## Privacy Rules

This data is sensitive. Treat it that way.

- life notes should be private by default
- emotional inputs should be user-editable
- public sharing should be explicit and granular
- twin matching should use derived traits, not expose raw private context
- avoid implying mental health diagnosis or certainty

## Modeling Strategy

### Confidence Over Certainty

Every inferred emotional trait should have a confidence score.

We should be able to say:

- high confidence: comfort rewatcher
- medium confidence: seeks intensity on weekends
- low confidence: existential preference

### Learn From Patterns, Not One-Offs

Do not overfit on a single log.

Recommendations and Taste DNA should rely on repeated patterns across:

- multiple logs
- multiple mood selections
- ratings and rewatches
- fulfillment outcomes

### Blend Explicit And Inferred Signals

Use a hybrid approach:

- explicit user-selected moods for clarity
- inferred emotional patterns for scale and personalization

Do not replace explicit signals with inference. Use inference to strengthen sparse areas.

## MVP Data Fields To Prioritize

For version 1, the highest-value mood data is:

- pre-watch primary mood
- post-watch primary feeling
- optional secondary mood on each side
- rating
- rewatch
- optional life note
- fulfillment score derived from intent versus outcome

That is enough to build:

- mood discovery
- title mood fit
- early Taste DNA
- Movie Twin matching
- timeline reflection

## Final Product Rule

If a mood question does not clearly improve one of these outcomes, do not ask it:

- better recommendation
- better reflection
- better identity
- better matching

The goal is not to collect emotional data.

The goal is to turn emotional data into something the user genuinely feels understands them.
