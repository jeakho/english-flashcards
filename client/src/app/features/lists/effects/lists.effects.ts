import { Injectable } from '@angular/core';
import { createEffect, ofType } from '@ngrx/effects';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { ListsApi } from '@app/features/lists/api/lists.api';
import * as ListsManagementActions from '../state/lists.actions';

@Injectable({
  providedIn: 'root'
})
export class ListsEffect {
  loadLists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsManagementActions.loadLists),
      exhaustMap(() => this.listsApi.getLists$()
        .pipe(
          map(lists => ListsManagementActions.loadListsSuccess({ lists })),
          catchError(() => of(ListsManagementActions.loadListsError()))
        )
      )
    )
  );

  createList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsManagementActions.createList),
      exhaustMap(action => this.listsApi.createList$(action.title).pipe(
        map(list => ListsManagementActions.createListSuccess({ list })),
        catchError(error => of(ListsManagementActions.createListError({ error: error.error })))
      ))
    )
  )

  deleteList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ListsManagementActions.deleteList),
      exhaustMap(action => this.listsApi.deleteList$(action.id).pipe(
        map(_ => ListsManagementActions.loadLists())
      ))
    )
  )

  constructor(
    private actions$: Actions,
    private listsApi: ListsApi
  ) {
  }
}
