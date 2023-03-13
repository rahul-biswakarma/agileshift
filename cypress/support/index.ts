/// <reference types="cypress" />


declare namespace Cypress {
    interface Chainable {
        getByData(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>
        createOrg(orgName: string): Chainable<JQuery<HTMLElement>>
        createSchema(schemaName: string,last:boolean): Chainable<JQuery<HTMLElement>>
        editLinkables(schemaName:string,options:string[]): Chainable<JQuery<HTMLElement>>
        login(selector:string): Chainable<JQuery<HTMLElement>>
        getToOrg(selector:string): Chainable<JQuery<HTMLElement>>
    }
}
console.log(Cypress)