import { test, expect } from '@playwright/test';

test('Failed login validation check', async ({ page }) => {

    // Navigate to application
    await page.goto('https://qaplayground.com/bank');

    // Enter invalid credentials
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('wrongpassword');

    // Click login button
    await page.locator('#login-btn').click();


    // Assertion to validate error message text
    await expect(page.locator('#alert-message')).toHaveText('⚠️ Invalid username or password. Please try again.');

});