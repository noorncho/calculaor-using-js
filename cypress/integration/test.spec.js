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
    });

    it("Should calculate 54 - 8 and return 46", () =>{
        cy.get("#five").click();
        cy.get("#four").click();
        cy.get("[data-action=subtract]").click();
        cy.get("#eight").click();
        cy.get("[data-action=solve]").click();
        cy.get("#calculator__display").should('have.text', '46');
    });

    it("Should calculate 250 ÷ 5 and return 50", () =>{
        cy.get("#two").click();
        cy.get("#five").click();
        cy.get("#zero").click();
        cy.get("[data-action=divide]").click();
        cy.get("#five").click();
        cy.get("[data-action=solve]").click();
        cy.get("#calculator__display").should('have.text', '50');
    });

    it("Should calculate 25 x 3 and return 75", () =>{
        cy.get("#two").click();
        cy.get("#five").click();
        cy.get("[data-action=multiply]").click();
        cy.get("#three").click();
        cy.get("[data-action=solve]").click();
        cy.get("#calculator__display").should('have.text', '75');
    });
})

describe("Decimal Numbers and Negation", () =>{
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5501/");
    });

    it("Should calculate 0.5 + 10.7 and return 11.2", () =>{
        cy.get("[data-action=decimal]").click();
        cy.get("#five").click();
        cy.get("[data-action=add]").click();
        cy.get("#one").click();
        cy.get("#zero").click();
        cy.get("[data-action=decimal]").click();
        cy.get("#seven").click();
        cy.get("[data-action=solve]").click();
        cy.get("#calculator__display").should('have.text', '11.2');
    });

    it("Should calculate -4 + 2 and return -6", () =>{
        cy.get("#four").click();
        cy.get(".key-negation").click();
        cy.get("[data-action=add]").click();
        cy.get("#two").click();
        cy.get(".key-negation").click();
        cy.get("[data-action=solve]").click();
        cy.get("#calculator__display").should('have.text', '-6');
    });
});

describe("AC Feature", () =>{
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5501/");
    });

    it("Should click the AC button and return 0", () =>{
        cy.get("#five").click();
        cy.get("#three").click();
        cy.get("[data-action=clear]").click();
        cy.get("#calculator__display").should('have.text', '0');
    });
});

describe("Chain and Complex Operation", () =>{
    beforeEach(() => {
        cy.visit("http://127.0.0.1:5501/");
    });

    it("Should calculate 3 x 4 - 2 and return 10", () =>{
        cy.get("#three").click();
        cy.get("[data-action=multiply]").click();
        cy.get("#four").click();
        cy.get("[data-action=subtract]").click();
        cy.get("#two").click();
        cy.get("[data-action=solve]").click();
        cy.get("#calculator__display").should('have.text', '10');
    });

    it("Should calculate 18 - 7 + 1 ÷ 2", () =>{
        cy.get("#one").click();
        cy.get("#eight").click();
        cy.get("[data-action=subtract]").click();
        cy.get("#seven").click();
        cy.get("[data-action=add]").click();
        cy.get("#one").click();
        cy.get("[data-action=divide]").click();
        cy.get("#two").click();
        cy.get("[data-action=solve]").click();
        cy.get("#calculator__display").should('have.text', '6');
    })
})