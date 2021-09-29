/* eslint-disable no-undef */
describe('Prueba de Pedido', () => {
  it('Cypres funciona', () => {
    expect(true).to.equal(true);
  });

  it('Debe confirmar un pedido.', () => {
    cy.visit('http://localhost:3000');
    cy.get(':nth-child(1) > .card-body > .row > :nth-child(2) > .btn-cart > .btn').click();
    cy.get(':nth-child(4) > .sc-AxmLO').click();
    cy.get(':nth-child(1) > .form-control').type('Maria');
    cy.get(':nth-child(2) > .form-control').type('1090495415');
    cy.get(':nth-child(3) > .form-control').type('maria@maria.com');
    cy.get(':nth-child(4) > .form-control').type('3042912566');
    cy.get('.d-flex > .btn').click();
    cy.get('.btn-cart > .btn').click();
    cy.get(':nth-child(4) > :nth-child(1) > :nth-child(1) > :nth-child(3) > :nth-child(1)').contains('1090495415');

  });
});
