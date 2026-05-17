import { test, expect } from '@playwright/test';

test('Delete all promotional emails (simulation with loop)', async ({ page }) => {
  // Step 1: Navigate to Gmail
  await page.goto('https://mail.google.com/mail/u/0/#inbox');
  console.log("Navigated to Gmail inbox.");

  await expect(page).toHaveTitle(/Gmail/i);

  // Step 2: Open Promotions tab
  console.log("Opening Promotions tab...");
  // Replace with real locator if using real Gmail
  // await page.click('[aria-label="Promotions"]');

  // Step 3 & 4: Loop until no promotional emails found
  const checkboxSelector = 'span.T-Jo.J-J5-Ji.T-Jo-auq.T-Jo-iAfbIe';
  const deleteIconSelector = 'div[aria-label="Delete"]';

  let batch = 1;

  while (await page.locator(checkboxSelector).count() > 0) {
    console.log(`Deleting batch ${batch} of promotional emails...`);

    // Select all visible promotional emails
    // await page.click(checkboxSelector);

    // Click Delete
    // await page.click(deleteIconSelector);

    console.log(`Batch ${batch} deleted.`);
    batch++;

    // Optional: wait for Gmail to refresh the list
    // await page.waitForTimeout(2000);
  }

  console.log("✅ No more promotional emails found. Deletion completed.");
});