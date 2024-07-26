import { type Page, type Locator , expect } from '@playwright/test';

class YourInfoPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator("#first-name");
        this.lastName = page.locator("#last-name");
        this.postalCode = page.locator("#postal-code");
        this.continueButton = page.locator("#continue");
    }

    async fillFirstName(firstName: string) {
        await this.firstName.fill(firstName);
    }

    async fillLastName(lastName: string) {
        await this.lastName.fill(lastName);
    }

    async fillPostalCode(postalCode: string) {
        await this.postalCode.fill(postalCode);
    }

    async continueCheckout(firstName: string, lastName: string, postalCode:string) {
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.fillPostalCode(postalCode);
        await this.continueButton.click();
    }
}

export default YourInfoPage;
