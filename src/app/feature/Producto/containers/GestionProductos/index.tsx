import * as PropTypes from 'prop-types';
import * as React from 'react';
import { DivContainer, DivRow } from './styles';
import { FormCrearProducto } from '../../components/FormCrearProducto';
import { ListaProductos } from '../../components/ListarProductos';
import { PaginadorProductos } from '../../components/PaginadorProductos';
import { Producto } from '../../models/Producto';
import { useEffect } from 'react';

interface GestionProductosProps {
  productos: Array<Producto>;
  listarProductos: (numeroPagina: number) => void;
  agregarNuevoProducto: (productos: Producto) => void;
  eliminarProducto: (productos: Producto) => void;
  cantidadTotalProducto: number;
}

export const GestionProductos: React.FC<GestionProductosProps> = ({
  agregarNuevoProducto,
  productos,
  listarProductos,
  eliminarProducto,
  cantidadTotalProducto,
}) => {
  useEffect(() => {
    listarProductos(0);
  }, [listarProductos]);
  return (
    <DivContainer>
      <DivRow>
        <FormCrearProducto
          onSubmit={agregarNuevoProducto}
          formTitle="Crear producto"
        />
      </DivRow>
      <DivRow>
        <ListaProductos
          productos={productos}
          onClickEliminarProducto={eliminarProducto}
        />
        <PaginadorProductos
          cantidadTotalProductos={cantidadTotalProducto}
          onClickCambiarPagina={listarProductos}
        />
      </DivRow>
    </DivContainer>
  );
};

GestionProductos.propTypes = {
  productos: PropTypes.array.isRequired,
  listarProductos: PropTypes.func.isRequired,
  agregarNuevoProducto: PropTypes.func.isRequired,
  eliminarProducto: PropTypes.func.isRequired,
  cantidadTotalProducto: PropTypes.number.isRequired,
};
