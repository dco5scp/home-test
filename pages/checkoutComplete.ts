import { type Page, type Locator , expect } from '@playwright/test';
import messages from '../utils/messages';

class CompletePage {
    readonly page: Page;
    readonly completeHeader: Locator;
    readonly completeText: Locator;
    readonly backHomeButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.completeHeader = page.locator('.complete-header');
        this.completeText = page.locator('.complete-text');
        this.backHomeButton = page.locator("#back-to-products");
    }

    async validateOrderCompleted() {
        await expect(this.completeHeader).toHaveText(messages.orderCompleted.header);
        await expect(this.completeText).toHaveText(messages.orderCompleted.text);
    }

    async finishOrder() {
        await this.backHomeButton.click();
    }
}



export default CompletePage;
