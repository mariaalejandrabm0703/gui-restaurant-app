import { IErrorToast } from '../../modelo/IStateMain';

export const DEFAULT_STATE = '[MAIN] DEFAULT_STATE';
export const IS_LOADING = '[MAIN] CARGANDO_RECURSO';
export const ERROR = '[MAIN] OBTENIENDO_ERROR';

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
