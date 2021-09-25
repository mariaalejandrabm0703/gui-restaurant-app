import { IMyOrder } from '../../../../feature/MyOrder/models/MyOrder';

export const DEFAULT_STATE = '[ORDER]  DEFAULT_STATE';
export const DELETE_ORDER = '[ORDER] BORRAR_ORDER';
export const SET_ORDER = '[ORDER] SETEAR_ORDER';

interface IDefaultState {
  type: typeof DEFAULT_STATE;
  payload: IMyOrder;
}

interface ISetOrderAction {
  type: typeof SET_ORDER;
  payload: IMyOrder;
}

interface IDeleteOrderAction {
  type: typeof DELETE_ORDER;
  payload: IMyOrder;
}

export type IActionTypesOrder =
  | IDefaultState
  | ISetOrderAction
  | IDeleteOrderAction
