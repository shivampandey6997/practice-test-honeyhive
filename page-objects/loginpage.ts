import { Locator, Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { LoginData } from "../utils/LoginData";
import { BasePage } from "./BasePage";

dotenv.config();

export class LoginPage extends BasePage {
  readonly baseUrl: any;
  constructor(page: Page) {
    super(page)
    this.baseUrl = process.env.BASE_URL;
  }

  async goToLogin() {
    await this.page.goto(this.baseUrl);
  }

  async loginWithValidCreds() {
    await this.emailAddressLocator.fill(LoginData.login.emailaddress);
    await this.passwordLocator.fill(LoginData.login.password);
    await this.continueButtonLocator.click();
    await this.page.waitForLoadState('load')
    await expect(
      this.page.getByRole("heading", { name: "Projects" })
    ).toBeVisible();
  }

  async validateErrorOnSubmit() {
    await this.continueButtonLocator.click();
    await expect(this.emailAddressLocator).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }

  async validateErrorEmailOnly() {
    await this.emailAddressLocator.fill(LoginData.login.emailaddress);
    await this.continueButtonLocator.click();
    await expect(this.passwordLocator).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }

  async validateErrorPasswordOnly() {
    await this.passwordLocator.fill(LoginData.login.password);
    await this.continueButtonLocator.click();
    await expect(this.emailAddressLocator).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }
}
