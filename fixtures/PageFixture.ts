import {test as base} from '@playwright/test'
import { LoginPage } from '../page-objects/Loginpage/LoginPage'
import { SignupOnboarding } from '../page-objects/SignupandOnboarding/SignupOnboardingPage'
import { ProjectPage } from '../page-objects/Projectpage/ProjectPage'
import { EvaluatorPage } from '../page-objects/Evaluatorpage/EvaluatorPage'

type pageFixture = {
    atLoginPage: LoginPage
    atSignupPage: SignupOnboarding
    atProjectPage: ProjectPage
    atEvaluatorPage: EvaluatorPage
}

export const test = base.extend<pageFixture>({
    // Login Page fixture
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
    // EvaluatorPage fixture
    atEvaluatorPage: async ({page}, use) => {
        const evaluatorpage = new EvaluatorPage(page)
        await use(evaluatorpage)
    }
})