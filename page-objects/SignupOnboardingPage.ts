import { Locator, Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { faker } from "@faker-js/faker"
import fs from "fs";
import path from "path";
import { BasePage } from "./BasePage";
import { LoginData } from "../utils/LoginData";
dotenv.config();

export class SignupOnboarding extends BasePage {
    readonly signupLocator:Locator
    readonly baseUrl: any;
    readonly firstNameLocator: Locator
    readonly lastNameLocator: Locator
    readonly yourTeamLocator: Locator
    readonly organizationNameLocator: Locator
    readonly personalAccountCheckboxLocator: Locator
    readonly employeeCountLocator: Locator
    readonly projectNameLocator: Locator
    readonly agreeToTermsLocator: Locator
    readonly continueButtonSignUpLocator: Locator
    constructor(page: Page) {
        super(page)
        this.signupLocator = page.getByRole('link', { name: 'Sign up' })
        this.baseUrl = process.env.BASE_URL;
        this.firstNameLocator = page.locator("input[name='firstName']")
        this.lastNameLocator = page.locator("input[name='lastName']")
        this.yourTeamLocator = page.locator("select[name='team']")
        this.organizationNameLocator = page.locator("input[name='orgName']")
        this.personalAccountCheckboxLocator = page.locator('.inline-flex.items-center.text-xs.text-neutral-600 input[type="checkbox"]')
        this.employeeCountLocator = page.locator("select[name='employeeCount']")
        this.projectNameLocator = page.locator("input[name='firstProjectName']")
        this.agreeToTermsLocator = page.locator("input[name='agreedToTerms']")
        this.continueButtonSignUpLocator = page.locator("button[type='submit']")
    }

    async openSignupAndVerify() {
        await this.signupLocator.click()
        expect.soft(this.page.url()).toMatch(/.*signup.*/)
    }
    
    async continueWithoutCredentials() {
        await this.signupLocator.click()
        await this.continueButtonLocator.click()
        await expect.soft(this.emailAddressLocator).toHaveJSProperty("validationMessage",
      "Please fill in this field.")
    }

    async continueWithEmailOnly() {
        await this.signupLocator.click()
        await this.emailAddressLocator.fill(LoginData.login.emailaddress)
        await this.continueButtonLocator.click()
        await expect.soft(this.passwordLocator).toHaveJSProperty("validationMessage", "Please fill in this field.")
    }

    async continueWithPasswordOnly() {
        await this.signupLocator.click()
        await this.passwordLocator.fill(LoginData.login.password)
        await this.continueButtonLocator.click()
        await expect.soft(this.emailAddressLocator).toHaveJSProperty('validationMessage', "Please fill in this field.")
    }

    async validateOnboardingFields() {
        await this.creatingNewUser()
        await this.page.waitForLoadState('load')
        await this.continueButtonSignUpLocator.click()
        await expect.soft(this.firstNameLocator).toHaveJSProperty('validationMessage', "Please fill in this field.")
        await this.firstNameLocator.fill(faker.person.firstName())
        await this.continueButtonSignUpLocator.click()
        await expect.soft(this.lastNameLocator).toHaveJSProperty('validationMessage', "Please fill in this field.")
        await this.lastNameLocator.fill(faker.person.lastName())
        await this.continueButtonSignUpLocator.click()
        await expect.soft(this.yourTeamLocator).toHaveJSProperty('validationMessage', "Please select an item in the list.")
        await this.yourTeamLocator.selectOption('Engineering')
        await this.continueButtonSignUpLocator.click()
        await expect.soft(this.organizationNameLocator).toHaveJSProperty('validationMessage', "Please fill in this field.")
        await this.organizationNameLocator.fill(faker.company.name())
        await this.continueButtonSignUpLocator.click()
        await expect.soft(this.employeeCountLocator).toHaveJSProperty('validationMessage', "Please select an item in the list.")
        await this.employeeCountLocator.selectOption('3-10')
        await this.continueButtonSignUpLocator.click()
        await expect.soft(this.agreeToTermsLocator).toHaveJSProperty('validationMessage', "Please tick this box if you want to proceed.")
        await this.agreeToTermsLocator.check()
        await this.continueButtonSignUpLocator.click()
        this.page.getByText('Project Name is required')
        this.page.getByText('Please fix the validation errors before continuing.')
    }

    async creatingNewUser() {
      await this.openSignupAndVerify()
      const fakeEmail = faker.internet.email();
      const fakePassword = "Shivam@1234";
      await this.emailAddressLocator.fill(fakeEmail)
      await this.passwordLocator.fill(fakePassword)
      await this.continueButtonLocator.click()
      const filePath = path.join(__dirname, "../utils/createdUsers.json");
      let existing: any[] = []
      if (fs.existsSync(filePath)) {
      existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        }
        existing.push({
        fakeEmail,
        fakePassword,
        createdAt: new Date().toISOString(),
    });
       fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));  
       await this.page.waitForLoadState('domcontentloaded');
       expect.soft(this.page.url()).toMatch(/.*dashboard.*/)
    }

    async completeOnboarding() {
       await this.page.waitForLoadState('load'); 
       await this.firstNameLocator.fill(faker.person.firstName())
       await this.lastNameLocator.fill(faker.person.lastName())
       await this.yourTeamLocator.selectOption('Engineering')
       await this.organizationNameLocator.fill(faker.company.name())
       await this.employeeCountLocator.selectOption('3-10')
       await this.projectNameLocator.fill(faker.commerce.productName())
       await this.agreeToTermsLocator.check()
       await this.continueButtonSignUpLocator.click()
       await this.page.waitForTimeout(4000)

    }

    
}