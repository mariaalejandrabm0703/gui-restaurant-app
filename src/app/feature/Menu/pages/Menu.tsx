import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ManageMenu } from '../hoc/ManageMenu';
import { RouteComponentProps } from 'react-router-dom';

const MenuPage: React.FC<RouteComponentProps> = () => (
  <Layout title="Menú" description="Menú del restaurante.">
    <ManageMenu>Hola4</ManageMenu>
  </Layout>
);

MenuPage.displayName = 'MenuPage';

export default MenuPage;
