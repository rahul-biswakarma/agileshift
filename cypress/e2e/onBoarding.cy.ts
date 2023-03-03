describe('Onboarding Component Tests', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('check', () => {
    cy.getByData('landing-component').should('exist')
  })
})