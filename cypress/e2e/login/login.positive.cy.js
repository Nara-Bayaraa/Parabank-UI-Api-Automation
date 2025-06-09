import HomePage from "../../support/page-objects/home.page";

describe("Login Functionality - Positive Test Cases ", () => {
  let username;
  let password;

  beforeEach(() => {
    cy.visit("/");
  });

  it("[LOGIN-001] should register a new user with random data", () => {
    HomePage.clickRegisterLink();
    cy.registerUser().then(() => {
      cy.get("@registeredUser").then((user) => {
        username = user.username;
        password = user.password;
      });
    });
  });

  it("[LOGIN-002] should  log in successfully after registration with  the valid credentials", () => {
    cy.log(`username ${username}`);
    cy.log(`password ${password}`);
    HomePage.typeUserName(username);
    HomePage.typePassword(password);
    HomePage.clickLoginButton();
   HomePage.verifyUrlIsExact();
    HomePage.verifyTitleIsVisible();
  });
});
