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
  // React.useEffect(() => {
  //   if (myOrder && errorMessage.message === '') {
  //     setOrderAsync(1);
  //   }
  // }, [myOrder]);

  return (
    <div className="container">
      <ToastError />
      <h1>Mi pedido</h1>
    </div>
  );
};
