import { Page, Locator } from "@playwright/test";

export class LabelsPage {
  readonly page: Page;
  readonly createUsersButton: Locator;
  readonly nameLabelsField: Locator;
  readonly saveLabelButton: Locator;
  readonly deleteLabelsButton: Locator;
  readonly selectAllLabelsCheckbox: Locator;

  constructor(page) {
    this.page = page;
    this.createUsersButton = page.locator("[aria-label='Create']");
    this.nameLabelsField = page.locator("#name");
    this.saveLabelButton = page.locator("[aria-label='Save']");
    this.deleteLabelsButton = page.locator("[aria-label='Delete']");
    this.selectAllLabelsCheckbox = page.getByRole("checkbox").first();
  }

  async createLabel() {
    await this.createUsersButton.click();
  }

  async fillNameLabel(value: string) {
    await this.nameLabelsField.fill(value);
  }

  async saveLabel() {
    await this.saveLabelButton.click();
  }

  async deleteLabels(num: number) {
    await this.page.getByRole("checkbox").nth(num).click();
    await this.deleteLabelsButton.click();
  }

  async selectAllLabels() {
    await this.selectAllLabelsCheckbox.click();
  }

  async selectAndDeleteAllLabels() {
    await this.selectAllLabelsCheckbox.click();
    await this.deleteLabelsButton.click();
  }
}
