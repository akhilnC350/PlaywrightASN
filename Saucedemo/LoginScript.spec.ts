import {test, expect} from '@playwright/test';

test ('login into sauch labs', async({page})=>{
    await page.goto ('https://www.saucedemo.com/')
    await page.fill ('#user-name','standard_user');
    await page.fill ('#password','secret_sauce');
    await page.click('#login-button');
    // implementation of assertion for product title 
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');
    await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await page.click('#checkout');
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
    await page.fill('#first-name','Akhil');
    await page.fill('#last-name','Negi');
    await page.fill('#postal-code','462003');
    await page.click('#continue');
    await page.click('#finish');
    const title=page.locator('.complete-header');
    await expect(title).toBeVisible();
    await page.screenshot({path: 'saucedemo/OrderPlaced.png'});


});

