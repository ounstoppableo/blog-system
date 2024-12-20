import { createAction, props } from '@ngrx/store';

export const setSmallSize = createAction(
  '[smallSize Component] setSmallSize',
  props<{ flag: boolean }>(),
);
