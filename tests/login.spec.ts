import { test } from "../fixtures/PageFixture";

test.describe("Login Flow Scripts", () => {
  
  test("Verify successful login", async ({atLoginPage}, testInfo) => {
    await atLoginPage.loginWithValidCreds();

    await testInfo.attach("Linked Test Case", {
      body: "https://docs.google.com/spreadsheets/d/11opPXBZsENOmF5z4UUbLoeInQyUU_j5k05D4basme-U/edit?gid=694755024#gid=694755024&range=I50",
      contentType: "text/plain"
    });
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
