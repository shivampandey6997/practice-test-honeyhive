import {test} from '@playwright/test'
import { LoginPage } from '../page-objects/loginpage'
import { Signup_Onboarding } from '../page-objects/signup_onboarding'

let loginPage: LoginPage
let signup_onboarding: Signup_Onboarding

test.describe('Signup Flow Scripts', ()=>{
    test.beforeEach(async ({page})=>{
        loginPage = new LoginPage(page)
        signup_onboarding = new Signup_Onboarding(page)
        await loginPage.navigateToLogin()

    })

    test('TC_01 Click on Sign up and verify navigation', async()=>{
        await signup_onboarding.clickingOnSignupPageAndVerifying()
    })

    test('TC_02 Click continue with empty fields', async()=>{
        await signup_onboarding.clickingOnContinuebuttonWithoutEmail_Password()
    })

    test('TC_03 Enter only email, leave password empty', async()=>{
        await signup_onboarding.clickingOnContinuebuttonWithEmailFIeldOnly()
    })

    test('TC_04 Enter only password, leave email field empty', async()=>{
        await signup_onboarding.clickingOnContinueButtonWithPasswordFieldOnly()
    })

    test('TC_05 Perform validation check on onboarding fields', async()=>{
        await signup_onboarding.checkingValidationOnOnboardingFields()

    })

    test('TC_06 Perform complete onboarding with new user', async()=>{
        await signup_onboarding.creatingNewuser()
        await signup_onboarding.completingOnboardingOfNewUser()
    })

})