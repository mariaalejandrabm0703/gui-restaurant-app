import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ManageCart } from '../hoc/ManageCart';
import { RouteComponentProps } from 'react-router-dom';

const CartPage: React.FC<RouteComponentProps> = () => (
  <Layout title="Carrito" description="Carrito del cliente.">
    <ManageCart>Hola9</ManageCart>
  </Layout>
);

CartPage.displayName = 'CartPage';

export default CartPage;
