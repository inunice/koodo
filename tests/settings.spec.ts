import { test, expect, Page } from '@playwright/test';

test.describe('SettingsPage component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/settings');
  });

  const checkElementVisibility = async (page: Page, text: string) => {
    await expect(page.locator(`text=${text}`)).toBeVisible();
  };

  test('renders settings page with dynamic components', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Settings');
    await checkElementVisibility(page, 'Download CSV');
    await checkElementVisibility(page, 'Export Backup');
    await checkElementVisibility(page, 'Import Backup');
  });
});