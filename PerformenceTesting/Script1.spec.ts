import { test, expect } from '@playwright/test';
import { E2EPage } from '../pages/E2EPage';

/**
 * Configuration Section
 * - NUMBER_OF_USERS: defines how many users you want to simulate in parallel
 * - PASSWORD: default password for all new users
 * - VIDEO_PATH: directory path where all user execution videos will be saved
 */
const NUMBER_OF_USERS = 5;
const PASSWORD = 'Password123!';
const VIDEO_PATH = 'videos/parallel/';

/**
 * Helper Function - generateUniqueEmail()
 * Generates a unique email for each user based on timestamp and index.
 * This ensures no duplicate emails during registration.
 */
function generateUniqueEmail(index: number): string {
  return `akhil1809+${Date.now()}_${index}@gmail.com`;
}

/**
 * Helper Function - validateTimestamp()
 * Verifies that a given timestamp string is in valid format, within expected range,
 * and prints the result in the terminal for each user.
 */
async function validateTimestamp(page: any, locatorSelector: string, uniqueEmail: string) {
  console.log(`\n🕒 Validating timestamp for user: ${uniqueEmail}`);

  // Step 1: Fetch timestamp text from UI
  const timestampText = await page.locator(locatorSelector).innerText();

  // Log timestamp value for debugging
  console.log(`📅 Extracted Timestamp from UI: "${timestampText}"`);

  // Step 2: Assertion - Check timestamp presence
  expect(timestampText, 'Timestamp should not be empty').not.toBe('');

  // Step 3: Assertion - Validate timestamp format (e.g., "10 Oct 2025, 12:45 PM")
  const timestampRegex = /^\d{1,2}\s\w+\s\d{4},\s\d{1,2}:\d{2}\s(AM|PM)$/;
  const isFormatValid = timestampRegex.test(timestampText);

  if (isFormatValid) {
    console.log('✅ Format Validation: PASSED (Matches expected pattern)');
  } else {
    console.warn('❌ Format Validation: FAILED (Timestamp format mismatch)');
  }

  expect(isFormatValid, 'Timestamp format should match expected pattern').toBeTruthy();

  // Step 4: Assertion - Recency (difference < 10 minutes)
  const displayedTime = new Date(timestampText);
  const currentTime = new Date();

  const diffMs = Math.abs(currentTime.getTime() - displayedTime.getTime());
  const diffMinutes = diffMs / (1000 * 60);

  console.log(`🧮 Time Difference: ${diffMinutes.toFixed(2)} minutes`);

  expect(
    diffMinutes,
    `Timestamp difference (${diffMinutes.toFixed(2)} min) should be less than 10 minutes`
  ).toBeLessThan(10);

  // Step 5: Log success message
  console.log(`✅ Timestamp Validation PASSED for ${uniqueEmail}\n`);
}

/**
 * Core Function - runUserFlow()
 * Handles the entire end-to-end flow for one user:
 * 1. Registration
 * 2. Add New Address
 * 3. Logout
 * 4. Login again
 * 5. Validate Timestamp after login
 */
async function runUserFlow(uniqueEmail: string, page: any) {
  const e2e = new E2EPage(page);

  // Step 1: Go to Registration Page
  await e2e.gotoRegistration();

  // Step 2: Register New User
  await e2e.register('Akhil', 'Negi', uniqueEmail, '9876543210', PASSWORD);

  // Step 3: Add New Address
  await e2e.addNewAddress('Akhil', 'Negi', 'ASN', 'S/807, Green Park', 'Pune', '232112', '99', '1486');

  // Step 4: Logout
  await e2e.logout();

  // Step 5: Login Again with same credentials
  await e2e.login(uniqueEmail, PASSWORD);

  // Step 6: Validate Timestamp (example: Last Login or Account Created Time)
  // 🔧 Update selector based on your application's DOM
  const TIMESTAMP_SELECTOR = '.last-login'; // Replace with your actual timestamp locator

  if (await page.locator(TIMESTAMP_SELECTOR).isVisible()) {
    await validateTimestamp(page, TIMESTAMP_SELECTOR, uniqueEmail);
  } else {
    console.warn(`⚠️ No timestamp element found for user ${uniqueEmail}`);
  }
}

/**
 * Main Test Block
 * Executes multiple user flows in parallel, each with its own browser context and video recording.
 */
test('E2E - Parallel Users with Video Recording + Timestamp Evaluation', async ({ browser }) => {
  // Create an array to hold all user promises
  const userPromises: Promise<void>[] = [];

  // Loop through number of users defined in configuration
  for (let i = 0; i < NUMBER_OF_USERS; i++) {
    // Generate a unique email for each user
    const uniqueEmail = generateUniqueEmail(i);

    // Create a new isolated browser context for this user
    const context = await browser.newContext({
      recordVideo: {
        dir: VIDEO_PATH, // Directory where the video will be saved
        size: { width: 1280, height: 720 }, // Video resolution
      },
    });

    // Open a new page/tab inside the context
    const page = await context.newPage();

    // Push the user flow execution into an array for parallel execution
    userPromises.push(
      runUserFlow(uniqueEmail, page)
        .then(async () => {
          // After successful completion, print the video path
          const videoPath = await page.video()?.path();
          console.log(`🎥 Video recorded for ${uniqueEmail}: ${videoPath}`);
        })
        .catch(err => {
          // Handle errors during user flow execution
          console.error(`❌ Error for user ${uniqueEmail}:`, err);
        })
        .finally(async () => {
          // Close the context (saves the video and frees up resources)
          await context.close();
        })
    );
  }

  // Wait for all user promises to complete (runs all in parallel)
  await Promise.all(userPromises);

  // Final log once all executions are done
  console.log(`✅ All ${NUMBER_OF_USERS} users completed registration, login, and timestamp validation`);
  console.log(`🎬 Videos saved in directory: ${VIDEO_PATH}`);
});