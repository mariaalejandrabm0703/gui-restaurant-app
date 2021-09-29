import { isLoading, setError } from '../../actions/cart/ActionsCart';
import { IStateMain } from '../../modelo/IStateMain';
import mainReducer from './mainReducer';

describe('Reductor de Main', () => {
  it('debería mostrar el indicador de carga', () => {
    const initialState: IStateMain = {
      isLoading: false,
      errorMessage: { message: '', type: '' },
    };
    const expectedState: IStateMain = {
      ...initialState,
      isLoading: true,
    };

    const newState = mainReducer(initialState, isLoading(true));
    expect(newState).toStrictEqual(expectedState);
  });
  it('debería mostrar mensaje de error', () => {
    const initialState: IStateMain = {
      isLoading: false,
      errorMessage: { message: '', type: '' },
    };
    const newError = { message: 'Existe error', type: 'cart' };
    const expectedState: IStateMain = {
      ...initialState,
      errorMessage: newError,
    };

    const newState = mainReducer(initialState, setError(newError));
    expect(newState).toStrictEqual(expectedState);
  });
});
