import { createAction, props } from '@ngrx/store';

export const setIsLogin = createAction(
  '[isLogin Component] setIsLogin',
  props<{ flag: boolean }>(),
);
