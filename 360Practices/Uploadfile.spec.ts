import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import path from 'path'; // Node.js module to handle file paths
import fs from 'fs';     // Node.js module to check if file exists

/// This is a simple single-button upload test
/// No Page Object Model (POM) is used, just a file path inside your project

test('Upload file using built-in locator', async ({ page }) => {

  // Step 1: Navigate directly to the Upload and Download page on DemoQA
  // This ensures we are on the correct page to interact with the file upload input
  await page.goto('https://demoqa.com/upload-download');

  // Step 2: Build the absolute path to the file inside your project
  // __dirname points to the directory where this test file is located
  // '../test-files/fixtures/dice.jpg' navigates to your dice.jpg file relative to this test
  const filePath = path.join(__dirname, '../test-files/fixtures/dice.jpg');

  // Step 3: Ensure the file exists before trying to upload
  // This prevents the test from failing with ENOENT if the file is missing
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at path: ${filePath}`);
  }

  // Step 4: Upload the file using Playwright's built-in locator
  // locator('#uploadFile') automatically finds the <input type="file" id="uploadFile">
  // setInputFiles() sets the file directly, bypassing the OS file dialog
  await page.locator('#uploadFile').setInputFiles(filePath);

  // Step 5: Verify that the uploaded file name is displayed on the page
  // The uploaded file name is shown in the element with id="uploadedFilePath"
  // This assertion confirms that the upload was successful
  await expect(page.locator('#uploadedFilePath')).toContainText('dice.jpg');

});