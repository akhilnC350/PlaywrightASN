import { test } from '@playwright/test';
import { E2EPage } from '../pages/E2EPage';

test('E2E - Registration >> Add Address >> Logout >> Login', async ({ page }) => {
  const e2e = new E2EPage(page);

  const uniqueEmail = `akhil1809+${Date.now()}@gmail.com`;
  // Registration
  await e2e.gotoRegistration();

  // implement explicit wait
  await e2e.register('Akhil', 'Negi', uniqueEmail, '9876543210', 'Password123!');

  // Add Address
  await e2e.addNewAddress('Akhil', 'Negi', 'ASN', 'S/807, Green Park', 'Pune', '232112', '99', '1486');

  // Logout
  await e2e.logout();

  // Login again
  await e2e.login(uniqueEmail, 'Password123!');
});