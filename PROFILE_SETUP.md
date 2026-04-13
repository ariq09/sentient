# Profile Setup - Database Migration

## What's New

This update implements the profile creation and display functionality for your social media app.

## Setup Instructions

### 1. Create the Profiles Table in Supabase

You need to run the migration SQL to create the `profiles` table. Here's how:

**Option A: Using Supabase Dashboard (Recommended)**
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase/migrations/001_create_profiles_table.sql`
4. Paste it into the SQL editor
5. Click **Run**

**Option B: Using CLI** (if you have Supabase CLI installed)
```bash
supabase db push
```

### 2. What Was Changed

#### New Files:
- `/app/api/profile/route.ts` - API endpoint to save profile data
- `supabase/migrations/001_create_profiles_table.sql` - Database schema
- This setup guide

#### Updated Files:
- `/app/pickyourprofile/page.tsx` - Added form submission logic and fullName field
- `/app/myprofile/[id]/page.tsx` - Now fetches and displays profile data

### 3. How It Works

**User Flow:**
1. User fills out the profile form in `/pickyourprofile`
2. Form includes: Photo, Full Name, Username (required), Bio, Object, and Interests
3. When submitted:
   - A random 12-character ID is generated
   - Profile data (image as base64, username, fullName, bio, selected_object, selected_interests) is saved to Supabase
   - User is redirected to `/myprofile/[id]` with their new profile ID

4. On the profile page:
   - All entered information is displayed with the uploaded photo
   - User can navigate to Feed or edit their profile

### 4. Data Structure

The `profiles` table stores:
- `id` - Random 12-character alphanumeric identifier (primary key)
- `username` - User's unique username (required)
- `full_name` - User's full name
- `bio` - User's bio/description
- `image` - Profile photo stored as base64 string
- `selected_object` - The chosen inanimate object
- `selected_interests` - Array of selected interests
- `created_at` - Timestamp of profile creation
- `updated_at` - Timestamp of last update

### 5. Testing the Feature

1. Navigate to `/pickyourprofile`
2. Fill in the form:
   - Upload a profile photo
   - Enter your full name (optional)
   - Enter your username (required)
   - Add a bio (optional)
   - Select an object
   - (Interests section can be added later)
3. Click "Complete Profile & Continue"
4. You should be redirected to your profile page showing all your info

### 6. Important Notes

- The image is stored as base64 in the database. For production, consider storing images in Supabase Storage instead
- The random ID generation is simple and suitable for this use case
- RLS (Row Level Security) policies are set to allow public read/insert access - adjust security policies as needed for your app
- Make sure to update the migration if you want to use Supabase Storage for images

### 7. Troubleshooting

**"Profiles are viewable by anyone" error in Supabase:**
- Make sure you have RLS enabled on the profiles table
- Run the migration again to ensure all policies are created

**Image not showing on profile page:**
- Check that the image was saved correctly by querying the database directly
- If using very large images, consider compression

**Redirect not working:**
- Ensure your API route is responding with status 201 and includes `profileId`
- Check browser console for errors

## Next Steps

Consider these improvements:
- Add image upload to Supabase Storage instead of base64
- Add user authentication to link profiles to auth users
- Add profile editing functionality
- Add profile deletion
- Add interests management
