class AccountsOverviewPage {


get accountOverviewTable() {return cy.get('[id="accountTable"]')}

get accountHeader() { return cy.get('[id="accountTable"] th').eq(0); }
get balanceHeader() { return cy.get('[id="accountTable"] th').eq(1); }
get availableAmountHeader() { return cy.get('[id="accountTable"] th').eq(2); }



get accountNumberLink() { 
  return cy.get('[id="accountTable"] tbody tr ').first().find('td').eq(0).find('a'); 
}
get balanceCell() { 
  return cy.get('[id="accountTable"] tbody tr ').first().find('td').eq(1); 
}
get availableAmountCell() { 
  return cy.get('[id="accountTable"] tbody tr ').first().find('td').eq(2); 
}


verifyAccountHeaderDisplayed(){
  this.accountHeader.should('have.text', 'Account');
}
verifyBalanceHeaderDisplayed() {
this.balanceHeader.should('contain.text', 'Balance');
}
verifyAvailableAmmountHeaderDisplayed() {
this.availableAmountHeader.should('contain.text', 'Available Amount');
}

}
export default new AccountsOverviewPage();
