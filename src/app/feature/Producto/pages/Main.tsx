import * as React from 'react';
import { Layout } from 'app/shared/components/Layout';
import { ProveedorGestionProductos } from '../hoc/ProveedorGestionProductos';
import { RouteComponentProps } from 'react-router-dom';

const MainPage: React.FC<RouteComponentProps> = () => {
  return (
    <Layout title="Productos" description="Gestión de productos">
      <ProveedorGestionProductos/>
    </Layout>
  );
};

MainPage.displayName = 'HomeMainPage';

export default MainPage;
