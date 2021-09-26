import * as PropTypes from 'prop-types';
import * as React from 'react';
import Category from '../../components/category/index';
import { IErrorToast } from '../../../../core/redux/modelo/IStateMain';
import { IProduct } from '../../../Home/models/Home';
import ToastError from '../../../../shared/components/ToastError';

interface MenuProps {
  listProducts: Array<IProduct>;
  isLoading: boolean;
  errorMessage: IErrorToast;
  getAllProducts: () => void;
}

export const Menu: React.FC<MenuProps> = ({
  listProducts,
  isLoading,
  errorMessage,
  getAllProducts,
}) => {
  const [categorias, setcategorias] = React.useState([
    'Entrada',
    'Ensaladas',
    'Sopas',
    'Plato principal',
    'Bebidas',
    'Postres',
  ]);

  React.useEffect(() => {
    if (
      listProducts &&
      listProducts.length === 0 &&
      errorMessage.message === ''
    ) {
      getAllProducts();
    }
  }, [listProducts, getAllProducts, errorMessage]);
  return (
    <div className="card">
      <ToastError />
      <h1>Menú</h1>
      <div className="m-2">
        {categorias.map((categoria, index) => (
          <Category key={index} category={categoria} products={listProducts} />
        ))}
      </div>
    </div>
  );
};

Menu.propTypes = {
  listProducts: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  getAllProducts: PropTypes.func.isRequired,
};
