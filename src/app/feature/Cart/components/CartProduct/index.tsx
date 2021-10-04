import * as PropTypes from 'prop-types';
import { IProduct, IProductOrder } from 'app/feature/Home/models/Home';
import React, { useState } from 'react';
import { currencyFormat } from 'app/shared/utils/utils';

interface CartProductProps {
  productOrder: IProductOrder;
  listProductMenu?: Array<IProduct>;
  addProduct: (id: number, price: number) => void;
  subtProduct: (id: number, price: number) => void;
}

const CartProduct: React.FC<CartProductProps> = ({
  productOrder,
  listProductMenu,
  addProduct,
  subtProduct, 
}) => {
  const [productCart, setProductCart] = useState({
    id: 0,
    descripcion: '',
    precio: 0,
    img: '',
  });

  React.useEffect(() => {
    const productFilter =
      listProductMenu &&
      listProductMenu.filter((item) => item.id === productOrder.producto)[0];

    productFilter &&
      setProductCart({
        id: productFilter.id,
        descripcion: productFilter.descripcion,
        precio: productFilter.precio,
        img: productFilter.img,
      });
  }, []);

  return (
    <div className="cartProduct-div">
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <img
              src={productCart.img}
              alt={productCart.descripcion}
              className="img-fluid img-cartProd"
              id="img-product"
            ></img>
          </div>
          <div className="col-sm">
            <p>{productCart.descripcion}</p>
          </div>
          <div className="col-sm">
            <p>{currencyFormat(productCart.precio * productOrder.cantidad)}</p>
          </div>
          <div className="col-sm">
            <p>{productOrder.cantidad}</p>
          </div>
          <div className="col-sm">
            <div className="cartProduct-div">
              <a type="submit" id="btn-add" onClick={() =>addProduct(productCart.id, productCart.precio)} className="btn btn-warning separateR10">
                <i className="fas fa-plus"></i>
              </a>              
              <a type="submit" id="btn-subt" onClick={() =>subtProduct(productCart.id, productCart.precio)} className="btn btn-warning">
                <i className="fas fa-minus"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CartProduct.propTypes = {
  listProductMenu: PropTypes.array.isRequired,
  productOrder: PropTypes.shape({
    producto: PropTypes.number.isRequired,
    precio: PropTypes.number.isRequired,
    cantidad: PropTypes.number.isRequired,
  }).isRequired,
  addProduct: PropTypes.func.isRequired,
  subtProduct: PropTypes.func.isRequired,
};

export default CartProduct;
