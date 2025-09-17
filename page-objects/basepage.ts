import { Locator, Page } from "@playwright/test";

export class BasePage {
  constructor(
    readonly page: Page,
    readonly emailAddressLocator: Locator = page.locator("//input[@inputmode='email']"),
    readonly passwordLocator: Locator = page.locator("#password"),
    readonly continueButtonLocator: Locator = page.locator(
      "//button[@data-action-button-primary='true']"
    ),
    readonly allProjectsLocator: Locator = page.locator('#sidebar-projects'),
    readonly evaluatorSectionLocator: Locator = page.locator("#sidebar-evaluators")
) {}
}