import { test, expect } from '@playwright/test';

test('User Registration Form Automation', async ({ page }) => {

  // Navigate to application
  await page.goto('https://qaplayground.com/practice/forms');

  // ---------- Personal Details ----------

  await page.locator('#firstName').fill('Akhil');

  await page.locator('#lastName').fill('Negi');

  await page.locator('#email').fill('akhil@testmail.com');

  await page.locator('#phone').fill('9717530599');

  await page.locator('#dob').fill('1988-09-18');

  // Gender Radio Button
  await page.locator('#gender-male').check();

  // ---------- Address Section ----------

  // Country Dropdown (custom dropdown)
  await page.locator('#country').click();

  
await page.locator('[role="option"]').getByText('India').click();

  await page.locator('#city').fill('Delhi');

  // About You Text Area
  await page.locator('#bio')
    .fill('Automation tester with Playwright and retail domain experience.');

  // ---------- Interests Section ----------

  // These are custom checkbox buttons
  await page.locator('#interest-selenium').click();

  await page.locator('#interest-playwright').click();

  await page.locator('#interest-appium').click();

  // ---------- Account Details ----------

  await page.locator('#password').fill('Akhil@123');

  await page.locator('#confirmPassword').fill('Akhil@123');

  // ---------- Terms Checkbox ----------

  await page.locator('#terms').click();

  // ---------- Submit Form ----------

  await page.locator('#submitFormBtn').click();

  // ---------- Assertion Example ----------

  // Replace with actual success locator from your application
  // await expect(page.locator('.success-message')).toBeVisible();

});