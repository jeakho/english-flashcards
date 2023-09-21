import { featureKey, ListsSelectionState } from '@app/features/selection/state/selection.reducer';
import { createSelector } from '@ngrx/store';

const selectState = (state: any) => state[featureKey];

export const listTitles = createSelector(
  selectState,
  (state: ListsSelectionState) => state.selectionOptions
);
