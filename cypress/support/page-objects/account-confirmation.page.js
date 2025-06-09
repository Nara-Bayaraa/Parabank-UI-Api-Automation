class AccountConfirmationPage {
  get accountOpenedTitle() {
    return cy.get("div[id='openAccountResult'] h1[class='title']");
  }
  get congratulationsText() {
    return cy.xpath("//p[normalize-space()='Congratulations, your account is now open.']");
  }
  get newAccountLabel() {
    return cy.contains('Your new account number:');
  }
  get accountNumberLink() {
    return this.newAccountLabel.next('a');
  }

  verifyAccountOpenedTitle() {
    this.accountOpenedTitle.should('be.visible').and('have.text', 'Account Opened!');
  }

  verifyCongratulationsText() {
    this.congratulationsText.should('be.visible');
  }

  getAccountNumber() {
    return this.accountNumberLink.invoke('text');
  }

  clickAccountNumber() {
    this.accountNumberLink.click();
  }

  verifyAccountOpenedPage() {
    this.verifyAccountOpenedTitle();
    this.verifyCongratulationsText();
    this.accountNumberLink.should('be.visible');
  }


}

export default new AccountConfirmationPage();
