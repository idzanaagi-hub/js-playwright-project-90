import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/loginPage";
import { MainPage } from "../../src/pages/mainPage";

test("success render", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  await expect(loginPage.loginField).toBeVisible();
  await expect(loginPage.passwordField).toBeVisible();
  await expect(loginPage.authButton).toBeVisible();
});

test("login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  await loginPage.fillLogin("standard_user");
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickAuthButton();
});

test("logout", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const mainPage = new MainPage(page);

  await loginPage.goto();
  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
  await loginPage.fillLogin("standard_user");
  await loginPage.fillPassword("secret_sauce");
  await loginPage.clickAuthButton();

  await page.waitForURL("**/#/");

  await mainPage.logout();
  await page.waitForURL("http://localhost:5173/");
  await expect(loginPage.loginField).toBeVisible();
  await expect(loginPage.passwordField).toBeVisible();
  await expect(loginPage.authButton).toBeVisible();
});
