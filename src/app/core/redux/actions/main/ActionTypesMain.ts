import { IErrorToast } from '../../modelo/IStateMain';

export const DEFAULT_STATE = 'DEFAULT_STATE';
export const IS_LOADING = 'CARGANDO_RECURSO';
export const ERROR = 'OBTENIENDO_ERROR';

interface IDefaultState {
  type: typeof DEFAULT_STATE;
  payload: boolean;
}

interface IIsLoadingAction {
  type: typeof IS_LOADING;
  payload: boolean;
}

interface IErrorAction {
  type: typeof ERROR;
  payload: IErrorToast;
}

export type IActionTypesMain = IDefaultState | IIsLoadingAction | IErrorAction;
