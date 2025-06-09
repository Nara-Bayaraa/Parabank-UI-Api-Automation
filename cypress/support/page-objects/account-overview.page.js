class AccountOverviewPage {
  get welcomeText() {
    return cy.get('[class="title"]');
  }
  get successfullyRegisterText() {
    return cy.get("div#rightPanel p");
  }
  get logoutButton() {
    return cy.contains("Log Out");
  }
  get welcomeMessageText() {
   return cy.get('div#leftPanel b')
  }
  get accountServicesTitle() {
    return cy.contains('h2', 'Account Services');
  }
  get openNewAccountLink() {
    return cy.xpath("//a[text()='Open New Account']");
  }
  get accountsOverviewLink() {
  return cy.contains('a', 'Accounts Overview');
  }
  get transferFundsLink() {
   return cy.contains('a', 'Transfer Funds');
  }
  get billPayLink() {
    return cy.contains('a', 'Bill Pay');

  }
  get findTransactionsLink() {
    return cy.contains('a', 'Find Transactions');
  }
  get updateContactInfoLink() {
    return cy.contains('a', 'Update Contact Info');
  }
  get requestLoanLink() {
    return cy.contains('a', 'Request Loan');
  }

  clickLogoutButton() {
    this.logoutButton.click();
  }

  verifyWelcomeMessageIsVisible(expectedText) {
    this.welcomeText.should("be.visible", expectedText);
  }

  verifyAccountSuccessfullyCreatedMessageIsVisible(expectedText) {
    this.successfullyRegisterText.should("be.visible", expectedText);
  }

  clickOpenNewAccountLink() {
    this.openNewAccountLink.click();
  }

}
export default new AccountOverviewPage();
