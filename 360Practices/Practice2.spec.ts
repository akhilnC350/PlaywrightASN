import { test, expect, Page } from '@playwright/test';

// ------------------------
// Reusable Helper Function
// ------------------------
/**
 * Selects a date and time in the Date & Time picker, including old years.
 * @param page - Playwright Page object
 * @param day - Day of month (e.g., 18)
 * @param month - Month name (e.g., 'September')
 * @param year - Full year (e.g., 1988)
 * @param time - Time string (e.g., '10:00')
 */
async function selectOldDate(page: Page, day: number, month: string, year: number, time: string) {
  // Click the input to open the Date & Time picker
  await page.locator('#dateAndTimePickerInput').click();

  // ---- Select Year ----
  // Click the currently visible year to open year dropdown
  await page.locator('.react-datepicker__year-read-view').click();

  // Loop until the target year becomes visible
  while (true) {
    const yearOption = page.locator('.react-datepicker__year-option').filter({ hasText: String(year) });
    if (await yearOption.count() > 0) {
      // If year is visible, click it and break loop
      await yearOption.click();
      break;
    }
    // Scroll to previous years if target year is not yet visible
    await page.locator('.react-datepicker__navigation--years-previous').click();
  }

  // ---- Select Month ----
  // Click the month read view to open month dropdown
  await page.locator('.react-datepicker__month-read-view').click();
  // Click the target month
  await page.locator('.react-datepicker__month-option').filter({ hasText: month }).click();

  // ---- Select Day ----
  // Click the day by using role and a dynamic regex for accessibility
  await page.getByRole('option', { name: new RegExp(`Choose .* ${month} ${day}.*`) }).click();

  // ---- Select Time ----
  // Click the time from the list
  await page.locator('.react-datepicker__time-list-item').filter({ hasText: time }).click();
}

// ------------------------
// Test Setup
// ------------------------
test.beforeEach(async ({ page }) => {
  // Navigate to demoqa homepage
  await page.goto('https://demoqa.com/');
  // Click on the "Widgets" section to access Date Picker
  await page.locator('h5:has-text("Widgets")').click();
});

// ------------------------
// Test Case: Practice2
// ------------------------
test('Practice2 - Date Picker', async ({ page }) => {
  // ---- Basic Date Picker ----
  // Click on "Date Picker" menu item
  await page.locator('.element-list.collapse.show li:has-text("Date Picker")').click();
  // Verify URL is correct
  await expect(page).toHaveURL('https://demoqa.com/date-picker');

  // Click the input to open basic date picker
  await page.locator('#datePickerMonthYearInput').click();
  // Select Month (July, index 6)
  await page.locator('.react-datepicker__month-select').selectOption('6');
  // Select Year (1995)
  await page.locator('.react-datepicker__year-select').selectOption('1995');
  // Wait for UI to stabilize (optional, but avoids flaky clicks)
  await page.waitForTimeout(2000);
  // Click specific day: Friday, July 7th, 1995
  await page.getByRole('option', { name: 'Choose Friday, July 7th, 1995' }).click();
  // Verify selected value in input
  await expect(page.locator('#datePickerMonthYearInput')).toHaveValue('07/07/1995');

  // ---- Date & Time Picker using helper ----
  // Select an old date (18-Sep-1988) and time (10:00 AM)
  await selectOldDate(page, 18, 'September', 1988, '10:00');
  // Verify input has correct value
  await expect(page.locator('#dateAndTimePickerInput')).toHaveValue('September 18, 1988 10:00 AM');
});


// test case practice 2 slidebar
test('Practice2 - Slide Bar', async ({ page }) => {
  // Click on "Slider" menu item
  await page.locator('.element-list.collapse.show li:has-text("Slider")').click();
  // Verify URL is correct
  await expect(page).toHaveURL('https://demoqa.com/slider');
  // Locate the slider input
  const slider = page.locator('input[type="range"]');
  // Set the slider value to 80
  await slider.evaluate((el, value) => { (el as HTMLInputElement).value = value; el.dispatchEvent(new Event('input')); }, '80');
  // Verify the slider value
  await expect (slider).toHaveValue('80');

});

// test case practice 2 progress bar
test('Practice2 - Progress Bar', async ({ page }) => {
  // Click on "Progress Bar" menu item
  await page.locator('.element-list.collapse.show li:has-text("Progress Bar")').click();
  // Verify URL is correct
  await expect(page).toHaveURL('https://demoqa.com/progress-bar');
  // Click the start button to initiate the progress bar
  await page.locator('#startStopButton').click();
  // Wait until the progress bar reaches 100%
  await page.locator('.progress-bar.bg-info').waitFor({ state: 'visible', timeout: 15000 });
  // Verify the progress bar has reached 100%
  await expect(page.locator('.progress-bar.bg-info')).toHaveAttribute('aria-valuenow', '100');

});
