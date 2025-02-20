import { createAction, props } from '@ngrx/store';

export const setShowCatalogue = createAction(
  '[catalogue Component] setShowCatalogue',
  props<{ flag: boolean }>(),
);
