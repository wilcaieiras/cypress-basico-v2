Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('William')
    cy.get('#lastName').type('Albuquerque')
    cy.get('#email').type('wilcaieiras@hotmail.com')
    cy.get('#open-text-area').type('Um longo texto pra poder testar Um longo texto', {delay: 0})
    cy.contains('button', 'Enviar').click()
})