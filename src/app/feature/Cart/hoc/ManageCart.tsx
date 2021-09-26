import { Cart } from '../containers/Order/index';
import { Istate } from 'app/core/redux/modelo/GeneralState';
import { connect } from 'react-redux';
import { setClientAsync } from '../../../core/redux/actions/cart/ActionsCart';

const mapStateToProps = (state: Istate) => {
  return {
    listProducts: state.cart.listProductsCart,
    client: state.cart.client,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageCart = connect(mapStateToProps, { setClientAsync })(Cart);
