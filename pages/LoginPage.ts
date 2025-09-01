import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly inputEmail: Locator;
  readonly inputPassword: Locator;
  readonly btnLogin: Locator;
  readonly lblMyAccount: Locator;
  readonly lblErrorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locators
    this.inputEmail = page.locator('#input-email');
    this.inputPassword = page.locator('#input-password');
    this.btnLogin = page.getByRole('button', { name: 'Login' });
    this.lblMyAccount = page.locator('h2:has-text("My Account")');
    this.lblErrorMessage = page.locator('.alert-danger');
  }

  /**
   * Navigate to login page
   */
  async gotoLoginPage(): Promise<void> {
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/login');
  }

  /**
   * Perform login
   */
  async login(email: string, password: string): Promise<void> {
    await this.inputEmail.fill(email);
    await this.inputPassword.fill(password);
    await this.btnLogin.click();
  }

  /**
   * Assert successful login
   */
  async assertLoginSuccess(screenshotPath: string): Promise<void> {
    // ⏳ Explicit wait for 3 seconds
    await this.page.waitForTimeout(3000);
    await expect(this.lblMyAccount).toHaveText('My Account');
    await this.page.screenshot({ path: screenshotPath });
  }

  /**
   * Assert failed login
   */
  async assertLoginFailure(screenshotPath: string): Promise<void> {
    // ⏳ Explicit wait for 3 seconds
    await this.page.waitForTimeout(3000);
    await expect(this.lblErrorMessage).toContainText('Warning: No match for E-Mail Address and/or Password.');
    await this.page.screenshot({ path: screenshotPath });
  }
}