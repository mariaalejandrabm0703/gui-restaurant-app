import { defaultState, setProducts } from '../../actions/ranking/ActionsRanking';
import { IRanking } from '../../../../feature/Home/models/Home';
import { IStateRanking } from '../../modelo/IStateRanking';
import { rankingInfo } from '../../../../shared/utils/data';
import rankingReducer from './rankingReducer';

describe('Reductor de Ranking', () => {
  const prods: Array<IRanking> = [rankingInfo];

  it('debería retornar el estado por defecto', () => {
    const initialState: IStateRanking = {
      listRanking: Array<IRanking>(),
    };

    const newState = rankingReducer(initialState, defaultState(prods));
    expect(newState).toStrictEqual(initialState);
  });

  it('debería retornar establecer productos más vendidos', () => {
    const initialState: IStateRanking = {
      listRanking: Array<IRanking>(),
    };

    const expectedState: IStateRanking = {
        listRanking: prods
      };

    const newState = rankingReducer(initialState, setProducts(prods));
    expect(newState).toStrictEqual(expectedState);
  });
});
