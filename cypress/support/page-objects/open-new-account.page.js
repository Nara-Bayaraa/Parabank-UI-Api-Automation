class OpenNewAccountPage {
  get openNewAccountTitle() {
    return cy.contains("h1", "Open New Account");
  }
  get selectAccountType() {
    return cy.get('[id="type"]');
  }
  get fundingAccountDropdown() {
    return cy.get("#fromAccountId");
  }
  get openNewAccountButton() {
    return cy.get('[type="button"]');
  }
  get defaultAccountNumber() {
    return cy.get("#fromAccountId option");
  }

  get selectDefaultAccountNumber() {
    return cy.get('[id="fromAccountId"]');
  }


  getDefaultAccountAndValidate() {
    return this.defaultAccountNumber.first().then(($option) => {
      const accountNumber = $option.val();
      expect(accountNumber).to.match(/^\d+$/); // Validation

      return this.selectDefaultAccountNumber
        .select(accountNumber)
        .then(() => accountNumber);
    });
  }
  verifyTitleIsVisible() {
    this.openNewAccountTitle.should("be.visible");
    this.openNewAccountTitle.should("have.text", "Open New Account");
  }

  createAccount(type) {
    this.selectAccountType.select(type);
    this.fundingAccountDropdown
      .find("option")
      .should("have.length.greaterThan", 0)
      .then(($options) => {
        const accountNumber = Array.from($options).find((opt) => opt.value);
        this.fundingAccountDropdown.select(accountNumber.value);
      });
    this.openNewAccountButton.click();
  }
}
export default new OpenNewAccountPage();
