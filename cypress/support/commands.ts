/// <reference types="cypress" />

Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-testid=${selector}]`)
})

Cypress.Commands.add("login", (selector:string) => {
    cy.window().then(() => {
        sessionStorage.setItem("userId",selector);
    })
    cy.visit("http://localhost:3000/");
})

Cypress.Commands.add("getToOrg", (selector:string) => {
    cy.getByData("organization-list").should("exist")
    cy.getByData(selector).should("exist")
    cy.getByData(`${selector}-open`).should("exist").click()
})