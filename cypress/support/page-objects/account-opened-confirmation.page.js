class AccountOpenedConfirmationPage {
  get accountOpenedTitle() {
    return cy.get("div[id='openAccountResult'] h1[class='title']");
  }
  get congratulationsText() {
    return cy.xpath(
      "//p[normalize-space()='Congratulations, your account is now open.']"
    );
  }

  get newAccountLabel() {
    return cy.contains("Your new account number:");
  }
  get accountNumberLink() {
    return this.newAccountLabel.next("a");
  }

  verifyAccountOpenedTitle() {
    this.accountOpenedTitle
      .should("be.visible")
      .and("have.text", "Account Opened!");
  }

  verifyCongratulationsMessage() {
    this.congratulationsText.should("be.visible");
  }

  getAccountNumberAndValidate() {
    return this.accountNumberLink.invoke("text").then((accountNumber) => {
      expect(accountNumber).to.match(/^\d+$/); // Validation
      return accountNumber;
    });
  }

  getAccountNumber() {
    return this.accountNumberLink.invoke("text");
  }
  clickAccountNumber() {
    this.accountNumberLink.click();
  }

  verifyAccountOpenedConfirmation() {
    this.verifyAccountOpenedTitle();
    this.verifyCongratulationsMessage();
    this.accountNumberLink.should("be.visible");
  }
}

export default new AccountOpenedConfirmationPage();
