import * as PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { IMyOrder } from '../../models/MyOrder';

interface ShowInfoOrderProps {
  myOrder: IMyOrder;
}

const ShowInfoOrder: React.FC<ShowInfoOrderProps> = ({ myOrder }) => {
  const [cliente, setCliente] = useState({
    id: 0,
    nombre: '',
    identificacion: '',
    telefono: '',
    email: '',
    activo: '',
  });

  useEffect(() => {
    const c = {
      id: myOrder.cliente.id,
      nombre: '',
      identificacion: '',
      telefono: '',
      email: '',
      activo: '',
    };
    setCliente(c);
  }, [myOrder]);
  return (
    <div>
      <h5>Información de pedido #{myOrder.id}:</h5>
      <div>
        <p>Estado: {myOrder.activo === '1' ? 'Activo' : 'Cancelado'}</p>
        <p>Precio: ${myOrder.precio} </p>
        <p>Fecha de entrega: {myOrder.fechaEntrega} </p>
        <p>{cliente.id}</p>
      </div>
      <div>
        <p>lista de productos</p>
      </div>
    </div>
  );
};
ShowInfoOrder.propTypes = {
  myOrder: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fechaEntrega: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    activo: PropTypes.string.isRequired,
    productosPedidos: PropTypes.array.isRequired,
    cliente: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      identificacion: PropTypes.string.isRequired,
      telefono: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      activo: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ShowInfoOrder;
