import { Locator, Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { BasePage } from "../BasePage";
dotenv.config();

// Storing configurations for https://auth.honeyhive.ai/u/login

export class LoginPage extends BasePage {
  constructor(
      readonly page: Page,
      readonly baseUrl: string = process.env.BASE_URL ?? '',
      readonly emailaddress: any | undefined = process.env.EMAIL_ADDRESS,
      readonly password: any | undefined = process.env.PASSWORD
    ) 
    {
    super(page)
    }

  /**
   * Navigating to login page
   */
  async goToLogin() {
    await this.page.goto(this.baseUrl);
  }

  /**
   * Logging in to platform with valid credentials
   */
  async loginWithValidCreds() {
    await this.emailAddressLocator.fill(this.emailaddress);
    await this.passwordLocator.fill(this.password);
    await this.continueButtonLocator.click();
    await this.page.waitForLoadState('load')
    await expect.soft(
      this.page.getByRole("heading", { name: "Projects" })
    ).toBeVisible();
  }

  /**
   * Directly clicking on continue button w/o email and p/w
   */
  async validateErrorOnSubmit() {
    await this.continueButtonLocator.click();
    await expect(this.emailAddressLocator).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }

  /**
   * Checking error validation on email field
   */
  async validateErrorEmailOnly() {
    await this.emailAddressLocator.fill(this.emailaddress);
    await this.continueButtonLocator.click();
    await expect(this.passwordLocator).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }

  /**
   * Checking error validation on password field
   */
  async validateErrorPasswordOnly() {
    await this.passwordLocator.fill(this.password);
    await this.continueButtonLocator.click();
    await expect(this.emailAddressLocator).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }
}
