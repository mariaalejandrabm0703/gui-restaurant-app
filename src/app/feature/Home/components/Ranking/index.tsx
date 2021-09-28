import * as PropTypes from 'prop-types';
import { IRanking } from '../../models/Home';
import React from 'react';

interface RankingProductsProps {
  listRanking: Array<IRanking>;
}

const RankingProducts: React.FC<RankingProductsProps> = ({ listRanking }) => {
  return (
    <div>
      <div>
        <table className="table table-striped table-sm">
          <thead className="thead-dark">
            <tr className="bg-warning">
              <th scope="col">#</th>
              <th scope="col">Producto</th>
              <th scope="col">Categoría</th>
              <th scope="col">Precio</th>
              <th scope="col">Vendidos</th>
            </tr>
          </thead>
          <tbody>
            {listRanking &&
              listRanking.length > 0 &&
              listRanking.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.descripcion}</td>
                    <td>{item.categoria}</td>
                    <td> ${item.precio}</td>
                    <td>{item.cantidad}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

RankingProducts.propTypes = {
  listRanking: PropTypes.array.isRequired,
};
export default RankingProducts;
