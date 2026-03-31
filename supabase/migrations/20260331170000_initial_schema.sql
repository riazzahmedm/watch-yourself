create extension if not exists "pgcrypto";

create type public.title_kind as enum ('movie', 'tv');
create type public.mood_category as enum ('pre_watch', 'post_watch', 'both');
create type public.mood_phase as enum ('pre_watch', 'post_watch');
create type public.mood_score_source as enum ('editorial', 'behavioral', 'hybrid');
create type public.signal_source as enum ('user_selected', 'inferred', 'hybrid');
create type public.timeline_period as enum ('week', 'month', 'year', 'decade');
create type public.attention_level as enum ('full', 'partial', 'background');
create type public.watching_with_type as enum ('alone', 'partner', 'friends', 'family', 'group');
create type public.location_type as enum ('home', 'cinema', 'travel', 'other');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.titles (
  id uuid primary key default gen_random_uuid(),
  tmdb_id bigint not null,
  tmdb_type public.title_kind not null,
  name text not null,
  original_name text,
  overview text,
  poster_url text,
  backdrop_url text,
  release_date date,
  original_language text,
  runtime_minutes integer,
  status text,
  popularity numeric(10, 4),
  vote_average numeric(4, 2),
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (tmdb_id, tmdb_type)
);

create table public.title_genres (
  title_id uuid not null references public.titles(id) on delete cascade,
  genre_name text not null,
  primary key (title_id, genre_name)
);

create table public.seasons (
  id uuid primary key default gen_random_uuid(),
  title_id uuid not null references public.titles(id) on delete cascade,
  season_number integer not null,
  name text,
  episode_count integer,
  created_at timestamptz not null default timezone('utc', now()),
  unique (title_id, season_number)
);

create table public.episodes (
  id uuid primary key default gen_random_uuid(),
  title_id uuid not null references public.titles(id) on delete cascade,
  season_id uuid not null references public.seasons(id) on delete cascade,
  tmdb_episode_id bigint,
  season_number integer not null,
  episode_number integer not null,
  name text not null,
  runtime_minutes integer,
  air_date date,
  created_at timestamptz not null default timezone('utc', now()),
  unique (season_id, episode_number)
);

create table public.mood_tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  description text,
  category public.mood_category not null,
  energy_level smallint,
  valence_level smallint,
  intensity_level smallint,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.emotional_axes (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  description text,
  scale_min smallint not null default 0,
  scale_max smallint not null default 100,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.title_mood_scores (
  title_id uuid not null references public.titles(id) on delete cascade,
  mood_tag_id uuid not null references public.mood_tags(id) on delete cascade,
  score numeric(5, 2) not null check (score >= 0 and score <= 100),
  source public.mood_score_source not null,
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (title_id, mood_tag_id, source)
);

create table public.watch_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title_id uuid not null references public.titles(id) on delete cascade,
  episode_id uuid references public.episodes(id) on delete set null,
  watched_on date not null,
  rating smallint check (rating between 1 and 10),
  review_text text,
  is_rewatch boolean not null default false,
  pre_watch_mood_tag_id uuid references public.mood_tags(id) on delete set null,
  post_watch_mood_tag_id uuid references public.mood_tags(id) on delete set null,
  mood_capture_version integer not null default 1,
  contains_spoilers boolean not null default false,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.watch_log_moods (
  watch_log_id uuid not null references public.watch_logs(id) on delete cascade,
  mood_tag_id uuid not null references public.mood_tags(id) on delete cascade,
  phase public.mood_phase not null,
  weight numeric(4, 2) not null default 1.0 check (weight > 0 and weight <= 1.0),
  primary key (watch_log_id, mood_tag_id, phase)
);

create table public.watch_log_emotion_signals (
  id uuid primary key default gen_random_uuid(),
  watch_log_id uuid not null references public.watch_logs(id) on delete cascade,
  phase public.mood_phase not null,
  primary_mood_tag_id uuid references public.mood_tags(id) on delete set null,
  secondary_mood_tag_id uuid references public.mood_tags(id) on delete set null,
  energy_level smallint check (energy_level between 0 and 100),
  valence_level smallint check (valence_level between 0 and 100),
  intensity_level smallint check (intensity_level between 0 and 100),
  confidence numeric(4, 2) check (confidence between 0 and 1),
  source public.signal_source not null default 'user_selected',
  created_at timestamptz not null default timezone('utc', now())
);

create table public.watch_log_context (
  watch_log_id uuid primary key references public.watch_logs(id) on delete cascade,
  time_of_day text,
  watching_with public.watching_with_type,
  location_type public.location_type,
  attention_level public.attention_level,
  life_note text,
  private_by_default boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.user_title_stats (
  user_id uuid not null references auth.users(id) on delete cascade,
  title_id uuid not null references public.titles(id) on delete cascade,
  watch_count integer not null default 0,
  last_watched_at timestamptz,
  avg_rating numeric(4, 2),
  updated_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, title_id)
);

create table public.taste_dimensions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  description text,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.user_taste_profile (
  user_id uuid not null references auth.users(id) on delete cascade,
  taste_dimension_id uuid not null references public.taste_dimensions(id) on delete cascade,
  value_numeric numeric(5, 2),
  value_label text,
  confidence numeric(4, 2) not null default 0 check (confidence between 0 and 1),
  explanation text,
  computed_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, taste_dimension_id)
);

create table public.user_twin_matches (
  user_id uuid not null references auth.users(id) on delete cascade,
  matched_user_id uuid not null references auth.users(id) on delete cascade,
  match_score numeric(5, 2) not null check (match_score between 0 and 100),
  shared_traits_json jsonb not null default '[]'::jsonb,
  computed_at timestamptz not null default timezone('utc', now()),
  primary key (user_id, matched_user_id),
  check (user_id <> matched_user_id)
);

create table public.timeline_summaries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  period_type public.timeline_period not null,
  period_start date not null,
  period_end date not null,
  title text not null,
  summary_text text not null,
  metadata_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  unique (user_id, period_type, period_start, period_end)
);

create index titles_name_idx on public.titles using gin (to_tsvector('simple', name));
create index watch_logs_user_id_idx on public.watch_logs (user_id, watched_on desc);
create index watch_logs_title_id_idx on public.watch_logs (title_id, watched_on desc);
create index watch_logs_pre_mood_idx on public.watch_logs (pre_watch_mood_tag_id);
create index watch_logs_post_mood_idx on public.watch_logs (post_watch_mood_tag_id);
create index user_twin_matches_user_id_idx on public.user_twin_matches (user_id, match_score desc);
create index timeline_summaries_user_period_idx on public.timeline_summaries (user_id, period_type, period_start desc);

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_titles_updated_at
before update on public.titles
for each row execute function public.set_updated_at();

create trigger set_watch_logs_updated_at
before update on public.watch_logs
for each row execute function public.set_updated_at();

create trigger set_user_title_stats_updated_at
before update on public.user_title_stats
for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.raw_user_meta_data ->> 'username',
    coalesce(new.raw_user_meta_data ->> 'display_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.watch_logs enable row level security;
alter table public.watch_log_moods enable row level security;
alter table public.watch_log_emotion_signals enable row level security;
alter table public.watch_log_context enable row level security;
alter table public.user_title_stats enable row level security;
alter table public.user_taste_profile enable row level security;
alter table public.user_twin_matches enable row level security;
alter table public.timeline_summaries enable row level security;

create policy "public read titles" on public.titles
for select using (true);

create policy "public read title_genres" on public.title_genres
for select using (true);

create policy "public read seasons" on public.seasons
for select using (true);

create policy "public read episodes" on public.episodes
for select using (true);

create policy "public read mood tags" on public.mood_tags
for select using (true);

create policy "public read emotional axes" on public.emotional_axes
for select using (true);

create policy "public read title mood scores" on public.title_mood_scores
for select using (true);

create policy "users manage own profile" on public.profiles
for all using (auth.uid() = id)
with check (auth.uid() = id);

create policy "users read own watch logs" on public.watch_logs
for select using (auth.uid() = user_id);

create policy "users insert own watch logs" on public.watch_logs
for insert with check (auth.uid() = user_id);

create policy "users update own watch logs" on public.watch_logs
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "users delete own watch logs" on public.watch_logs
for delete using (auth.uid() = user_id);

create policy "users manage own watch log moods" on public.watch_log_moods
for all using (
  exists (
    select 1 from public.watch_logs
    where public.watch_logs.id = watch_log_moods.watch_log_id
      and public.watch_logs.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.watch_logs
    where public.watch_logs.id = watch_log_moods.watch_log_id
      and public.watch_logs.user_id = auth.uid()
  )
);

create policy "users manage own watch log emotion signals" on public.watch_log_emotion_signals
for all using (
  exists (
    select 1 from public.watch_logs
    where public.watch_logs.id = watch_log_emotion_signals.watch_log_id
      and public.watch_logs.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.watch_logs
    where public.watch_logs.id = watch_log_emotion_signals.watch_log_id
      and public.watch_logs.user_id = auth.uid()
  )
);

create policy "users manage own watch log context" on public.watch_log_context
for all using (
  exists (
    select 1 from public.watch_logs
    where public.watch_logs.id = watch_log_context.watch_log_id
      and public.watch_logs.user_id = auth.uid()
  )
)
with check (
  exists (
    select 1 from public.watch_logs
    where public.watch_logs.id = watch_log_context.watch_log_id
      and public.watch_logs.user_id = auth.uid()
  )
);

create policy "users read own title stats" on public.user_title_stats
for select using (auth.uid() = user_id);

create policy "users read own taste profile" on public.user_taste_profile
for select using (auth.uid() = user_id);

create policy "users read own twin matches" on public.user_twin_matches
for select using (auth.uid() = user_id or auth.uid() = matched_user_id);

create policy "users read own timeline summaries" on public.timeline_summaries
for select using (auth.uid() = user_id);
