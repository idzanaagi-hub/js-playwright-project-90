import test, { expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/loginPage";

test("success render", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await expect(page).toHaveScreenshot();
});
