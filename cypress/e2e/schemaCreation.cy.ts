import { slowCypressDown } from "cypress-slow-down";
describe("Schema Creation Component Tests", () => {
    beforeEach(() => {
        cy.window().then(() => {
            sessionStorage.setItem("organisationId","oTkstJOfcWoo1sHTOCLo");
            sessionStorage.setItem("userId","st3ono3aziag5EqBmuQ2YiPIvlz1");
        })
        cy.visit("http://localhost:3000/");
    });
    
    it("check", () => {
        cy.getByData("organization-card").should("exist").eq(0)
    });
});
slowCypressDown();
