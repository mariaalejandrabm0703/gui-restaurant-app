import * as PropTypes from 'prop-types';
import { IProduct } from '../../../Home/models/Home';
import {ManageCardProduct} from '../../../../shared/components/cardProduct/cardProduct';
import React from 'react';

interface CategoryProps {
  category: string;
  products: Array<IProduct>;
}

const Category: React.FC<CategoryProps> = ({ category, products }) => {
  return (
    <div>
      <h5>{category}:</h5>
      <div className="row-cards">
        {products
          .filter((item) => item.categoria === category)
          .map((product, index) => (
            <ManageCardProduct
              key={index}
              id={product.id}
              description={product.descripcion}
              price={product.precio}
              img={product.img}
            />
          ))}
      </div>
    </div>
  );
};
Category.propTypes = {
  category: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default Category;
