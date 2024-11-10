import test, { expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/loginPage";
import { auth } from "../../src/fixtures/authData";
import { MainPage } from "../../src/pages/mainPage";

test("check list user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillLogin(auth.username);
  await loginPage.fillPassword(auth.password);
  await loginPage.clickAuthButton();

  const mainPage = new MainPage(page);
  await mainPage.gotoUsers();
  await expect(page).toHaveScreenshot();
});

test("check select user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillLogin(auth.username);
  await loginPage.fillPassword(auth.password);
  await loginPage.clickAuthButton();

  const mainPage = new MainPage(page);
  const users = await mainPage.gotoUsers();
  await users.selectAllUsers();
  await expect(page).toHaveScreenshot();
});

test("check form for create or update user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillLogin(auth.username);
  await loginPage.fillPassword(auth.password);
  await loginPage.clickAuthButton();

  const mainPage = new MainPage(page);
  const users = await mainPage.gotoUsers();

  await users.createUser();
  await expect(page).toHaveScreenshot();
});
