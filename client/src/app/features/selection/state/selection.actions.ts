import { createAction, props } from '@ngrx/store';

export const loadListTitles = createAction('[Lists Selection Page] Load');
export const addListTitles = createAction('[Lists Selection Page] Add', props<{ listTitles: string[] }>());
