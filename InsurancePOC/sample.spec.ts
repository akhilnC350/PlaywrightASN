import{test,expect} from '@playwright/test';
import path from 'path';
import fs from 'fs';

//implement before all hook to naviigate to the URL
test.beforeEach(async ({page}) => {
    await page.goto('https://www.sparkstone.co.nz/sampleapp/101/?utm_source=chatgpt.com#');
})

test('sparkstone Insurance Quote flow', async ({page}) => {
    //Step 1- waitForSelector
   
await page.locator('#nav_motorcycle').first().click();
await page.waitForTimeout(5000);

//Step 2- Fill the form (Enter vehicle Data)

await page.selectOption('#make', 'Honda');
await page.selectOption('#model','Motorcycle');
await page.locator('#cylindercapacity').fill('600');
await page.locator('#engineperformance').fill('100');
await page.locator('#dateofmanufacture').fill('09/11/2019');
//foucs out to close the datepicker
await page.locator('body').click();
await page.selectOption('#numberofsets','2');
await page.locator('#listprice').fill('10000');
await page.locator('#annualmileage').fill('1000');
await page.locator('#nextenterinsurantdata').click();
await page.waitForTimeout(50000);





    
})

