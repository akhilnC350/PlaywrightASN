import { test, expect }from '@playwright/test';
import { LoginPage } from "../pages/LoginPage";
test('registration page elements',async ({page})=>{
    // Navigate to registration page
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/address');
    // Check for the presence of the registration form

  
  // Create an instance of the LoginPage
 // 🔹 Reuse the login POM
  const loginPage = new LoginPage(page);
  await loginPage.gotoLoginPage();
  await loginPage.login('akhil1809@gmail.com', 'Password123!');
  await loginPage.assertLoginSuccess("C:\\PlaywrightASN\\screenshots\\login_success.png");

  await page.click('text=Address Book');
  await page.click('text=New Address');
  await page.fill('#input-firstname', 'akhil');
  await page.fill('#input-lastname','negi');
  await page.fill('#input-company','ASN');
  await page.fill('#input-address-1','S/807');
  await page.fill('#input-address-1','green park');
  await page.fill('#input-city','Pune');
  await page.fill('#input-postcode','232112');
  await page.selectOption('#input-country','99');
  await page.selectOption('#input-zone','1486');
  //radio button selection
  await page.check('input[name="default"][value="1"]');
  await page.click('input[type="submit"][value="Continue"]');
  // Assertion: Verify registration success
  await expect(page.locator('.alert-success')).toHaveText(' Your address has been successfully added');
  

});
  