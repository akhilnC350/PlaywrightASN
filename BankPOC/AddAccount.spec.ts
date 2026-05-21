import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://qaplayground.com/bank');
  await page.getByTestId('username-input').click();
  await page.getByTestId('username-input').fill('admin');
  await page.getByTestId('username-input').press('Tab');
  await page.getByTestId('password-input').click();
  await page.getByTestId('password-input').fill('admin123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('quick-add-account').click();
  await page.getByTestId('account-name-input').click();
  await page.getByTestId('account-name-input').fill('nikil');
  await page.getByTestId('account-type-select').click();
  await page.getByLabel('Savings Account').getByText('Savings Account').click();
  await page.getByTestId('initial-balance-input').click();
  await page.getByTestId('initial-balance-input').fill('4999.97');
  await page.getByTestId('save-account-button').click();
});