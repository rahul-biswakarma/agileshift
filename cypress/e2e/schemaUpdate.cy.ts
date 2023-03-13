import {slowCypressDown} from "cypress-slow-down"
describe("Schema Editing Component Tests", () => {
    beforeEach(() => {
        cy.login("FMEm2PixTzOr3Xk2i3nHgkPDXvp2")
        cy.getToOrg("cypress_test_org")
    });
    
    it("go to edit schema component", () => {
        // Create a new Column
        cy.getByData("edit-schema").should("exist").click();
        cy.getByData("add-new-schema").should("exist").click();
        cy.getByData("case-name-input").should("exist").type("Bugs");
        cy.getByData("edit-linkables").should("exist").click();
        cy.getByData("submit-schema").should("exist").click();
        cy.getByData("Bugs").should("exist");

        // Update a column schema in Org Schema
        cy.getByData("edit-schema").should("exist").click();
        cy.getByData("schema-tab-Bugs").should("exist").click();
        cy.getByData("add-column-btn").should("exist").click();
        cy.getByData("delete-schema-btn").should("exist").click();
        cy.getByData("handle-delete-confirm").should("exist").click();
        cy.getByData("edit-linkables").should("exist").click();
        cy.getByData("submit-schema").should("exist").click();
        cy.getByData("Bugs").should("not.exist");


        // Delete a Column from schema
        cy.getByData("edit-schema").should("exist").click();
        cy.getByData("schema-tab-Bugs").should("exist").click();
        cy.getByData("delete-schema-btn").should("exist").click();
        cy.getByData("handle-delete-confirm").should("exist").click();
        cy.getByData("edit-linkables").should("exist").click();
        cy.getByData("submit-schema").should("exist").click();
        cy.getByData("Bugs").should("not.exist");
    });
});
slowCypressDown();