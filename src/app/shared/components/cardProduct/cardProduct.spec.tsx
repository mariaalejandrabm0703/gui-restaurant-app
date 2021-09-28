import '@testing-library/jest-dom';

import { cleanup, render, wait } from '@testing-library/react';
import { mount, shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { IProductOrder } from '../../../feature/Home/models/Home';
import { CardProduct } from './cardProduct';

afterEach(cleanup);

it('rederizar el componente CardProduct', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <CardProduct
      id={1}
      description={'producto prueba'}
      price={500}
      img={
        'https://cdns.iconmonstr.com/wp-content/assets/preview/2019/240/iconmonstr-product-3.png'
      }
      listProducts={Array<IProductOrder>()}
      addCountProduct={() => null}
      setProducts={() => null}
      showAdd={true}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('Compara snapshot del componente CardProduct', () => {
    const element = renderer
      .create(
        <CardProduct
        id={1}
        description={'producto prueba'}
        price={500}
        img={
          'https://cdns.iconmonstr.com/wp-content/assets/preview/2019/240/iconmonstr-product-3.png'
        }
        listProducts={Array<IProductOrder>()}
        addCountProduct={() => null}
        setProducts={() => null}
        showAdd={true}
        />
      )
      .toJSON();
    expect(element).toMatchSnapshot();
  });
