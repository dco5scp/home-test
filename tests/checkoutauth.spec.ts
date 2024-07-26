import { test, expect } from '@playwright/test';
import YourCart from '../pages/chechoutYourCart';
import YourInfoPage from '../pages/checkoutYourInfo';
import OverviewtPage from '../pages/checkoutOverview';
import pages from '../utils/pages';
import userData from '../data/user-data';
import CompletePage from '../pages/checkoutComplete';

// test.beforeEach(async ({ page }) => {
//     await page.goto(pages.homePage);
// });

test.describe('Checkout', () => {
    // test.describe.configure({ mode: 'serial' });
    let page;
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        await page.goto(pages.homePage);
    });
    //Select a product
    test('Add Product', async () => {
        //single product value
        const buttonAddToCart = page.locator('#add-to-cart-sauce-labs-backpack');
        await buttonAddToCart.click();

        const shoppingCartBadge = await page.locator('[data-test="shopping-cart-badge"]').textContent();
        expect(shoppingCartBadge).toEqual('1');
    })

    //Enter in Shopping cart
    test('Shopping cart', async () => {
        await page.locator('.shopping_cart_link').click();
        await expect(page).toHaveURL(pages.checkoutYourCartPage);
    })

    //Checkout Your Cart - start checkout
    test('Checkout Your Cart', async () => {
        const yourCart = new YourCart(page);
        await yourCart.validateItem();
        await yourCart.startCheckout();

        await expect(page).toHaveURL(pages.checkoutYourInfoPage);
    })

    //Checkout Your Info - user Info and continue checkout
    test('Checkout Your Info', async () => {
        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const postalCode = userData.postalCode;

        const yourinfo = new YourInfoPage(page);
        await yourinfo.continueCheckout(firstName,lastName, postalCode);

        await expect(page).toHaveURL(pages.checkoutOverviewPage);
    })
    
    //Checkout Overview - validate order Info
    test('Checkout Overview', async () => {
        const overview = new OverviewtPage(page);
        await overview.finishCheckout();

        await expect(page).toHaveURL(pages.checkoutCompletePage);
    })

    //Checkout Complete - order completed
    test('Checkout Complete', async () => {
        const completeOrder = new CompletePage(page);
        await completeOrder.validateOrderCompleted();
        await completeOrder.finishOrder();
        
        await expect(page).toHaveURL(pages.homePage);
    })

    test.afterAll(async ({ browser }) => {
        browser.close;
    });

})