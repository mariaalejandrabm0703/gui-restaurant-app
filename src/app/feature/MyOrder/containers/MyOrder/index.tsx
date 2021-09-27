import * as PropTypes from 'prop-types';
import * as React from 'react';
import FindOrder from '../../components/FindOrder/index';
import { IErrorToast } from '../../../../core/redux/modelo/IStateMain';
import { IMyOrder } from '../../models/MyOrder';
import ShowInfoOrder from '../../components/ShowInfoOrder/index';
import ToastError from '../../../../shared/components/ToastError';

interface OrderProps {
  myOrder: IMyOrder;
  isLoading: boolean;
  errorMessage: IErrorToast;
  searchOrderAsync: (id: number) => void;
}

export const MyOrder: React.FC<OrderProps> = ({
  myOrder,
  isLoading,
  errorMessage,
  searchOrderAsync,
}) => {
  return (
    <div className="container">
      <ToastError />
      <h1>Mi pedido</h1>
      <div>
        <FindOrder myOrder={myOrder} searchOrderAsync={searchOrderAsync} />
      </div>

      <div>
        {myOrder.activo !== '' ? (
          <div>
            <ShowInfoOrder myOrder={myOrder} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

MyOrder.propTypes = {
  myOrder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fechaEntrega: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    activo: PropTypes.string.isRequired,
    productosPedidos: PropTypes.array.isRequired,
    cliente: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      identificacion: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      activo: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  searchOrderAsync: PropTypes.func.isRequired,
};
