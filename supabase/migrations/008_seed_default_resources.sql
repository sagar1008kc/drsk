-- Seed default downloadable resources outside of page rendering.

insert into public.resources (
  title,
  slug,
  description,
  storage_key,
  thumbnail_url,
  category,
  resource_type,
  is_active
)
values
  (
    'Motivational eBook 01',
    'motivational-ebook-01',
    'Free starter guide with practical prompts to reset your mindset and move forward with clarity.',
    'ebook/motivational_ebook_01.pdf',
    '/stop_overthinking.png',
    'free-sample',
    'PDF',
    true
  ),
  (
    'Stop Overthinking',
    'stop-overthinking-premium',
    'Premium practical guide for breaking overthinking loops, calming stress patterns, and moving ahead with clarity.',
    'books/stop_overthinking.pdf',
    '/stop_overthinking.png',
    'premium',
    'PDF',
    true
  ),
  (
    'Motivational eBook 03',
    'motivational-ebook-03',
    'Premium calming toolkit focused on overthinking, stress loops, and practical emotional grounding.',
    'ebook/motivational_ebook_03.pdf',
    '/stop_overthinking.png',
    'premium',
    'PDF',
    true
  ),
  (
    'Motivational eBook 04',
    'motivational-ebook-04',
    'Premium resilience playbook to recover from setbacks and turn uncertain moments into clear action.',
    'ebook/motivational_ebook_04.pdf',
    '/stop_overthinking.png',
    'premium',
    'PDF',
    true
  ),
  (
    'Motivational eBook 05',
    'motivational-ebook-05',
    'Premium growth edition with deeper routines and planning frameworks for long-term transformation.',
    'ebook/motivational_ebook_05.pdf',
    '/stop_overthinking.png',
    'premium',
    'PDF',
    true
  )
on conflict (slug) do update
set
  title = excluded.title,
  description = excluded.description,
  storage_key = excluded.storage_key,
  thumbnail_url = excluded.thumbnail_url,
  category = excluded.category,
  resource_type = excluded.resource_type,
  is_active = excluded.is_active,
  updated_at = now();
