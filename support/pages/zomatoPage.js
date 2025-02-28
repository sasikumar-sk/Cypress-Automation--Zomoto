// cypress/support/pages/zomatoPage.js



class ZomatoPage {
   
    get searchInput() {
      return cy.get('input[name="q"]');  
    }
  
    get searchButton() {
      return cy.get('button[type="submit"]');  
    }
  
    get searchResults() {
      return cy.get('.search-snippet-card');  
    }
   
    open() {
      cy.visit('https://www.zomato.com/');
    }
  
    searchFor(query) {
      this.searchInput.type(query);
      this.searchButton.click();
    }
  
    verifySearchResults() {
      this.searchResults.should('have.length.greaterThan', 0);  
    }
  }
   
  export default ZomatoPage;
  