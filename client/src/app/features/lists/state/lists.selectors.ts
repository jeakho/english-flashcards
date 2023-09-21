import { createSelector } from '@ngrx/store';
import { CardsListsState, featureKey } from './lists.reducer';

const selectLists = (state: any) => state[featureKey];

export const selectListEntities = createSelector(
  selectLists,
  (state: CardsListsState) => state.entities
);

export const selectListTitles = createSelector(
  selectLists,
  (state: CardsListsState) => state.entities.map(list => list.title)
);

export const selectCurrentList = createSelector(
  selectLists,
  (state: CardsListsState) => state.currentList
);

export const selectError = createSelector(
  selectLists,
  (state: CardsListsState) => state.error
);