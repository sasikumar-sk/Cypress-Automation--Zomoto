// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import 'cypress-iframe';




import MailosaurClient from 'mailosaur';

Cypress.Commands.add('getOTPFromEmail', (serverId, inboxName) => {
    const client = new MailosaurClient('1hcrBUc6PSZhg88MP7Skm0OG3nRqVRwP');
    
    // Fetch the latest email that was sent to the inbox
    client.messages.list(serverId, {
        sentTo: inboxName,  // The email address you use for your tests
        limit: 1            // Fetch the latest message
    }).then(response => {
        const email = response.items[0];
        
        // Assuming the OTP is in the subject or body, you need to extract it
        const otp = email.subject.match(/\d{6}/)[0] || email.text.match(/\d{6}/)[0];  // Adjust the regex as per OTP format
        cy.wrap(otp).as('otp');  // Store OTP in Cypress alias for later use
    });
});
