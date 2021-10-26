/// <reference types="cypress" />

describe("Basic Operations", () => {
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5501/");
    });

    it("Should calaculate 2 + 2 and return 4",() =>{
        cy.get("#two").click();
        cy.get("[data-action=add]").click();
        cy.get("#two").click();
        cy.get("[data-action=solve]").click();
        cy.get("#calculator__display").should('have.text', '4');
    })
})