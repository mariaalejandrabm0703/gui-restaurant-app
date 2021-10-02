import {
  addCountProduct,
  defaultState,
  deleteClient,
  deleteCountProduct,
  setClient,
  setCountProduct,
  setModoEdit,
  setModoReg,
  setProducts,
  subtCountProduct,
} from '../../actions/cart/ActionsCart';
import { IProductOrder } from '../../../../feature/Home/models/Home';
import { IStateCart } from '../../modelo/IStateCart';
import cartReducer from './cartReducer';
import { productOrderInfor } from '../../../../shared/utils/data';

describe('Reductor de Cart', () => {
  const listProductsCart: Array<IProductOrder> = [productOrderInfor];
  const client = {
    id: 96,
    nombre: 'Maria',
    identificacion: '1090495415',
    telefono: '3042912566',
    email: 'maria@maria.com',
    activo: '1',
  };
  const modo = 'registry';

  it('debería retornar el estado por defecto', () => {
    const initialState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const newState = cartReducer(initialState, defaultState(1));
    expect(newState).toStrictEqual(initialState);
  });

  it('debería establecer productos', () => {
    const initialState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const expectedState: IStateCart = {
      count: 0,
      listProductsCart: listProductsCart,
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const newState = cartReducer(initialState, setProducts(listProductsCart));
    expect(newState).toStrictEqual(expectedState);
  });

  it('debería establecer un contador más', () => {
    const initialState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const expectedState: IStateCart = {
      count: 1,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const newState = cartReducer(initialState, addCountProduct());
    expect(newState).toStrictEqual(expectedState);
  });

  it('debería establecer un contador menos', () => {
    const initialState: IStateCart = {
      count: 1,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const expectedState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const newState = cartReducer(initialState, subtCountProduct());
    expect(newState).toStrictEqual(expectedState);
  });

  it('debería establecer un contador en cero', () => {
    const initialState: IStateCart = {
      count: 10,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const expectedState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const newState = cartReducer(initialState, deleteCountProduct());
    expect(newState).toStrictEqual(expectedState);
  });

  it('debería establecer un contador en el valor indicado', () => {
    const initialState: IStateCart = {
      count: 10,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const expectedState: IStateCart = {
      count: 15,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const newState = cartReducer(initialState, setCountProduct(15));
    expect(newState).toStrictEqual(expectedState);
  });

  it('debería establecer un cliente', () => {
    const initialState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const expectedState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: client,
      modo: 'registry',
    };

    const newState = cartReducer(initialState, setClient(client));
    expect(newState).toStrictEqual(expectedState);
  });

  it('debería eliminar un cliente', () => {
    const initialState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: client,
      modo: 'registry',
    };

    const expectedState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const newState = cartReducer(initialState, deleteClient());
    expect(newState).toStrictEqual(expectedState);
  });

  it('debería establecer el modo ModoEdit', () => {
    const initialState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const expectedState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'edit',
    };

    const newState = cartReducer(initialState, setModoEdit());
    expect(newState).toStrictEqual(expectedState);
  });

  it('debería establecer el modo ModoReg', () => {
    const initialState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'edit',
    };

    const expectedState: IStateCart = {
      count: 0,
      listProductsCart: Array<IProductOrder>(),
      client: {
        id: 0,
        nombre: '',
        identificacion: '',
        telefono: '',
        email: '',
        activo: '',
      },
      modo: 'registry',
    };

    const newState = cartReducer(initialState, setModoReg());
    expect(newState).toStrictEqual(expectedState);
  });
});
