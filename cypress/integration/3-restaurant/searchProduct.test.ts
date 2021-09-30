/* eslint-disable no-undef */

describe('Prueba de buscar producto Home', () => {
  it('Cypres funciona', () => {
    expect(true).to.equal(true);
  });

  it('Debe buscar ensaladas', () => {
    cy.visit('http://localhost:3000');
    cy.get(':nth-child(1) > .form-control').type('Ensalada');
    cy.get('.col-md-3 > .btn').click();
    cy.get(
      ':nth-child(1) > .card-body > .row > .card-info > .card-title'
    ).contains('Ensalada');
  });

  it('Debe buscar plato con precio hasta $10', () => {
    cy.visit('http://localhost:3000');
    cy.get(':nth-child(3) > .form-control').type(10);
    cy.get('.col-md-3 > .btn').click();
    cy.get(
      ':nth-child(1) > .card-body > .row > .card-info > .card-text'
    ).contains('10');
  });

  it('Debe buscar plato con Bebidas y $10', () => {
    cy.visit('http://localhost:3000');
    cy.get(':nth-child(2) > .form-control').select('Bebidas');
    cy.get(':nth-child(3) > .form-control').type(10);
    cy.get('.col-md-3 > .btn').click();
    cy.get('.card-title').contains('Limonada');
  });
});
