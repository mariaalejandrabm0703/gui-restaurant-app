import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IErrorToast } from '../../../../core/redux/modelo/IStateMain';
import { IMyOrder } from '../../models/MyOrder';
import ToastError from '../../../../shared/components/ToastError';
import {setOrderAsync} from '../../../../core/redux/actions/order/ActionsOrder';

interface OrderProps {
  myOrder: IMyOrder;
  isLoading: boolean;
  errorMessage: IErrorToast;
}

export const MyOrder: React.FC<OrderProps> = ({
  myOrder,
  isLoading,
   errorMessage,
}) => {
  React.useEffect(() => {
  console.log(myOrder);
  }, [myOrder]);


  React.useEffect(() => {
    setOrderAsync(1);
    }, []);

  return (
    <>
      <ToastError />
      <h1>Hola3</h1>
    </>
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
  };
