import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/pages/loginPage";
import { MainPage } from "../src/pages/mainPage";
import { CreateUserPage } from "../src/pages/createUser";
import { UsersPage } from "../src/pages/usersPage";
import { user } from "../src/fixtures/userData";
import { auth } from "../src/fixtures/authData";

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
  await users.deleteAllUsers();
  createUsers = await users.createUser();
});

test("check create user and save data", async ({ page }) => {
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
