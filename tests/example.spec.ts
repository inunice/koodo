import { test, expect } from '@playwright/test';

test.describe('Home component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('renders the Home page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Home');
  });

});
