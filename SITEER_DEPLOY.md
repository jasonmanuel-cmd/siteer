# SiteER — Deployment Guide
**Chaotically Organized AI, LLC | Jay Manuel**

---

## STATUS: READY TO DEPLOY

| Item | Status |
|------|--------|
| Supabase schema | ✅ LIVE (coaiwebsite project) |
| Supabase URL | ✅ `https://mdhzbhgksbltfwgikvxy.supabase.co` |
| Service Role Key | ⚠️ YOU MUST GET (see Step 1 below) |
| Vercel config | ✅ `vercel.json` in place |
| Deploy script | ✅ `deploy.bat` ready |

---

## STEP 1 — Get Your Service Role Key (2 min)

1. Go to **https://supabase.com/dashboard**
2. Click project: **coaiwebsite**
3. Left sidebar → **Settings** → **API**
4. Under **Project API Keys** → copy **service_role** (secret) key
5. Keep it ready for Step 2

---

## STEP 2 — Deploy to Vercel (Option A: Auto Script)

Open a terminal in the SiteER folder and run:

```
deploy.bat
```

The script will:
- Install Vercel CLI (if needed)
- Log you in (opens browser)
- Deploy the app
- Prompt you to enter env vars one by one

When prompted for env var values, enter:

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://mdhzbhgksbltfwgikvxy.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | *(your key from Step 1)* |
| `NEXT_PUBLIC_APP_URL` | `https://siteer.vercel.app` *(update after first deploy)* |

---

## STEP 2 — Deploy to Vercel (Option B: Manual CLI)

```bash
# Install CLI
npm install -g vercel

# From inside the SiteER folder:
vercel login
vercel --prod --yes

# Set env vars:
vercel env add SUPABASE_URL production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_APP_URL production

# Redeploy with env vars live:
vercel --prod --yes
```

---

## STEP 3 — After First Deploy

1. Copy your live Vercel URL (e.g. `https://siteer-abc123.vercel.app`)
2. Go to **Vercel Dashboard → siteer → Settings → Environment Variables**
3. Update `NEXT_PUBLIC_APP_URL` to your actual live URL
4. Trigger a redeploy: **Deployments → Redeploy**

---

## Database Info

- **Supabase Project:** coaiwebsite (`mdhzbhgksbltfwgikvxy`)
- **Region:** us-east-2
- **Tables created:** `siteer_leads`, `sites`, `scans`, `scan_issues`, `reports`
- **Migration:** `siteer_initial_schema` — applied ✅

---

## What SiteER Does

Website audit SaaS — scans any URL, grades it across Speed / Mobile / SEO / Trust,
estimates monthly revenue loss, captures email leads, generates shareable report links.

**Freemium angle:** Free scan → lead capture → upsell to COAI services.

---

*Built by Chaotically Organized AI, LLC — Turn Your Chaos Into Code.*
