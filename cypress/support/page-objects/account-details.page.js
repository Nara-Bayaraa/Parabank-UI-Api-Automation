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
get transactionTable() {return cy.get('[id="transactionTable"]')}
get dateHeader() {return cy.get('[id="transactionTable"] th').eq(0)}
get transactionHeader() {return cy.get('[id="transactionTable"] th').eq(1)}
get debitHeader() {return cy.get('[id="transactionTable"] th').eq(2)}
get creditHeader() {return cy.get('[id="transactionTable"] th').eq(3)}


  getBalances() {
    return cy.contains("Balance:").next().invoke("text").then((balanceText) => {
        return cy.contains("Available:").next().invoke("text").then((availableText) => {
            return {
              balance: balanceText.trim(),
              available: availableText.trim()
            };
          });
      });
  }

   getTransactionRow = (rowIndex = 0) => {
    return cy.get('[id="transactionTable"] tbody tr').eq(rowIndex);
  };

getTransactionRowValues(rowIndex = 0) {
  return this.getTransactionRow(rowIndex).find("td").then(($tds) => {
    const date = $tds.eq(0).text().trim();
    const description = $tds.eq(1).text().trim();
    const debitAmount = $tds.eq(2).text().trim();
    const creditAmount = $tds.eq(3).text().trim();
    return { date, description, debitAmount, creditAmount };
  });
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
