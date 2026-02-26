import { createReducer, on } from '@ngrx/store';
import { setAppOpenMethod } from './appOpenMethod.action';

export const initialState: 'inner' | 'outer' = 'outer';

export const appOpenMethodReducer = createReducer(
  initialState,
  on(setAppOpenMethod, (state, { data }) => data),
);
