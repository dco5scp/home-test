import { type Page, type Locator , expect } from '@playwright/test';
import messages from '../utils/messages';
import pages from '../utils/pages';

class LoginPage {
    readonly page: Page;
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly messagePanel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userName = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.messagePanel = page.locator('[data-test="error"]');
    } 

    async fillUsername(username: string) {
        await this.userName.fill(username);
    }

    async fillPassword(password: string) {
        await this.password.fill(password);
    }

    async doLogin(username: string, password: string) {
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.loginButton.click();
    }

    async checkLoggedIn() {
        await expect(this.page).toHaveURL(pages.homePage);
        //await expect(this.page).toHaveTitle(/Swag Labs/);
        const productText = await this.page.locator('[data-test="title"]').textContent();
        await expect(productText).toEqual('Products');
    }

    async checkInvalidCredentials() {
        await expect(this.messagePanel).toHaveText(messages.login.invalid);
    }

    async checkLockedUserCredentials() {
        await expect(this.messagePanel).toHaveText(messages.login.locked);
    }
}

export default LoginPage;
