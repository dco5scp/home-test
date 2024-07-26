import { test, expect } from '@playwright/test';
import LoginPage from '../pages/login';
import pages from '../utils/pages';
import userData from '../data/user-data';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  await page.goto(pages.loginPage);
  loginPage = new LoginPage(page);
});

test.describe('Login', () => {
  // Standard User
  test('Standard User', async ({ page }) => {
    const standardUser = userData.standardUser;
    const password = userData.password;

    await loginPage.doLogin(standardUser, password);
    await loginPage.checkLoggedIn();

    const productText = await page.locator('[data-test="title"]').textContent()
    expect(productText).toEqual('Products')
  });

  //Invalid username
  test('Invalid Username', async ({ page }) => {
    const invalidUsername = userData.invalidUsername;
    const password = userData.password;

    await loginPage.doLogin(invalidUsername, password);
    await loginPage.checkInvalidCredentials();
  });

  //Invalid Password
  test('Invalid Password', async ({ page }) => {
    const standardUser = userData.standardUser;
    const invalidPassword = userData.invalidPassword;

    await loginPage.doLogin(standardUser, invalidPassword);
    await loginPage.checkInvalidCredentials();
  });

  //Locked User
  test('Locked User', async ({ page }) => {
    const lockedUsername = userData.lockedOutUser;
    const password = userData.password;

    await loginPage.doLogin(lockedUsername, password);
    await loginPage.checkLockedUserCredentials();
  });
})