describe('empty spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200')
  })
  xit('inscription', () => {
    cy.get('a').eq(1).click()
    cy.get("[type='email']").type('testcypress@ynov.com')
    cy.get("[type='username']").type('testcypress')
    cy.get("[id='password']").type('cypress')
    cy.get("[id='confirmPassword']").type('cypress')
    cy.get('select').select(0)
    cy.get("[id='answerSecretQuestion']").type('miaou')
    cy.get('form').submit()
  })
  it('connexion', () => {
    cy.get("[type='email']").type('julie.miler@ynov.com')
    cy.get("[type='password']").type('secret')
    cy.get('form').submit()
  })
  it('administrateur', () => {
    cy.get("[id='admin']").click({ force: true })
  })
})
