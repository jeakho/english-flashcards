import { createReducer, on } from '@ngrx/store';
import { Action } from '@ngrx/store';
import * as ListsManagementActions from './lists.actions';
import { ListItem } from '@app/shared/types/list-item';

export interface CardsListsState {
  ids: number[];
  currentList: ListItem | null;
  entities: ListItem[];
  error: string | null;
}

// initial state
export const initialState: CardsListsState = {
  ids: [],
  currentList: null,
  entities: [],
  error: null
};

// key
export const featureKey = 'lists';

// reducer
const _listsManagementReducer = createReducer(
  initialState,

  on(ListsManagementActions.selectList, (state, { id }) =>
    Object.assign({}, state, { currentList: state.entities.find(list => list.id === id) || null })
  ),

  on(ListsManagementActions.loadListsSuccess, (state, { lists }) =>
    Object.assign({}, state, { ids: lists.map(list => list.id), entities: lists })
  ),

  on(ListsManagementActions.loadListsError, state => ({ ...state })),

  on(ListsManagementActions.createListSuccess, (state, { list }) =>
    Object.assign(
      {}, 
      state, { 
        ids: [...state.ids, list.id], 
        entities: [...state.entities, list],
        error: null 
      }
    )
  ),

  on(ListsManagementActions.createListError, (state, { error }) => 
    Object.assign({}, state, { error })
  )
);

export function reducer(state: CardsListsState | undefined, action: Action): CardsListsState {
  return _listsManagementReducer(state, action);
}
