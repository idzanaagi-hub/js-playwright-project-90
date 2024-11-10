import { Page, Locator } from "@playwright/test";
import { CreateUserPage } from "./createUser";

export class UsersPage {
  readonly page: Page;
  readonly createUsersButton: Locator;
  readonly selectAllUsersCheckbox: Locator;
  readonly deleteAllUsersButton: Locator;

  constructor(page) {
    this.page = page;
    this.createUsersButton = page.locator("[aria-label='Create']");
    this.selectAllUsersCheckbox = page.getByRole("checkbox").first();
    this.deleteAllUsersButton = page.locator("[aria-label='Delete']");
  }

  async createUser() {
    await this.createUsersButton.click();
    return new CreateUserPage(this.page);
  }

  async selectAllUsers() {
    await this.selectAllUsersCheckbox.click();
  }

  async deleteAllUsers() {
    await this.selectAllUsersCheckbox.click();
    await this.deleteAllUsersButton.click();
  }
}
