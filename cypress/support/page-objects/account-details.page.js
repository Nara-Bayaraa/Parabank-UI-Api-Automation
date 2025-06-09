class AccountDetailsPage {
  get accountDetailsTitle() {
    return cy.xpath("//h1[text()='Account Details']");
  }
  get accountNumber() {
    return cy.contains("Account Number:").next();
  }
  get accountType() {
    return cy.contains("Account Type:").next();
  }
  get balance() {
    return cy.contains("Balance:").next();
  }
  get available() {
    return cy.contains("Available:").next();
  }
  get accountActivityTitle() {
    return cy.xpath("//h1[text()='Account Activity']");
  }
  get activityPeriodDropdown() {
    return cy.get('[id="month"]');
  }
  get typeDropdown() {return cy.get('[id="transactionType"]')}

  get fundsTransferReceivedLink() {
    return cy.xpath("//a[text()='Funds Transfer Received']");
  }

  get goButton() {
    return cy.get('[type="submit"]');
  }
  get transactionTable() {return cy.get('[id="transactionTable"]')}

  get noTransactionsFoundText() {
    return cy.get('[id="noTransactions"]');
  }

  getTransactionRow(rowIndex = 0) {
    return cy.get("#transactionTable tbody tr").eq(rowIndex);
  }
  getDateCell(rowIndex = 0) {
    return this.getTransactionRow(rowIndex).find("td").eq(0);
  }
  getTransactionCell(rowIndex = 0) {
    return this.getTransactionRow(rowIndex).find("td").eq(1);
  }
  getDebitAmountCell(rowIndex = 0) {
    return this.getTransactionRow(rowIndex).find("td").eq(2);
  }
  getCreditAmountCell(rowIndex = 0) {
    return this.getTransactionRow(rowIndex).find("td").eq(3);
  }


  verifyAccountDetails(accountNumber, type,  balance = null, available = null) {
  this.accountDetailsTitle.should("be.visible");
  this.accountNumber.should("contain.text", accountNumber);
  this.accountType.should("contain.text", type);
  //balance
 if (balance !== null) {
    this.balance.should("contain.text", balance);
  } else {
    this.balance.invoke('text').should('match', /^\$\d+(\.\d{2})?$/); 
  }
  //available
  if (available !== null) {
    this.available.should("contain.text", available);
  } else {
    this.available.invoke('text').should('match', /^\$\d+(\.\d{2})?$/);
  }
  }
  

  selectFilters(month, type) {
    this.activityPeriodDropdown.select(month);
    this.typeDropdown.select(type);
  }

  clickGoButton() {
    this.goButton.click();
  }

  verifyFilteredResultsVisible({shouldExist = true,  description = " ", amount = " ",}) {
    if (shouldExist) {
      this.transactionTable.contains(description).should("exist");
      if (amount) this.transactionTable.contains(amount).should("exist");
    } else {
      this.noTransactionsFoundText.should("be.visible");
    }
  }
  
verifyTransaction({shouldExist = true, rowIndex = 0, date, description, debitAmount = "",creditAmount = ""
}) {
  if (shouldExist) {
    cy.get('#transactionTable tbody tr').eq(rowIndex).within(() => {
      // Date
      if (date) cy.get('td').eq(0).should('contain.text', date);
      // Description
      if (description) cy.get('td').eq(1).should('contain.text', description);
      // Debit Amount
      if (debitAmount && debitAmount.trim() !== "") {
        cy.get('td').eq(2).should('contain.text', debitAmount);
      } else {
        cy.get('td').eq(2).should('have.text', '').and('be.empty');
      }
      // Credit Amount
      if (creditAmount && creditAmount.trim() !== "") {
        cy.get('td').eq(3).should('contain.text', creditAmount);
      } else {
        cy.get('td').eq(3).should('have.text', '').and('be.empty');
      }
    });
  } else {
    this.noTransactionsFoundText.should("be.visible");
  }
}

  verifyNoTransactionsFoundTextIsDisplayed() {
    this.noTransactionsFoundText.should("have.text", "No transactions found.");
  }
}
export default new AccountDetailsPage();
