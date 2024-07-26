import { type Page, type Locator , expect } from '@playwright/test';

class Menu {
    readonly page: Page;
    readonly burguerMenu: Locator;
    readonly allItems: Locator;
    readonly about: Locator;
    readonly logout: Locator;
    readonly resetAppState: Locator;
    readonly closeMenu: Locator;

    constructor(page: Page) {
        this.page = page;
        this.burguerMenu = page.locator('#react-burger-menu-btn')
        this.allItems = page.locator('#inventory_sidebar_link')
        this.about = page.locator('#about_sidebar_link');
        this.logout = page.locator('#logout_sidebar_link');
        this.resetAppState = page.locator('#reset_sidebar_link');
        this.closeMenu = page.locator('#react-burger-cross-btn');
    } 

    async menuBurguer() {
        await this.burguerMenu.click();
    }

    async closeMenuBurguer(p) {
        await this.closeMenu.click();
    }

    async allItemsInventory() {
        await this.burguerMenu.click();
        await this.allItems.click();
        await this.closeMenu.click();
    }

    async aboutMenu() {
        await this.burguerMenu.click();
        await this.about.click();
        await expect(this.page).toHaveURL('https://saucelabs.com/');
    }

    async resetAppMenu() {
        await this.burguerMenu.click();
        await this.resetAppState.click();
        await this.closeMenu.click();
    }

    async logoutMenu() {
        await this.burguerMenu.click();
        await this.logout.click();
        const LoginUsername = await this.page.locator('#user-name');
        await expect(LoginUsername).toBeVisible();
    }    
}

export default Menu;
