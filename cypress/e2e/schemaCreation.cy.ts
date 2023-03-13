import { slowCypressDown } from "cypress-slow-down";
describe("Schema Creation Component Tests", () => {
    beforeEach(() => {
        cy.window().then(() => {
            sessionStorage.setItem("organisationId","fCvZ8ov8WmFKknu7Ayxv");
            sessionStorage.setItem("userId","st3ono3aziag5EqBmuQ2YiPIvlz1");
        })
        cy.visit("http://localhost:3000/");
    });
    
    it("createOrganisation", () => {
        cy.createOrg("Test Org 2");
        cy.createSchema("Tickets",false);
        cy.createSchema("Issues",true);
        cy.editLinkables("cypresstickets",["cypresstickets","cypressissues"]);
        cy.editLinkables("cypressissues",["cypresstickets","cypressissues"]);
        cy.getByData("submit-schema-btn").should("exist").click();
    });
});
slowCypressDown();
