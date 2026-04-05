insert into public.emotional_axes (slug, label, description, scale_min, scale_max)
values
  ('valence', 'Valence', 'Negative to positive emotional direction.', 0, 100),
  ('energy', 'Energy', 'Calm to activated emotional energy.', 0, 100),
  ('intensity', 'Intensity', 'Soft to overwhelming emotional force.', 0, 100)
on conflict (slug) do nothing;

insert into public.mood_tags (slug, label, description, category, energy_level, valence_level, intensity_level)
values
  ('feeling-low', 'Feeling low', 'Needs something gentle, restorative, or emotionally safe.', 'pre_watch', 20, 25, 30),
  ('need-intensity', 'Need intensity', 'Wants something gripping, fast, or emotionally charged.', 'pre_watch', 80, 45, 85),
  ('comfort-watch', 'Comfort watch', 'Wants familiarity, warmth, and reassurance.', 'pre_watch', 30, 80, 25),
  ('want-to-escape', 'Want to escape', 'Wants immersion and distance from everyday stress.', 'pre_watch', 45, 60, 40),
  ('want-something-deep', 'Want something deep', 'Wants reflection, complexity, or existential weight.', 'pre_watch', 40, 45, 75),
  ('want-to-feel-inspired', 'Want to feel inspired', 'Wants uplift, hope, or motivation.', 'pre_watch', 55, 85, 55),
  ('want-to-laugh', 'Want to laugh', 'Wants easy joy and mood-lifting entertainment.', 'pre_watch', 65, 90, 40),
  ('want-to-be-surprised', 'Want to be surprised', 'Wants novelty, twists, or unpredictability.', 'pre_watch', 70, 55, 70),
  ('comforted', 'Comforted', 'Left feeling soothed, safe, or emotionally held.', 'post_watch', 20, 85, 25),
  ('energized', 'Energized', 'Left feeling activated, alert, or fired up.', 'post_watch', 85, 75, 65),
  ('moved', 'Moved', 'Left feeling emotionally touched or stirred.', 'post_watch', 40, 65, 70),
  ('disturbed', 'Disturbed', 'Left unsettled, uneasy, or emotionally rattled.', 'post_watch', 60, 20, 80),
  ('drained', 'Drained', 'Left depleted or emotionally heavy.', 'post_watch', 25, 15, 60),
  ('mind-blown', 'Mind blown', 'Left stunned by ideas, execution, or twists.', 'post_watch', 75, 60, 95),
  ('reflective', 'Reflective', 'Left thinking deeply after the watch.', 'post_watch', 35, 50, 60),
  ('inspired', 'Inspired', 'Left hopeful, motivated, or creatively charged.', 'post_watch', 55, 88, 55),
  ('let-down', 'Let down', 'Expected more and did not feel fulfilled.', 'post_watch', 20, 20, 35),
  ('warm', 'Warm', 'Left with a soft, affectionate, or quietly positive feeling.', 'post_watch', 25, 82, 20)
on conflict (slug) do nothing;

insert into public.taste_dimensions (slug, label, description)
values
  ('drama-affinity', 'Drama Affinity', 'How strongly the user favors dramatic storytelling.'),
  ('slow-pace-tolerance', 'Slow Pace Tolerance', 'How comfortable the user is with slower, more deliberate pacing.'),
  ('twist-dependency', 'Twist Dependency', 'How much the user seeks surprise, reveals, and structural payoff.'),
  ('comfort-rewatcher', 'Comfort Rewatcher', 'How often the user returns to emotionally safe titles.'),
  ('darkness-preference', 'Darkness Preference', 'How much the user gravitates toward heavy, dark, or unsettling material.'),
  ('comfort-seeker', 'Comfort Seeker', 'How often the user chooses content for soothing or recovery.'),
  ('catharsis-chaser', 'Catharsis Chaser', 'How often the user seeks emotionally intense release.'),
  ('emotional-risk-tolerance', 'Emotional Risk Tolerance', 'How open the user is to challenging, draining, or destabilizing watches.'),
  ('mood-recovery-pattern', 'Mood Recovery Pattern', 'Whether the user tends to recover through warmth, laughter, intensity, or reflection.')
on conflict (slug) do nothing;

insert into public.titles (
  tmdb_id,
  tmdb_type,
  name,
  original_name,
  overview,
  release_date,
  original_language,
  runtime_minutes,
  status,
  popularity,
  vote_average,
  metadata_json
)
values
  (
    666277,
    'movie',
    'Past Lives',
    'Past Lives',
    'Two deeply connected childhood friends reunite years later and confront what changed and what never did.',
    '2023-06-02',
    'en',
    106,
    'Released',
    45.0,
    7.7,
    '{}'::jsonb
  ),
  (
    965150,
    'movie',
    'Aftersun',
    'Aftersun',
    'A daughter revisits the quiet emotional textures of a holiday she once shared with her father.',
    '2022-10-21',
    'en',
    101,
    'Released',
    39.0,
    7.7,
    '{}'::jsonb
  ),
  (
    76,
    'movie',
    'Before Sunrise',
    'Before Sunrise',
    'Two strangers meet on a train and spend one night walking, talking, and falling into each other''s world.',
    '1995-01-27',
    'en',
    101,
    'Released',
    28.0,
    7.9,
    '{}'::jsonb
  ),
  (
    238,
    'movie',
    'The Godfather',
    'The Godfather',
    'The aging patriarch of a crime dynasty transfers power to his reluctant son.',
    '1972-03-14',
    'en',
    175,
    'Released',
    78.0,
    8.7,
    '{}'::jsonb
  )
on conflict (tmdb_id, tmdb_type) do nothing;
