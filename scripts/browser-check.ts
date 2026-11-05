import { chromium, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';

async function main() {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3047');
    await page.getByRole('textbox', { name: 'Public website address' }).fill('https://siteer.dev');
    await page.getByRole('button', { name: /Get My Free Scan/ }).click();
    await expect(page.getByRole('heading', { name: 'Check your website' })).toBeVisible();
    await expect(page.getByLabel('Public website address')).toHaveValue('https://siteer.dev');
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Run free check' }).click();
    await expect(page.getByRole('heading', { name: 'Your HTML report' })).toBeVisible({ timeout: 25000 });
    await expect(page.getByRole('article')).toHaveCount(11);
    await mkdir('artifacts', { recursive: true });
    await page.screenshot({ path: 'artifacts/scan-desktop.png', fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: 'artifacts/scan-mobile.png', fullPage: true });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.getByLabel('Public website address').fill('http://127.0.0.1');
    await page.getByRole('button', { name: 'Run free check' }).click();
    await expect(page.getByRole('main').getByRole('alert')).toContainText('Only public internet websites');
    await expect(page.getByRole('heading', { name: 'Your HTML report' })).toHaveCount(0);
    expect(errors).toEqual([]);
    console.log('Browser checks passed: homepage handoff, live owned-page scan, 11 findings, mobile width, private target error, stale report clearing, no browser exceptions.');
  } finally { await browser.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
