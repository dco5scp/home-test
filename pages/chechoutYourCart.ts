import { type Page, type Locator , expect } from '@playwright/test';

class YourCartPage {
    readonly page: Page;
    readonly itemName: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemName = page.getByText("Sauce Labs Backpack");
        this.checkoutButton = page.locator("#checkout");
    }

    async validateItem() {
        // The product name should be the same that user inserted from home page
        const productName = await this.itemName.textContent();
        await expect(productName).toEqual('Sauce Labs Backpack');
    }
    
    async startCheckout() {
        await this.checkoutButton.click();
    }
}

export default YourCartPage;
