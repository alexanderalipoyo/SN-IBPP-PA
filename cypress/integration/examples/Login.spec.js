/// <reference types="cypress" />

context('login', () => {
  beforeEach(() => {
    cy.visit('https://qa-portal.pii-protect.com/#/login')
  })
  it('Login as Partner Admin', () => {
    cy.xpath('//*[@id="email"]')
      .type('Alexander+A@trustsecurenow.com', { force: true });
    cy.get('.UserLogin__Form-sc-43815n-1').submit();
    cy.wait(10000)
    cy.get('#password').should('be.visible').type("Welcome123");
    cy.xpath('//*[@id="root"]/div[2]/div/main/div/form/div[3]/button/span[1]').click();
  })
})
