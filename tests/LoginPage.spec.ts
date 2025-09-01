
// This provides describe(), test(), expect(), fixtures, etc.
import { test } from "@playwright/test";

// ✅ Import the LoginPage class (Page Object Model)
// This contains functions like gotoLoginPage(), login(), assertLoginSuccess()
import { LoginPage } from "../pages/LoginPage";

// ✅ Import custom CSV loader utility
// This reads CSV files and converts them into an array of objects
import { readCSV } from "../utils/csvLoader";

// ✅ Load the test data from CSV file
// Example: [{ username: "user1", password: "pass1", expected: "Account" }, ...]
const loginData = readCSV("data/loginData.csv");

// ✅ Group related tests under one describe block
// "🔑 Data-Driven Login Tests (CSV)" will appear as a suite name in Allure
test.describe("🔑 Data-Driven Login Tests (CSV)", () => {
  
  // ✅ Loop through each row of data from the CSV
  // Example: one test will run for each username/password in loginData
  for (const data of loginData) {
    
    // ✅ Define a test dynamically, with the name coming from "Scenario" column in CSV
    test(data.Scenario, async ({ page }, testInfo) => {
      
      // ✅ Add Allure metadata using annotations
      // These will replace allure.feature, allure.story, allure.severity
      testInfo.annotations.push(
        { type: "feature", description: "Login Module" },   // feature = Login Module
        { type: "story", description: "User Authentication" }, // story = Authentication flow
        { type: "severity", description: "critical" }      // severity = critical
      );

      // ✅ Create an instance of LoginPage (Page Object)
      // This allows you to call POM methods instead of writing selectors here
      const loginPage = new LoginPage(page);

      // ✅ Wrap step: Navigating to login page
      // "Go to Login Page" will appear in Allure report as a test step
      await test.step("Go to Login Page", async () => {
        await loginPage.gotoLoginPage();
      });

      // ✅ Wrap step: Performing login with given credentials
      // Username comes from CSV → data.username
      await test.step(`Login with username: ${data.username}`, async () => {
        await loginPage.login(data.username, data.password);
      });

      // ✅ Conditional check: if expected result contains "Account"
      // then assert login success, otherwise assert failure
      if (data.expected.includes("Account")) {
        
        // ✅ Success scenario: assert that login passed
        await test.step("Assert login success", async () => {
          await loginPage.assertLoginSuccess(data.screenshot);
        });

      } else {
        
        // ✅ Failure scenario: assert that login failed
        await test.step("Assert login failure", async () => {
          await loginPage.assertLoginFailure(data.screenshot);
        });
      }

      // ✅ Attach screenshot to Allure report
      // This replaces allure.addAttachment()
      if (data.screenshot) {
        await testInfo.attach("Login Screenshot", {
          path: data.screenshot,            // file path of screenshot
          contentType: "image/png",         // screenshot type
        });
      }
    });
  }
});