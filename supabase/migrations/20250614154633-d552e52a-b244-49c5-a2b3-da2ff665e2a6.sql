
-- Create storage bucket for applicant profile pictures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'applicant-profiles',
  'applicant-profiles',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
);

-- Create storage policy to allow public uploads
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'applicant-profiles' );

CREATE POLICY "Public Upload"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'applicant-profiles' );

CREATE POLICY "Public Update"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'applicant-profiles' );

CREATE POLICY "Public Delete"
ON storage.objects FOR DELETE
USING ( bucket_id = 'applicant-profiles' );

-- Create applicants table
CREATE TABLE public.applicants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_picture TEXT,
  full_name TEXT NOT NULL,
  gender TEXT NOT NULL,
  age INTEGER NOT NULL,
  passport_number TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('accepted', 'pending', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on applicants table
ALTER TABLE public.applicants ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for applicants (public access for demo)
CREATE POLICY "Public read access"
ON public.applicants FOR SELECT
TO public
USING (true);

CREATE POLICY "Public insert access"
ON public.applicants FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Public update access"
ON public.applicants FOR UPDATE
TO public
USING (true);

CREATE POLICY "Public delete access"
ON public.applicants FOR DELETE
TO public
USING (true);
