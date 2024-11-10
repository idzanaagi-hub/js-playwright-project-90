import { test, expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/loginPage";
import { MainPage } from "../../src/pages/mainPage";
import { CreateUserPage } from "../../src/pages/createUser";
import { UsersPage } from "../../src/pages/usersPage";
import { user, updateUser } from "../../src/fixtures/userData";
import { auth } from "../../src/fixtures/authData";

let mainPage: MainPage;
let loginPage: LoginPage;
let createUsers: CreateUserPage;
let users: UsersPage;

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.fillLogin(auth.username);
  await loginPage.fillPassword(auth.password);
  await loginPage.clickAuthButton();

  mainPage = new MainPage(page);
  users = await mainPage.gotoUsers();
});

test("check create user and save data", async ({ page }) => {
  await users.selectAndDeleteAllUsers();
  createUsers = await users.createUser();
  expect(createUsers.emailField).toBeVisible();
  expect(createUsers.firstName).toBeVisible();
  expect(createUsers.lastName).toBeVisible();
  expect(createUsers.password).toBeVisible();
  expect(createUsers.saveButton).toBeVisible();
  expect(createUsers.saveButton).toBeDisabled();

  await createUsers.fillEmail(user.email);
  await createUsers.fillFirstName(user.firstNmae);
  await createUsers.fillLastName(user.lastName);
  await createUsers.fillPassword(user.password);
  await createUsers.saveUser();

  await mainPage.gotoUsers();
  await expect(page.getByRole("checkbox")).toHaveCount(2);
  await expect(page.locator("body")).toContainText(user.email);
  await expect(page.locator("body")).toContainText(user.firstNmae);
  await expect(page.locator("body")).toContainText(user.lastName);
});

test("check edit user", async ({ page }) => {
  createUsers = await users.createUser();
  await createUsers.fillEmail(user.email);
  await createUsers.fillFirstName(user.firstNmae);
  await createUsers.fillLastName(user.lastName);
  await createUsers.fillPassword(user.password);
  await createUsers.saveUser();
  await mainPage.gotoUsers();
  const edit = await page.locator("tr").last().click();

  await createUsers.fillEmail(updateUser.email);
  await createUsers.fillFirstName(updateUser.firstNmae);
  await createUsers.fillLastName(updateUser.lastName);
  await createUsers.fillPassword(updateUser.password);
  await createUsers.saveUser();

  await expect(page.locator("body")).toContainText(updateUser.email);
  await expect(page.locator("body")).toContainText(updateUser.firstNmae);
  await expect(page.locator("body")).toContainText(updateUser.lastName);
});

test("check delete user", async ({ page }) => {
  const checkboxes = page.getByRole("checkbox");
  const usersCount = await checkboxes.count();

  await users.deleteUser(1);

  await expect(page.getByRole("checkbox")).toHaveCount(usersCount - 1);
  await expect(page.locator("body")).not.toContainText("john@google.com");
});

test("check delete users", async ({ page }) => {
  await users.selectAllUsers();

  const checkboxes = page.getByRole("checkbox");
  expect(checkboxes.first()).toBeChecked();
  expect(checkboxes.last()).toBeChecked();

  await users.deleteUsers();

  await mainPage.gotoUsers();
  await expect(page.getByRole("checkbox")).toHaveCount(0);
  await expect(page.locator("p").first()).toContainText("No User yet.");
});
