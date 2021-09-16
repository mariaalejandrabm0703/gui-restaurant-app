import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Button } from 'app/shared/components/Button';
import { Producto } from '../../models/Producto';

interface BtnEliminarProductoProps {
  onEliminar: (producto: Producto) => any;
  producto: Producto;
}

export const BtnEliminarProducto: React.FC<BtnEliminarProductoProps> = ({
  onEliminar,
  producto,
}) => {
  const handleEliminar = () => onEliminar(producto);
  return (
    <Button onClick={handleEliminar}>
      <span role="img" aria-labelledby="trash">
        🗑️
      </span>
    </Button>
  );
};

BtnEliminarProducto.propTypes = {
  producto: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  onEliminar: PropTypes.func.isRequired,
};
