/// <reference types="Cypress" />

beforeEach(() => {
    const user = {}
    cy.visit('./src/index.html')

    user.name = 'William'
    user.lastname = 'Albuquerque'
    user.email = 'teste@gmail.com'
    user.text = 'texto teste'
})

describe('Central de Atendimento ao Cliente TAT', () => {
    it('verifica o título da aplicação', () => {
        cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    })

    it('preenche os campos obrigatórios e envia o formulário', () => {
        cy.get('#firstName').type('William')
        cy.get('#lastName').type('Albuquerque')
        cy.get('#email').type('wilcaieiras@hotmail.com')
        cy.get('#open-text-area').type('Um longo texto pra poder testar Um longo texto', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('William')
        cy.get('#lastName').type('Albuquerque')
        cy.get('#email').type('wilcaieirashotmailcom')
        cy.get('#open-text-area').type('Um longo texto pra poder testar Um longo texto', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('valor de telefone não numerico continua vazio', () => {
        cy.get('#phone').type('William').should('have.text','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('William')
        cy.get('#lastName').type('Albuquerque')
        cy.get('#email').type('wilcaieiras@hotmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Um longo texto pra poder testar Um longo texto', {delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('William').should('have.value', 'William').clear().should('have.value', '')
        cy.get('#lastName').type('Albuquerque').should('have.value', 'Albuquerque').clear().should('have.value', '')
        cy.get('#email').type('wilcaieiras@hotmail.com').should('have.value', 'wilcaieiras@hotmail.com').clear().should('have.value', '')
        cy.get('#phone').type('11985481918').should('have.value', '11985481918').clear().should('have.value', '')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    });

    it('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube').should('have.value', 'youtube')
    });

    it('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    });

    it('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select(1).should('have.value', 'blog')
    });

    it('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    });

    it('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]').should('have.length', 3).each(function($radio) {
            cy.wrap($radio).check().should('be.checked')
        })
    });

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    });

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json').should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: "drag-drop" }).should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    });

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload').should('not.have.value').selectFile('@sampleFile').should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    });

    it('testa a página da política de privacidade de forma independente', () => {
        cy.get('#privacy a').invoke('removeAttr','target').click()
        cy.get('#title').should('have.text','CAC TAT - Política de privacidade')
    });
  })