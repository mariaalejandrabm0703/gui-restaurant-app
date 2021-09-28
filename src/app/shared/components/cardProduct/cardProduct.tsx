import * as PropTypes from 'prop-types';
import {
  addCountProduct,
  setProducts,
} from '../../../core/redux/actions/cart/ActionsCart';
import { IProductOrder } from 'app/feature/Home/models/Home';
import { Istate } from '../../../core/redux/modelo/GeneralState';
import React from 'react';
import { connect } from 'react-redux';

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

const CardProduct: React.FC<CardProductProps> = ({
  id,
  description,
  price,
  img,
  listProducts,
  addCountProduct,
  setProducts,
  showAdd = true,
}) => {
  const addProduct = () => {
    if (addCountProduct) addCountProduct();
    // contar mismos prods
    const sameProd =
      listProducts && listProducts.filter((prod) => prod.producto === id);
    let quantity: number = 0;
    if (sameProd && sameProd.length > 0) {
      quantity = sameProd && sameProd[0]?.cantidad;
    } else {
      quantity = 0;
    }

    //guardar nuevo prods
    let prods =
      listProducts && listProducts.filter((prod) => prod.producto !== id);
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
      setProducts(prods && prods);
    }
  };

  return (
    <div className="card card-div">
      <img src={img} alt={description} className="img-fluid img-cart"></img>
      <div className="card-body">
        <div className="card-content">
          <p className="card-title">{description}</p>
          <p className="card-text">${price}</p>
        </div>
        {showAdd ? (
          <div className="btn-cart">
            <a type="submit" onClick={addProduct} className="btn btn-warning">
              Agregar <i className="fas fa-shopping-cart"></i>
            </a>
          </div>
        ) : null}
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