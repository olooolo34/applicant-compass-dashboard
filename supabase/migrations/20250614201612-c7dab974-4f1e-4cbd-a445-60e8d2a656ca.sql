
-- Add the job column to the applicants table if it doesn't exist
ALTER TABLE public.applicants ADD COLUMN IF NOT EXISTS job TEXT;

-- Set a default value for existing records
UPDATE public.applicants SET job = '' WHERE job IS NULL;

-- Make the job column NOT NULL with a default value
ALTER TABLE public.applicants ALTER COLUMN job SET DEFAULT '';
ALTER TABLE public.applicants ALTER COLUMN job SET NOT NULL;
