import { test, expect, Page } from '@playwright/test';

const testDownload = async (page: Page, buttonText: string, expectedFilenamePattern: RegExp) => {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click(`text=${buttonText}`)
  ]);

  const path = await download.path();
  expect(path).toBeTruthy();

  const suggestedFilename = download.suggestedFilename();
  expect(suggestedFilename).toMatch(expectedFilenamePattern);
};

test.describe('Download Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
  });

  test('downloads CSV file when download button is clicked', async ({ page }) => {
    await testDownload(page, 'Download CSV', /^koodo-bookmarks.*\.csv$/);
  });

  test('exports backup file when export button is clicked', async ({ page }) => {
    await testDownload(page, 'Export Backup', /^koodo-backup.*\.json$/);
  });
});