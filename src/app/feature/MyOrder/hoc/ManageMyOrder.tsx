import { Istate } from '../../../core/redux/modelo/GeneralState';
import { MyOrder } from '../containers/MyOrder';
import { connect } from 'react-redux';
import { searchOrderAsync } from 'app/core/redux/actions/order/ActionsOrder';
import { setProductsAsync } from 'app/core/redux/actions/products/ActionsProducts';

const mapStateToProps = (state: Istate) => {
  return {
    myOrder: state.order.myOrder,
    listProducts: state.products.listProducts,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageMyOrder = connect(mapStateToProps, {searchOrderAsync, setProductsAsync})(
  MyOrder
);
