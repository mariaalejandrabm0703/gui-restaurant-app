import * as React from 'react';
import { HeaderNav } from './styles';
import Logo from 'assets/img/rest.png';
import { NavBrand } from './NavBrand';
import { NavList } from './NavList';

export const NavigationHeader: React.FC = () => {
  const routes = [
    { label: 'Home', url: '/home' },
    { label: 'Mi pedido', url: '/productos' },
    { label: 'Menú', url: '/home' },
    { label: 'Carrito', url: '/home' },
  ];
  return (
    <HeaderNav>
      <NavBrand imgSrc={Logo} text="Restaurant"></NavBrand>
      <NavList items={routes} />
    </HeaderNav>
  );
};
