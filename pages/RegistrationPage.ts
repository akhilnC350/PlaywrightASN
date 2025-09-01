import { Page, expect } from '@playwright/test';

export class RegistrationPage {
  readonly page: Page;

  // Locators
  readonly firstNameInput = '#input-firstname';
  readonly lastNameInput = '#input-lastname';
  readonly emailInput = '#input-email';
  readonly telephoneInput = '#input-telephone';
  readonly passwordInput = '#input-password';
  readonly confirmPasswordInput = '#input-confirm';
  readonly newsletterYesRadio = 'input[name="newsletter"][value="1"]';
  readonly privacyPolicyCheckbox = 'input[name="agree"]';
  readonly continueButton = 'input[type="submit"][value="Continue"]';
  readonly successMessage = '#content h1';

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(
      'https://naveenautomationlabs.com/opencart/index.php?route=account/register'
    );
  }

  async fillRegistrationForm(firstName: string, lastName: string, email: string, phone: string, password: string) {
    await this.page.fill(this.firstNameInput, firstName);
    await this.page.fill(this.lastNameInput, lastName);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.telephoneInput, phone);
    await this.page.fill(this.passwordInput, password);
    await this.page.fill(this.confirmPasswordInput, password);
  }

  async selectNewsletter() {
    await this.page.check(this.newsletterYesRadio);
  }

  async acceptPrivacyPolicy() {
    await this.page.check(this.privacyPolicyCheckbox);
  }

  async submit() {
    await this.page.click(this.continueButton);
  }

  async verifySuccess() {
    await expect(this.page.locator(this.successMessage)).toHaveText('Your Account Has Been Created!');
  }
}