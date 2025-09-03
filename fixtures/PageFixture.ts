import {test as base} from '@playwright/test'
import { LoginPage } from '../page-objects/loginpage'
import { SignupOnboarding } from '../page-objects/SignupOnboardingPage'
import { ProjectPage } from '../page-objects/ProjectPage'

type pageFixture = {
    atLoginPage: LoginPage
    atSignupPage: SignupOnboarding
    atProjectPage: ProjectPage
}

export const test = base.extend<pageFixture>({
    atLoginPage: async({page}, use)=>{
        const loginPage = new LoginPage(page);
        await loginPage.goToLogin()
        await use(loginPage);     
    },
    // SignupOnboardingPage fixture
    atSignupPage: async ({ page }, use) => {
        const signupPage = new SignupOnboarding(page);
        await use(signupPage);
    },
    // ProjectPage fixture
    atProjectPage: async ({ page }, use) => {
        const projectPage = new ProjectPage(page);
        await use(projectPage);
    },
})