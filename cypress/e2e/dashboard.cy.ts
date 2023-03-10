describe("Dashboard Component Tests", () => {
	beforeEach(() => {
		cy.login("hUZlg44iRyNh6MdmzfwyWmvp4i03")
		cy.getToOrg("test")
	});

	it("check data table", () => {
		cy.getByData("dataTable").should("exist")
		cy.getByData("Tickets-13").should("exist").click()
		cy.getByData("dropdown-rest").should("exist").click()
		cy.getByData("add-option-rest").should("exist").click()
	});
});
