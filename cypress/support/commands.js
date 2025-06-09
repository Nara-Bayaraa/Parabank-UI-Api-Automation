import RegisterPage from "../support/page-objects/register.page";
import HomePage from "../support/page-objects/home.page";
import { generateUserRegistrationData } from "../support/helpers/generate-data";

Cypress.Commands.add("registerUser", (overrides = {}) => {
  const registerData = { ...generateUserRegistrationData(), ...overrides };
  RegisterPage.typeFirstName(registerData.firstName);
  RegisterPage.typeLastName(registerData.lastName);
  RegisterPage.typeAddress(registerData.address);
  RegisterPage.typeCity(registerData.city);
  RegisterPage.typeState(registerData.state);
  RegisterPage.typeZipCode(registerData.zipCode);
  RegisterPage.typePhoneNumber(registerData.phone);
  RegisterPage.typeSSN(registerData.ssn);
  RegisterPage.typeUserName(registerData.username);
  RegisterPage.typePassword(registerData.password);
  RegisterPage.typeConfirmPassword(registerData.confirmPassword);
  RegisterPage.clickRegisterButton();

  cy.wrap(registerData).as("registeredUser");
  cy.log(`unique username ${registerData.username}`)
});

Cypress.Commands.add("loginUser", (username, password) => {
  HomePage.typeUserName(username);
  HomePage.typePassword(password);
  HomePage.clickLoginButton();
});

Cypress.Commands.add("logOutUser", () => {
  cy.contains("Log Out").click();
});

import "./commands";
