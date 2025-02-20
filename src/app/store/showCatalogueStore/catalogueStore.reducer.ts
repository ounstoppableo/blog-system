import { createReducer, on } from '@ngrx/store';
import { setShowCatalogue } from './catalogueStore.action';

export const initialState = false;

export const showCatalogueReducer = createReducer(
  initialState,
  on(setShowCatalogue, (state, { flag }) => flag),
);
