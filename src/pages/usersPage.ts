import { Page, Locator } from "@playwright/test";
import { CreateUserPage } from "./createUser";

export class UsersPage {
  readonly page: Page;
  readonly createUsersButton: Locator;
  readonly selectAllUsersCheckbox: Locator;
  readonly deleteUsersButton: Locator;
  readonly selectUser: (num: number) => Locator;

  constructor(page) {
    this.page = page;
    this.createUsersButton = page.locator("[aria-label='Create']");
    this.selectAllUsersCheckbox = page.getByRole("checkbox").first();
    this.deleteUsersButton = page.locator("[aria-label='Delete']");
    this.selectUser = (num) => this.page.getByRole("checkbox").nth(num);
  }

  async createUser() {
    await this.createUsersButton.click();
    return new CreateUserPage(this.page);
  }

  async selectAllUsers() {
    await this.selectAllUsersCheckbox.click();
  }

  async selectAndDeleteAllUsers() {
    await this.selectAllUsersCheckbox.click();
    await this.deleteUsersButton.click();
  }

  async deleteUsers() {
    await this.deleteUsersButton.click();
  }

  async deleteUser(num: number) {
    await this.selectUser(num).click();
    await this.deleteUsersButton.click();
  }
}
