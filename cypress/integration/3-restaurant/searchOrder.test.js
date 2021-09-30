/* eslint-disable no-undef */

describe('Prueba de buscar pedido', () => {
    it('Cypres funciona', () => {
      expect(true).to.equal(true);
    });

    it('Debe buscar el pedido #7.', () => {
        cy.visit('http://localhost:3000');
        cy.get(':nth-child(2) > .sc-AxmLO > .sc-Axmtr').click();
        cy.get('.form-control').type(7);
        cy.get('.btn').click();
        cy.get(':nth-child(1) > .card > .card-body > .row > .col-12 > .card-title').contains('Ceviche');
      });

      it('Debe buscar el pedido #39.', () => {
        cy.visit('http://localhost:3000');
        cy.get(':nth-child(2) > .sc-AxmLO > .sc-Axmtr').click();
        cy.get('.form-control').type(39);
        cy.get('.btn').click();
        cy.get(':nth-child(1) > .card > .card-body > .row > .col-12 > .card-title').contains('carroza');
        cy.get(':nth-child(2) > .d-flex').contains('Cancelado');
      });
});