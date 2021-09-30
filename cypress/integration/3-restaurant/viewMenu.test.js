/* eslint-disable no-undef */

describe('Prueba de ver el menú y los platos', () => {
    it('Cypres funciona', () => {
      expect(true).to.equal(true);
    });

    it('Debe ver el menú del restaurante.', () => {
        cy.visit('http://localhost:3000');
        cy.get(':nth-child(3) > .sc-AxmLO > .sc-Axmtr').click();
        cy.get('h1').contains('Menú');
        cy.get(':nth-child(1) > .row-cards > :nth-child(1) > .card-body > .row > .card-info').contains('Ceviche');
        cy.get(':nth-child(1) > .row-cards > :nth-child(1) > .card-body > .row > :nth-child(2) > .btn-cart > .btn').click();
        cy.get('.cart-display > p').contains(1);
    });
});