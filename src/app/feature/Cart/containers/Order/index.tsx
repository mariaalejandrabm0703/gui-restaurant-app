import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IClient } from '../../models/Cart';
import { IErrorToast } from '../../../../core/redux/modelo/IStateMain';
import { IProductOrder } from '../../../Home/models/Home';
import ToastError from '../../../../shared/components/ToastError';


interface CartProps {
  listProducts: Array<IProductOrder>;
  client: IClient,
  isLoading: boolean;
  errorMessage: IErrorToast;
  setClientAsync: (id: string) => void;
}

export const Cart: React.FC<CartProps> = ({
  listProducts,
  client,
  isLoading,
  errorMessage,
  setClientAsync
}) => {
  return (
    <div className="">
      <ToastError />
      <div className="">
        <h1>Mi carrito </h1>
        <h4>Cliente:</h4>
        <hr></hr>
        <h4>Productos:</h4>
        <hr></hr>
      </div>
    </div>
  );
};

Cart.propTypes = {
  listProducts: PropTypes.array.isRequired,
  client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      identificacion: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      activo: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  setClientAsync: PropTypes.func.isRequired,
};
