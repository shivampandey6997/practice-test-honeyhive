import { test } from "@playwright/test";
import { LoginPage } from "../page-objects/loginpage";

let loginPage: LoginPage;

test.describe("Login Flow Scripts", () => {
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
  });

  test("Verify successful login", async () => {
    await loginPage.loginWithValidCredentials();
  });

  test("Verify error message by directly clicking on continue button", async () => {
    await loginPage.validateErrorByDirectlyClickingOnSubmitButton();
  });

  test('Verify error message is thrown when only filling emailaddress and clicking on continue button', async ()=>{
    await loginPage.validateErrorByEnteringemailaddressOnly()
  })

  test('Verify error message when only filling password field and clicking on continue button', async()=>{
    await loginPage.validateErrorByEnteringPasswordOnly()
  })
});










// test('Verify successful login', async ({ page }) => {
//   await page.goto('https://app.staging.honeyhive.ai//');
//   await page.fill("//input[@inputmode='email']","vendor-shivam+11@honeyhive.ai")
//   await page.fill('#password','Shivam@123')
//   await page.click("//button[@data-action-button-primary='true']")
//   // await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
//   await page.pause()
// });



