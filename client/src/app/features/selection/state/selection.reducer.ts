import { Action, createReducer, on } from '@ngrx/store';
import * as ListsSelectionActions from './selection.actions';

export interface ListsSelectionState {
  selectionOptions: string[];
}

const initialState: ListsSelectionState = {
  selectionOptions: []
};

export const featureKey = 'listsSelection';

// tslint:disable-next-line:variable-name
const _listSelectionReducer = createReducer(
  initialState,

  on(ListsSelectionActions.addListTitles, (state, { listTitles }) => ({
    selectionOptions: [...state.selectionOptions, ...listTitles]
    })
  )
);

export function reducer(state: ListsSelectionState | undefined, action: Action): ListsSelectionState {
  return _listSelectionReducer(state, action);
}
