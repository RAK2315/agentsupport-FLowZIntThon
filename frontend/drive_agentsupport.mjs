import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const SCREENSHOT_DIR = 'C:\\Users\\rehtr\\AppData\\Local\\Temp\\agentsupport_screenshots';
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
const ss = (name) => path.join(SCREENSHOT_DIR, `${name}.png`);

const browser = await chromium.launch({ headless: false, slowMo: 200 });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

const consoleErrors = [];
page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
page.on('pageerror', err => consoleErrors.push(err.message));

// 1. Load chat page
console.log('[1] Loading http://localhost:3000 ...');
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);
await page.screenshot({ path: ss('01_chat_initial') });
console.log('    Saved: 01_chat_initial.png');

// Capture any error overlay
const errorBadge = page.locator('button').filter({ hasText: /error/i }).first();
if (await errorBadge.isVisible().catch(() => false)) {
  await page.screenshot({ path: ss('01b_error_overlay') });
  console.log('    Error overlay detected — saved: 01b_error_overlay.png');
}

// 2. Type the demo message
console.log('[2] Typing demo message...');
const textarea = page.locator('textarea');
await textarea.click();
await textarea.fill('I received the wrong item for order ORD-003');
await page.screenshot({ path: ss('02_message_typed') });
console.log('    Saved: 02_message_typed.png');

// 3. Send with Enter and wait for response
console.log('[3] Sending message (up to 90s)...');
await textarea.press('Enter');

// Wait for typing indicator (3 bouncing dots) to appear
try {
  await page.waitForSelector('.animate-bounce', { state: 'attached', timeout: 8000 });
  console.log('    Typing indicator visible...');
} catch { console.log('    (no typing indicator detected)'); }

// Wait for it to disappear = response arrived
try {
  await page.waitForSelector('.animate-bounce', { state: 'detached', timeout: 90000 });
  console.log('    Response received.');
} catch { console.log('    Timeout — capturing current state.'); }

await page.waitForTimeout(600);
await page.screenshot({ path: ss('03_agent_response') });
console.log('    Saved: 03_agent_response.png');

if (consoleErrors.length) console.log('    JS errors:', consoleErrors);

// 4. Navigate to Audit Trail
console.log('[4] Opening Audit Trail...');
const auditBtn = page.locator('button').filter({ hasText: /Audit/i }).first();
if (await auditBtn.isVisible().catch(() => false)) {
  await auditBtn.click();
  await page.waitForURL(/audit/, { timeout: 10000 });
  await page.waitForTimeout(2500);
  await page.screenshot({ path: ss('04_audit_trail') });
  console.log('    Saved: 04_audit_trail.png');

  // 5. Expand a step
  console.log('[5] Expanding an audit step...');
  const stepBtns = page.locator('button').filter({ hasText: /audit_logger|tool_executor|responder/ });
  if (await stepBtns.count() > 0) {
    await stepBtns.first().click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: ss('05_step_expanded') });
    console.log('    Saved: 05_step_expanded.png');
  }

  // 6. Click Replay
  console.log('[6] Replay animation...');
  const replayBtn = page.locator('button').filter({ hasText: /Replay/i }).first();
  if (await replayBtn.isVisible().catch(() => false)) {
    await replayBtn.click();
    await page.waitForTimeout(1600);
    await page.screenshot({ path: ss('06_replay_running') });
    console.log('    Saved: 06_replay_running.png');
  }
} else {
  console.log('    Audit button not found. Current URL:', page.url());
  await page.screenshot({ path: ss('04_no_audit_btn') });
}

console.log('\nDone. Screenshots:', SCREENSHOT_DIR);
await browser.close();
