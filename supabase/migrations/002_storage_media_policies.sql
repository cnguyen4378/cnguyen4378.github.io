-- Storage policies for the public `media` bucket
-- Run in Supabase SQL editor after the bucket exists.

-- Allow anyone to read public media (portfolio pages)
create policy "Public read media bucket"
on storage.objects for select
to public
using (bucket_id = 'media');

-- Allow signed-in admin to upload
create policy "Authenticated upload media bucket"
on storage.objects for insert
to authenticated
with check (bucket_id = 'media');

-- Allow signed-in admin to update/replace
create policy "Authenticated update media bucket"
on storage.objects for update
to authenticated
using (bucket_id = 'media')
with check (bucket_id = 'media');

-- Allow signed-in admin to delete
create policy "Authenticated delete media bucket"
on storage.objects for delete
to authenticated
using (bucket_id = 'media');
