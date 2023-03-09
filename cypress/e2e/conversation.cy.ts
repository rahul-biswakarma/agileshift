import {slowCypressDown} from "cypress-slow-down"
describe("Schema Creation Component Tests", () => {
    beforeEach(() => {
        cy.login("hUZlg44iRyNh6MdmzfwyWmvp4i03")
        cy.getToOrg("test")
    });
    
    it("check dashboard", () => {
        cy.getByData("dashboard").should("exist")
    });

    it("check build-quandrant is present", () => {
        cy.getByData("build-quadrant").should("exist")
    });
    it("check whether data is present", () => {
        cy.wait(3000);
        cy.getByData("ag-grid").should("exist")
    });
});

  
  
slowCypressDown();