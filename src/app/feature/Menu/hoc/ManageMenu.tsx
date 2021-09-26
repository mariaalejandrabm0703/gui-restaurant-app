import { Istate } from 'app/core/redux/modelo/GeneralState';
import { Menu } from '../containers/Menu';
import { connect } from 'react-redux';
import { setProductsAsync } from '../../../core/redux/actions/products/ActionsProducts';

const mapStateToProps = (state: Istate) => {
  return {
    listProducts: state.products.listProducts,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageMenu = connect(mapStateToProps, {
  getAllProducts: setProductsAsync
})(Menu);

