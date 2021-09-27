import { Istate } from '../../../core/redux/modelo/GeneralState';
import { MyOrder } from '../containers/MyOrder';
import { connect } from 'react-redux';
import { setOrderAsync } from 'app/core/redux/actions/order/ActionsOrder';

const mapStateToProps = (state: Istate) => {
  return {
    myOrder: state.order.myOrder,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageMyOrder = connect(mapStateToProps)(
  MyOrder
);
