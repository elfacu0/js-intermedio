/// <reference types="Cypress" />

const URL = "http://127.0.0.1:5500/clase-12/exchanges/index.html";

context('Exchange', () => {
    before(() => {
        cy.visit(URL);
    });

    it("test date", () => {
        cy.get(".input").find("#date").type("2019-10-10").click();
        cy.get(".input").find(".input-currency").children().should((e) => {
            if (e.length <= 1) {
                throw new Error("Api is not populating the selector");
            }
        });
    });

    it("test api", () => {
        cy.get(".output").find(".output-currencies").children().should((e) => {
            if (e.length <= 1) {
                throw new Error("Api is not showing the exchanges");
            }
        });
    });

    it("test date change", () => {
        cy.get(".output-currencies").then(e => {
            const oldValues = (e[0].innerText);
            cy.get(".input").find("#date").type("2019-10-11").click().then(b => {
                cy.wait(1000);
                cy.get(".output-currencies").then(b => {
                    if (oldValues == b[0].innerText) {
                        throw new Error("Output currency remains the same when changing date");
                    }
                });
            });
        })
    });

    it("test base change", () => {
        cy.get(".output-currencies").then(e => {
            const oldValues = (e[0].innerText);
            cy.get(".input").find(".input-currency").select("PHP").then(b => {
                cy.wait(1000);
                cy.get(".output-currencies").then(b => {
                    if (oldValues == b[0].innerText) {
                        throw new Error("Output currency remains the same when changing base");
                    }
                });
            });
        })
    });

    it("test date change", () => {
        cy.get(".output-currencies").then(e => {
            const oldValues = (e[0].innerText);
            cy.get(".input").find("#date").type("2019-11-13").click().then(b => {
                cy.wait(2000);
                cy.get(".output-currencies").then(b => {
                    if (oldValues == b[0].innerText) {
                        throw new Error("Output currency remains the same when changing date and base");
                    }
                });
            });
        })
    });

});
