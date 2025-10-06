import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://staging.chat360.io/login');
  await page.locator('div').filter({ hasText: /^Email address$/ }).nth(2).click();
  await page.locator('input[name="email"]').fill('akhil1809@gmail.com');
  await page.locator('input[name="email"]').press('Tab');
  await page.locator('input[name="password"]').fill('AKhil@s807');
  await page.getByTestId('button').click();
  await page.getByRole('alert').click();
});