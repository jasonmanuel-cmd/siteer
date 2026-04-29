# SiteER Launch — Quick Reference

**Status:** ✅ Ready to Deploy  
**Build:** Passing (18 routes, 98.5 kB)  
**Time to Launch:** ~25 minutes

---

## The 4 Actions Required to Launch

### Action 1: Add Environment Variables to Vercel (15 min)

```bash
# Login to Vercel CLI
vercel login

# Add each variable (will prompt for value)
vercel env add SUPABASE_URL
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add RESEND_API_KEY
vercel env add CONTACT_EMAIL
vercel env add SENDER_EMAIL
vercel env add SQUARE_ACCESS_TOKEN
vercel env add SQUARE_LOCATION_ID
vercel env add SQUARE_ENVIRONMENT
vercel env add NEXT_PUBLIC_APP_URL

# Verify all were added
vercel env ls
```

**Values to Use (from your .env.local):**
- `SUPABASE_URL`: https://mdhzbhgksbltfwgikvxy.supabase.co
- `SUPABASE_SERVICE_ROLE_KEY`: [Your Supabase service role key]
- `RESEND_API_KEY`: [Your Resend API key]
- `CONTACT_EMAIL`: [Your admin email, e.g., admin@siteer.app]
- `SENDER_EMAIL`: SiteER <reports@siteer.app>
- `SQUARE_ACCESS_TOKEN`: [Your Square production token]
- `SQUARE_LOCATION_ID`: [Your Square location ID]
- `SQUARE_ENVIRONMENT`: production
- `NEXT_PUBLIC_APP_URL`: https://siteer.app

### Action 2: Deploy to Production (5 min)

```bash
cd c:\Users\blunt\Desktop\programs\SiteER
vercel deploy --prod
```

**Expected Output:**
```
✓ Production deployment complete
✓ https://siteer.app (or your custom domain)
```

### Action 3: Verify Deployment (5 min)

```bash
# Test homepage loads
curl -I https://siteer.app
# Should return: HTTP/2 200

# Validate JSON-LD schemas
# Visit: https://validator.schema.org/
# Paste URL: https://siteer.app
# Should show: ✓ LocalBusiness, ✓ Organization, ✓ BreadcrumbList
```

### Action 4: Test API Errors (Not Required, but Recommended)

```bash
# Test error sanitization
curl -X POST https://siteer.app/api/scan \
  -H "Content-Type: application/json" \
  -d '{"url": "invalid"}'

# Should return:
# {"ok":false,"error":"Failed to process your URL. Please try again or contact support."}
#
# NOT:
# {"ok":false,"error":"Invalid URL format..."}
```

---

## All Changes Made (Verification Checklist)

### ✅ Code Changes (All Applied & Tested)

- [x] **app/layout.tsx** — Added LocalBusiness schema with Bakersfield coordinates
- [x] **app/api/scan/route.ts** — Error sanitization (no Supabase/Cheerio details exposed)
- [x] **app/api/lead/route.ts** — Error sanitization
- [x] **app/api/quote/route.ts** — Error sanitization
- [x] **app/api/square/route.ts** — Error sanitization
- [x] **app/blog/local-business-website-mistakes/page.tsx** — Added BreadcrumbList + Article schema + script tags
- [x] **app/blog/mobile-page-speed-fixes/page.tsx** — Added BreadcrumbList + Article schema + script tags
- [x] **app/blog/website-not-bringing-customers/page.tsx** — Added BreadcrumbList + Article schema + script tags
- [x] **.env.example** — Updated to use placeholder values (safe for git)
- [x] **.env.production.template** — Updated to remove hardcoded URLs

### ✅ Build Verification

- [x] `npm run build` passes
- [x] 18 routes compiled successfully
- [x] First Load JS: 98.5 kB (target < 100 kB) ✓
- [x] No errors or warnings

### ✅ Security Review

- [x] No private keys in git
- [x] No error stack traces exposed
- [x] All secrets moved to Vercel environment variables
- [x] Rate limiting active (12 scans/minute per IP)
- [x] HTTPS enforced

---

## Success Criteria (Post-Launch Checklist)

After deploying, verify:

- [ ] Homepage loads at https://siteer.app
- [ ] Blog pages load at /blog/* URLs
- [ ] Scan form accepts URLs without errors
- [ ] JSON-LD validates at https://validator.schema.org/
- [ ] API endpoints respond within 2-3 seconds
- [ ] Error messages are generic (no technical details)
- [ ] No errors in Vercel Logs dashboard

---

## File Reference

### Documentation Added

| File | Purpose |
|------|---------|
| `PRODUCTION_AUDIT.md` | Full 10-section audit report (GEO/AEO, Security, Performance, API Stress) |
| `LAUNCH_CHECKLIST.md` | Detailed step-by-step deployment guide |
| `LAUNCH_SUMMARY.md` | Executive summary with key findings |
| `QUICK_REFERENCE.md` | This file — 4 actions to launch |

### Scripts Added

| File | Purpose |
|------|---------|
| `scripts/migrate-rate-limiting.sh` | Vercel KV migration guide (Week 2) |

---

## Troubleshooting

### "Deployment failed"
```bash
# Check build locally first
npm run build

# Check that all env vars are set in Vercel
vercel env ls

# Check build logs
vercel logs
```

### "API returns error"
```bash
# Check Vercel Logs for detailed error message
vercel logs --follow

# Verify all Supabase credentials are correct
# Go to: https://app.supabase.com → Your Project → Settings → API
```

### "JSON-LD not showing"
```bash
# Verify schemas were added to files
grep -r "BreadcrumbList" app/blog/

# Rebuild and redeploy
npm run build
vercel deploy --prod
```

---

## Post-Launch (Week 1)

### Daily Checks
- Monitor Vercel Logs for errors
- Check database size (should be < 1GB)
- Monitor rate limiting for abuse

### Week 2 Priority
- [ ] Implement persistent rate limiting (Vercel KV)
- [ ] Replace Vercel Analytics with Umami or Plausible
- [ ] Set up automated Supabase backups

---

## Emergency Contacts

If something breaks:

1. Check Vercel Logs: https://vercel.com/dashboard
2. Check Supabase Status: https://status.supabase.com/
3. Check DNS: Ensure siteer.app points to Vercel
4. Verify env vars: `vercel env ls` should show all 9 variables

---

## 🚀 You're Cleared for Launch

All code changes are complete and tested. The only remaining work is:

1. Add 9 environment variables to Vercel Dashboard (15 min)
2. Run `vercel deploy --prod` (5 min)
3. Test homepage loads (5 min)

**Total time: ~25 minutes**

---

**Generated:** 2025-04-25  
**Ready to Deploy:** ✅ YES

