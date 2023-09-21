import { createSelector } from '@ngrx/store';
import { AppState, key } from './app.reducer';

const selectApp = (state: any) => state[key];

export const activeComponentTitle = createSelector(
  selectApp,
  (state: AppState) => state.activeComponentTitle
);
