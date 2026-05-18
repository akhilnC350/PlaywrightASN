import { test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test('Sparkstone Insurance Quote Flow', async ({ page }) => {
  await page.goto('https://sampleapp.tricentis.com/101/');

  // --- Step 1: Select Vehicle Type ---
  //await page.getByTitle('Get Quote Automobile').click();
  //await page.waitForTimeout(6000);
    await page.click('#nav_automobile');
    
  //await page.getByRole('button', {name:'Navigation Automobile'});

    await page.locator('#make').selectOption('Audi'); 
                 
    await page.locator('#engineperformance').fill('2000'); 
    await page.waitForTimeout(1000);           
    await page.locator('#dateofmanufacture').fill('01/01/2020');  
    await page.waitForTimeout(1000);  
    await page.locator('#numberofseats').selectOption('2');    
    await page.waitForTimeout(1000);        
    await page.locator('#fuel').selectOption('Petrol'); 
    await page.waitForTimeout(1000);                 
    await page.locator('#listprice').fill('1000');  
    await page.waitForTimeout(1000);                    
    await page.locator('#licenseplatenumber').fill('ABC123');  
    await page.waitForTimeout(1000);         // input field
    await page.locator('#annualmileage').fill('15000');   
    await page.waitForTimeout(1000);              // input field

  // // --- Step 3: Next button ---
    await page.getByRole('button', { name: 'Next »' }).click();
    await page.waitForTimeout(5000); 
    await page.locator('#firstname').fill('Akhil');
    await page.waitForTimeout(1000);
    await page.locator('#lastname').fill('Negi');
    await page.waitForTimeout(1000);
    await page.locator('#birthdate').fill('09/18/1988'); // date picker selection 
    await page.waitForTimeout(1000);
    await page.locator('#gendermale').check({ force: true });
    await page.waitForTimeout(2000);
    await page.locator('#streetaddress').fill('S/807 Nehru Nagar'); // field input
    await page.waitForTimeout(1000); 
    await page.locator('#country').selectOption('India');
    await page.waitForTimeout(1000);
    await page.locator('#zipcode').fill('121002');
    await page.waitForTimeout(1000);
    await page.locator('#city').fill('Bhopal');
    await page.locator('#occupation').selectOption('Employee');
    await page.waitForTimeout(1000);
    await page.locator('#speeding').check({force:true});
    await page.waitForTimeout(1000);
    await page.locator('#website').fill('https://www.sparkstone.co.nz/sampleapp/101/app.php');
    await page.waitForTimeout(1000);
    
    //Get 1.current project folder
    //    2. Build complete file path
    //    3. Check if image/file exists
    //    4. If file missing → stop test with clear error

    const filePath = path.resolve(process.cwd(), 'test-files/fixtures/dice.jpg');
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found at path: ${filePath}`);
    }

    // Prefer setInputFiles on the file input element to avoid filechooser flakiness
    const fileInput = page.locator('input[type="file"]');
    if (await fileInput.count() === 0) {
      // fallback: click the open button and use filechooser
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'), ]
        page.locator('#open').click()
      ]);
      await fileChooser.setFiles(filePath);\\\\\
    } else {
      await fileInput.setInputFiles(filePath);
    }
  //   const upload = new UploadPage(page); //upload file using upload Pom reference 
  //   await upload.uploadFile('dice.jpg'); //upload file using upload Pom reference
  //  // await upload.waitForUploadSuccess(); //upload file using upload Pom reference
    await page.click('#nextenterproductdata');
    await page.waitForTimeout(1000);
    await page.locator('#startdate').fill('11/07/2026');
    await page.waitForTimeout(1000);
    await page.locator('#insurancesum').selectOption('3.000.000,00');
    await page.waitForTimeout(1000);
    await page.locator('#meritrating').selectOption('Bonus 1');
    await page.waitForTimeout(1000);
    await page.locator('#damageinsurance').selectOption('Full Coverage');
    await page.waitForTimeout(1000);
    await page.locator('#EuroProtection').check({force:true});
    await page.waitForTimeout(1000);
    await page.locator('#courtesycar').selectOption('Yes')
    await page.waitForTimeout(1000);
    await page.click('#nextselectpriceoption');
    
    await expect(page.locator('#priceTable')).toBeVisible();

    await page.locator('#selectgold').check({ force: true });
    await page.waitForTimeout(1000);
    await page.click('#nextsendquote');


    ///Send Quote Screen 

    await page.locator('#email').fill('akhil1809@gmail.com');
    await page.waitForTimeout(1000);
    await page.locator('#phone').fill('2323234543');
    await page.waitForTimeout(1000);
    await page.locator('#username').fill('akhil');
    await page.waitForTimeout(1000);

    await page.locator('#password').fill('Akhil@1234!')
    await page.waitForTimeout(1000);
    await page.locator('#confirmpassword').fill('Akhil@1234!');
    await page.locator('#Comments').fill('sample test description for testing automation scripting');
    await page.click('#sendemail');
    await page.waitForTimeout(5000);

    const successHeading = page.locator("//h2[normalize-space()='Sending e-mail success!']");

    await expect(successHeading).toBeVisible();
    await expect(successHeading).toHaveText('Sending e-mail success!');
  // // Assertion: check that Insurance Data form is visible
  // await expect(page.locator('h2')).toContainText('Enter Insurant Data');

  
});