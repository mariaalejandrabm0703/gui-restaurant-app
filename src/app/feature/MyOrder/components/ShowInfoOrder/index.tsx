import * as PropTypes from 'prop-types';
import { IMyOrder, IMyOrderReg } from '../../models/MyOrder';
import React, { useEffect, useState } from 'react';
import { IProduct } from 'app/feature/Home/models/Home';
import { Istate } from 'app/core/redux/modelo/GeneralState';
import { ManageCardProduct } from 'app/shared/components/cardProduct/cardProduct';
import { connect } from 'react-redux';
import { setConfigOrderAsync } from '../../../../core/redux/actions/order/ActionsOrder';
import { MyOrder } from '../../containers/MyOrder';

interface ShowInfoOrderProps {
  myOrder: IMyOrder;
  listProducts: Array<IProduct>;
  setConfigOrderAsync: (orderSet: IMyOrder, orderEdit: IMyOrderReg) => void;
}

const ShowInfoOrder: React.FC<ShowInfoOrderProps> = ({
  myOrder,
  listProducts,
  setConfigOrderAsync,
}) => {
  const [productos, setproductos] = useState([
    { id: 0, desc: '', price: 0, img: '', cantidad: 0 },
  ]);

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
    console.log('editar');
  };

  const handleCancel = () => {
    console.log('cancelar');
    // activo = 0 cero
    const myOrderSet = { ...myOrder, activo: '0' };

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
    console.log('myOrderSet', myOrderSet);
    console.log('myOrderReg', myOrderReg);
    setConfigOrderAsync(myOrderSet, myOrderReg);
  };

  return (
    <div>
      <div className="container d-flex">
        <div className="align-items-end m-2">
          <h5>Información de pedido #{myOrder.id}:</h5>
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
        <p>Estado: {myOrder.activo === '1' ? 'Activo' : 'Cancelado'}</p>
        <p>Precio: ${myOrder.precio} </p>
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
};

const mapStateToProps = (state: Istate) => {
  return {
    listProducts: state.products.listProducts,
  };
};

export default connect(mapStateToProps, { setConfigOrderAsync })(ShowInfoOrder);
