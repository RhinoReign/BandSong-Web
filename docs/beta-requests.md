# BandSong Beta Requests

The website beta form submits to `/api/beta-request`, which inserts rows into the Supabase `beta_requests` table.

## Environment Variables

Create a local `.env` file from `.env.example` and paste the Supabase values there. Do not commit `.env`.

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

Use `SUPABASE_SERVICE_ROLE_KEY` for the server-side API route. Do not prefix it with `VITE_`; service role keys must never be exposed to frontend code.

`SUPABASE_ANON_KEY` is an optional server-side fallback only if a service role key is not available.

## Supabase Setup

Run `supabase/migrations/20260508000000_create_beta_requests.sql` against the existing BandSong Supabase project.

The migration creates:

- `beta_requests`
- required intake columns
- `reviewed_at` and `notes` admin fields
- constraints for email, status, and source
- indexes for `created_at`, `status`, and `email`
- RLS with no public read/update/delete access
- a narrow insert-only anon fallback policy

## Reviewing Requests

In Supabase:

1. Open Table Editor.
2. Select `beta_requests`.
3. Filter `status = new`.
4. Review the request details.
5. Update `status` to `reviewed`, `invited`, `rejected`, or `spam`.
6. Optionally add internal `notes` and set `reviewed_at`.

## Vercel Deployment

Set production variables in Vercel:

1. Open Project Settings.
2. Open Environment Variables.
3. Add `SUPABASE_URL`.
4. Add `SUPABASE_SERVICE_ROLE_KEY`.
5. Redeploy after adding or changing variables.

Keep `.env.example` committed with blank values only. Keep local `.env` files uncommitted.

For local end-to-end API testing, use Vercel's local runtime or a deployed preview so `/api/beta-request` is available. Plain `vite dev` serves the frontend only.
