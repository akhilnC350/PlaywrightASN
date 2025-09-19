import path from 'path';
import { Page } from '@playwright/test';

export class UploadPage {
  constructor(private page: Page) {}

  /**
   * ===============================
   * Primary Upload Method
   * ===============================
   * Uploads a single file using the hidden <input type="file"> field (#picturecontainer).
   * This bypasses the visible "Open" button since Playwright cannot interact with OS dialogs.
   * 
   * @param fileName - Name of the file located in test-files/fixtures/
   */
  async uploadFile(fileName: string) {
    const filePath = path.join(__dirname, `../test-files/fixtures/${fileName}`);
    await this.page.setInputFiles('#uploadFile', filePath);
  }

  /**
   * ===============================
   * Secondary Upload Method
   * ===============================
   * Uploads a file again using the same hidden input (#picturecontainer).
   * This method is designed in case your AUT (application under test)
   * has multiple upload triggers or needs retries.
   * 
   * @param fileName - Name of the file located in test-files/fixtures/
   */
  async uploadAdditionalFile(fileName: string) {
    const filePath = path.join(__dirname, `../test-files/fixtures/${fileName}`);
    await this.page.setInputFiles('#uploadFile', filePath);
  }

  /**
   * ===============================
   * Upload Success Validation
   * ===============================
   * Waits for a confirmation element to ensure the file upload succeeded.
   * Update '#uploadSuccess' with the actual locator from your application.
   */
  async waitForUploadSuccess() {
    await this.page.locator('#uploadSuccess').waitFor({ state: 'visible' });
  }
}