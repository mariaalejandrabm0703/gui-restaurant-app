import {
  addCountProduct,
  deleteClient,
  deleteCountProduct,
  setClientAsync,
  setModoReg,
  setProducts,
  subtCountProduct,
} from '../../../core/redux/actions/cart/ActionsCart';
import {
  setConfigOrderAsync,
  setOrderAsync,
} from '../../../core/redux/actions/order/ActionsOrder';
import { Cart } from '../containers/Order/index';
import { Istate } from 'app/core/redux/modelo/GeneralState';
import { connect } from 'react-redux';


const mapStateToProps = (state: Istate) => {
  return {
    listProducts: state.cart.listProductsCart,
    listProductMenu: state.products.listProducts,
    client: state.cart.client,
    modo: state.cart.modo,
    myOrder: state.order.myOrder,
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
  setModoReg,
  setConfigOrderAsync,
})(Cart);
