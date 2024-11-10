import { Page, Locator } from "@playwright/test";

export class CreateUserPage {
  readonly page: Page;
  readonly emailField: Locator;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly password: Locator;
  readonly saveButton: Locator;

  constructor(page) {
    this.page = page;
    this.emailField = page.locator("#email");
    this.firstName = page.locator("#firstName");
    this.lastName = page.locator("#lastName");
    this.password = page.locator("#password");
    this.saveButton = page.locator("[aria-label='Save']");
  }

  async fillEmail(value: string) {
    await this.emailField.fill(value);
  }

  async fillFirstName(value: string) {
    await this.firstName.fill(value);
  }

  async fillLastName(value: string) {
    await this.lastName.fill(value);
  }

  async fillPassword(value: string) {
    await this.password.fill(value);
  }

  async saveUser() {
    await this.saveButton.click();
  }
}
