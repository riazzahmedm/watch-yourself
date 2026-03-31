# WatchYourself Recommendation and Taste DNA Design

## 1. Mood-Based Discovery

Mood-based discovery should feel immediate and human. The user starts with intent, not taxonomy.

### Input Signals

- selected mood tag
- recent watch history
- ratings
- rewatches
- title popularity
- content availability if integrated later

### Ranking Strategy for MVP

Use a weighted score:

`rank_score = mood_fit + personal_affinity + twin_affinity + freshness - repetition_penalty`

Where:

- `mood_fit`: how strongly the title matches the selected mood
- `personal_affinity`: how well it aligns with the user's historical taste
- `twin_affinity`: whether similar users responded well to it
- `freshness`: lightly boost unseen and recently relevant content
- `repetition_penalty`: avoid over-showing already logged titles unless the user likes rewatches

## 2. Taste DNA

Taste DNA should be alive, explainable, and shareable.

### Example Dimensions

- Drama Affinity
- Slow Pace Tolerance
- Twist Dependency
- Comfort Rewatcher
- Darkness Preference
- International Openness
- Character-Driven Bias
- Ending Optimism Preference

### Computation Pattern

For each dimension:

1. define the behavioral signals
2. normalize values to 0-100 or to a small labeled bucket
3. store a confidence score
4. attach a short explanation

Example:

- `Drama Affinity = 78`
- explanation: "You consistently rate dramatic and character-driven titles above your average."

## 3. Movie Twin Matching

Movie Twin is a similarity system based on more than shared favorites.

### Match Inputs

- overlapping title ratings
- mood-response similarity
- Taste DNA vector similarity
- rewatch behavior
- review sentiment patterns

### MVP Match Score

Use a simple weighted cosine similarity or normalized vector comparison across:

- taste dimensions
- genre preferences
- mood usage
- rating distributions

Then expose:

- overall match percentage
- top shared traits
- recently aligned titles

## 4. Timeline Summaries

Timeline summaries should feel reflective and lightly poetic, but grounded in data.

### Inputs

- logs in the period
- dominant moods
- top genres
- average rating
- rewatch count
- optional life notes

### Example Outputs

- "This week leaned dark and introspective."
- "You kept returning to comfort watches while trying heavier thrillers."
- "March felt intense and reflective, with high ratings for slow-burning dramas."

## 5. Cold Start Strategy

For new users:

- seed profile from onboarding favorites
- ask for current mood
- show a curated mood shelf per category
- prioritize broadly loved titles with strong editorial mood tagging

## 6. Why This Becomes Defensible

TMDb gives metadata.

WatchYourself becomes unique through:

- proprietary mood graph
- user-generated emotional context
- Taste DNA computation
- twin similarity graph
- long-term reflective timeline
