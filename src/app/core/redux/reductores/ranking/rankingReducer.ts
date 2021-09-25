import {
  IActionTypesRanking,
  SET_PRODUCTS,
} from '../../actions/ranking/ActionTypesRanking';
import { IRanking } from 'app/feature/Home/models/Home';
import { IStateRanking } from '../../modelo/IStateRanking';

const initialState: IStateRanking = {
  listRanking: Array<IRanking>(),
};

export default function (
  state = initialState,
  action: IActionTypesRanking
): IStateRanking {
  switch (action.type) {
    case SET_PRODUCTS: {
      const prods = action.payload;
      return {
        ...state,
        listRanking: prods,
      };
    }
    default:
      return state;
  }
}
