import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IErrorToast } from '../../../../core/redux/modelo/IStateMain';
import { IMyOrder } from '../../models/MyOrder';
import ToastError from '../../../../shared/components/ToastError';
import {setOrderAsync} from '../../../../core/redux/actions/order/ActionsOrder';
import { useDispatch } from 'react-redux';

interface OrderProps {
  myOrder: IMyOrder;
  isLoading: boolean;
  errorMessage: IErrorToast;
  setOrderAsync:(id: number) => void;
}

export const MyOrder: React.FC<OrderProps> = ({
  myOrder,
  isLoading,
   errorMessage,
   setOrderAsync
}) => {
  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   if (myOrder && errorMessage.message === '') {
  //     dispatch(setOrderAsync(1));
  //   }
  // }, [myOrder]);

  return (
    <div className="container">
      <ToastError />
      <h1>Mi pedido</h1>
    </div>
  );
};

MyOrder.propTypes = {
  myOrder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fechaEntrega: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    activo: PropTypes.string.isRequired,
    pedidosProductos: PropTypes.array.isRequired,
    cliente: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      identificacion: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      activo: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,  
  isLoading: PropTypes.bool.isRequired,
    errorMessage: PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
    setOrderAsync: PropTypes.func.isRequired,
  };
