import { createReducer, on } from '@ngrx/store';
import { setCatalogue } from './catalogueStore.action';

export const initialState = [];

export const catalogueReducer = createReducer(
  initialState,
  on(setCatalogue, (state, { data }) => data),
);
