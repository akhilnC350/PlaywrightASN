import { test, expect } from '@playwright/test';

test('Bank login test', async ({page}) =>  {

    await page. goto ('https://qaplayground.com/bank');
    await page.locator('#username').fill('admin');
    await page.locator('#password').fill('admin123');
    await page.locator('#login-btn').click();

    await expect(page).toHaveURL(/.*\/bank\/dashboard/);
    await expect(page.locator('[data-testid="page-title"]')).toHaveText('SecureBank Dashboard — QA Automation Practice');


});