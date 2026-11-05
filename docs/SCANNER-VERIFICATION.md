# Scanner implementation and release evidence — 2026-11-05

## Baseline and discovery

Base: `a3c59109b1872662531015ea61dc034a84cc7f24` on `jasonmanuel-cmd/siteer/main`.
The homepage submitted to `/scan?url=...`, but neither `/scan` nor a scan API existed. `/reports` is explicitly fictional sample content.

Inspected owned implementations before building: COAI's PageSpeed route, Mission Control's PageSpeed library, and DFFB's local Lighthouse runner. These depend on an external service/API key or a local browser subprocess. Mission Control also substitutes zeros for unavailable metrics, which was not reused. No indexed alternate SiteER implementation was found.

## Implemented

- Explicit scan form, permission confirmation, loading/error states, retry and printable report; no automatic scans from link previews/prefetches.
- Eleven observations derived from fetched HTML, not fixture scores. Scope and unknowns are shown beside results.
- Public-IP-only DNS validation, pinned connection IP, original Host/TLS identity, every-redirect validation, HTTPS downgrade blocking, body/header/time/redirect bounds, no cookies or credential forwarding.
- Same-origin JSON API, request-size limit, per-process concurrency/rate limits, sanitized errors and no-store responses.
- Free-scan copy updated to actual behavior; paid report/sample content remains distinct.
- Build repairs: supported config format, invalid server event handlers replaced with CSS, compatible contact-form rendering and missing-key email initialization. Contact without an email key returns 503 rather than false success. No email tests sent.
- Next.js 14.2.29 → 15.5.29 and compatible PostCSS override at 8.5.32. Lockfile added. Audit reduced from 15 findings including one critical and four high to 10 findings: zero critical/high, six moderate (development lint dependency chain) and four low (existing Resend email chain).

## Verification

- `npm test`: 10/10 pass. Includes encoded/private/special-use IPs, mixed DNS, pinned transport, rebinding on redirect, private redirects, redirect limit, HTTPS downgrade, overall DNS timeout with no late request, sanitized failure, HTML observations, live local transport size/type/status/compression/abort cases, API validation/rate limit and missing-email configuration.
- Final `npm run build`: PASS with lint/type validation and 21/21 pages generated, including the mobile fix and patched PostCSS tree.
- Real authorized public smoke: `https://siteer.dev` → `https://www.siteer.dev/`, one redirect, 120,383 bytes, 2,937 ms, 11 real observations (2026-11-05T01:23:09Z). These timings are server fetch measurements, not browser performance.
- Browser verification script: `node node_modules/tsx/dist/cli.mjs scripts/browser-check.ts`, against `npm run start -- --hostname 127.0.0.1 --port 3047`; uses installed Chrome and only the owner's SiteER page externally. Screenshots are local artifacts, not committed.
- Final Chrome browser check: PASS for homepage handoff, live owned-page scan, 11 findings, 390px mobile width without overflow, private-target error, stale-report clearing and no browser exceptions. Desktop/mobile screenshots were visually inspected.
- Initial restricted-environment localhost test received EACCES; rerun with authorized network execution passed. No approval denial remains.

## Release decision

No merge, production deployment, external messages, credentials, paid service or Play publication performed. The implementation is ready for a controlled preview. Before broad public launch: configure/verify distributed ingress limits across instances and infrastructure egress restrictions; the code's process-local quotas reset on cold start and do not form a global quota. Assess the remaining low/moderate dependency findings.

This work does not verify existing testimonials/business claims, paid-service guarantees or email delivery. The pre-existing follow-up cron is still a TODO. These remain separate whole-site readiness items, not hidden scanner capabilities. No speed/accessibility/security/ranking score is claimed by the scanner.
