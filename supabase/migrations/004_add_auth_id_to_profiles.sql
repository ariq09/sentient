-- Link public profiles securely to backend authentication users
ALTER TABLE public.profiles ADD COLUMN auth_id uuid REFERENCES auth.users(id);
