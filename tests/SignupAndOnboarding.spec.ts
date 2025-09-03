import { test } from "../fixtures/PageFixture";

test.describe("Signup Flow Scripts", () => {
  
  test("TC_01 Click on Sign up and verify navigation", async ({atLoginPage, atSignupPage}) => {
    await atSignupPage.openSignupAndVerify();
  });

  test("TC_02 Click continue with empty fields", async ({atLoginPage, atSignupPage}) => {
    await atSignupPage.continueWithoutCredentials();
  });

  test("TC_03 Enter only email, leave password empty", async ({atLoginPage, atSignupPage}) => {
    await atSignupPage.continueWithEmailOnly();
  });

  test("TC_04 Enter only password, leave email field empty", async ({atLoginPage, atSignupPage}) => {
    await atSignupPage.continueWithPasswordOnly();
  });

  test("TC_05 Perform validation check on onboarding fields", async ({atLoginPage, atSignupPage}) => {
    await atSignupPage.validateOnboardingFields();
  });

  test("TC_06 Perform complete onboarding with new user", async ({atLoginPage, atSignupPage}) => {
    await atSignupPage.creatingNewUser();
    await atSignupPage.completeOnboarding();
  });
});
