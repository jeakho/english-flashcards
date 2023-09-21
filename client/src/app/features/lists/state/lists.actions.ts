import { createAction, props } from '@ngrx/store';
import { ListItem } from '@app/shared/types/list-item';

export const loadLists = createAction('[Lists Page] Load');
export const loadListsSuccess = createAction('[Lists Management API] Load Success', props<{ lists: ListItem[] }>());
export const loadListsError = createAction('[Lists Management API] Load Error');

export const createList = createAction('[Lists Management Page] Create', props<{ title: string }>());
export const createListSuccess = createAction('[Lists Management API] Create Success', props<{ list: ListItem }>());
export const createListError = createAction('[Lists Management API] Create Error', props<{ error: string }>());
export const deleteList = createAction('[Lists Management Page] Delete', props<{ id: number }>());

export const addList = createAction(
  '[Lists Management Page] Add',
  props<{ list: ListItem }>()
);

export const removeList = createAction(
  '[Lists Management Page] Remove',
  props<{ id: number }>()
);

export const selectList = createAction(
  '[Lists Management Page] Select',
  props<{ id: number }>()
);
