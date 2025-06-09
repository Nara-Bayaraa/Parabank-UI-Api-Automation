import AccountConfirmationPage from "../../support/page-objects/account-confirmation.page";
import AccountOverviewPage from "../../support/page-objects/account-overview.page";
import AccountDetailsPage from "../../support/page-objects/account-details.page";
import OpenNewAccountPage from "../../support/page-objects/open-new-account.page";

describe("Open New Account Functionality", () => {
  let accountNumber;

  beforeEach(() => {
    cy.visit("/register.htm");
    cy.registerUser().then(() => {});
  });

  it("[OPEN-001] should allow a new user to open a CHECKING account and show confirmation", () => {
    AccountOverviewPage.clickOpenNewAccountLink();
    OpenNewAccountPage.verifyTitleIsVisible();
    OpenNewAccountPage.createAccount("CHECKING");

    AccountConfirmationPage.verifyAccountOpenedTitle();
    AccountConfirmationPage.verifyCongratulationsText();

    AccountConfirmationPage.getAccountNumber().then((num) => {
      expect(num).to.match(/^\d+$/);
      accountNumber = num;
    });
  });

  it.only("[OPEN-002] should display correct account details and initial transaction", () => {
    AccountOverviewPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("CHECKING");
    AccountConfirmationPage.getAccountNumber().then((num) => {
      accountNumber = num;
      AccountConfirmationPage.clickAccountNumber();
      cy.url().should("include", `/activity.htm?id=${accountNumber}`);
      cy.contains("Balance:").next().invoke("text").then((balanceText) => {
          cy.contains("Available:").next().invoke("text").then((availableText) => {
              AccountDetailsPage.verifyAccountDetails(
                accountNumber,
                "CHECKING",
                balanceText.trim(),
                availableText.trim()
              );
              cy.log(`balance amount is ${balanceText}`);
              cy.log(`available amount is ${availableText}`);
            });
        });

      AccountDetailsPage.getDateCell(0).invoke("text").then((date) => {
          AccountDetailsPage.getTransactionCell(0).invoke("text").then((description) => {
              AccountDetailsPage.getDebitAmountCell(0).invoke("text").then((debitAmount) => {
                  AccountDetailsPage.getCreditAmountCell(0).invoke("text").then((creditAmount) => {
                      AccountDetailsPage.verifyTransaction({
                        shouldExist: true,
                        date: date.trim(),
                        description: description.trim(),
                        creditAmount: creditAmount.trim(),
                        amount: debitAmount.trim(),
                      });
                      cy.log(`credit amount is ${creditAmount}`);
                    });
                });
            });
        });
    });
  });

  it("[OPEN-003] should filter transactions by month and type (no debits)", () => {
    AccountOverviewPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("CHECKING");
    AccountConfirmationPage.getAccountNumber().then((num) => {
      accountNumber = num;
      AccountConfirmationPage.clickAccountNumber();
      AccountDetailsPage.selectFilters("April", "Debit");
      AccountDetailsPage.clickGoButton();
      AccountDetailsPage.verifyFilteredResultsVisible({ shouldExist: false });
      AccountDetailsPage. verifyNoTransactionsFoundTextIsDisplayed()
    });
  });

  it("[OPEN-004] should filter transactions by month and type (show credit)", () => {
    AccountOverviewPage.clickOpenNewAccountLink();
    OpenNewAccountPage.createAccount("CHECKING");
    AccountConfirmationPage.getAccountNumber().then((num) => {
      accountNumber = num;
      AccountConfirmationPage.clickAccountNumber();
      AccountDetailsPage.selectFilters("June", "Credit");
      AccountDetailsPage.clickGoButton();
      AccountDetailsPage.getTransactionCell(0).invoke("text").then((description) => {
          AccountDetailsPage.getCreditAmountCell(0).invoke("text").then((amount) => {
              AccountDetailsPage.verifyFilteredResultsVisible({
                shouldExist: true,
                description: description.trim(),
                amount: amount.trim(),
              });
              cy.log(`amount is ${amount}`);
            });
        });
    });
  });
});
