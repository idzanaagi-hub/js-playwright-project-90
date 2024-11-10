import { Page, Locator } from "@playwright/test";
import { UsersPage } from "../pages/usersPage";
import { LabelsPage } from "./labelsPage";
import { StatusesPage } from "./statuses.spec";

export class MainPage {
  readonly page: Page;
  readonly profile: Locator;
  readonly logoutButton: Locator;
  readonly tasks: Locator;
  readonly users: Locator;
  readonly labels: Locator;
  readonly taskStatues: Locator;

  constructor(page) {
    this.page = page;
    this.profile = page.locator('[aria-label="Profile"]');
    this.logoutButton = page.getByText("Logout");
    this.tasks = page.locator('[href="#/tasks"]');
    this.users = page.locator('[href="#/users"]');
    this.labels = page.locator('[href="#/labels"]');
    this.taskStatues = page.locator('[href="#/task_statuses"]');
  }

  async logout() {
    await this.profile.click();
    await this.logoutButton.click();
  }

  async gotoTasks() {
    await this.tasks.click();
  }

  async gotoUsers(): Promise<UsersPage> {
    await this.users.click();
    return new UsersPage(this.page);
  }

  async gotoLabels(): Promise<LabelsPage> {
    await this.labels.click();
    return new LabelsPage(this.page);
  }

  async gotoTaskStatues(): Promise<StatusesPage> {
    await this.taskStatues.click();
    return new StatusesPage(this.page);
  }
}
