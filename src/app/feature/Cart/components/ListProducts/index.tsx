import * as PropTypes from 'prop-types';
import { IProduct, IProductOrder } from 'app/feature/Home/models/Home';
import CartProduct from '../CartProduct/index';
import React from 'react';

interface ListProdsProps {
  listProducts: Array<IProductOrder>;
  listProductMenu: Array<IProduct>;
  addProduct: (id: number, price: number) => void;
  subtProduct: (id: number, price: number) => void;
}

const ListProds: React.FC<ListProdsProps> = ({
  listProducts,
  listProductMenu,
  addProduct,
  subtProduct,  
}) => {
  return (
    <div>
      <h5>Productos:</h5>
      <div className="cartProduct-div">
        <div className="container">
          <div className="row">
            <div className="col-sm">
              <h6>Producto</h6>
            </div>
            <div className="col-sm">
              <h6>Descripción</h6>
            </div>
            <div className="col-sm">
              <h6>Precio</h6>
            </div>
            <div className="col-sm">
              <h6>Cantidad</h6>
            </div>
            <div className="col-sm">
              <h6>Editar</h6>
            </div>
          </div>
        </div>
      </div>
      <div>
        {listProducts.map((item) => {
          return (
            <CartProduct
              key={item.producto}
              listProductMenu={listProductMenu}
              productOrder={item}
              addProduct={addProduct}
              subtProduct={subtProduct}
            />
          );
        })}
      </div>
    </div>
  );
};

ListProds.propTypes = {
  listProducts: PropTypes.array.isRequired,
  listProductMenu: PropTypes.array.isRequired,
  addProduct: PropTypes.func.isRequired,
  subtProduct: PropTypes.func.isRequired,
};

export default ListProds;
