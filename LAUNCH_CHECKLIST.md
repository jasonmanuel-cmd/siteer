# SiteER Launch Checklist & Deployment Guide

**Status:** ✅ Code Changes Complete | ⏳ Environment Configuration Required | 🚀 Ready for Deployment

**Last Build:** ✅ PASSED (18 routes, 98.5 kB First Load JS)  
**Timestamp:** 2025-04-25  
**Next Action:** Move secrets to Vercel Dashboard (15 minutes)

---

## ✅ Completed Remediations

### Priority 1 Code Changes (All Complete)

- [x] **Error Message Sanitization** — All API endpoints (`/api/scan`, `/api/lead`, `/api/quote`, `/api/square`) now return generic error messages; sensitive details logged server-side only
- [x] **LocalBusiness Schema** — Added to `app/layout.tsx` with Bakersfield coordinates for local search optimization
- [x] **BreadcrumbList & Article Schemas** — Added to all 3 blog articles (`/blog/local-business-website-mistakes`, `/blog/mobile-page-speed-fixes`, `/blog/website-not-bringing-customers`)
- [x] **Environment Variable Templates** — Updated `.env.example` and `.env.production.template` to remove hardcoded Supabase URL
- [x] **Production Build Verified** — npm run build passes with no errors or warnings

---

## ⏳ Remaining Priority 1 Actions (Required Before Launch)

### Step 1: Move Secrets to Vercel (15 minutes)

**Current Issue:** Secrets are in `.env.local` (not committed to git, but not persisted on Vercel)

**Action:**
```bash
# 1. Install Vercel CLI if not present
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Set all environment variables in Vercel Dashboard
vercel env add SUPABASE_URL                # Paste: https://mdhzbhgksbltfwgikvxy.supabase.co
vercel env add SUPABASE_SERVICE_ROLE_KEY   # Paste: your service role key from Supabase
vercel env add RESEND_API_KEY              # Paste: your Resend API key
vercel env add CONTACT_EMAIL               # Paste: admin@yourdomain.com (or admin@siteer.app)
vercel env add SENDER_EMAIL                # Paste: SiteER <reports@yourdomain.com>
vercel env add SQUARE_ACCESS_TOKEN         # Paste: your Square production token
vercel env add SQUARE_LOCATION_ID          # Paste: your Square location ID
vercel env add SQUARE_ENVIRONMENT          # Paste: production
vercel env add NEXT_PUBLIC_APP_URL         # Paste: https://siteer.app

# 4. Verify they were set
vercel env ls
```

**Or via Vercel Dashboard:**
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project (SiteER)
3. Click Settings → Environment Variables
4. Click "Add" and paste each key-value pair
5. Select "Production" scope for each

### Step 2: Deploy to Production (5 minutes)

```bash
# After secrets are added in Vercel, deploy
vercel deploy --prod
```

**Expected Output:**
```
✓ Production deployment complete
✓ https://siteer.app
```

### Step 3: Verify JSON-LD Schemas (5 minutes)

Use [schema.org validator](https://validator.schema.org/):

1. Visit [validator.schema.org](https://validator.schema.org/)
2. Enter URL: `https://siteer.app`
   - Expected: ✅ LocalBusiness, ProfessionalService, FAQPage, Organization
3. Enter URL: `https://siteer.app/blog/local-business-website-mistakes`
   - Expected: ✅ Article, BreadcrumbList, Organization
4. Repeat for other 2 blog pages

**Screenshot for validation:**
```
✓ Organization - Count: 1
✓ LocalBusiness - Count: 1
✓ BreadcrumbList - Count: 1
✓ Article - Count: 1
```

### Step 4: Test API Error Handling (5 minutes)

Test that errors are sanitized:

```bash
# Test 1: Invalid URL on /api/scan
curl -X POST https://siteer.app/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "not-a-url"}' | jq .error

# Expected Output: "Failed to process your URL. Please try again or contact support."
# NOT: "Invalid URL: expected http/https"

# Test 2: Rate limit on /api/lead
for i in {1..21}; do
  curl -s -X POST https://siteer.app/api/lead \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com", "scanId": "550e8400-e29b-41d4-a716-446655440000"}' &
done
wait

# Expected Output: After 20 requests, 21st returns 429 Too Many Requests
```

---

## 🚀 Final Deployment Checklist

Before you hit "deploy --prod", verify:

- [ ] All 8 environment variables added to Vercel Dashboard
- [ ] Build passes: `npm run build` ✅
- [ ] Error messages are sanitized (no "Supabase", "Cheerio", etc. exposed)
- [ ] JSON-LD schemas present on all pages (schema.org validator confirms)
- [ ] BreadcrumbList added to all 3 blog articles
- [ ] LocalBusiness schema on homepage
- [ ] Rate limiting in-memory (acceptable for MVP; upgrade to Redis in Week 2)
- [ ] Database backups configured (document procedure)
- [ ] Domain DNS points to Vercel (CNAME or A records configured)
- [ ] HTTPS certificate enabled (automatic on Vercel)

---

## ⏱️ Timeline for Launch

**Tonight (Immediate):**
- [x] Code changes deployed
- [x] Build verified
- [ ] Vercel environment variables configured (15 min)
- [ ] Deploy to production (5 min)
- [ ] Verify JSON-LD (5 min)
- **Total: ~25 minutes**

**Week 1 (After Launch):**
- [ ] Implement persistent rate limiting (Vercel KV)
- [ ] Monitor error logs for issues
- [ ] Set up automated Supabase backups
- [ ] Test API under load (100+ concurrent scans)

**Week 2-4 (Optimization):**
- [ ] Replace Vercel Analytics with Plausible or Umami
- [ ] Add Product schema to pricing page
- [ ] Implement Square webhook handlers
- [ ] Document runbook for production support

---

## Priority 2 Actions (This Week)

These are important but NOT launch-blockers:

### Persistent Rate Limiting (Optional, but Recommended)

**Current Issue:** Rate limiter resets on server restart (happens ~2x/week on Vercel)

**Solution:** Use Vercel KV (Redis)

```bash
# 1. Create Vercel KV database
# Go to: https://vercel.com/dashboard/storage
# Click "Create Database" → KV (Redis)
# Name: siteer-rate-limits

# 2. Update lib/rateLimit.ts (see script: scripts/migrate-rate-limiting.sh)

# 3. Deploy
vercel deploy --prod
```

**Migration Script:** See `scripts/migrate-rate-limiting.sh`

### Replace Vercel Analytics

**Current Issue:** Vercel Analytics sends data to external Vercel servers (external dependency)

**Solution Options:**
1. **Plausible** ($9/month, GDPR-compliant, no-consent needed)
   - Easiest drop-in replacement
   - Better privacy than Vercel Analytics
2. **Umami** (self-hosted on Vercel, free)
   - Full control, privacy-first
   - Slightly more setup

**Implementation:**
```bash
# Option A: Add Plausible (easiest)
npm install plausible-analytics

# Then add to app/layout.tsx:
# <script defer data-domain="siteer.app" src="https://plausible.io/js/script.js"></script>

# Option B: Self-host Umami on Vercel
# See: https://umami.is/
```

---

## Security Review Checklist

Before launch, verify:

- [ ] No private keys in git history: `git log --all -S "SUPABASE_SERVICE_ROLE_KEY" | head -5`
- [ ] No hardcoded secrets in code: `grep -r "Bearer " app/ lib/`
- [ ] Environment variables only in Vercel Dashboard (never in .env files committed to git)
- [ ] HTTPS enforced on all pages
- [ ] No mixed content (HTTP assets on HTTPS page)
- [ ] Error messages sanitized (no stack traces exposed)
- [ ] Rate limiting active (in-memory or persistent)

---

## Post-Launch Monitoring (Week 1)

### Daily Checks

1. **Error Rate:** Monitor Vercel Logs dashboard for 5xx errors
2. **Rate Limiting:** Check for abuse patterns (rapid requests from single IP)
3. **User Feedback:** Monitor email for support requests

### Weekly Checks

1. **Database Size:** Verify Supabase is within free tier (up to 1GB)
2. **Backup Integrity:** Test restore from backup
3. **API Performance:** Check average response times for /api/scan

---

## Troubleshooting

### Build Fails After Deployment

```bash
# Check build logs
vercel build
vercel logs --follow

# Common issues:
# 1. Environment variable missing → Add via Vercel Dashboard
# 2. Supabase URL invalid → Verify in .env.production.template
# 3. Type errors → Run: npm run build locally first
```

### Scan Endpoint Timing Out

```bash
# Check Supabase connection
# Go to: https://app.supabase.com → Your Project → Logs
# Look for connection pool exhaustion

# Solution:
# 1. Upgrade Supabase plan if hitting connection limits
# 2. Reduce keepalive timeout in lib/supabaseAdmin.ts
# 3. Implement connection pooling (AWS RDS Proxy or similar)
```

### Rate Limiting Not Working

```bash
# Check if in-memory store is persisting
# Expected: Same IP gets 429 after 12 scans within 60s
# 
# Current: In-memory store resets on server restart
# Fix: Migrate to Vercel KV (see Priority 2 section)
```

---

## Success Metrics (Week 1)

After launch, verify:

- ✅ 10+ successful scans completed
- ✅ At least 2 quote form submissions
- ✅ 0 exposed error stack traces in logs
- ✅ Average response time < 2 seconds
- ✅ No database connection errors
- ✅ JSON-LD schemas indexed by Google (check Google Search Console after 48 hours)

---

## Final Deployment Command

When ready to launch:

```bash
# 1. Verify all environment variables are set in Vercel Dashboard
vercel env ls --prod

# 2. Deploy
vercel deploy --prod

# 3. Verify domains
# - https://siteer.app should work
# - Check SSL certificate is valid

# 4. Test homepage
curl -I https://siteer.app | grep "HTTP\|siteer.app"

# Expected Output:
# HTTP/2 200
# cache-control: public, max-age=0, must-revalidate
```

---

## Quick Reference: All Changes Made

| File | Change | Priority | Status |
|------|--------|----------|--------|
| `app/layout.tsx` | Added LocalBusiness schema | P1 | ✅ Done |
| `app/api/scan/route.ts` | Error message sanitization | P1 | ✅ Done |
| `app/api/lead/route.ts` | Error message sanitization | P1 | ✅ Done |
| `app/api/quote/route.ts` | Error message sanitization | P1 | ✅ Done |
| `app/api/square/route.ts` | Error message sanitization | P1 | ✅ Done |
| `app/blog/local-business-website-mistakes/page.tsx` | Added BreadcrumbList + Article schema | P1 | ✅ Done |
| `app/blog/mobile-page-speed-fixes/page.tsx` | Added BreadcrumbList + Article schema | P1 | ✅ Done |
| `app/blog/website-not-bringing-customers/page.tsx` | Added BreadcrumbList + Article schema | P1 | ✅ Done |
| `.env.example` | Updated (no hardcoded URLs) | P1 | ✅ Done |
| `.env.production.template` | Updated (no hardcoded URLs) | P1 | ✅ Done |
| `scripts/migrate-rate-limiting.sh` | Created migration guide | P2 | ✅ Done |
| `PRODUCTION_AUDIT.md` | Created full audit report | Reference | ✅ Done |
| `LAUNCH_CHECKLIST.md` | This file | Reference | ✅ Done |

---

**Next Step:** Execute "Step 1: Move Secrets to Vercel" above, then deploy!

**Questions?** See `PRODUCTION_AUDIT.md` for detailed explanations of each fix.

