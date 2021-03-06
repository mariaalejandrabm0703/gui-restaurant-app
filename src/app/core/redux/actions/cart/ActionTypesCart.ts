import { IClient } from 'app/feature/Cart/models/Cart';
import { IProductOrder } from '../../../../feature/Home/models/Home';

export const DEFAULT_STATE = '[CART] DEFAULT_STATE';
export const SET_PRODUCTS = '[CART] SETEAR_PRODUCTOS';

export const ADD_COUNT_PRODUCTS = '[CART] SUMAR_CONTAR_PRODUCTOS';
export const SUBT_COUNT_PRODUCTS = '[CART] RESTAR_CONTAR_PRODUCTOS';
export const DELETE_COUNT_PRODUCTS = '[CART] BORRAR_CONTAR_PRODUCTOS';
export const SET_COUNT_PRODUCTS = '[CART] SETEAR_CONTAR_PRODUCTOS';

export const SET_CLIENT = '[CART] SETEAR_CLIENTE';
export const DELETE_CLIENT = '[CART] BORRAR_CLIENTE';

export const MODO_REGISTER = '[CART] REGISTRAR_PEDIDO';
export const MODO_EDIT = '[CART] EDITAR_PEDIDO';

interface IDefaultState {
  type: typeof DEFAULT_STATE;
  payload: number;
}

interface ISetProductsAction {
  type: typeof SET_PRODUCTS;
  payload: IProductOrder[];
}

interface IAddCountAction {
  type: typeof ADD_COUNT_PRODUCTS;
  payload: number;
}

interface ISubtCountAction {
  type: typeof SUBT_COUNT_PRODUCTS;
  payload: number;
}

interface IDeletetCountAction {
  type: typeof DELETE_COUNT_PRODUCTS;
  payload: number;
}

interface ISetCountAction {
  type: typeof SET_COUNT_PRODUCTS;
  payload: number;
}

interface ISetClientAction {
  type: typeof SET_CLIENT;
  payload: IClient;
}

interface IDeleteClientAction {
  type: typeof DELETE_CLIENT;
  payload: IClient;
}

interface ISetModoReg {
  type: typeof MODO_REGISTER;
  payload: string;
}

interface ISetModoEdit {
  type: typeof MODO_EDIT;
  payload: string;
}

export type IActionTypesCart =
  | IDefaultState
  | ISetProductsAction
  | IAddCountAction
  | ISubtCountAction
  | IDeletetCountAction
  | ISetClientAction
  | IDeleteClientAction
  | ISetCountAction
  | ISetModoReg
  | ISetModoEdit;
