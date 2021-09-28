import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IFilters, IProduct, IProductOrder, IRanking } from '../../models/Home';
import FindProducts from '../../components/FindProducts/index';
import { IErrorToast } from 'app/core/redux/modelo/IStateMain';
import { ManageShowProducts } from '../../components/ShowProducts/index';
import RankingProducts from '../../components/Ranking/index';
import ToastError from '../../../../shared/components/ToastError';

interface HomeProps {
  listProducts: Array<IProduct>;
  listRanking: Array<IRanking>;
  listProductsFilter: Array<IProduct>;
  isLoading: boolean;
  errorMessage: IErrorToast;
  getAllProducts: () => void;
  getProductsRanking: () => void;
  setProductFilters: (prods: IProduct[]) => void;
}

export const Home: React.FC<HomeProps> = ({
  listProducts,
  listRanking,
  listProductsFilter,
  isLoading,
  errorMessage,
  getAllProducts,
  getProductsRanking,
  setProductFilters,
}) => {
  React.useEffect(() => {
    if (
      listProducts &&
      listProducts.length === 0 &&
      errorMessage.message === ''
    ) {
      getAllProducts();
    } else {
      if (
        listProductsFilter &&
        listProductsFilter.length === 0 &&
        errorMessage.message === ''
      ) {
        setProductFilters(listProducts);
      }
    }
  }, [listProducts, getAllProducts, errorMessage]);

  React.useEffect(() => {
    if (
      listRanking &&
      listRanking.length === 0 &&
      errorMessage.message === ''
    ) {
      getProductsRanking();
    }
  }, [listRanking, getProductsRanking]);

  const handleSearch = (values: IFilters) => {

    let products: Array<IProduct> = [...listProducts];
    // buscar por descripción
    if (values.description !== '') {
      products = products.filter(
        (item) =>
          values.description &&
          (item.descripcion.toUpperCase() == values.description.toUpperCase())
      );
    }

    // buscar por categoría
    if (values.category !== '') {
      products = products.filter((item) => item.categoria === values.category);
    }

    // buscar por precio
    if (values.price !== 0) {
      products = products.filter((item) => values.price && (item.precio <= values.price));
    }
    setProductFilters(products);
  };

  return (
    <div className="container">
      <ToastError />
      <h1>Home</h1>
      <div className="row m-3">
        <div className="col-6">
          <h5>Busca tu producto:</h5>
          <FindProducts handleSearch={handleSearch} />
        </div>
        <div className="col-6">
          <h5>Elección de los más vendidos:</h5>
          <RankingProducts listRanking={listRanking} />
        </div>
      </div>
      <div className="row m-3">
        <div className="col-12">
          <h5>Tu resutado:</h5>
          <ManageShowProducts />
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {
  listProducts: PropTypes.array.isRequired,
  listRanking: PropTypes.array.isRequired,
  listProductsFilter: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  getAllProducts: PropTypes.func.isRequired,
  getProductsRanking: PropTypes.func.isRequired,
  errorMessage: PropTypes.shape({
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  setProductFilters: PropTypes.func.isRequired,
};
