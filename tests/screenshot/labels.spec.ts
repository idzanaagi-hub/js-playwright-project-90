import test, { expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/loginPage";
import { auth } from "../../src/fixtures/authData";
import { MainPage } from "../../src/pages/mainPage";

test("check list labels", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillLogin(auth.username);
  await loginPage.fillPassword(auth.password);
  await loginPage.clickAuthButton();

  const mainPage = new MainPage(page);
  await mainPage.gotoLabels();
  await expect(page).toHaveScreenshot();
});

test("check create labels form", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillLogin(auth.username);
  await loginPage.fillPassword(auth.password);
  await loginPage.clickAuthButton();

  const mainPage = new MainPage(page);
  const labelsPage = await mainPage.gotoLabels();
  await labelsPage.createLabel();
  await expect(page).toHaveScreenshot();
});
