/// <reference types="cypress" />
context('login', () => {
  beforeEach(() => {
    cy.visit('https://portal.pii-protect.com/#/login')
  })
  it('Browse production URL', () => {
    cy.xpath('//*[@id="email"]')
      .type('Alexander+A@trustsecurenow.com', { force: true });
  })
})
