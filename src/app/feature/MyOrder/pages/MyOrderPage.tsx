import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import {ManageMyOrder} from '../hoc/ManageMyOrder';
import { RouteComponentProps } from 'react-router-dom';

const MyOrderPage: React.FC<RouteComponentProps> = () => (
  <Layout title="MyOrder" description="Mi pedido">
    <ManageMyOrder>Hola MyOrderPage</ManageMyOrder>    
  </Layout>
);

MyOrderPage.displayName = 'MyOrderPage';

export default MyOrderPage;
