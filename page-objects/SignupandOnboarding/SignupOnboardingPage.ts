import { Locator, Page, expect } from "@playwright/test";
import * as dotenv from "dotenv";
import { faker } from "@faker-js/faker"
import { BasePage } from "../BasePage";
dotenv.config();

// Storing configuration for https://auth.honeyhive.ai/u/signup?state=hKFo2SB1WFhReElpR2 

export class SignupOnboarding extends BasePage {
    constructor(
        readonly page: Page,
        readonly signupLocator:Locator = page.getByRole('link', { name: 'Sign up' }),
        readonly baseUrl= process.env.BASE_URL,
        readonly emailaddress: string = process.env.EMAIL_ADDRESS ?? '',
        readonly password: string = process.env.PASSWORD ?? '',
        readonly firstNameLocator: Locator = page.locator("input[name='firstName']"),
        readonly lastNameLocator: Locator = page.locator("input[name='lastName']"),
        readonly yourTeamLocator: Locator = page.locator("select[name='team']"),
        readonly organizationNameLocator: Locator = page.locator("input[name='orgName']"),
        readonly personalAccountCheckboxLocator: Locator = page.locator('.inline-flex.items-center.text-xs.text-neutral-600 input[type="checkbox"]'),
        readonly employeeCountLocator: Locator = page.locator("select[name='employeeCount']"),
        readonly projectNameLocator: Locator = page.locator("input[name='firstProjectName']"),
        readonly agreeToTermsLocator: Locator = page.locator("input[name='agreedToTerms']"),
        readonly continueButtonSignUpLocator: Locator = page.locator("button[type='submit']")
    )   {
        super(page)
        }

    /**
     * Verifying sign up page is accessible
     */
    async openSignupAndVerify() {
        await this.signupLocator.click()
        expect.soft(this.page.url()).toMatch(/.*signup.*/)
    }
    
    /**
     * Clicking on continue button at Sign up page w/o email and password filled
     */
    async continueWithoutCredentials() {
        await this.signupLocator.click()
        await this.continueButtonLocator.click()
        await expect.soft(this.emailAddressLocator).toHaveJSProperty("validationMessage",
      "Please fill in this field.")
    }

    /**
     * Verifying logging with email field only
     */
    async continueWithEmailOnly() {
        await this.signupLocator.click()
        await this.emailAddressLocator.fill(this.emailaddress)
        await this.continueButtonLocator.click()
        await expect.soft(this.passwordLocator).toHaveJSProperty("validationMessage", "Please fill in this field.")
    }
    
    /**
     * Verifying logging with password only
     */
    async continueWithPasswordOnly() {
        await this.signupLocator.click()
        await this.passwordLocator.fill(this.password)
        await this.continueButtonLocator.click()
        await expect.soft(this.emailAddressLocator).toHaveJSProperty('validationMessage', "Please fill in this field.")
    }

    /**
     * Verifying validations on Onboarding page
     */
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

    /**
     * Creating a new user through sign up page
     */
    async creatingNewUser() {
      await this.openSignupAndVerify()
      const fakeEmail = faker.internet.email();
      const fakePassword = "Shivam@1234";
      await this.emailAddressLocator.fill(fakeEmail)
      await this.passwordLocator.fill(fakePassword)
      await this.continueButtonLocator.click() 
      await this.page.waitForLoadState('domcontentloaded');
      expect.soft(this.page.url()).toMatch(/.*dashboard.*/)
    }

    /**
     * Completing Onboarding by filling all details
     */
    async completeOnboarding() {
       await this.page.waitForLoadState('load'); 
       const cname = 'Automation'
       await this.firstNameLocator.fill(faker.person.firstName())
       await this.lastNameLocator.fill(faker.person.lastName())
       await this.yourTeamLocator.selectOption('Engineering')
       await this.organizationNameLocator.fill("Autoamtion" + faker.string.alpha({ length: 10 }))
       await this.employeeCountLocator.selectOption('3-10')
       await this.projectNameLocator.fill("Automation" + faker.string.alpha({ length: 10 }))
       await this.agreeToTermsLocator.check()
       await this.continueButtonSignUpLocator.click()
       await this.page.waitForTimeout(4000)
       await this.page.pause() 
    }

    
}