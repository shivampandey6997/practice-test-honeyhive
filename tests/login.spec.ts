import { test } from "../fixtures/PageFixture";

test.describe("Login Flow Scripts", () => {
  
  test("Verify successful login", async ({atLoginPage}) => {
    await atLoginPage.loginWithValidCreds();
  });

  test("Verify error message by directly clicking on continue button", async ({atLoginPage}) => {
    await atLoginPage.validateErrorOnSubmit();
  });

  test("Verify error message is thrown when only filling emailaddress and clicking on continue button", async ({atLoginPage}) => {
    await atLoginPage.validateErrorEmailOnly();
  });

  test("Verify error message when only filling password field and clicking on continue button", async ({atLoginPage}) => {
    await atLoginPage.validateErrorPasswordOnly();
  });
});
