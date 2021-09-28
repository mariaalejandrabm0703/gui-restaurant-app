import * as PropTypes from 'prop-types';
import { IProduct } from '../../models/Home';
import { Istate } from '../../../../core/redux/modelo/GeneralState';
import { ManageCardProduct } from 'app/shared/components/cardProduct/cardProduct';
import React from 'react';
import { connect } from 'react-redux';

interface ShowProductsProps {
  listProducts: Array<IProduct>;
}

const ShowProducts: React.FC<ShowProductsProps> = ({ listProducts }) => {
  return (
    <div className="">
      <div className="row-cards">
        {listProducts.map((product, index) => (
          <ManageCardProduct
            key={index}
            id={product.id}
            description={product.descripcion}
            price={product.precio}
            img={product.img}
            showAdd={true}
          />
        ))}
      </div>
    </div>
  );
};
ShowProducts.propTypes = {
  listProducts: PropTypes.array.isRequired,
};
const mapStateToProps = (state: Istate) => {
  return {
    listProducts: state.home.listProductsHome,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageShowProducts = connect(mapStateToProps)(ShowProducts);
