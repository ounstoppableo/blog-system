import { createReducer, on } from '@ngrx/store';
import { setSmallSize } from './smallSize.actions';

export const initialState = false;

export const smallSizeReducer = createReducer(
  initialState,
  on(setSmallSize, (state, { flag }) => flag),
);
