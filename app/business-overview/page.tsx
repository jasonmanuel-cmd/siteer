import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "SiteER — Complete Business Overview",
    description: "Business overview, revenue projections, and cost analysis for SiteER.",
    robots: { index: false, follow: false },
};

export default function BusinessOverviewPage() {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

                *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

                body {
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                    background: #f8f9fa;
                    color: #111827;
                    font-size: 14px;
                    line-height: 1.6;
                }

                .print-btn {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #ff4d5e, #ffb15c);
                    color: #1a0509;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 999px;
                    font-weight: 800;
                    font-size: 14px;
                    cursor: pointer;
                    box-shadow: 0 8px 24px rgba(255,77,94,.35);
                    z-index: 999;
                    font-family: inherit;
                }
                .print-btn:hover { transform: translateY(-1px); box-shadow: 0 12px 32px rgba(255,77,94,.45); }

                .page {
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 40px 32px 80px;
                }

                /* ── HEADER ── */
                .doc-header {
                    background: linear-gradient(135deg, #1a0509 0%, #3d0a12 50%, #1a0509 100%);
                    border-radius: 20px;
                    padding: 48px 40px;
                    margin-bottom: 36px;
                    position: relative;
                    overflow: hidden;
                }
                .doc-header::before {
                    content: '';
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 240px; height: 240px;
                    background: radial-gradient(circle, rgba(255,77,94,.25) 0%, transparent 70%);
                    border-radius: 50%;
                }
                .doc-header::after {
                    content: '';
                    position: absolute;
                    bottom: -40px; left: -40px;
                    width: 180px; height: 180px;
                    background: radial-gradient(circle, rgba(255,177,92,.15) 0%, transparent 70%);
                    border-radius: 50%;
                }
                .header-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255,77,94,.2);
                    border: 1px solid rgba(255,77,94,.4);
                    border-radius: 999px;
                    padding: 6px 16px;
                    margin-bottom: 20px;
                }
                .header-badge span { color: #ff8792; font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
                .doc-header h1 {
                    font-size: 2.6rem;
                    font-weight: 900;
                    letter-spacing: -.04em;
                    color: white;
                    line-height: 1.15;
                    position: relative;
                    z-index: 1;
                }
                .doc-header h1 span { color: #ff8792; }
                .doc-header p {
                    margin-top: 14px;
                    color: rgba(255,255,255,.65);
                    font-size: 1rem;
                    max-width: 540px;
                    position: relative;
                    z-index: 1;
                }
                .header-meta {
                    display: flex;
                    gap: 24px;
                    margin-top: 28px;
                    position: relative;
                    z-index: 1;
                }
                .header-meta-item { text-align: left; }
                .header-meta-item .label { color: rgba(255,255,255,.4); font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
                .header-meta-item .value { color: white; font-size: 13px; font-weight: 600; margin-top: 2px; }

                /* ── SECTION TITLES ── */
                .section { margin-bottom: 32px; }
                .section-title {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 18px;
                }
                .section-number {
                    width: 32px; height: 32px;
                    background: linear-gradient(135deg, #ff4d5e, #ffb15c);
                    border-radius: 10px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 13px; font-weight: 900; color: #1a0509;
                    flex-shrink: 0;
                }
                .section-title h2 { font-size: 1.15rem; font-weight: 800; color: #111827; letter-spacing: -.02em; }

                /* ── CARDS ── */
                .card {
                    background: white;
                    border: 1px solid #e5e7eb;
                    border-radius: 16px;
                    padding: 24px;
                    margin-bottom: 16px;
                }
                .card-red {
                    background: linear-gradient(135deg, #fff5f5, #fff8f0);
                    border: 1px solid #fecaca;
                }
                .card-dark {
                    background: #111827;
                    border: 1px solid #1f2937;
                    color: white;
                }
                .card-green { background: #f0fdf4; border: 1px solid #bbf7d0; }
                .card-blue { background: #eff6ff; border: 1px solid #bfdbfe; }
                .card-amber { background: #fffbeb; border: 1px solid #fde68a; }

                /* ── GRID ── */
                .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
                .grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }

                /* ── STAT BOXES ── */
                .stat-box { text-align: center; padding: 20px 16px; }
                .stat-box .big { font-size: 2rem; font-weight: 900; letter-spacing: -.04em; color: #dc2626; }
                .stat-box .label { font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; margin-top: 4px; }

                /* ── FUNNEL ── */
                .funnel { display: flex; align-items: stretch; gap: 0; }
                .funnel-step {
                    flex: 1;
                    background: white;
                    border: 1px solid #e5e7eb;
                    padding: 16px 14px;
                    text-align: center;
                    position: relative;
                }
                .funnel-step:first-child { border-radius: 12px 0 0 12px; }
                .funnel-step:last-child { border-radius: 0 12px 12px 0; }
                .funnel-step::after {
                    content: '→';
                    position: absolute;
                    right: -14px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #dc2626;
                    font-weight: 900;
                    font-size: 16px;
                    z-index: 2;
                    background: white;
                    padding: 2px 0;
                }
                .funnel-step:last-child::after { display: none; }
                .funnel-step .step-icon { font-size: 1.4rem; margin-bottom: 6px; }
                .funnel-step .step-name { font-size: 11px; font-weight: 700; color: #374151; text-transform: uppercase; letter-spacing: .06em; }
                .funnel-step .step-rate { font-size: 18px; font-weight: 900; color: #dc2626; margin-top: 4px; }
                .funnel-step .step-desc { font-size: 10px; color: #9ca3af; margin-top: 2px; }

                /* ── REVENUE TABLE ── */
                .rev-table { width: 100%; border-collapse: collapse; }
                .rev-table th {
                    background: #f9fafb;
                    padding: 10px 14px;
                    font-size: 11px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: .06em;
                    color: #6b7280;
                    text-align: left;
                    border-bottom: 1px solid #e5e7eb;
                }
                .rev-table td {
                    padding: 12px 14px;
                    font-size: 13px;
                    border-bottom: 1px solid #f3f4f6;
                    color: #374151;
                }
                .rev-table tr:last-child td { border-bottom: none; }
                .rev-table .money { font-weight: 800; color: #111827; }
                .rev-table .profit { font-weight: 900; color: #16a34a; font-size: 15px; }
                .rev-table tr.total-row td { background: #f0fdf4; font-weight: 700; }

                /* ── SCENARIO CARDS ── */
                .scenario { border-radius: 16px; overflow: hidden; margin-bottom: 16px; }
                .scenario-header { padding: 16px 20px 14px; }
                .scenario-header h3 { font-size: 1rem; font-weight: 800; }
                .scenario-header p { font-size: 12px; opacity: .8; margin-top: 3px; }
                .scenario-body { background: white; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px; padding: 0; }
                .scenario-a .scenario-header { background: #f8fafc; border: 1px solid #e5e7eb; border-bottom: none; border-radius: 16px 16px 0 0; }
                .scenario-a .scenario-header h3 { color: #374151; }
                .scenario-a .scenario-header p { color: #6b7280; }
                .scenario-b .scenario-header { background: linear-gradient(135deg, #1e40af, #1d4ed8); border-radius: 16px 16px 0 0; }
                .scenario-b .scenario-header h3, .scenario-b .scenario-header p { color: white; }
                .scenario-c .scenario-header { background: linear-gradient(135deg, #dc2626, #b91c1c); border-radius: 16px 16px 0 0; }
                .scenario-c .scenario-header h3, .scenario-c .scenario-header p { color: white; }

                /* ── BAR CHART ── */
                .bar-chart { display: flex; align-items: flex-end; gap: 20px; height: 180px; padding: 0 16px 0; }
                .bar-group { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; justify-content: flex-end; }
                .bar-wrap { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 4px; }
                .bar { width: 100%; border-radius: 8px 8px 0 0; min-height: 4px; }
                .bar-label { font-size: 11px; font-weight: 700; color: #6b7280; text-align: center; }
                .bar-value { font-size: 12px; font-weight: 800; color: #111827; }

                /* ── COST TABLE ── */
                .cost-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #f3f4f6; }
                .cost-row:last-child { border-bottom: none; }
                .cost-label { font-size: 13px; color: #374151; }
                .cost-badge { font-size: 12px; font-weight: 700; padding: 3px 10px; border-radius: 999px; }
                .cost-free { background: #dcfce7; color: #16a34a; }
                .cost-paid { background: #fef3c7; color: #92400e; }

                /* ── LEVER BARS ── */
                .lever { margin-bottom: 14px; }
                .lever-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
                .lever-name { font-size: 13px; font-weight: 700; color: #111827; }
                .lever-impact { font-size: 11px; font-weight: 700; color: #dc2626; }
                .lever-track { height: 8px; background: #f3f4f6; border-radius: 999px; overflow: hidden; }
                .lever-fill { height: 100%; border-radius: 999px; background: linear-gradient(90deg, #ff4d5e, #ffb15c); }

                /* ── ACTION CHECKLIST ── */
                .checklist-item { display: flex; gap: 12px; padding: 12px 0; border-bottom: 1px solid #f3f4f6; }
                .checklist-item:last-child { border-bottom: none; }
                .check-box { width: 22px; height: 22px; border: 2px solid #e5e7eb; border-radius: 6px; flex-shrink: 0; margin-top: 1px; }
                .check-text strong { display: block; font-size: 13px; font-weight: 700; color: #111827; }
                .check-text span { font-size: 12px; color: #6b7280; }
                .time-badge { display: inline-block; background: #eff6ff; color: #1d4ed8; font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 999px; margin-top: 4px; }

                /* ── YEAR PROJECTION ── */
                .year-proj { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-top: 16px; }
                .month-col { text-align: center; }
                .month-bar-wrap { display: flex; flex-direction: column; align-items: center; height: 100px; justify-content: flex-end; gap: 4px; }
                .month-bar { width: 100%; border-radius: 6px 6px 0 0; background: linear-gradient(180deg, #ff4d5e, #dc2626); }
                .month-label { font-size: 10px; color: #9ca3af; font-weight: 600; }
                .month-value { font-size: 11px; font-weight: 800; color: #111827; }

                /* ── FOOTER ── */
                .doc-footer {
                    margin-top: 48px;
                    padding-top: 24px;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .doc-footer .brand { font-size: 13px; font-weight: 800; color: #111827; }
                .doc-footer .brand span { color: #dc2626; }
                .doc-footer p { font-size: 11px; color: #9ca3af; }

                /* ── PRINT ── */
                @media print {
                    body { background: white; }
                    .print-btn { display: none !important; }
                    .page { padding: 20px; }
                    .doc-header { border-radius: 12px; padding: 32px; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    .card, .scenario-header, .bar, .lever-fill, .section-number, .stat-box .big {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                    .section { page-break-inside: avoid; }
                    .scenario { page-break-inside: avoid; }
                }
            `}</style>

            <button className="print-btn" onClick={() => window.print()}>
                Print / Save as PDF ↓
            </button>

            <div className="page">

                {/* ── HEADER ── */}
                <div className="doc-header">
                    <div className="header-badge">
                        <span>Confidential Business Overview</span>
                    </div>
                    <h1>SiteER — <span>Complete</span><br />Business Overview</h1>
                    <p>Revenue projections, cost structure, customer journey, and 90-day growth roadmap for the SiteER website diagnostic platform.</p>
                    <div className="header-meta">
                        <div className="header-meta-item">
                            <div className="label">Prepared for</div>
                            <div className="value">COAIBAKERSFIELD.COM</div>
                        </div>
                        <div className="header-meta-item">
                            <div className="label">Date</div>
                            <div className="value">May 2026</div>
                        </div>
                        <div className="header-meta-item">
                            <div className="label">Platform</div>
                            <div className="value">siteer.dev</div>
                        </div>
                        <div className="header-meta-item">
                            <div className="label">Market</div>
                            <div className="value">Bakersfield, CA + National</div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 1: What It Does ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">1</div>
                        <h2>What SiteER Does</h2>
                    </div>
                    <div className="card card-red" style={{ marginBottom: 16 }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#111827', marginBottom: 8 }}>The Problem It Solves</p>
                        <p style={{ color: '#374151', lineHeight: 1.7 }}>
                            Local business owners — plumbers, contractors, lawyers, dentists — have websites that look fine but are silently losing them customers every day. They don't know it because they can't read a technical audit. SiteER translates website health into a school-style grade (A–F) and a plain-English dollar estimate of what that grade is costing them each month.
                        </p>
                    </div>
                    <div className="grid-4">
                        <div className="card stat-box">
                            <div className="big">60s</div>
                            <div className="label">Full scan time</div>
                        </div>
                        <div className="card stat-box">
                            <div className="big">20+</div>
                            <div className="label">Checks per scan</div>
                        </div>
                        <div className="card stat-box">
                            <div className="big">A–F</div>
                            <div className="label">Grade system</div>
                        </div>
                        <div className="card stat-box">
                            <div className="big">$0</div>
                            <div className="label">Cost to scan</div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 2: Customer Journey ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">2</div>
                        <h2>The Customer Journey — How a Stranger Becomes $497</h2>
                    </div>
                    <div className="funnel" style={{ marginBottom: 16 }}>
                        <div className="funnel-step">
                            <div className="step-icon">👤</div>
                            <div className="step-name">Visitor</div>
                            <div className="step-rate">100%</div>
                            <div className="step-desc">Lands on site</div>
                        </div>
                        <div className="funnel-step">
                            <div className="step-icon">🔍</div>
                            <div className="step-name">Scans</div>
                            <div className="step-rate">35%</div>
                            <div className="step-desc">Runs free scan</div>
                        </div>
                        <div className="funnel-step">
                            <div className="step-icon">📧</div>
                            <div className="step-name">Email</div>
                            <div className="step-rate">40%</div>
                            <div className="step-desc">Unlocks report</div>
                        </div>
                        <div className="funnel-step">
                            <div className="step-icon">📄</div>
                            <div className="step-name">$49 Report</div>
                            <div className="step-rate">10%</div>
                            <div className="step-desc">Deep ER Report</div>
                        </div>
                        <div className="funnel-step">
                            <div className="step-icon">🔧</div>
                            <div className="step-name">$497 Fix</div>
                            <div className="step-rate">5%</div>
                            <div className="step-desc">ER Fix Pack</div>
                        </div>
                    </div>
                    <div className="card card-dark" style={{ padding: '16px 20px' }}>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginBottom: 8 }}>Automatic re-engagement after lead capture</p>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {[
                                ['Instant', 'Report link emailed immediately'],
                                ['Day 3', '"3 quick fixes you can do today"'],
                                ['Day 7', '"Still losing customers?" + quote CTA'],
                            ].map(([day, text]) => (
                                <div key={day} style={{ background: 'rgba(255,255,255,.08)', borderRadius: 10, padding: '10px 14px', flex: 1, minWidth: 160 }}>
                                    <div style={{ color: '#ff8792', fontSize: 11, fontWeight: 700, marginBottom: 4 }}>{day}</div>
                                    <div style={{ color: 'rgba(255,255,255,.8)', fontSize: 12 }}>{text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SECTION 3: Revenue Tiers ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">3</div>
                        <h2>Three Revenue Tiers</h2>
                    </div>
                    <div className="grid-3">
                        <div className="card" style={{ borderTop: '4px solid #e5e7eb' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#6b7280', marginBottom: 8 }}>Free Scan</div>
                            <div style={{ fontSize: 2.2 + 'rem', fontWeight: 900, color: '#111827', letterSpacing: '-.04em' }}>$0</div>
                            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8, lineHeight: 1.6 }}>Lead generator. Hooks business owners with their grade + money leak estimate. Captures email for follow-up sequence.</p>
                            <div style={{ marginTop: 12, fontSize: 12, color: '#374151' }}>
                                <div>✓ Grade A–F</div>
                                <div>✓ Money leak estimate</div>
                                <div>✓ Top 3 issues</div>
                                <div>✓ Shareable report link</div>
                            </div>
                        </div>
                        <div className="card" style={{ borderTop: '4px solid #3b82f6' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#2563eb', marginBottom: 8 }}>Deep ER Report</div>
                            <div style={{ fontSize: 2.2 + 'rem', fontWeight: 900, color: '#111827', letterSpacing: '-.04em' }}>$49</div>
                            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8, lineHeight: 1.6 }}>Manual 30–60 min expert review layered on the automated scan. Low-friction impulse buy that builds trust.</p>
                            <div style={{ marginTop: 12, fontSize: 12, color: '#374151' }}>
                                <div>✓ Human expert review</div>
                                <div>✓ Copy & offer clarity notes</div>
                                <div>✓ Local SEO quick wins</div>
                                <div>✓ PDF report delivered</div>
                            </div>
                        </div>
                        <div className="card" style={{ borderTop: '4px solid #dc2626' }}>
                            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#dc2626', marginBottom: 8 }}>ER Fix Pack ★ Main Revenue</div>
                            <div style={{ fontSize: 2.2 + 'rem', fontWeight: 900, color: '#111827', letterSpacing: '-.04em' }}>$497</div>
                            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8, lineHeight: 1.6 }}>COAIBAKERSFIELD.COM implements fixes + re-scans to prove results. 20-point grade improvement guarantee.</p>
                            <div style={{ marginTop: 12, fontSize: 12, color: '#374151' }}>
                                <div>✓ Speed + mobile fixes</div>
                                <div>✓ SEO fundamentals</div>
                                <div>✓ Before/after re-scan proof</div>
                                <div>✓ Money-back guarantee</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 4: Cost Structure ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">4</div>
                        <h2>Cost Structure — Monthly Overhead</h2>
                    </div>
                    <div className="grid-2">
                        <div className="card">
                            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Fixed Monthly Costs</p>
                            {[
                                ['Vercel (hosting)', '$0', true],
                                ['Supabase (database)', '$0', true],
                                ['Resend (email — 3k/mo)', '$0', true],
                                ['Google Analytics', '$0', true],
                                ['Domain (siteer.dev)', '~$1/mo', false],
                                ['Square (no monthly fee)', '$0', true],
                            ].map(([label, cost, free]) => (
                                <div key={label as string} className="cost-row">
                                    <span className="cost-label">{label as string}</span>
                                    <span className={`cost-badge ${free ? 'cost-free' : 'cost-paid'}`}>{cost as string}</span>
                                </div>
                            ))}
                            <div style={{ marginTop: 14, padding: '12px 0 0', borderTop: '2px solid #111827', display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ fontWeight: 800 }}>Total Fixed</span>
                                <span style={{ fontWeight: 900, fontSize: 15, color: '#16a34a' }}>~$0–$1/mo</span>
                            </div>
                        </div>
                        <div className="card">
                            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Variable Costs (per transaction)</p>
                            {[
                                ['Square fee on $49 sale', '$1.72', '3.5%'],
                                ['Square fee on $497 sale', '$14.71', '3.0%'],
                                ['Email (Resend, per send)', '$0.00', 'Free tier'],
                                ['Database query', '$0.00', 'Free tier'],
                            ].map(([label, cost, note]) => (
                                <div key={label as string} className="cost-row">
                                    <span className="cost-label">{label as string}</span>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: '#374151' }}>{cost as string}</div>
                                        <div style={{ fontSize: 10, color: '#9ca3af' }}>{note as string}</div>
                                    </div>
                                </div>
                            ))}
                            <div className="card card-green" style={{ marginTop: 14, padding: '14px 16px' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: '#16a34a' }}>Effective Profit Margin</div>
                                <div style={{ fontSize: 2 + 'rem', fontWeight: 900, color: '#15803d', letterSpacing: '-.04em', marginTop: 4 }}>~97%</div>
                                <div style={{ fontSize: 11, color: '#166534', marginTop: 2 }}>Nearly every dollar of revenue is profit</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 5: 90-Day Projections ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">5</div>
                        <h2>90-Day Revenue Projections — 3 Scenarios</h2>
                    </div>

                    {/* Scenario A */}
                    <div className="scenario scenario-a" style={{ marginBottom: 16 }}>
                        <div className="scenario-header">
                            <h3>Scenario A — No Active Marketing (SEO Only)</h3>
                            <p>Deploy and wait. No outreach. Pure organic traffic. Realistic baseline.</p>
                        </div>
                        <div className="scenario-body">
                            <table className="rev-table">
                                <thead>
                                    <tr>
                                        <th>Period</th>
                                        <th>Visitors</th>
                                        <th>Email Leads</th>
                                        <th>$49 Sales</th>
                                        <th>$497 Sales</th>
                                        <th>Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Days 1–30</td><td>50</td><td>8</td><td>1</td><td>0</td><td className="money">$49</td></tr>
                                    <tr><td>Days 31–60</td><td>100</td><td>16</td><td>2</td><td>0</td><td className="money">$98</td></tr>
                                    <tr><td>Days 61–90</td><td>200</td><td>32</td><td>4</td><td>1</td><td className="money">$693</td></tr>
                                    <tr className="total-row">
                                        <td><strong>90-Day Total</strong></td>
                                        <td>350</td><td>56</td><td>7</td><td>1</td>
                                        <td className="profit">$840</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Scenario B */}
                    <div className="scenario scenario-b" style={{ marginBottom: 16 }}>
                        <div className="scenario-header">
                            <h3>Scenario B — Light Outreach (Recommended Starting Point)</h3>
                            <p>Scan 10 local businesses per week, email each their grade. 1 hour per week of effort.</p>
                        </div>
                        <div className="scenario-body">
                            <table className="rev-table">
                                <thead>
                                    <tr>
                                        <th>Period</th>
                                        <th>Contacts</th>
                                        <th>Replies (10%)</th>
                                        <th>$49 Sales</th>
                                        <th>$497 Sales</th>
                                        <th>Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Days 1–30</td><td>40</td><td>4</td><td>2</td><td>1</td><td className="money">$644</td></tr>
                                    <tr><td>Days 31–60</td><td>40</td><td>4</td><td>2</td><td>2</td><td className="money">$1,092</td></tr>
                                    <tr><td>Days 61–90</td><td>40</td><td>4</td><td>3</td><td>2</td><td className="money">$1,141</td></tr>
                                    <tr className="total-row">
                                        <td><strong>90-Day Total</strong></td>
                                        <td>120</td><td>12</td><td>7</td><td>5</td>
                                        <td className="profit">$4,067</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Scenario C */}
                    <div className="scenario scenario-c">
                        <div className="scenario-header">
                            <h3>Scenario C — Active Outreach + Referrals (Growth Mode)</h3>
                            <p>20+ contacts/week, ask every client for a referral, post in local Facebook groups.</p>
                        </div>
                        <div className="scenario-body">
                            <table className="rev-table">
                                <thead>
                                    <tr>
                                        <th>Period</th>
                                        <th>Contacts</th>
                                        <th>Replies</th>
                                        <th>$49 Sales</th>
                                        <th>$497 Sales</th>
                                        <th>Revenue</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td>Days 1–30</td><td>80</td><td>8</td><td>4</td><td>3</td><td className="money">$1,687</td></tr>
                                    <tr><td>Days 31–60</td><td>80</td><td>8</td><td>5</td><td>4</td><td className="money">$2,233</td></tr>
                                    <tr><td>Days 61–90</td><td>80</td><td>8</td><td>6</td><td>5</td><td className="money">$4,779</td></tr>
                                    <tr className="total-row">
                                        <td><strong>90-Day Total</strong></td>
                                        <td>240</td><td>24</td><td>15</td><td>12</td>
                                        <td className="profit">$8,847</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 6: Visual Bar Chart ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">6</div>
                        <h2>90-Day Revenue at a Glance</h2>
                    </div>
                    <div className="card" style={{ padding: '28px 24px 20px' }}>
                        <div className="bar-chart">
                            {[
                                { label: 'SEO Only', value: '$840', height: 9, color: '#e5e7eb' },
                                { label: 'Month 1\nLight', value: '$644', height: 7, color: '#93c5fd' },
                                { label: 'Month 2\nLight', value: '$1,092', height: 12, color: '#60a5fa' },
                                { label: 'Month 3\nLight', value: '$1,141', height: 13, color: '#3b82f6' },
                                { label: 'Month 1\nActive', value: '$1,687', height: 19, color: '#fca5a5' },
                                { label: 'Month 2\nActive', value: '$2,233', height: 25, color: '#f87171' },
                                { label: 'Month 3\nActive', value: '$4,779', height: 54, color: '#dc2626' },
                            ].map((b) => (
                                <div key={b.label} className="bar-group">
                                    <div className="bar-wrap">
                                        <div className="bar-value">{b.value}</div>
                                        <div className="bar" style={{ height: b.height * 3, background: b.color }} />
                                    </div>
                                    <div className="bar-label" style={{ whiteSpace: 'pre-line', fontSize: 10 }}>{b.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SECTION 7: Year 1 Projection ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">7</div>
                        <h2>Year 1 Conservative Projection (Light Outreach)</h2>
                    </div>
                    <div className="card">
                        <div className="year-proj">
                            {[
                                { month: 'Mo. 1', value: 644, max: 5000 },
                                { month: 'Mo. 2', value: 1092, max: 5000 },
                                { month: 'Mo. 3', value: 1141, max: 5000 },
                                { month: 'Mo. 4', value: 2500, max: 5000 },
                                { month: 'Mo. 5', value: 3200, max: 5000 },
                                { month: 'Mo. 6', value: 4100, max: 5000 },
                            ].map((m) => (
                                <div key={m.month} className="month-col">
                                    <div className="month-bar-wrap">
                                        <div className="month-value">${(m.value / 1000).toFixed(1)}k</div>
                                        <div className="month-bar" style={{ height: (m.value / m.max) * 80 }} />
                                    </div>
                                    <div className="month-label">{m.month}</div>
                                </div>
                            ))}
                        </div>
                        <div className="grid-3" style={{ marginTop: 20 }}>
                            <div className="card card-blue" style={{ textAlign: 'center', padding: '16px' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '.06em' }}>6-Month Revenue</div>
                                <div style={{ fontSize: 1.8 + 'rem', fontWeight: 900, color: '#1e40af', marginTop: 4 }}>~$12,677</div>
                            </div>
                            <div className="card card-amber" style={{ textAlign: 'center', padding: '16px' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#92400e', textTransform: 'uppercase', letterSpacing: '.06em' }}>Year 1 Estimate</div>
                                <div style={{ fontSize: 1.8 + 'rem', fontWeight: 900, color: '#78350f', marginTop: 4 }}>~$45,000</div>
                            </div>
                            <div className="card card-green" style={{ textAlign: 'center', padding: '16px' }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: '#166534', textTransform: 'uppercase', letterSpacing: '.06em' }}>Year 1 Costs</div>
                                <div style={{ fontSize: 1.8 + 'rem', fontWeight: 900, color: '#15803d', marginTop: 4 }}>~$250</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── SECTION 8: Growth Levers ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">8</div>
                        <h2>Revenue Levers — Ranked by Impact</h2>
                    </div>
                    <div className="card">
                        {[
                            { name: 'Cold outreach — scan & email local businesses', impact: 'HIGHEST IMPACT', pct: 100 },
                            { name: 'Ask every client for 1 referral', impact: 'VERY HIGH', pct: 82 },
                            { name: 'Day 3 + Day 7 follow-up email sequence (auto)', impact: 'HIGH', pct: 68 },
                            { name: 'Google Business Profile (free)', impact: 'MEDIUM–HIGH', pct: 52 },
                            { name: 'Blog SEO — 3 articles already published', impact: 'MEDIUM (long term)', pct: 38 },
                            { name: '$49 Deep ER Report upsell from free report', impact: 'MEDIUM', pct: 32 },
                        ].map((l) => (
                            <div key={l.name} className="lever">
                                <div className="lever-header">
                                    <span className="lever-name">{l.name}</span>
                                    <span className="lever-impact">{l.impact}</span>
                                </div>
                                <div className="lever-track">
                                    <div className="lever-fill" style={{ width: l.pct + '%' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── SECTION 9: Action Plan ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">9</div>
                        <h2>90-Day Action Plan</h2>
                    </div>
                    <div className="grid-2">
                        <div className="card">
                            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#dc2626' }}>Week 1 — Launch</p>
                            {[
                                ['Run Supabase migration', 'One SQL paste, 5 min'],
                                ['Add env vars to Vercel & redeploy', '30 min'],
                                ['Set up Google Analytics', '15 min — free'],
                                ['Set up Google Business Profile', '30 min — free'],
                                ['Scan 5 local businesses, send their grade', '1 hour'],
                            ].map(([task, time]) => (
                                <div key={task as string} className="checklist-item">
                                    <div className="check-box" />
                                    <div className="check-text">
                                        <strong>{task as string}</strong>
                                        <div><span className="time-badge">{time as string}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="card">
                            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 12, color: '#1d4ed8' }}>Ongoing — Every Week</p>
                            {[
                                ['Scan 10 new local businesses', '30 min/week'],
                                ['Email each their grade + report link', '30 min/week'],
                                ['Reply to responses, close Fix Pack deals', 'As needed'],
                                ['Ask every new client for 1 referral', 'Takes 10 seconds'],
                                ['Check GA4 funnel — fix drop-off points', '15 min/week'],
                            ].map(([task, time]) => (
                                <div key={task as string} className="checklist-item">
                                    <div className="check-box" />
                                    <div className="check-text">
                                        <strong>{task as string}</strong>
                                        <div><span className="time-badge">{time as string}</span></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="card card-dark" style={{ marginTop: 16, padding: '16px 20px' }}>
                        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Runs automatically while you sleep</p>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            {[
                                'Report link emailed on every scan',
                                'Day 3 follow-up fires automatically',
                                'Day 7 re-engagement fires automatically',
                                'Square payments confirmed via webhook',
                                'Rate limiting protects all API endpoints',
                            ].map((item) => (
                                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <span style={{ color: '#4ade80', fontSize: 14 }}>✓</span>
                                    <span style={{ color: 'rgba(255,255,255,.75)', fontSize: 12 }}>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SECTION 10: Bottom Line ── */}
                <div className="section">
                    <div className="section-title">
                        <div className="section-number">10</div>
                        <h2>The Bottom Line</h2>
                    </div>
                    <div className="grid-3">
                        <div className="card card-red" style={{ textAlign: 'center', padding: '24px 16px' }}>
                            <div style={{ fontSize: 2.2 + 'rem', fontWeight: 900, color: '#dc2626', letterSpacing: '-.04em' }}>$1</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginTop: 6 }}>minimum monthly cost</div>
                            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>Domain only. Everything else is free.</div>
                        </div>
                        <div className="card card-red" style={{ textAlign: 'center', padding: '24px 16px' }}>
                            <div style={{ fontSize: 2.2 + 'rem', fontWeight: 900, color: '#dc2626', letterSpacing: '-.04em' }}>97%</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginTop: 6 }}>profit margin</div>
                            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>Near-zero marginal cost per sale.</div>
                        </div>
                        <div className="card card-green" style={{ textAlign: 'center', padding: '24px 16px' }}>
                            <div style={{ fontSize: 2.2 + 'rem', fontWeight: 900, color: '#16a34a', letterSpacing: '-.04em' }}>1</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginTop: 6 }}>Fix Pack client/month</div>
                            <div style={{ fontSize: 11, color: '#6b7280', marginTop: 4 }}>To be profitable from Day 1.</div>
                        </div>
                    </div>
                    <div className="card" style={{ marginTop: 16, background: 'linear-gradient(135deg, #fff5f5, #fff8f0)', border: '1px solid #fecaca', padding: '24px' }}>
                        <p style={{ fontSize: 15, fontWeight: 800, color: '#111827', marginBottom: 10 }}>The Single Most Important Insight</p>
                        <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.75 }}>
                            The $49 report is not your business — it's a trust-builder. The $497 Fix Pack is your business. Three Fix Pack clients per month = $1,491. Five per month = $2,485. Both are achievable by Month 2 with 10 cold outreach emails per week — each email showing a local business owner their grade and the money they're losing. The tool does the selling for you.
                        </p>
                    </div>
                </div>

                {/* ── FOOTER ── */}
                <div className="doc-footer">
                    <div>
                        <div className="brand">Site<span>ER</span></div>
                        <p>siteer.dev · Powered by COAIBAKERSFIELD.COM · Bakersfield, CA</p>
                    </div>
                    <p>Confidential — May 2026</p>
                </div>
            </div>
        </>
    );
}
