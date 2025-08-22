import { Locator, Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly locatoremailAddress: Locator;
  readonly locatorpassword: Locator;
  readonly locatorcontinueButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.locatoremailAddress = page.locator("//input[@inputmode='email']");
    this.locatorpassword = page.locator("#password");
    this.locatorcontinueButton = page.locator(
      "//button[@data-action-button-primary='true']"
    );
  }
}