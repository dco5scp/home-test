import { type Page, type Locator , expect } from '@playwright/test';

class OverviewtPage {
    readonly page: Page;
    readonly paymentInfo: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.paymentInfo = page.locator('[data-test="payment-info-label"]');
        this.finishButton = page.locator("#finish");
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}

export default OverviewtPage;
