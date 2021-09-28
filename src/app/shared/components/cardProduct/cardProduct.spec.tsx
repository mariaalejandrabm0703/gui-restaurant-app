import '@testing-library/jest-dom';

import { cleanup, render, wait } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import CardProduct from './cardProduct';

afterEach(cleanup);

it('rederizar el componente CardInformation sin errores en modo detalle', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <CardProduct />,
      div
    );
    ReactDOM.unmountComponentAtNode(div);
  });