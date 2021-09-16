import * as React from 'react';
import { RenderResult, fireEvent, render, wait } from '@testing-library/react';
import { SinonStub, stub } from 'sinon';
import { FormCrearProducto } from './';
import { setTextEvent } from 'app/shared/utils/test';

describe('FormCrearProducto test', () => {
  let componentWrapper: RenderResult;
  let componentProps: React.ComponentProps<typeof FormCrearProducto> & {
    onSubmit: SinonStub;
  };

  beforeEach(() => {
    componentProps = {
      formTitle: 'Form test',
      onSubmit: stub(),
    };
    componentWrapper = render(<FormCrearProducto {...componentProps} />);
  });

  it('should match snapshot', () => {
    expect(componentWrapper.container).toMatchSnapshot();
  });

  it('should fail on submit all fields missing', async () => {
    const elem = componentWrapper.container;
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(3);
    expect(spans[0].textContent).toBe('El campo title es requerido.');
    expect(spans[1].textContent).toBe('El campo slug es requerido.');
    expect(spans[2].textContent).toBe('El campo body es requerido.');
  });

  it('should fail on submit two fields missing', async () => {
    const elem = componentWrapper.container;
    const title = elem.querySelector('input[name="title"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Lorem'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(2);
    expect(spans[0].textContent).toBe('El campo slug es requerido.');
    expect(spans[1].textContent).toBe('El campo body es requerido.');
  });

  it('should fail on submit two fields missing', async () => {
    const elem = componentWrapper.container;

    const title = elem.querySelector('input[name="title"]');
    const slug = elem.querySelector('input[name="slug"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Lorem'));
    });
    await wait(() => {
      slug && fireEvent.change(slug, setTextEvent('slug', 'Ipsum'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });
    const spans = elem.querySelectorAll('span');
    expect(spans.length).toBe(1);
    expect(spans[0].textContent).toBe('El campo body es requerido.');
  });

  it('should submit', async () => {
    const elem = componentWrapper.container;

    const title = elem.querySelector('input[name="title"]');
    const slug = elem.querySelector('input[name="slug"]');
    const body = elem.querySelector('input[name="body"]');
    const submitButton = elem.querySelector('button[type="submit"]');

    await wait(() => {
      title && fireEvent.change(title, setTextEvent('title', 'Lorem'));
    });
    await wait(() => {
      slug && fireEvent.change(slug, setTextEvent('slug', 'Ipsum'));
    });
    await wait(() => {
      body && fireEvent.change(body, setTextEvent('body', 'Dolor'));
    });

    await wait(() => {
      submitButton && fireEvent.click(submitButton);
    });

    const formSubmitted = componentProps.onSubmit.firstCall.args[0];

    expect(formSubmitted.title).toBe('Lorem');
    expect(formSubmitted.slug).toBe('Ipsum');
    expect(formSubmitted.body).toBe('Dolor');
  });
});
