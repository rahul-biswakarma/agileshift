/// <reference types="cypress" />


Cypress.Commands.add("getByData", (selector) => {
    return cy.get(`[data-testid=${selector}]`)
})

Cypress.Commands.add("createOrg", (orgName) => {
    cy.getByData("create-new-org-btn").click();
    cy.getByData("org-name-input").type(orgName);
    cy.getByData("create-org-btn").click();
});

Cypress.Commands.add("createSchema", (schemaName,last) => {
    cy.getByData(`case-name-input-${schemaName}`).should("exist").clear().type(`Cypress${schemaName}`);
    if(last){
        cy.getByData("edit-linkables-btn").should("exist").click();
    }
    else{
        cy.getByData("next-schema-btn").should("exist").click();
    }
});

Cypress.Commands.add("editLinkables",(schemaName,options)=>{
    cy.getByData(`${schemaName}-linkables`).should("exist").click();
    options.forEach(option=>{
        cy.getByData(`${option}-option`).click();
    })
    cy.get(".MuiBackdrop-root").should("exist").click();
})