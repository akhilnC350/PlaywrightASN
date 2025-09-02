import { test } from '@playwright/test';
import { RegistrationPage } from '../pages/RegistrationPage';

test('User Registration - Valid Data', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);

  await registrationPage.goto();

  // unique email for every run
  const uniqueEmail = `akhil${Date.now()}@gmail.com`;

  await registrationPage.fillRegistrationForm(
    'Akhil',
    'Negi',
    uniqueEmail,
    '9876543210',
    'Password123!'
  );

  await registrationPage.selectNewsletter();
  await registrationPage.acceptPrivacyPolicy();
  await registrationPage.submit();

  await registrationPage.verifySuccess();

  await page.screenshot({
    path: 'C:\\PlaywrightASN\\screenshots\\registration_success.png'
  });
});
