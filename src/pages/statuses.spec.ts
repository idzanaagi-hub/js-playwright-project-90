import { Page, Locator } from "@playwright/test";

export class StatusesPage {
  readonly page: Page;
  readonly createStatusButton: Locator;
  readonly nameStatusField: Locator;
  readonly slugStatusField: Locator;
  readonly saveStatusButton: Locator;
  readonly deleteStatusButton: Locator;
  readonly selectAllStatusesCheckbox: Locator;

  constructor(page) {
    this.page = page;
    this.createStatusButton = page.locator("[aria-label='Create']");
    this.nameStatusField = page.locator("#name");
    this.saveStatusButton = page.locator("[aria-label='Save']");
    this.deleteStatusButton = page.locator("[aria-label='Delete']");
    this.selectAllStatusesCheckbox = page.getByRole("checkbox").first();
    this.slugStatusField = page.locator("#slug");
  }

  async createStatus() {
    await this.createStatusButton.click();
  }

  async fillNameStatus(value: string) {
    await this.nameStatusField.fill(value);
  }

  async fillSlugLabel(value: string) {
    await this.slugStatusField.fill(value);
  }

  async saveStatus() {
    await this.saveStatusButton.click();
  }

  async deleteStatus(num: number) {
    await this.page.getByRole("checkbox").nth(num).click();
    await this.deleteStatusButton.click();
  }

  async selectAllStatus() {
    await this.selectAllStatusesCheckbox.click();
  }

  async selectAndDeleteAllStatuses() {
    await this.selectAllStatusesCheckbox.click();
    await this.deleteStatusButton.click();
  }
}
