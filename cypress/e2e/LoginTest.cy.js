it('TC_ZC_001: User Login with Valid Credentials', () => {
 
  cy.get(':nth-child(4) > .sc-3o0n99-5').click();
 
  cy.wait(2000);  

  // Ensure the iframe is loaded
  cy.frameLoaded('#auth-login-ui');

  // Interact with the iframe's elements
  cy.iframe('#auth-login-ui').within(() => {
    cy.get('.email-login-button').click();
    cy.get('#email').type(email);
    cy.get('.send-otp-button').click();
    cy.get('.login-button').click();
  });
 
  cy.url().should('eq', `${baseUrl}/homepage`);
});


it('TC_ZC_001: User Login with Valid Credentials', () => { 
  cy.get(':nth-child(4) > .sc-3o0n99-5').click();
  cy.wait(2000);  
  cy.iframe('#auth-login-ui').within(() => {
    // Now, interact with elements inside the iframe
    cy.wait(2000);  
    cy.get('.email-login-button').click();
    cy.get('#email').type(email);
    cy.get('.send-otp-button').click();
    cy.get('.login-button').click();
  });
 
  cy.url().should('eq', `${baseUrl}/homepage`);
});
