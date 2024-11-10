import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/loginPage";
import { MainPage } from "../../src/pages/mainPage";
import { auth } from "../../src/fixtures/authData";
import { StatusesPage } from "../../src/pages/statuses.spec";

let mainPage: MainPage;
let loginPage: LoginPage;
let statuses: StatusesPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillLogin(auth.username);
  await loginPage.fillPassword(auth.password);
  await loginPage.clickAuthButton();

  mainPage = new MainPage(page);
  statuses = await mainPage.gotoTaskStatues();
});

test("check create status and save data", async ({ page }) => {
  await statuses.createStatus();
  await expect(statuses.saveStatusButton).toBeDisabled();
  await statuses.fillNameStatus("test_status");
  await statuses.fillSlugLabel("slug_status");
  await statuses.saveStatus();
  await mainPage.gotoTaskStatues();
  await expect(page.locator("body")).toContainText("test_status");
  await expect(page.locator("body")).toContainText("slug_status");
});

test("check edit status", async ({ page }) => {
  await statuses.createStatus();
  await expect(statuses.saveStatusButton).toBeDisabled();
  await statuses.fillNameStatus("test_status");
  await statuses.fillSlugLabel("slug_status");
  await statuses.saveStatus();
  await mainPage.gotoTaskStatues();
  await expect(page.locator("body")).toContainText("test_status");
  await expect(page.locator("body")).toContainText("slug_status");
  await page.locator("tr").last().click();

  await statuses.fillNameStatus("test_status_update");
  await statuses.fillSlugLabel("slug_status_update");
  await statuses.saveStatus();
  await mainPage.gotoTaskStatues();

  await expect(page.locator("body")).toContainText("test_status_update");
  await expect(page.locator("body")).toContainText("slug_status_update");
});

test("check delete status", async ({ page }) => {
  const checkboxes = page.getByRole("checkbox");
  const usersCount = await checkboxes.count();

  await statuses.deleteStatus(1);

  await expect(page.getByRole("checkbox")).toHaveCount(usersCount - 1);
  await expect(page.locator("body")).not.toContainText("draft");
});

test("check delete statuses", async ({ page }) => {
  await statuses.selectAndDeleteAllStatuses();

  await mainPage.gotoTaskStatues();
  await expect(page.getByRole("checkbox")).toHaveCount(0);
  await expect(page.locator("p").first()).toContainText("No Task status yet.");
});
