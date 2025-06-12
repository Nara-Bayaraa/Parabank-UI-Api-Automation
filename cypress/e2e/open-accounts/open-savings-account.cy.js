import AccountOpenedConfirmationPage from "../../support/page-objects/account-opened-confirmation.page";
import AccountServicesMenuPage from "../../support/page-objects/account-services-menu.page";
import AccountDetailsPage from "../../support/page-objects/account-details.page";
import OpenNewAccountPage from "../../support/page-objects/open-new-account.page";

describe("Open New Savings Account  Functionality", () => {
  let accountNumber;
  let username;
  let password;

  before(() => {
    cy.registerUser();
    cy.get("@registeredUser").then((user) => {
      username = user.username;
      password = user.password;
      cy.logoutUser();
    });
  });

  it("[SAVINGS-001] should allow a new user to open a savings account and show confirmation", () => {
    cy.loginUser(username, password);
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.verifyTitleIsVisible();
    OpenNewAccountPage.createAccount("SAVINGS");
    AccountOpenedConfirmationPage.verifyAccountOpenedTitle();
    AccountOpenedConfirmationPage.verifyCongratulationsMessage();
    AccountOpenedConfirmationPage.getAccountNumberAndValidate().then(
      (accountNum) => {
        cy.log(`Savings Account Number ${accountNum}`);
      }
    );
  });

  it("[SAVINGS-002] should display correct account details and initial transaction", () => {
    cy.loginUser(username, password);
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("SAVINGS");
    AccountOpenedConfirmationPage.getAccountNumber().then((accountNum) => {
      accountNumber = accountNum;
      AccountOpenedConfirmationPage.clickAccountNumber();
      cy.url().should("include", `/activity.htm?id=${accountNumber}`);
      AccountDetailsPage.getBalances().then(({ balance, available }) => {
        AccountDetailsPage.verifyAccountDetails(
          accountNumber,
          "SAVINGS",
          balance,
          available
        );
      });
    });
    AccountDetailsPage.getTransactionRowValues(0).then(
      ({ date, description, debitAmount, creditAmount }) => {
        AccountDetailsPage.verifyTransaction({
          shouldExist: true,
          date,
          description,
          creditAmount,
          amount: debitAmount,
        });
        cy.log(`credit amount is ${creditAmount}`);
      }
    );
  });

  it("[SAVINGS-003] should filter transactions by month and type (no debits)", () => {
    cy.loginUser(username, password);
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("SAVINGS");
    AccountOpenedConfirmationPage.clickAccountNumber();
    AccountDetailsPage.selectFilters("April", "Debit");
    AccountDetailsPage.clickGoButton();
    AccountDetailsPage.verifyFilteredResultsVisible({ shouldExist: false });
    AccountDetailsPage.verifyNoTransactionsFoundTextIsDisplayed();
  });

  it("[SAVINGS-004] should filter transactions by month and type (show credit)", () => {
    cy.loginUser(username, password);
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("SAVINGS");
    AccountOpenedConfirmationPage.clickAccountNumber();
    AccountDetailsPage.selectFilters("June", "Credit");
    AccountDetailsPage.clickGoButton();
    AccountDetailsPage.getTransactionRowValues(0).then(
      ({ date, description, debitAmount, creditAmount }) => {
        AccountDetailsPage.verifyTransaction({
          shouldExist: true,
          date,
          description,
          creditAmount,
          amount: debitAmount,
        });
        cy.log(`credit amount is ${creditAmount}`);
      }
    );
  });
});
