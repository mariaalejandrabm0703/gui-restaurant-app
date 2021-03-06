import * as PropTypes from 'prop-types';
import {
  addCountProduct,
  setProducts,
} from '../../../core/redux/actions/cart/ActionsCart';
import { IProductOrder } from 'app/feature/Home/models/Home';
import { Istate } from '../../../core/redux/modelo/GeneralState';
import React from 'react';
import ToastError from '../ToastError';
import { connect } from 'react-redux';
import { currencyFormat } from 'app/shared/utils/utils';
import { toast } from 'react-toastify';

interface CardProductProps {
  id: number;
  description: string;
  price: number;
  img: string;
  listProducts?: Array<IProductOrder>;
  addCountProduct?: () => void;
  setProducts?: (products: Array<IProductOrder>) => void;
  showAdd: boolean;
}

export const CardProduct: React.FC<CardProductProps> = ({
  id,
  description,
  price,
  img,
  listProducts,
  addCountProduct,
  setProducts,
  showAdd,
}) => {
  const addProduct = () => {
    if (addCountProduct) addCountProduct();
    toast.success('Se ha agregar un producto al carrito.', {autoClose:3000});
    // contar mismos prods
    const sameProd =
      listProducts && listProducts.filter((item) => item.producto === id);
    let quantity: number = 0;
    if (sameProd && sameProd.length > 0) {
      quantity = sameProd && sameProd[0]?.cantidad;
    }

    //guardar nuevo prods
    let prods =
      listProducts && listProducts.filter((item) => item.producto !== id);
    const prod: IProductOrder = {
      producto: id,
      cantidad: quantity + 1,
      precio: price,
    };
    if (prods && prods.length > 0) {
      prods = [...prods, prod];
    } else {
      prods = [prod];
    }
    if (setProducts) {
      setProducts(prods);
    }
  };

  return (
    <div className="card card-div">
      {/* <ToastError /> */}
      <img src={img} alt={description} className="img-fluid img-cart"></img>
      <div className="card-body d-flex">
        <div className="row">
          <div className="col-12 card-info">
            <p className="card-title">{description}</p>
            <p className="card-text">{currencyFormat(price)}</p>
          </div>
          {showAdd ? (
            <div className="col-12">
              <div className="btn-cart card-buton">
                <a
                  type="submit"
                  onClick={addProduct}
                  className="btn btn-warning card-buton-item"
                >
                  Agregar <i className="fas fa-shopping-cart"></i>
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

CardProduct.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  listProducts: PropTypes.array,
  addCountProduct: PropTypes.func,
  setProducts: PropTypes.func,
  showAdd: PropTypes.bool.isRequired,
};

const mapStateToProps = (state: Istate) => {
  return {
    count: state.cart.count,
    listProducts: state.cart.listProductsCart,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageCardProduct = connect(mapStateToProps, {
  addCountProduct,
  setProducts,
})(CardProduct);
