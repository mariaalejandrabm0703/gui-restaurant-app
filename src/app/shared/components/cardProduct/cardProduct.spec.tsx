import '@testing-library/jest-dom';
import { CardProduct } from './cardProduct';
import { IProductOrder } from '../../../feature/Home/models/Home';
import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup} from '@testing-library/react';
import renderer from 'react-test-renderer';

afterEach(cleanup);

it('rederizar el componente CardProduct mostrando boton', () => {
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

it('rederizar el componente CardProduct no mostrando boton', () => {
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
        showAdd={false}
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
