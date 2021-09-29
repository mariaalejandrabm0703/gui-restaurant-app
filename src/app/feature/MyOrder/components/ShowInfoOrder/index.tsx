import * as PropTypes from 'prop-types';
import { IMyOrder, IMyOrderReg } from '../../models/MyOrder';
import React, { useEffect, useState } from 'react';
import {
  setClient,
  setCountProduct,
  setModoEdit,
  setProducts,
} from '../../../../core/redux/actions/cart/ActionsCart';
import {
  setConfigOrderAsync,
  setOrder,
} from '../../../../core/redux/actions/order/ActionsOrder';
import { IClient } from 'app/feature/Cart/models/Cart';
import { IProduct } from 'app/feature/Home/models/Home';
import { IProductOrder } from '../../../Home/models/Home';
import { Istate } from 'app/core/redux/modelo/GeneralState';
import { ManageCardProduct } from 'app/shared/components/cardProduct/cardProduct';
import { connect } from 'react-redux';
import { currencyFormat } from 'app/shared/utils/utils';
import { useHistory } from 'react-router';

interface ShowInfoOrderProps {
  myOrder: IMyOrder;
  listProducts: Array<IProduct>;
  setConfigOrderAsync: (id: number, orderEdit: IMyOrderReg) => void;
  setClient: (client: IClient) => void;
  setCountProduct: (count: number) => void;
  setProducts: (products: Array<IProductOrder>) => void;
  setOrder: (pedido: IMyOrder) => void;
  setModoEdit: () => void;
}

const ShowInfoOrder: React.FC<ShowInfoOrderProps> = ({
  myOrder,
  listProducts,
  setConfigOrderAsync,
  setClient,
  setCountProduct,
  setProducts,
  setOrder,
  setModoEdit,
}) => {
  const [productos, setproductos] = useState([
    { id: 0, desc: '', price: 0, img: '', cantidad: 0 },
  ]);

  const history = useHistory();

  useEffect(() => {
    const newProducts = [];
    for (const p of myOrder.pedidosProductos) {
      const newProds = listProducts.filter((item) => item.id === p.producto.id);
      if (newProds.length > 0) {
        newProducts.push({
          id: p.id,
          desc: newProds[0].descripcion,
          price: p.precio,
          img: newProds[0].img,
          cantidad: p.cantidad,
        });
      }
    }
    setproductos(newProducts);
  }, [myOrder]);

  const handleSet = () => {
    const productsOrderCart = Array<IProductOrder>();
    let cantidad: number = 0;
    for (const item of myOrder.pedidosProductos) {
      cantidad = cantidad + item.cantidad;
    }
    setCountProduct(cantidad);

    for (const item of myOrder.pedidosProductos) {
      productsOrderCart.push({
        producto: item.producto.id,
        precio: item.precio,
        cantidad: item.cantidad,
      });
    }
    setProducts(productsOrderCart);

    const client: IClient = myOrder.cliente;
    setClient(client);
    // borrar store myOrder
    setModoEdit();
    history.push('/cart');
  };

  const handleCancel = () => {

    const productosOrder = myOrder.pedidosProductos.map((item) => {
      return {
        producto: item.producto.id,
        precio: item.cantidad * item.producto.precio,
        cantidad: item.cantidad,
      };
    });
    const myOrderReg: IMyOrderReg = {
      fechaEntrega: myOrder.fechaEntrega,
      precio: myOrder.precio,
      activo: '0',
      cliente: myOrder.cliente.id,
      productos: productosOrder,
    };
    setConfigOrderAsync(myOrder.id, myOrderReg);
  };

  return (
    <div>
      <div className="container d-flex">
        <div className="align-items-end d-flex">
          <h5>Información de pedido: </h5> <h5 className="color-blue-text">#{myOrder.id}</h5>
        </div>
        <div className="align-items-center">
          <a type="submit" onClick={handleCancel} className="btn btn-link">
            Cancelar
          </a>
        </div>
        <div className="align-items-center">
          <a type="submit" onClick={handleSet} className="btn btn-link">
            Editar
          </a>
        </div>
      </div>
      <div>
        <p className="d-flex">Estado:{myOrder.activo === '1' ? <p className="activo"> Activo</p> : <p className="cancelado">  Cancelado</p>}</p>
        <p>Precio: {currencyFormat(myOrder.precio)} </p>
        <p>Fecha de entrega: {myOrder.fechaEntrega} </p>
      </div>
      <div>
        <p>Cliente: #{myOrder.cliente.identificacion}</p>
        <p>Nombre: {myOrder.cliente.nombre}</p>
      </div>
      <div>
        <p>Productos:</p>
        <div className="container d-flex row-cards">
          {productos.map((product) =>
            product.desc != '' ? (
              <div key={product.id} className="m-3">
                <ManageCardProduct
                  key={product.id}
                  id={product.id}
                  description={product.desc}
                  price={product.price}
                  img={product.img}
                  showAdd={false}
                />
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};
ShowInfoOrder.propTypes = {
  listProducts: PropTypes.array.isRequired,
  myOrder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fechaEntrega: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    activo: PropTypes.string.isRequired,
    pedidosProductos: PropTypes.array.isRequired,
    cliente: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      identificacion: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      activo: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  setConfigOrderAsync: PropTypes.func.isRequired,
  setClient: PropTypes.func.isRequired,
  setCountProduct: PropTypes.func.isRequired,
  setProducts: PropTypes.func.isRequired,
  setOrder: PropTypes.func.isRequired,
  setModoEdit: PropTypes.func.isRequired,
};

const mapStateToProps = (state: Istate) => {
  return {
    listProducts: state.products.listProducts,
  };
};

export default connect(mapStateToProps, {
  setConfigOrderAsync,
  setClient,
  setCountProduct,
  setProducts,
  setOrder,
  setModoEdit,
})(ShowInfoOrder);
