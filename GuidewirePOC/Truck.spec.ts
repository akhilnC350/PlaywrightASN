import {test, expect} from '@playwright/test';
import { UploadPage } from '../pages/upload.page';
test('implemeting Truck quotation e2e test',async ({page})=>{

    await page.goto('https://www.sparkstone.co.nz/sampleapp/101/?utm_source=chatgpt.com#');
    await page.click('#nav_truck');
    await page.waitForTimeout(5000);
    await page.locator('#make').selectOption('Audi');
    await page.locator('#engineperformance').fill('1000');
    await page.locator('#dateofmanufacture').fill('08/01/2001');
    await page.locator('#numberofseats').selectOption('2');
    await page.locator('select[name="Fuel Type"]').selectOption('Petrol');
    await page.locator('[name="Payload"]').fill('1000');
    await page.locator('[name="Total Weight"]').fill('1000');
    await page.locator('[name="List Price"]').fill('1000');
    await page.locator('[name="License Plate Number"]').fill('1221dsdw');
    await page.locator('[name="Annual Mileage"]').fill('2344');
    await page.locator('[name="Next (Enter Insurant Data)"]').click()

    //Enter Insurant Data

    await page.locator('[name="First Name"]').fill('Akhil');
    await page.locator('[name="Last Name"]').fill('Negi')
    await page.locator('[name="Date of Birth"]').fill('01/01/1988');
    await page.locator('[value="Male"]').check({force: true});
    await page.locator('[name="Street Address"]').fill('test abcd address');
    await page.locator('[name="Country"]').selectOption('India');
    await page.locator('[name="Zip Code"]').fill('121002');
    await page.locator('[name="City"]').fill('Bhopal');
    await page.locator('[name="Occupation"]').selectOption('Employee');
    await page.locator('[name="Hobbies"][value="Speeding"]').check({force:true});
    await page.locator('[name="Website"]').fill('https://www.sparkstone.co.nz/sampleapp/101/app.php');
    const upload = new UploadPage(page); // upload file using upload Pom reference 
    await upload.uploadFile('dice.jpg'); 
    await page.locator('[name="Next (Enter Product Data)"]').click();
    await page.waitForTimeout(5000);

    //Enter product data 

    await page.locator('[name="Start Date"]').fill('12/01/2025');
    await page.locator('[name="Insurance Sum"]').selectOption('3000000');
    await page.locator('[name="Damage Insurance"]').selectOption('Full Coverage');
    await page.locator('label.ideal-radiocheck-label', { hasText: 'Euro Protection' }).click();
    await page.locator ('[name="Next (Select Price Option)"]').click();

// Select Price Option 

await page.locator ('[name="Select Option"][value="Gold"]').check({force:true});
await page.locator('[name="Next (Send Quote)"]').click();
await page.locator('[name="E-Mail"]').fill('akhil1809@gmail.com');
await page.locator('[name="Phone"]').fill('9717530599');
await page.locator('[name="Username"]').fill('Akhil');
await page.locator('[name="Password"]').fill('Akhil@s807');
await page.locator('[name="Confirm Password"]').fill('Akhil@s807');
await page.locator('[name="Comments"]').fill('test test test test ');
await page.locator('[name="Send E-Mail"]').click();
await page.waitForTimeout(5000);

//Implementing assertion 
const successHeading= page.locator("//h2[normalize-space()='Sending e-mail success!']");
await expect(successHeading).toBeVisible();
await expect(successHeading).toHaveText('Sending e-mail success!');
// 
await page.waitForTimeout(5000);




  



});
