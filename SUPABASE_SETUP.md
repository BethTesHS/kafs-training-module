# Supabase Authentication Setup Guide

This guide will help you configure Supabase authentication for your application.

## 1. Supabase Dashboard Configuration

### Step 1: Configure Redirect URLs

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Navigate to **Authentication** → **URL Configuration**
3. Add the following **Site URL**:
   - `http://localhost:5173` (for local development)
   - Your production URL (e.g., `https://yourdomain.com`)

4. Add the following **Redirect URLs**:
   - `http://localhost:5173/auth/callback`
   - `http://localhost:5173/reset-password`
   - `https://yourdomain.com/auth/callback` (production)
   - `https://yourdomain.com/reset-password` (production)

### Step 2: Configure Email Templates

1. Go to **Authentication** → **Email Templates**
2. Configure the **Reset Password** template:
   - Subject: `Reset Your Password`
   - The template should include a link that redirects to: `{{ .SiteURL }}/reset-password#access_token={{ .Token }}&type=recovery`
   - Or use the default Supabase template which handles this automatically

### Step 3: Enable Email Provider

1. Go to **Authentication** → **Providers**
2. Ensure **Email** provider is enabled
3. Configure email settings:
   - **Enable email confirmations**: Optional (recommended for production)
   - **Enable email change confirmations**: Optional
   - **Secure email change**: Optional

### Step 4: Configure OAuth Providers (Optional)

If you're using social login (Google, GitHub, Facebook):

1. Go to **Authentication** → **Providers**
2. Enable the providers you want (Google, GitHub, Facebook)
3. For each provider:
   - Add your OAuth credentials
   - Set the redirect URL to: `https://your-supabase-project.supabase.co/auth/v1/callback`

## 2. Environment Variables (Optional)

If you want to use environment variables instead of hardcoding:

1. Create a `.env` file in your project root:
```env
VITE_SUPABASE_URL=https://jyhthsqxvcmdmrclrecn.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Update `src/supabaseClient.js`:
```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 3. Testing the Setup

### Test Sign Up:
1. Navigate to `/auth?mode=signup`
2. Fill in the form and submit
3. Check your email for confirmation (if enabled)
4. Confirm the email and try logging in

### Test Password Reset:
1. Navigate to `/forgot-password`
2. Enter your email address
3. Check your email for the reset link
4. Click the link - it should redirect to `/reset-password`
5. Enter your new password
6. You should be redirected to login

### Test OAuth (if configured):
1. Navigate to `/auth?mode=login`
2. Click on a social login button (Google, GitHub, Facebook)
3. Complete the OAuth flow
4. You should be redirected back to your app

## 4. Current Configuration

Your current Supabase configuration:
- **Project URL**: `https://jyhthsqxvcmdmrclrecn.supabase.co`
- **Redirect URLs configured in code**:
  - Password Reset: `${window.location.origin}/reset-password`
  - OAuth Callback: `${window.location.origin}/auth/callback`
  - Email Confirmation: `${window.location.origin}/auth/callback`

## 5. Troubleshooting

### Password reset link not working:
- Check that `/reset-password` is added to Redirect URLs in Supabase dashboard
- Verify the email template includes the correct redirect URL
- Check browser console for errors

### OAuth not redirecting correctly:
- Verify OAuth provider credentials are correct
- Check that redirect URLs match exactly in both Supabase and OAuth provider settings
- Ensure `auth/callback` route is properly configured

### Email not sending:
- Check Supabase email settings
- Verify SMTP is configured (if using custom SMTP)
- Check spam folder
- Review Supabase logs for email sending errors

## 6. Security Best Practices

1. **Never commit your Supabase service role key** to version control
2. **Use Row Level Security (RLS)** policies in your database
3. **Enable email confirmations** in production
4. **Set up rate limiting** for authentication endpoints
5. **Use HTTPS** in production
6. **Regularly rotate** your API keys

## 7. Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Auth Helpers](https://supabase.com/docs/guides/auth/auth-helpers)
- [Supabase Email Templates](https://supabase.com/docs/guides/auth/auth-email-templates)
