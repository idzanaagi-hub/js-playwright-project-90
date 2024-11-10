import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly authButton: Locator;

  constructor(page) {
    this.page = page;
    this.loginField = page.locator("#username");
    this.passwordField = page.locator("#password");
    this.authButton = page.locator("button");
  }

  async goto() {
    await this.page.goto("http://localhost:5173/");
  }

  async fillLogin(login: string) {
    await this.loginField.fill(login);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async clickAuthButton() {
    await this.authButton.click();
  }
}
