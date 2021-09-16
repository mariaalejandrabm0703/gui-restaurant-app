import * as PropTypes from 'prop-types';
import * as React from 'react';
import { BtnEliminarProducto } from '../EliminarProducto';
import { Producto } from '../../models/Producto';
import { Table } from './styles';

export interface ListaProductosProps {
  productos: Array<Producto>;
  onClickEliminarProducto: (productos: Producto) => void;
}

export const ListaProductos: React.FC<ListaProductosProps> = ({
  productos,
  onClickEliminarProducto,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <td>
            <b>Título</b>
          </td>
          <td>
            <b>Fecha creación</b>
          </td>
          <td>
            <b>Eliminar</b>
          </td>
        </tr>
      </thead>
      <tbody>
        {productos.map((producto: Producto) => {
          return (
            <tr key={producto.slug}>
              <td>{producto.title}</td>
              <td>{`${producto.createdAt} `}</td>
              <td>
                <BtnEliminarProducto
                  producto={producto}
                  onEliminar={onClickEliminarProducto}
                ></BtnEliminarProducto>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

ListaProductos.propTypes = {
  productos: PropTypes.array.isRequired,
  onClickEliminarProducto: PropTypes.func.isRequired,
};
