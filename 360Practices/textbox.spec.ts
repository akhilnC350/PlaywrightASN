import {test, expect} from '@playwright/test';
import path from 'path'; // Node.js module to handle file paths
import fs from 'fs';     // Node.js module to check if file exists


test('text view practices', async({page, context})=>{

    await page.goto('https://demoqa.com/');
    
   // await page.locator('h5:has-text("Forms")').click(); //heading locator
    // await page.locator('div.header-text:has-text("Elements")').click(); //header locator
    
// // Case1: Text box 

//     await page.locator('li.btn.btn-light:has-text("Text Box")').click(); //hirarche text
//     await page.locator('[placeholder="Full Name"]').fill('akhil') // placeholder
//     await page.locator('.mr-sm-2.form-control').nth(1).fill('akhil1809@gmail.com'); //using class
//     await page.locator('#currentAddress').fill('test test test test');
//     await page.locator('#permanentAddress').fill('test test test tets');
//     await page.locator('#submit').click();
//     await page.waitForTimeout(5000);

// // // // Case2: check box using class element in its hierarchy endnode

//        await page.locator('li:has-text("Check Box")').click();
//        await page.locator('svg.rct-icon.rct-icon-expand-close').click();
//        await page.locator('svg.rct-icon.rct-icon-expand-close').nth(2).click();
//      await page.waitForTimeout(1000);

// // // //Case3: Radio Button with different way of declaring and with assertions 

//      await page.locator('li.btn:has(span:text("Radio Button"))').click();
//      await page.locator('.custom-control.custom-radio .custom-control-label', { hasText: 'Yes' }).click();
//      await page.waitForTimeout(1000);
//      await page.locator('.custom-control.custom-radio .custom-control-label', { hasText: 'Impressive'}).click();
//      await page.waitForTimeout(4000);

//      const resultMsg = page.locator('p.mt-3');
//     await expect(resultMsg).toHaveText('You have selected Impressive');


// // // // Case4: Web table - here we will add/edit and delete + make a assertion for the grid details 
// // //           // will be more interesting to hold E2E test in this way.

//     await page.locator('li.btn.btn-light.active,#item-3').first().click();
//     await page.locator('li#item-3', { hasText: 'Web Tables' }).click();
//     await page.locator('#addNewRecordButton').click();
//     await page.waitForTimeout(3000);
//     await page.locator('#firstName').fill('Akhil');
//     await page.locator('#lastName').fill('Negi');
//     await page.locator('#userEmail').fill('akhil1809@gmail.com');
//     await page.locator('#age').fill('37');
//     await page.locator('#salary').fill('160000');
//     await page.locator('#department').fill('IT services');
//     await page.locator('#submit').click();
//     await page.waitForTimeout(3000);

// // // //     //Assertion implementation for every column verification 
    
//   const row = page.locator('.rt-tbody .rt-tr-group').nth(3);

// // //   // Grab each column by index
//   const firstName   = row.locator('.rt-td').nth(0);
//   const lastName    = row.locator('.rt-td').nth(1);
//   const age         = row.locator('.rt-td').nth(2);
//   const email       = row.locator('.rt-td').nth(3);
//   const salary      = row.locator('.rt-td').nth(4);
//   const department  = row.locator('.rt-td').nth(5);
//   const action      = row.locator('.rt-td').nth(6);

// // // //   //Assertions
//   await expect(firstName).toHaveText('Akhil');
//   await expect(lastName).toHaveText('Negi');
//   await expect(age).toHaveText('37');
//   await expect(email).toHaveText('akhil1809@gmail.com');
//   await expect(salary).toHaveText('160000');
//   await expect(department).toHaveText('IT services');
//   await expect(action).toBeVisible(); // buttons exist
//  await page.waitForTimeout(1000);

// // //   //Case 5: the different way of dealings with buttons Single double and right click 


//   const button1= page.locator('#item-4', { hasText: 'Buttons' });
//   await button1.click();

//   const button2=page.locator('#doubleClickBtn');
//   await button2.dblclick();
//   const button3=page.locator('#rightClickBtn');
//   await button3.click({ button:'right' });

//   const button4=page.getByRole('button', { name: 'Click Me', exact: true })
//   await button4.click();
//     await page.waitForTimeout(1000);

// //   // 3 assertion in a row for the button click message.
//   const assert1=page.locator('#doubleClickMessage');
//   await expect(assert1).toHaveText('You have done a double click');

//   const assert2=page.locator('#rightClickMessage');
//   await expect(assert2).toHaveText('You have done a right click');

//   const assert3=page.locator('#dynamicClickMessage');
//   await expect(assert3).toHaveText('You have done a dynamic click');
//    await page.waitForTimeout(1000);

// //  // Case 6: Link click and assertion for the new page
// await page.locator('li#item-5', { hasText: 'Links' }).click();
// const link = page.locator('#simpleLink');

// const [newPage] = await Promise.all([
//   context.waitForEvent("page"),
//   link.click()
// ]);

// await newPage.waitForLoadState();
// await expect(newPage).toHaveURL("https://demoqa.com/");
//  await page.waitForTimeout(1000);

//  const status1=page.locator('#created');
//  await status1.click();

//  const dec=page.locator('#linkResponse');
//  await expect(dec).toHaveText('Link has responded with staus 201 and status text Created');

// await page.locator('#no-content').click();
// const dec1=page.locator('#linkResponse');
// await expect(dec1).toHaveText('Link has responded with staus 204 and status text No Content');

// const dec2=page.locator('#moved');
// await expect(dec2).toHaveText('Moved');



// /// case 7: broken validation

// await page.locator('li#item-6', { hasText: 'Broken Links - Images' }).click();

//   // Step 2: Validate heading
//   const heading = page.locator('h1.text-center');
//   await expect(heading).toHaveText('Broken Links - Images');

//   // Step 3: Check Valid Image (scoped inside the section heading's container)
// const section = page.locator('div:has(h1:text("Broken Links - Images"))');
// const validImg = section.locator('img[src="/images/Toolsqa.jpg"]').first();

// await expect(validImg).toBeVisible();
//   // Step 4: Check Broken Image
//   const brokenImg = page.locator('img[src="/images/Toolsqa_1.jpg"]');
//   const isBrokenImgVisible = await brokenImg.evaluate(
//     (img: HTMLImageElement) => img.naturalWidth > 0
//   );
//   console.log('Broken Image visible:', isBrokenImgVisible); // false if broken

  // // Step 5: Check Valid Link
  // const validLink = page.locator('a[href="http://demoqa.com"]');
  // await expect(validLink).toHaveText('Click Here for Valid Link');
  // await expect(validLink).toHaveAttribute('href', 'http://demoqa.com');

  // // Step 6: Click valid link (same tab navigation)
  // await validLink.click();
  // await page.waitForLoadState();
  // await expect(page).toHaveURL('https://demoqa.com/');

  // Step 7: (Optional) Go back to test broken link
  // await page.goBack();

  // Step 8: Check Broken Link
  // const brokenLink = page.locator(
  //   'a[href="http://the-internet.herokuapp.com/status_codes/500"]'
  // );
  // await expect(brokenLink).toHaveText('Click Here for Broken Link');
  // await expect(brokenLink).toHaveAttribute(
  //   'href',
  //   'http://the-internet.herokuapp.com/status_codes/500'
  // );

  // Step 9: Click broken link and assert status code page
  // await brokenLink.click();
  // await page.waitForLoadState();
  // await expect(page).toHaveURL(/status_codes\/500/);



  // Case 08: Upload and Download

  // await page.locator('li#item-7', { hasText: 'Upload and Download' }).click();
  // await page.locator('#downloadButton').click();
  // await page.waitForTimeout(2000);
  // const upload = new UploadPage(page); // upload file using upload Pom reference 
  // await upload.uploadFile('dice.jpg'); 

  //Case 09: Dynamic Properties
// await page.locator('Li#item-8', { hasText:'Dynamic Properties'}).click();
// await page.waitForTimeout(5000);
// await page.locator('#enableAfter').click();
// await page.locator('#colorChange').click();
// const visible = page.locator('#visibleAfter');
// await expect(visible).toBeVisible();
// await page.locator('#visibleAfter').click();
// await page.waitForTimeout(5000);

  // await page.goto('https://www.flipkart.com');

  // // Wait for search bar and type 'bike'
  // await page.locator('input.Pke_EE').click();
  // await page.locator('input.Pke_EE').fill('bike');

  // // Wait and click on suggestion element (_31YxMH class)
  // await page.locator('._31YxMH').first().click(); // using .first() for safety

  // // Assertion: verify that the results page contains the word "Bike"
  // await expect(page).toHaveURL(/q=bike/i);  // URL contains ?q=bike
  // await expect(page.locator('._10Ermr')).toContainText('bike'); // results heading often has search text

// const practiceForm = page.locator("//div[@class='element-list collapse show']//li[@id='item-0']");

//   // Case 10 Form filling and submit

// await practiceForm.click();
// await page.getByPlaceholder('First Name').fill('Akhil');
// await page.waitForTimeout(1000);
// await page.getByPlaceholder('Last Name').fill('Negi');
// await page.waitForTimeout(1000);
// await page.getByPlaceholder('name@example.com').fill('akhil1809@gmail.com');
// await page.waitForTimeout(1000);
// await page.locator("//div[@class='custom-control custom-radio custom-control-inline']//*[@id='gender-radio-1']").click({force:true});
// await page.locator("//div[@class='col-md-9 col-sm-12']//*[@id='userNumber']").fill('9717530599');
// await page.waitForTimeout(1000);
// await page.locator ("//div[@class='react-datepicker-wrapper']//input[@class='form-control']").fill('18 Sep 1988');
// await page.keyboard.press('Escape');
// await page.waitForTimeout(2000);
// await page.locator("#subjectsInput").fill("Maths");
// await page.waitForTimeout(1000);
// await page.keyboard.press("Enter");
// await page.waitForTimeout(1000);
// await page.locator("label[for='hobbies-checkbox-2']").click({force:true});
// await page.waitForTimeout(1000);

// // Upload file - similar to uploadfile.spec.ts
// const filePath = path.join(__dirname, '../test-files/fixtures/dice.jpg');
// if (!fs.existsSync(filePath)) {
//     throw new Error(`File not found at path: ${filePath}`);
//   }
// await page.locator('#uploadPicture').setInputFiles(filePath);


// await page.getByPlaceholder('Current Address').fill('test test tets test');
// await page.waitForTimeout(1000);
// await page.locator("#state").click();
// await page.waitForTimeout(1000);
// await page.locator('#react-select-3-option-0').click(); // NCR

// // Wait a bit for the dropdown animation
// await page.waitForTimeout(1000);

// // Click on the City dropdown
// await page.locator("#city").click();
// await page.waitForTimeout(1000);
// await page.locator('#react-select-4-option-0').click(); // Delhi
// await page.waitForTimeout(1000);
// // Submit
// await page.locator("#submit").click();
// await page.waitForTimeout(5000);
// const success=page.locator('#example-modal-sizes-title-lg');
// await page.waitForTimeout(1000);
// await expect(success).toHaveText('Thanks for submitting the form');
// await page.waitForTimeout(1000);
// await page.keyboard.press('Escape');
// await page.waitForTimeout(10000);


// //Case 11: Alerts, Frames, Windows - only frames handled here
// await page.locator('.card-body:has-text("Alerts, Frame & Windows")').click();
// //await page.locator('.header-text:has-text("Alerts, Frame & Windows")').click();
// await page.locator('.btn.btn-light:has-text("Browser Windows")').click();
// await page.waitForTimeout(2000);
// const [newPage] = await Promise.all([
//     context.waitForEvent("page"),
//     page.locator('#windowButton').click()
//   ]);
//   await newPage.waitForLoadState();
//   await expect(newPage).toHaveURL("https://demoqa.com/sample");
//   await page.waitForTimeout(2000);
//   await newPage.close();
//   await page.waitForTimeout(2000);
//   await page.locator('#tabButton').click();
//   const [newTab] = await Promise.all([
//     context.waitForEvent("page"),
//     page.locator('#tabButton').click()
//   ]);
//   await newTab.waitForLoadState();
//   await expect(newTab).toHaveURL("https://demoqa.com/sample");
//   await page.waitForTimeout(2000);
//   await newTab.close();
//   await page.waitForTimeout(2000);
//   await page.locator('#messageWindowButton').click();
//   const [msgPage] = await Promise.all([
//     context.waitForEvent("page"),
//     page.locator('#messageWindowButton').click()
//   ]);
//   await msgPage.waitForLoadState();
//   await expect(msgPage).toHaveURL(/.*\.com\/.*/); // URL contains .com
//   const bodyText = await msgPage.locator('body').innerText();
//   console.log('Message Window Text:', bodyText);
//   await page.waitForTimeout(2000);
//   //use expect to check bodyText has expected text
//   await expect(bodyText).toContain('Knowledge increases by sharing but not by saving. Please share this website with your friends and in your organization.');
//   await msgPage.close();
//   await page.waitForTimeout(2000);


  //Case 12: Alerts
  await page.locator('.card-body:has-text("Alerts, Frame & Windows")').click();
await page.locator('li.btn.btn-light:has-text("Alerts")').click();

// Simple Alert
page.once('dialog', async dialog => {
  console.log(`Dialog message: ${dialog.message()}`);
  await dialog.accept();
});
await page.locator('#alertButton').click();

// Timer Alert
page.once('dialog', async dialog => {
  console.log(`Dialog message: ${dialog.message()}`);
  await dialog.accept();
});
await page.locator('#timerAlertButton').click();
await page.waitForEvent('dialog'); // instead of timeout

// Confirm Alert
page.once('dialog', async dialog => {
  console.log(`Dialog message: ${dialog.message()}`);
  await dialog.dismiss();
});
await page.locator('#confirmButton').click();
await expect(page.locator('#confirmResult')).toHaveText('You selected Cancel');

// Prompt Alert
page.once('dialog', async dialog => {
  console.log(`Dialog message: ${dialog.message()}`);
  await dialog.accept('Akhil'); // provide input to prompt
});
await page.locator('#promtButton').click();
await expect(page.locator('#promptResult')).toHaveText('You entered Akhil');
});











