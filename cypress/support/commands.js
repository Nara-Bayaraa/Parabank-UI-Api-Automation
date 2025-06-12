import RegisterPage from "../support/page-objects/register.page";
import HomePage from "../support/page-objects/home.page";
import { generateUserRegistrationData } from "../support/helpers/generate-data";

Cypress.Commands.add("registerUser", (overrides = {}) => {
    cy.visit("/register.htm");
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
cy.contains('Your account was created successfully. You are now logged in.').should('be.visible')
  cy.wrap(registerData).as("registeredUser");
   
});

Cypress.Commands.add("loginUser", (username, password) => {
      cy.visit("/index.htm");
    cy.wait(1000);
  HomePage.typeUserName(username);
  HomePage.typePassword(password);
  HomePage.clickLoginButton();
      cy.log(`The logged username is: ${username}`);
      cy.log(`The logged password is: ${password}`);
});

Cypress.Commands.add("logoutUser", () => {
  cy.contains("Log Out").click();
});




import "./commands";
