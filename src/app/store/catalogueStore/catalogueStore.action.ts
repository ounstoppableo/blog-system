import { createAction, props } from '@ngrx/store';

export const setCatalogue = createAction(
  '[catalogue Component] setCatalogue',
  props<{ data: any }>(),
);
