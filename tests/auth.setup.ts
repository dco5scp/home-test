import { test as setup, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import userData from '../data/user-data';

const authFile = './playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  const loginPage = new LoginPage(page);
  const standardUser = userData.standardUser;
  const password = userData.password;

  await page.goto('https://www.saucedemo.com/');
  
  await loginPage.doLogin(standardUser, password);
  await loginPage.checkLoggedIn();

  const productText = await page.locator('[data-test="title"]').textContent()
  expect(productText).toEqual('Products')

  // Save authentication state
  await page.context().storageState({ path: authFile });
});