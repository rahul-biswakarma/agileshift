import { slowCypressDown } from "cypress-slow-down";
describe("Schema Creation Component Tests", () => {
	beforeEach(() => {
		cy.window().then(() => {
			sessionStorage.setItem("organisationId", "M7UPhL7dDUaaCnVFio40");
			sessionStorage.setItem("userId", "ojapvSEKWOYydmI5udd7j0Uiooi2");
		});
		cy.visit("http://localhost:3000/");
	});

	it("check", () => {
		cy.getByData("organization-card")
			.should("exist")
			.eq(0)
			.getByData("create-new-org")
			.click();
		cy.getByData("org-name-input").type("Test Org");
	});
});
slowCypressDown();
