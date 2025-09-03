import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly emailAddressLocator: Locator;
  readonly passwordLocator: Locator;
  readonly continueButtonLocator: Locator;
  readonly allProjectsLocator: Locator

  constructor(page: Page) {
    this.page = page;
    this.emailAddressLocator = page.locator("//input[@inputmode='email']");
    this.passwordLocator = page.locator("#password");
    this.continueButtonLocator = page.locator(
      "//button[@data-action-button-primary='true']"
    );
    this.allProjectsLocator = page.locator('#sidebar-projects')
  }
}