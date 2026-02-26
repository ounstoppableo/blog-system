import { createAction, props } from '@ngrx/store';

export const setAppOpenMethod = createAction(
  '[catalogue Component] setAppOpenMethod',
  props<{ data: any }>(),
);
