import { test, expect, Page } from '@playwright/test';
import path from 'path';

const backupFilePath = path.resolve(__dirname, 'fixtures', 'valid-backup.json');
const invalidBackupFilePath = path.resolve(__dirname, 'fixtures', 'invalid-backup.json');
const nonJsonFilePath = path.resolve(__dirname, 'fixtures', 'non-json.txt');

const uploadFile = async (page: Page, filePath: string) => {
  await page.setInputFiles('input[type="file"]', filePath);
};

const checkToastMessage = async (page: Page, expectedMessage: string) => {
  const toastDescription = await page.locator('.toast-description').innerText();
  await expect(toastDescription).toContain(expectedMessage);
};

test.describe('importing backups', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
  });

  test('renders import backup form', async ({ page }) => {
    await expect(page.locator('text=Import Backup')).toBeVisible();
  });

  test('uploads and validates a valid backup file', async ({ page }) => {
    await uploadFile(page, backupFilePath);
    await page.click('text=Import Backup');
    await checkToastMessage(page, 'Your import was successful!');
  });

  test('shows error for invalid backup file', async ({ page }) => {
    await uploadFile(page, invalidBackupFilePath);
    await page.click('text=Import Backup');
    await checkToastMessage(page, 'Your backup file is invalid');
  });

  test('shows error for non-JSON file', async ({ page }) => {
    await uploadFile(page, nonJsonFilePath);
    await page.click('text=Import Backup');
    await checkToastMessage(page, 'Your file is invalid');
  });
});