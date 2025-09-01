import { Page, expect } from '@playwright/test';

export class E2EPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navigate to Registration
  async gotoRegistration() {
    await this.page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register', { timeout: 120000 });
  }

  // Fill Registration Form
  async register(firstName: string, lastName: string, email: string, phone: string, password: string) {
    await this.page.click('text=My Account');
    await this.page.click('text=Register');
    await this.page.fill('#input-firstname', firstName);
    await this.page.fill('#input-lastname', lastName);
    await this.page.fill('#input-email', email);
    await this.page.fill('#input-telephone', phone);
    await this.page.fill('#input-password', password);
    await this.page.fill('#input-confirm', password);
    await this.page.check('input[name="newsletter"][value="1"]');
    await this.page.check('input[name="agree"]');
    await this.page.click('input[type="submit"][value="Continue"]');

    await this.page.screenshot({ path: 'screenshots/registration_success.png' });
  }

  // Add New Address
  async addNewAddress(firstName: string, lastName: string, company: string, address: string, city: string, postcode: string, country: string, zone: string) {
    await this.page.click('text=Continue');
    await this.page.waitForTimeout(2000);
    await this.page.click('text=Address Book');
    await this.page.click('text=New Address');

    await this.page.fill('#input-firstname', firstName);
    await this.page.fill('#input-lastname', lastName);
    await this.page.fill('#input-company', company);
    await this.page.fill('#input-address-1', address);
    await this.page.fill('#input-city', city);
    await this.page.fill('#input-postcode', postcode);
    await this.page.selectOption('#input-country', country);
    await this.page.selectOption('#input-zone', zone);
    await this.page.check('input[name="default"][value="1"]');
    await this.page.click('input[type="submit"][value="Continue"]');

    await expect(this.page.locator('.alert-success')).toContainText('Your address has been successfully added');
  }

  // Logout
  async logout() {
    await this.page.click('text=My Account');
    await this.page.click('text=Logout');
    await this.page.click('text=Continue');
  }

  // Login
  async login(email: string, password: string) {
    //implement explicit wait for page load
    await this.page.waitForLoadState('load');
    await this.page.click('text=My Account');
    await this.page.click('text=Login');
    await this.page.fill('#input-email', email);
    await this.page.fill('#input-password', password);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.screenshot({ path: 'screenshots/login.png' });
    await expect(this.page.locator('h2:has-text("My Account")')).toHaveText('My Account');
  }
}