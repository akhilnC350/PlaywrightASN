import {test, expect} from '@playwright/test'

test('login page implementation',async({page})=>{

await page.goto('https://demo.applitools.com/');
await page.locator('#username').fill('akhil');
await page.locator('#password').fill('passowrd');
await page.locator('#log-in').click();
await page.waitForTimeout(4000);


//implement the expect condition basd on logo <div class="logo-label"> ACME </div>
const logo=page.locator('.logo-label');
await expect(logo).toHaveText('ACME');

await page.screenshot({path:'C:/PlaywrightASN/screenshots/test.png'});
const amount=page.locator('.balance-value').first();
await expect(amount).toHaveText('$350%7');
//screenshot
await page.screenshot({path:'C:/PlaywrightASN/screenshots/test.png'});

// need to verify the 1 row in the table with details "Complete	Today1:52am	Starbucks coffee	Restaurant / Cafe	+ 1,250 USD"
const row=page.locator('tbody tr').first();
await expect(row.locator('td').nth(0)).toHaveText('Complete');
await expect(row.locator('td').nth(1)).toHaveText('Today1:52am');
await expect(row.locator('td').nth(2)).toHaveText('Starbucks coffee');
await expect(row.locator('td').nth(3)).toHaveText('Restaurant / Cafe');
await expect(row.locator('td').nth(4)).toHaveText('+ 1,250 USD');

});


//wright Multiple Tab / Window Handling
//Clicks the “Help” link
//Switches to the new tab
//Performs an action there (e.g. click “Contact Support”)
//Switches back to original tab
//Verifies a UI update in the original page (for example, a banner “Support requested” appears)


test('Multiple Tab / Window Handling',async({page})=>{

    await page.goto('https://demo.applitools.com/');
    await page.locator('#username').fill('akhil');
    await page.locator('#password').fill('passowrd');
    await page.locator('#log-in').click();
    await page.waitForTimeout(4000);
    const logo=page.locator('.logo-label');
    await expect(logo).toHaveText('ACME');

    //Click the Help link which opens in new tab
    const [newPage]=await Promise.all([
        page.waitForEvent('popup'),
        page.locator('text=Help').click()
    ]);
    await newPage.waitForLoadState();
    await newPage.screenshot({path:'C:/PlaywrightASN/screenshots/newpage.png'});
    //click on Contact Support
    await newPage.locator('text=Contact Support').click();
    await newPage.screenshot({path:'C:/PlaywrightASN/screenshots/contactsupport.png'});
    //switch back to parent window
    await page.bringToFront();
    await page.screenshot({path:'C:/PlaywrightASN/screenshots/parentpage.png'});
    //verifies a UI update in the original page (for example, a banner “Support requested” appears)
    const banner=page.locator('#flash');
    await expect(banner).toHaveText('Support requested');
    await page.screenshot({path:'C:/PlaywrightASN/screenshots/banner.png'});

});