import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IProduct, IProductOrder, IRanking } from '../../models/Home';
import { IErrorToast } from 'app/core/redux/modelo/IStateMain';
import ToastError from '../../../../shared/components/ToastError';

interface HomeProps {
  listProducts: Array<IProduct>;
  listRanking: Array<IRanking>;
  listProductsCart: Array<IProductOrder>;
  isLoading: boolean;
  errorMessage: IErrorToast;
  getAllProducts: () => void;
  getProductsRanking: () => void;
}

export const Home: React.FC<HomeProps> = ({
    listProducts,
    listRanking,
    listProductsCart,
    isLoading,
    errorMessage,
    getAllProducts,
    getProductsRanking
}) => {
  React.useEffect(() => {
    if (listProducts && listProducts.length === 0 && errorMessage.message === '') {
      getAllProducts();
    }

  }, [listProducts, getAllProducts, errorMessage]);
 
  React.useEffect(() => {
    if (listRanking && listRanking.length === 0 && errorMessage.message === '') {
      getProductsRanking();
    }
  }, [listRanking, getProductsRanking]);
  return (
    <div className="container">
      <ToastError />
      <h1>Home</h1>
      <p>{listProducts.length}</p>
      <p>{listRanking.length}</p>
    </div>
  );
};

Home.propTypes = {
    listProducts: PropTypes.array.isRequired,
    listRanking: PropTypes.array.isRequired,
    listProductsCart: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    getAllProducts: PropTypes.func.isRequired,
    getProductsRanking: PropTypes.func.isRequired,
    errorMessage: PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
  };
