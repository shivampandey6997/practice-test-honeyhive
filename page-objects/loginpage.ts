import { Locator, Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { LoginData } from "../utils/logindata";
import { BasePage } from "./basepage";

dotenv.config();

export class LoginPage extends BasePage {
  readonly baseUrl: any;
  constructor(page: Page) {
    super(page)
    this.baseUrl = process.env.BASE_URL;
  }

  async navigateToLogin() {
    await this.page.goto(this.baseUrl);
  }

  async loginWithValidCredentials() {
    await this.locatoremailAddress.fill(LoginData.login.emailaddress);
    await this.locatorpassword.fill(LoginData.login.password);
    await this.locatorcontinueButton.click();
    await expect(
      this.page.getByRole("heading", { name: "Projects" })
    ).toBeVisible();
  }

  async validateErrorByDirectlyClickingOnSubmitButton() {
    await this.locatorcontinueButton.click();
    await expect(this.locatoremailAddress).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }

  async validateErrorByEnteringemailaddressOnly() {
    await this.locatoremailAddress.fill(LoginData.login.emailaddress);
    await this.locatorcontinueButton.click();
    await expect(this.locatorpassword).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }

  async validateErrorByEnteringPasswordOnly() {
    await this.locatorpassword.fill(LoginData.login.password);
    await this.locatorcontinueButton.click();
    await expect(this.locatoremailAddress).toHaveJSProperty(
      "validationMessage",
      "Please fill in this field."
    );
  }
}
