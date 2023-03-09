import {slowCypressDown} from "cypress-slow-down"
describe("Schema Creation Component Tests", () => {
    beforeEach(() => {
        cy.login("hUZlg44iRyNh6MdmzfwyWmvp4i03")
        cy.getToOrg("test")
    });
    
    it("check", () => {
        // cy.getByData("organization-card").should("exist").eq(0).getByData("create-new-org").click();
        // cy.getByData("org-name-input").type("Test Org");
    });
});

  
  
slowCypressDown();