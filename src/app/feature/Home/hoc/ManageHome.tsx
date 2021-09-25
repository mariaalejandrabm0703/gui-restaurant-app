import { Home } from '../containers/Home';
import { Istate } from 'app/core/redux/modelo/GeneralState';
import { connect } from 'react-redux';
import { setProductsAsync } from '../../../core/redux/actions/products/ActionsProducts';
import { setProductsRanAsync } from 'app/core/redux/actions/ranking/ActionsRanking';

const mapStateToProps = (state: Istate) => {
  return {
    listProducts: state.products.listProducts,
    listRanking: state.ranking.listRanking,
    listProductsCart: state.cart.listProductsCart,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageHome = connect(mapStateToProps, {
  getAllProducts: setProductsAsync,
  getProductsRanking: setProductsRanAsync
})(Home);
