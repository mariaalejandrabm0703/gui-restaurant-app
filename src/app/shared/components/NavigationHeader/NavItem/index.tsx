import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Istate } from '../../../../core/redux/modelo/GeneralState';
import { Link } from 'app/shared/components/Link';
import { NavItemDiv } from './styles';
import { connect } from 'react-redux';

interface NavItemProps {
  label: string;
  to: string;
  count?: number;
}

export const NavItem: React.FC<NavItemProps> = ({ label, to, count }) => {
  // React.useEffect(() => {
  //   console.log('count ', count);
  // }, []);
  return (
    <NavItemDiv>
      <Link to={to} replace={true}>
        {label === 'Carrito' ? (
          <div className="cart-display">
            <i className="fas fa-shopping-cart"></i>
            <p>({count})</p>
          </div>
        ) : (
          label
        )}
      </Link>
    </NavItemDiv>
  );
};

NavItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  count: PropTypes.number,
};

const mapStateToProps = (state: Istate) => {
  return {
    count: state.cart.count,
    isLoading: state.main.isLoading,
    errorMessage: state.main.errorMessage,
  };
};

export const ManageNavItem = connect(mapStateToProps)(NavItem);
