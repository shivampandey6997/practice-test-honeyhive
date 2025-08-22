import { Locator, Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { faker } from "@faker-js/faker"
import fs from "fs";
import path from "path";
import { BasePage } from "./basepage";
import { LoginData } from "../utils/logindata";
dotenv.config();

export class Signup_Onboarding extends BasePage {
    readonly locatorSignup:Locator
    readonly baseUrl: any;
    readonly locatorFirstName: Locator
    readonly locatorLastName: Locator
    readonly locatorYourTeam: Locator
    readonly locatorOrganizationName: Locator
    readonly locatorPersonalAccountCheckbox: Locator
    readonly locatorEmployeeCount: Locator
    readonly locatorProjectName: Locator
    readonly locatorAgreeToTerms: Locator
    readonly locatorContinueButtonSignUp: Locator
    constructor(page: Page) {
        super(page)
        this.locatorSignup = page.getByRole('link', { name: 'Sign up' })
        this.baseUrl = process.env.BASE_URL;
        this.locatorFirstName = page.locator("input[name='firstName']")
        this.locatorLastName = page.locator("input[name='lastName']")
        this.locatorYourTeam = page.locator("select[name='team']")
        this.locatorOrganizationName = page.locator("input[name='orgName']")
        this.locatorPersonalAccountCheckbox = page.locator('.inline-flex.items-center.text-xs.text-neutral-600 input[type="checkbox"]')
        this.locatorEmployeeCount = page.locator("select[name='employeeCount']")
        this.locatorProjectName = page.locator("input[name='firstProjectName']")
        this.locatorAgreeToTerms = page.locator("input[name='agreedToTerms']")
        this.locatorContinueButtonSignUp = page.locator("button[type='submit']")
    }

    async navigateToLogin() {
    await this.page.goto(this.baseUrl);
    }

    async clickingOnSignupPageAndVerifying() {
        await this.locatorSignup.click()
        expect.soft(this.page.url()).toMatch(/.*signup.*/)
    }
    
    async clickingOnContinuebuttonWithoutEmail_Password() {
        await this.locatorSignup.click()
        await this.locatorcontinueButton.click()
        await expect.soft(this.locatoremailAddress).toHaveJSProperty("validationMessage",
      "Please fill in this field.")
    }

    async clickingOnContinuebuttonWithEmailFIeldOnly() {
        await this.locatorSignup.click()
        await this.locatoremailAddress.fill(LoginData.login.emailaddress)
        await this.locatorcontinueButton.click()
        await expect.soft(this.locatorpassword).toHaveJSProperty("validationMessage", "Please fill in this field.")
    }

    async clickingOnContinueButtonWithPasswordFieldOnly() {
        await this.locatorSignup.click()
        await this.locatorpassword.fill(LoginData.login.password)
        await this.locatorcontinueButton.click()
        await expect.soft(this.locatoremailAddress).toHaveJSProperty('validationMessage', "Please fill in this field.")
    }

    async checkingValidationOnOnboardingFields() {
        await this.creatingNewuser()
        await this.page.waitForLoadState('load')
        await this.locatorContinueButtonSignUp.click()
        await expect.soft(this.locatorFirstName).toHaveJSProperty('validationMessage', "Please fill in this field.")
        await this.locatorFirstName.fill(faker.person.firstName())
        await this.locatorContinueButtonSignUp.click()
        await expect.soft(this.locatorLastName).toHaveJSProperty('validationMessage', "Please fill in this field.")
        await this.locatorLastName.fill(faker.person.lastName())
        await this.locatorContinueButtonSignUp.click()
        await expect.soft(this.locatorYourTeam).toHaveJSProperty('validationMessage', "Please select an item in the list.")
        await this.locatorYourTeam.selectOption('Engineering')
        await this.locatorContinueButtonSignUp.click()
        await expect.soft(this.locatorOrganizationName).toHaveJSProperty('validationMessage', "Please fill in this field.")
        await this.locatorOrganizationName.fill(faker.company.name())
        await this.locatorContinueButtonSignUp.click()
        await expect.soft(this.locatorEmployeeCount).toHaveJSProperty('validationMessage', "Please select an item in the list.")
        await this.locatorEmployeeCount.selectOption('3-10')
        await this.locatorContinueButtonSignUp.click()
        await expect.soft(this.locatorAgreeToTerms).toHaveJSProperty('validationMessage', "Please tick this box if you want to proceed.")
        await this.locatorAgreeToTerms.check()
        await this.locatorContinueButtonSignUp.click()
        this.page.getByText('Project Name is required')
        this.page.getByText('Please fix the validation errors before continuing.')
    }

    async creatingNewuser() {
      await this.clickingOnSignupPageAndVerifying()
      const fakeEmail = faker.internet.email();
      const fakePassword = "Shivam@1234";
      await this.locatoremailAddress.fill(fakeEmail)
      await this.locatorpassword.fill(fakePassword)
      await this.locatorcontinueButton.click()
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

    async completingOnboardingOfNewUser() {
       await this.page.waitForLoadState('load'); 
       await this.locatorFirstName.fill(faker.person.firstName())
       await this.locatorLastName.fill(faker.person.lastName())
       await this.locatorYourTeam.selectOption('Engineering')
       await this.locatorOrganizationName.fill(faker.company.name())
       await this.locatorEmployeeCount.selectOption('3-10')
       await this.locatorProjectName.fill(faker.commerce.productName())
       await this.locatorAgreeToTerms.check()
       await this.locatorContinueButtonSignUp.click()
       await this.page.waitForTimeout(4000)

    }

    
}