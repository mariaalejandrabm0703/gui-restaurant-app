import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ManageHome } from '../hoc/ManageHome';
import { RouteComponentProps } from 'react-router-dom';

const HomeMainPage: React.FC<RouteComponentProps> = () => (
  <Layout title="Home" description="Home de la aplicación">
    <ManageHome>Hola1</ManageHome>
  </Layout>
);

HomeMainPage.displayName = 'HomeMainPage';

export default HomeMainPage;
