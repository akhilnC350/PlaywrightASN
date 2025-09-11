import {test, expect} from '@playwright/test';

test('text view practices', async({page})=>{

    await page.goto('https://demoqa.com/');
    
    await page.locator('h5:has-text("Forms")').click(); //heading locator
    await page.locator('div.header-text:has-text("Elements")').click(); //header locator
    
// Case1: Text box 

    // await page.locator('li.btn.btn-light:has-text("Text Box")').click(); //hirarche text
    // await page.locator('[placeholder="Full Name"]').fill('akhil') // placeholder
    // await page.locator('.mr-sm-2.form-control').nth(1).fill('akhil1809@gmail.com'); //using class
    // await page.locator('#currentAddress').fill('test test test test');
    // await page.locator('#permanentAddress').fill('test test test tets');
    // await page.locator('#submit').click();
    // await page.waitForTimeout(5000);

// Case2: check box using class element in its hierarchy endnode

    //    await page.locator('li:has-text("Check Box")').click();
    //    await page.locator('svg.rct-icon.rct-icon-expand-close').click();
    //    await page.locator('svg.rct-icon.rct-icon-expand-close').nth(2).click();
    //    await page.locat

//Case3: Radio Button with different way of declaring and with assertions 

    //  await page.locator('li.btn:has(span:text("Radio Button"))').click();
    //  await page.locator('.custom-control.custom-radio .custom-control-label', { hasText: 'Yes' }).click();
    //  await page.waitForTimeout(1000);
    //  await page.locator('.custom-control.custom-radio .custom-control-label', { hasText: 'Impressive'}).click();
    //  await page.waitForTimeout(4000);

    //  const resultMsg = page.locator('p.mt-3');
    // await expect(resultMsg).toHaveText('You have selected Impressive');


// Case4: Web table - here we will add/edit and delete + make a assertion for the grid details 
          // will be more interesting to hold E2E test in this way.

    await page.locator('li.btn.btn-light.active,#item-3').first().click();
    await page.locator('#addNewRecordButton').click();
    await page.waitForTimeout(3000);
    await page.locator('#firstName').fill('akhil');
    await page.locator('#lastName').fill('Negi');
    await page.locator('#userEmail').fill('akhil1809@gmail.com');
    await page.locator('#age').fill('37');
    await page.locator('#salary').fill('160000');
    await page.locator('#department').fill('IT services');
    await page.locator('#submit').click();
    await page.waitForTimeout(3000);

    //Assertion implementation for every column verification 
    
  const row = page.locator('.rt-tbody .rt-tr-group').nth(3);

  // Grab each column by index
  const firstName   = row.locator('.rt-td').nth(0);
  const lastName    = row.locator('.rt-td').nth(1);
  const age         = row.locator('.rt-td').nth(2);
  const email       = row.locator('.rt-td').nth(3);
  const salary      = row.locator('.rt-td').nth(4);
  const department  = row.locator('.rt-td').nth(5);
  const action      = row.locator('.rt-td').nth(6);

  //Assertions
  await expect(firstName).toHaveText('akhil');
  await expect(lastName).toHaveText('Negi');
  await expect(age).toHaveText('37');
  await expect(email).toHaveText('akhil1809@gmail.com');
  await expect(salary).toHaveText('160000');
  await expect(department).toHaveText('IT services');
  await expect(action).toBeVisible(); // buttons exist


  
}); 