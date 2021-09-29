import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import ToastError from './index';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';



afterEach(cleanup);

it('rederizar el componente ToastError sin errores', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ToastError />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('Compara snapshot del componente Loading en modo lista', () => {
  const element = renderer
    .create(
      <BrowserRouter>
        <ToastError />
      </BrowserRouter>
    )
    .toJSON();
  expect(element).toMatchSnapshot();
});
