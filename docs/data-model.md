# WatchYourself Data Model

## Principles

- keep TMDb data cached and normalized locally
- separate catalog metadata from user-generated interpretation
- design for both movies and episodic content
- store enough event history to recompute Taste DNA over time

## Core Entities

### users

- `id`
- `username`
- `display_name`
- `bio`
- `avatar_url`
- `created_at`

### titles

Shared base entity for movies and series.

- `id`
- `tmdb_id`
- `tmdb_type` (`movie` or `tv`)
- `name`
- `original_name`
- `overview`
- `poster_url`
- `backdrop_url`
- `release_date`
- `original_language`
- `runtime_minutes`
- `status`
- `popularity`
- `vote_average`
- `metadata_json`
- `created_at`
- `updated_at`

### title_genres

- `title_id`
- `genre_name`

### seasons

- `id`
- `title_id`
- `season_number`
- `name`
- `episode_count`

### episodes

- `id`
- `title_id`
- `season_id`
- `tmdb_episode_id`
- `season_number`
- `episode_number`
- `name`
- `runtime_minutes`
- `air_date`

### mood_tags

Platform-defined discovery and reflection tags.

- `id`
- `slug`
- `label`
- `description`
- `category` (`pre_watch`, `post_watch`, `both`)
- `energy_level` nullable
- `valence_level` nullable
- `intensity_level` nullable
- `is_active`

Examples:

- `feeling-low`
- `need-intensity`
- `comfort-watch`
- `mind-blown`
- `existential`

### title_mood_scores

How well a title fits a mood based on editorial seeding + user behavior.

- `title_id`
- `mood_tag_id`
- `score`
- `source` (`editorial`, `behavioral`, `hybrid`)
- `updated_at`

### emotional_axes

Platform-defined continuous emotion dimensions used for normalization and modeling.

- `id`
- `slug`
- `label`
- `description`
- `scale_min`
- `scale_max`

Recommended MVP axes:

- `valence` for negative to positive emotional direction
- `energy` for low to high activation
- `intensity` for soft to overwhelming emotional force

### watch_log_moods

Join table for richer many-to-many emotional capture on a single watch log.

- `watch_log_id`
- `mood_tag_id`
- `phase` (`pre_watch`, `post_watch`)
- `weight`

### watch_log_emotion_signals

Structured emotional data captured during or after a watch event.

- `id`
- `watch_log_id`
- `phase` (`pre_watch`, `post_watch`)
- `primary_mood_tag_id` nullable
- `secondary_mood_tag_id` nullable
- `energy_level` nullable
- `valence_level` nullable
- `intensity_level` nullable
- `confidence` nullable
- `source` (`user_selected`, `inferred`, `hybrid`)
- `created_at`

### watch_log_context

Lightweight life-context metadata attached to a watch event.

- `watch_log_id`
- `time_of_day` nullable
- `watching_with` nullable
- `location_type` nullable
- `attention_level` nullable
- `life_note` nullable
- `private_by_default`

### watch_logs

Atomic logging event.

- `id`
- `user_id`
- `title_id`
- `episode_id` nullable
- `watched_on`
- `rating` nullable
- `review_text` nullable
- `is_rewatch`
- `pre_watch_mood_tag_id` nullable
- `post_watch_mood_tag_id` nullable
- `mood_capture_version`
- `contains_spoilers`
- `created_at`

### watch_sessions

Optional grouping for multi-episode or multi-part watches later.

- `id`
- `user_id`
- `started_at`
- `ended_at`
- `context_note`

### user_title_stats

Cached aggregates for profile reads.

- `user_id`
- `title_id`
- `watch_count`
- `last_watched_at`
- `avg_rating`

### taste_dimensions

Definitions for explainable Taste DNA traits.

- `id`
- `slug`
- `label`
- `description`

Examples:

- `drama-affinity`
- `slow-pace-tolerance`
- `twist-dependency`
- `comfort-rewatcher`
- `darkness-preference`

### user_taste_profile

Latest computed value for each dimension.

- `user_id`
- `taste_dimension_id`
- `value_numeric` nullable
- `value_label` nullable
- `confidence`
- `computed_at`

### user_twin_matches

- `user_id`
- `matched_user_id`
- `match_score`
- `shared_traits_json`
- `computed_at`

### timeline_summaries

- `id`
- `user_id`
- `period_type` (`week`, `month`, `year`, `decade`)
- `period_start`
- `period_end`
- `title`
- `summary_text`
- `metadata_json`
- `created_at`

## Derived Logic

### Mood Fit

Derived from:

- title-level editorial mood mapping
- aggregate post-watch mood responses
- normalized emotional axis similarity
- similar-user behavior
- completion and rating patterns

### Taste DNA

Derived from:

- ratings by genre and mood
- emotional intent before watching
- emotional outcome after watching
- gap between intended mood and achieved mood
- frequency of rewatches
- average runtime preference
- completion of slow-burn vs fast-paced content
- tendency to favor twist-heavy or comforting titles
- review sentiment and themes

### Reflection Timeline

Derived from:

- watch density
- dominant moods
- emotional shifts over time
- rating spread
- review tone
- optional life notes

## Recommended MVP Storage Stack

- relational database for core entities and joins
- JSON columns only for flexible metadata and generated explanations
- background jobs for imports, aggregation, Taste DNA computation, and summary generation
