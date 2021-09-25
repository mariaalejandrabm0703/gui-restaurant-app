import * as React from 'react';
import { HeaderNav } from './styles';
import Logo from 'assets/img/rest.png';
import { NavBrand } from './NavBrand';
import { NavList } from './NavList';

export const NavigationHeader: React.FC = () => {
  const routes = [
    { label: 'Home', url: '/' },
    { label: 'Mi pedido', url: '/myOrder' },
    { label: 'Menú', url: '/menu' },
    { label: 'Carrito', url: '/cart' },
  ];
  return (
    <HeaderNav>
      <NavBrand imgSrc={Logo} text="Restaurant"></NavBrand>
      <NavList items={routes} />
    </HeaderNav>
  );
};
