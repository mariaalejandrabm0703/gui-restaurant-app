import {
  addCountProduct,
  deleteClient,
  deleteCountProduct,
  setClientAsync,
  setProducts,
  subtCountProduct,
} from '../../../core/redux/actions/cart/ActionsCart';
import { Cart } from '../containers/Order/index';
import { Istate } from 'app/core/redux/modelo/GeneralState';
import { connect } from 'react-redux';
import {setOrderAsync} from '../../../core/redux/actions/order/ActionsOrder';

const mapStateToProps = (state: Istate) => {
  return {
    listProducts: state.cart.listProductsCart,
    listProductMenu: state.products.listProducts,
    client: state.cart.client,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageCart = connect(mapStateToProps, {
  setClientAsync,
  addCountProduct,
  subtCountProduct,
  setProducts,
  setOrderAsync,
  deleteCountProduct,
  deleteClient,
})(Cart);
