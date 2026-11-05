# SiteER

## Development

Node.js 22 or newer. Run `npm ci`, `npm test`, `npm run typecheck`, and `npm run build`. Start locally with `npm run dev`.

## Free scanner

`/scan` requires an explicit user submission and permission confirmation; `POST /api/scan` runs a bounded public HTML check. It makes no email, database, AI or paid-service calls. Results are held only in the current browser page and may be printed/saved as PDF. No target HTML, cookies or response headers are returned to the client. The server does not persist reports. Hosting access logs may still record the `/scan?url=` entry address; never enter private URLs or secrets.

The 11 observations cover HTTPS, title, description, H1 count, viewport declaration, document language, image alt attributes, canonical declaration, HTML noindex, phone links and parseable JSON-LD. An observed feature is not a quality/compliance pass. No overall score, ranking prediction, browser performance, accessibility compliance, mobile layout, vulnerability or delivery claim is made. JavaScript and subresources are not executed/fetched. Existing `/reports` content remains a sample, separate from a live scan.

### Network boundaries

- HTTP/HTTPS only, standard ports; reject credentials, query strings, fragments and local hostnames.
- All DNS answers must be public unicast; reject special-use, mapped/transition and nonglobal IPs. Connect directly to the chosen validated IP while retaining the original HTTP Host and TLS identity. No DNS lookup between validation and connection. No proxy, cookie jar or shared agent.
- Validate DNS again at every redirect, including same-host redirects; at most three, no HTTPS downgrade.
- Maximum 1 MiB uncompressed HTML, 16 KiB response headers, 15 seconds including DNS. Compressed and non-HTML responses fail clearly rather than producing partial findings.
- Same-origin JSON POST, bounded request body, three concurrent scans and 20 starts/minute per process. No client-supplied headers are forwarded.
- Error responses are sanitized; no low-level network errors, IP answers or secrets are exposed.

### Release gate

This is a preview implementation, not a production release claim. Before broad public deployment configure and verify a distributed ingress rate limit for `/api/scan` across all instances, plus infrastructure egress restrictions against internal/private networks as defense in depth. In-memory limits reset on cold starts and are not a global abuse quota. Same-origin checking is a browser protection, not authentication. No new paid service is required by the code.

Next.js was upgraded to 15.5.29 and PostCSS to 8.5.32; the final audit has no critical/high findings. Review the remaining six moderate development-tool and four low email-library findings, pre-existing testimonial/business claims and paid-service guarantees independently. The contact form needs the owner's existing Resend configuration; the follow-up cron still contains a pre-existing TODO. Scanner work does not establish email delivery or paid fulfillment readiness.

Owned-code discovery found PageSpeed integrations in `coainewweb/app/api/lighthouse/route.ts` and `mission-control/src/app/api/lighthouse/route.ts`, and a local Lighthouse runner in `dffb/dffbwebsite/run_lighthouse.py`. These use external PageSpeed or a browser process, not a reusable bounded public HTML transport. No indexed alternate SiteER scanner was found. Search results are not proof that no unindexed implementation exists.

See `docs/SCANNER-VERIFICATION.md` for checked behavior, exact scope and release gates.
