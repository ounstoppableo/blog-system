import { createReducer, on } from '@ngrx/store';
import { setIsLogin } from './isLoginStore.action';

export const initialState = false;

export const isLoginReducer = createReducer(
  initialState,
  on(setIsLogin, (state, { flag }) => flag),
);
