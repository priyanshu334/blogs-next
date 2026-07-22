-- Run this in Supabase Dashboard → SQL Editor
-- https://supabase.com/dashboard/project/_/sql

create extension if not exists "pgcrypto";

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  content text not null,
  category text not null default 'Foundations',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists posts_slug_idx on public.posts (slug);
create index if not exists posts_published_created_at_idx
  on public.posts (published, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;

create trigger posts_set_updated_at
before update on public.posts
for each row
execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "Public can read posts" on public.posts;
drop policy if exists "Public can insert posts" on public.posts;

create policy "Public can read posts"
on public.posts
for select
using (true);

create policy "Public can insert posts"
on public.posts
for insert
with check (true);

-- Optional seed data
insert into public.posts (title, slug, excerpt, content, category, published)
values (
  'Why Foundations Matter',
  'why-foundations-matter',
  'A short intro to building strong computing fundamentals.',
  'Start with the basics: memory, CPU, and how software maps to hardware.

Strong foundations make every system easier to reason about.',
  'Foundations',
  true
)
on conflict (slug) do nothing;
