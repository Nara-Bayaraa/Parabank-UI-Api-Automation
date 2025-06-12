import AccountOpenedConfirmationPage from "../../support/page-objects/account-opened-confirmation.page";
import AccountServicesMenuPage from "../../support/page-objects/account-services-menu.page"
import AccountDetailsPage from "../../support/page-objects/account-details.page";
import OpenNewAccountPage from "../../support/page-objects/open-new-account.page";

describe("Open New Checking Account  Functionality", () => {

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

  it("[CHECKING-001] should allow a newly registered user to log in, open a checking account, and view a confirmation", () => {
    cy.loginUser(username, password);
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.verifyTitleIsVisible();
    OpenNewAccountPage.createAccount("CHECKING");
    AccountOpenedConfirmationPage.verifyAccountOpenedTitle();
    AccountOpenedConfirmationPage.verifyCongratulationsMessage();
    AccountOpenedConfirmationPage.getAccountNumberAndValidate().then((num) => {
      cy.log(`Checking Account Number ${num}`);
    });
  });

  it("[CHECKING-002] should display correct account details and initial transaction", () => {
    cy.loginUser(username, password);
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("CHECKING");
    AccountOpenedConfirmationPage.getAccountNumber().then((num) => {
      accountNumber = num;
      AccountOpenedConfirmationPage.clickAccountNumber();
      cy.url().should("include", `/activity.htm?id=${accountNumber}`);
      AccountDetailsPage.getBalances().then(({ balance, available }) => {
        AccountDetailsPage.verifyAccountDetails(
          accountNumber,
          "CHECKING",
          balance,
          available
        );
      });
    });
    AccountDetailsPage.getTransactionRowValues(0).then(({ date, description, debitAmount, creditAmount }) => {
        AccountDetailsPage.verifyTransaction({
          shouldExist: true,
          date,
          description,
          creditAmount,
          amount: debitAmount,
        });
        cy.log(`credit amount is ${creditAmount}`);
      });
  });
 

  it("[CHECKING-003] should filter transactions by month and type (no debits)", () => {
    cy.loginUser(username, password);
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("CHECKING");
      AccountOpenedConfirmationPage.clickAccountNumber();
      AccountDetailsPage.selectFilters("April", "Debit");
      AccountDetailsPage.clickGoButton();
      AccountDetailsPage.verifyFilteredResultsVisible({ shouldExist: false });
      AccountDetailsPage.verifyNoTransactionsFoundTextIsDisplayed();
    });


  it("[CHECKING-004] should filter transactions by month and type (show credit)", () => {
    cy.loginUser(username, password);
    AccountServicesMenuPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("CHECKING");
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
      });
  });
});

