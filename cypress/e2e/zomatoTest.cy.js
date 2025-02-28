 

describe('Zomato App Test Cases', () => {
  const baseUrl = 'https://www.zomato.com';
  const email = 'sasisk@zohomail.in';
  const invalidEmail = 'test@gmail.io';
  const validOTP = 'Valid OTP';
  const invalidOTP = 'invalid OTP';

  beforeEach(() => {
    cy.visit(baseUrl);
  });

  it('TC_ZC_001: User Login with Valid Credentials', () => {
    cy.get(':nth-child(4) > .sc-3o0n99-5').click();
    cy.get('#id-33').within(() => {
      cy.get('.email-login-button').click();
      cy.get('#email').type(email);
      cy.get('.send-otp-button').click();
      cy.get('#otp').type(validOTP);
      cy.get('.login-button').click();
    });
    cy.url().should('eq', `${baseUrl}/homepage`);
  });

  it('TC_ZC_002: User Login with Invalid OTP', () => {
    cy.get(':nth-child(4) > .sc-3o0n99-5').click();
    cy.get('#id-33').within(() => {
      cy.get('.email-login-button').click();
      cy.get('#email').type(email);
      cy.get('.send-otp-button').click();
      cy.get('#otp').type(invalidOTP);
      cy.get('.login-button').click();
    });
    cy.get('.error-message').should('contain', 'The OTP entered is invalid/incorrect. Please try again.');
  });

  it('TC_ZC_003: User Login with not registered Email', () => {
    cy.get(':nth-child(4) > .sc-3o0n99-5').click();
    cy.get('#id-33').within(() => {
      cy.get('.email-login-button').click();
      cy.get('#email').type(invalidEmail);
      cy.get('.send-otp-button').click();
      cy.get('.error-message').should('contain', 'This email is not registered with us. Please sign up.');
    });
  });

  it('TC_ZC_004: User Login with Invalid Phone Number', () => {
    cy.get(':nth-child(4) > .sc-3o0n99-5').click();
    cy.get('#id-33').within(() => {
      cy.get('.phone-login-button').click();
      cy.get('#phone').clear();
      cy.get('.send-otp-button').click();
      cy.get('.error-message').should('contain', 'Please enter phone number');
      cy.get('#phone').type('123456');
      cy.get('.send-otp-button').click();
      cy.get('.error-message').should('contain', 'Invalid Phone Number');
    });
  });

  it('TC_ZC_005: Search for a Restaurant', () => {
    cy.get('.search-bar').type('The Grand Nikkah Biryani');
    cy.get('.search-result').click();
    cy.get('.restaurant-list').should('contain', 'The Grand Nikkah Biryani');
  });

  it('TC_ZC_006: Apply location on Search Results', () => {
    cy.get('.search-bar').type('bun parottas');
    cy.get('.location-icon').click();
    cy.get('.location-dropdown').type('Madurai{enter}');
    cy.get('.restaurant-list').should('contain', 'The Grand Nikkah Biryani');
  });

  it('TC_ZC_007: View Profile and its menu', () => {
    cy.get('.profile-icon').click();
    cy.get('.profile-section').click();
    cy.get('.reviews-option').click();
    cy.get('.settings-option').click();
    cy.url().should('include', '/settings');
  });

  it('TC_ZC_008: View Restaurant Reviews', () => {
    cy.get('.search-bar').type('Pizza Hut');
    cy.get('.search-result').click();
    cy.get('.reviews-tab').click();
    cy.get('.review-list').should('exist');
  });

  it('TC_ZC_009: Update Delivery Address', () => {
    cy.get('.profile-icon').click();
    cy.get('.my-addresses').click();
    cy.get('.edit-address').click();
    cy.get('#address').clear().type('123 Main Street');
    cy.get('#area').type('Chennai Central');
    cy.get('.confirm-button').click();
    cy.get('.save-button').click();
    cy.get('.address-list').should('contain', '123 Main Street');
  });

  it('TC_ZC_010: Delete Delivery Address', () => {
    cy.get('.profile-icon').click();
    cy.get('.my-addresses').click();
    cy.get('.delete-address').click();
    cy.get('.confirm-delete').click();
    cy.get('.address-list').should('not.contain', '123 Main Street');
  });

  it('TC_ZC_011: Add new Delivery Address', () => {
    cy.get('.profile-icon').click();
    cy.get('.my-addresses').click();
    cy.get('.add-address').click();
    cy.get('#address').type('123 Main Street');
    cy.get('#area').type('New Delhi, Delhi, India, India');
    cy.get('.confirm-button').click();
    cy.get('.save-button').click();
    cy.get('.address-list').should('contain', '123 Main Street');
  });

  it('TC_ZC_012: Logout', () => {
    cy.get('.profile-icon').click();
    cy.get('.logout-button').click();
    cy.url().should('eq', `${baseUrl}/login`);
  });
});
