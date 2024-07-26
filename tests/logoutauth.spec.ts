import { test, expect } from '@playwright/test';
import Menu from '../pages/menu';
import pages from '../utils/pages';

test.beforeEach(async ({ page }) => {
    await page.goto(pages.homePage);
  });

test.describe('Logout from standard user', () => {
  //Logout
  test('Logout ', async ({ page }) => {
    const logout = new Menu(page);
    await logout.logoutMenu();
  });
})