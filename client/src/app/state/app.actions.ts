import { createAction, props } from '@ngrx/store';

export const setActiveComponentTitle = createAction(
  '[App] Set Active Component Title',
  props<{ title: string }>()
);
