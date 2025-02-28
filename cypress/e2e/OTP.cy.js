describe('Automated Login Test', () => {
  it('should log in with OTP fetched from email', () => {
      const serverId = 'dvqkodxe';  // Replace with your Mailosaur server ID
      const inboxName = 'former-matter@dvqkodxe.mailosaur.net';  // Replace with the inbox where OTP is sent
      
      // Visit the login page
      cy.visit('https://www.zomato.com');
      // Fill in username and password
      cy.get('input[name="username"]').type('former-matter@dvqkodxe.mailosaur.net');
      cy.get('button[type="submit"]').click();
      // Fetch OTP from email inbox
      cy.getOTPFromEmail(serverId, inboxName);
      // Use the OTP
      cy.get('@otp').then(otp => {
          // Enter OTP into the OTP input field
          cy.get('input[name="otp"]').type(otp);
          // Submit the OTP
          cy.get('button[type="submit"]').click();
      });
      // Verify login success
      cy.url().should('include', '/homepage');   
  });
});
