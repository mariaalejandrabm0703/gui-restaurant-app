import * as PropTypes from 'prop-types';
import * as React from 'react';

interface PaginadorProductosProps {
  cantidadTotalProductos: number;
  onClickCambiarPagina: (numeroPagina: number) => void;
}

const PRODUCTOS_VISIBLES_POR_PAGINA = 10;

export const PaginadorProductos: React.FC<PaginadorProductosProps> = ({
  onClickCambiarPagina,
  cantidadTotalProductos,
}) => {
  if (cantidadTotalProductos <= PRODUCTOS_VISIBLES_POR_PAGINA) {
    return null;
  }

  const rango = Array.from(
    Array(
      Math.ceil(cantidadTotalProductos / PRODUCTOS_VISIBLES_POR_PAGINA)
    ).keys()
  );

  return (
    <nav>
      {rango.map((index) => {
        return (
          <button
            onClick={() => onClickCambiarPagina(index)}
            key={index.toString()}
          >
            {index + 1}
          </button>
        );
      })}
    </nav>
  );
};

PaginadorProductos.propTypes = {
  cantidadTotalProductos: PropTypes.number.isRequired,
  onClickCambiarPagina: PropTypes.func.isRequired,
};
