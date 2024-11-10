import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/loginPage";
import { MainPage } from "../../src/pages/mainPage";
import { auth } from "../../src/fixtures/authData";
import { LabelsPage } from "../../src/pages/labelsPage";

let mainPage: MainPage;
let loginPage: LoginPage;
let labels: LabelsPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillLogin(auth.username);
  await loginPage.fillPassword(auth.password);
  await loginPage.clickAuthButton();

  mainPage = new MainPage(page);
  labels = await mainPage.gotoLabels();
});

test("check create labels and save data", async ({ page }) => {
  await labels.createLabel();
  await expect(labels.saveLabelButton).toBeDisabled();
  await labels.fillNameLabel("test_labels");
  await labels.saveLabel();
  await mainPage.gotoLabels();
  expect(page.locator("body")).toContainText("test_labels");
});

test("check edit labels", async ({ page }) => {
  await labels.createLabel();
  await expect(labels.saveLabelButton).toBeDisabled();
  await labels.fillNameLabel("test_labels");
  await labels.saveLabel();
  await mainPage.gotoLabels();
  expect(page.locator("body")).toContainText("test_labels");
  await page.locator("tr").last().click();

  await labels.fillNameLabel("test_labels_update");
  await labels.saveLabel();
  await mainPage.gotoLabels();

  await expect(page.locator("body")).toContainText("test_labels_update");
});

test("check delete label", async ({ page }) => {
  const checkboxes = page.getByRole("checkbox");
  const usersCount = await checkboxes.count();

  await labels.deleteLabels(1);

  await expect(page.getByRole("checkbox")).toHaveCount(usersCount - 1);
  await expect(page.locator("body")).not.toContainText("bug");
});

test("check delete labels", async ({ page }) => {
  const checkboxes = page.getByRole("checkbox");
  expect(checkboxes.first()).toBeChecked();
  expect(checkboxes.last()).toBeChecked();

  await labels.selectAndDeleteAllLabels();

  await mainPage.gotoLabels();
  await expect(page.getByRole("checkbox")).toHaveCount(0);
  await expect(page.locator("p").first()).toContainText("No Label yet.");
});
