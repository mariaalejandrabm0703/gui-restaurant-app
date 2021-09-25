
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IProduct, IRanking } from '../../models/Home';
import { IErrorToast } from 'app/core/redux/modelo/IStateMain';
import ToastError from '../../../../shared/components/ToastError';


interface HomeProps {
  listProducts: Array<IProduct>;
  listRanking: Array<IRanking>;
  listProductsCart: Array<IProduct>;
  isLoading: boolean;
  errorMessage: IErrorToast;
  setProductsAsync: () => void;
}

export const Home: React.FC<HomeProps> = ({
    listProducts,
    listRanking,
    listProductsCart,
    isLoading,
    errorMessage,
    setProductsAsync
}) => {
  
  return (
    <>
      <ToastError />
      <h1>Hola2</h1>
    </>
  );
};

Home.propTypes = {
    listProducts: PropTypes.array.isRequired,
    listRanking: PropTypes.array.isRequired,
    listProductsCart: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setProductsAsync: PropTypes.func.isRequired,
    errorMessage: PropTypes.shape({
      message: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired,
  };
